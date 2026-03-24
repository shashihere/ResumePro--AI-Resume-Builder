import { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { createResume, updateResume } from '../redux/resumeSlice'
import { Save, Download, Layout, Plus, Check, Settings, Sparkles, Type, Palette, ArrowLeft, Wand2, Trash2, X, List } from 'lucide-react'
import axios from 'axios'
import { suggestionsData } from '../data/suggestions'
import { getTemplateDefault } from '../data/templateDefaults'
import { templates } from '../data/templates'
import ClassicLayout from '../components/resume-layouts/ClassicLayout'
import ModernLayout from '../components/resume-layouts/ModernLayout'

import { useToast } from '../context/ToastContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function ResumeBuilder() {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { showToast } = useToast();
    const { user } = useSelector((state) => state.auth)

    // State Initialization
    const [formData, setFormData] = useState(() => {
        let initialData;
        if (location.state?.resumeData) {
            initialData = location.state.resumeData;
        } else {
            // New Create
            const tId = location.state?.templateId || 'modern-tech';
            initialData = getTemplateDefault(tId);
        }

        // Normalization: Ensure skills is an array of objects (Categories)
        // If it's legacy array of strings, convert it.
        let normalizedSkills = initialData.skills || [];
        if (normalizedSkills.length > 0 && typeof normalizedSkills[0] === 'string') {
            normalizedSkills = [{ category: 'Key Skills', items: normalizedSkills }];
        }

        // Auto-Title for new resumes
        const roleTitle = initialData.personalInfo?.title || 'Professional';
        const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const autoTitle = `${roleTitle} Resume - ${dateStr}`;

        return {
            ...initialData,
            title: initialData.title || autoTitle,
            personalInfo: {
                fullName: user?.name || 'Your Name',
                email: user?.email || 'email@example.com',
                linkedin: '',
                github: '',
                website: '',
                ...initialData.personalInfo
            },
            skills: normalizedSkills,
            certifications: initialData.certifications || [], // Ensure certs exist
            education: initialData.education || [],
            experience: initialData.experience || [],
            projects: initialData.projects || []
        };
    })

    const [visualConfig, setVisualConfig] = useState(location.state?.resumeData?.visualConfig || {
        font: 'font-sans',
        color: '#0B132B',
        accent: '#FFC300'
    })

    const [activeResumeId, setActiveResumeId] = useState(location.state?.resumeData?._id || null)
    const [saveStatus, setSaveStatus] = useState('Saved')
    const [activeTab, setActiveTab] = useState('editor')
    const [suggestionQuery, setSuggestionQuery] = useState('')

    const templateId = location.state?.templateId || formData.templateId || 'modern-tech';

    // Layout Resolver
    const currentLayout = useMemo(() => {
        const found = templates.find(t => t.id === templateId);
        return found?.layout || 'modern';
    }, [templateId]);


    // Autosave
    useEffect(() => {
        const timer = setTimeout(() => {
            if (activeResumeId) handleAutosave();
        }, 2000);
        return () => clearTimeout(timer);
    }, [formData, visualConfig])

    const handleAutosave = async () => {
        setSaveStatus('Saving...')
        try {
            const token = user?.token;
            if (!token) return;
            const config = { headers: { Authorization: `Bearer ${token}` } }
            // Ensure formatting matches backend expectation or use mixed
            await axios.put(`${API_URL}/api/resumes/autosave`, { _id: activeResumeId, ...formData, visualConfig, templateId }, config)
            setSaveStatus('Saved')
        } catch (err) {
            console.error(err); setSaveStatus('Error')
        }
    }

    const handleInfoChange = (e) => {
        setFormData({
            ...formData,
            personalInfo: { ...formData.personalInfo, [e.target.name]: e.target.value }
        })
    }

    // Helper: Skill Management
    const addSkillCategory = () => {
        setFormData(prev => ({ ...prev, skills: [...prev.skills, { category: 'New Category', items: [] }] }));
    }
    const updateCategoryName = (idx, name) => {
        const newSkills = [...formData.skills]; newSkills[idx].category = name; setFormData({ ...formData, skills: newSkills });
    }
    const addSkillToCategory = (idx) => {
        const newSkills = [...formData.skills]; newSkills[idx].items.push('New Skill'); setFormData({ ...formData, skills: newSkills });
    }
    const updateSkillItem = (catIdx, itemIdx, val) => {
        const newSkills = [...formData.skills]; newSkills[catIdx].items[itemIdx] = val; setFormData({ ...formData, skills: newSkills });
    }
    const removeSkillItem = (catIdx, itemIdx) => {
        const newSkills = [...formData.skills]; newSkills[catIdx].items = newSkills[catIdx].items.filter((_, i) => i !== itemIdx); setFormData({ ...formData, skills: newSkills });
    }
    const removeAccessory = (arrayName, idx) => {
        const newArr = formData[arrayName].filter((_, i) => i !== idx);
        setFormData({ ...formData, [arrayName]: newArr });
    }

    const handleExport = () => {
        window.print();
        showToast('Resume downloaded successfully', 'success');
    }

    const handleSave = async () => {
        const payload = { ...formData, visualConfig, templateId };
        if (!activeResumeId) {
            const res = await dispatch(createResume(payload));
            if (res.type === 'resumes/create/fulfilled') {
                setActiveResumeId(res.payload._id);
                showToast('Resume created successfully', 'success');
            }
        } else {
            const res = await dispatch(updateResume({ id: activeResumeId, resumeData: payload }));
            if (res.type === 'resumes/update/fulfilled') {
                showToast('Resume saved successfully', 'success');
            }
        }
    }

    const getSuggestions = () => {
        const role = suggestionQuery || formData.personalInfo.title || 'Software Engineer';
        const key = Object.keys(suggestionsData).find(k => role.toLowerCase().includes(k.toLowerCase())) || 'Software Engineer';
        return suggestionsData[key];
    }

    const addSuggestion = (text) => {
        setFormData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, summary: prev.personalInfo.summary ? prev.personalInfo.summary + ' ' + text : text }
        }))
    }

    return (
        <div className="flex h-screen bg-[#0f172a] text-white overflow-hidden font-sans pt-20">

            {/* SIDEBAR TABS */}
            <div className="w-20 flex flex-col items-center py-6 bg-[#0B132B] border-r border-white/10 z-20">
                <button onClick={() => navigate('/dashboard')} className="mb-8 p-3 text-gray-400 hover:text-white bg-white/5 rounded-xl"><ArrowLeft size={20} /></button>
                <div className="space-y-6 flex flex-col items-center w-full">
                    <button onClick={() => setActiveTab('editor')} className={`p-3 rounded-xl transition-all ${activeTab === 'editor' ? 'bg-secondary text-black shadow-glow' : 'text-gray-400 hover:text-white'}`} title="Content Editor"><Layout size={24} /></button>
                    <button onClick={() => setActiveTab('visual')} className={`p-3 rounded-xl transition-all ${activeTab === 'visual' ? 'bg-secondary text-black shadow-glow' : 'text-gray-400 hover:text-white'}`} title="Design & Style"><Palette size={24} /></button>
                    <button onClick={() => setActiveTab('suggestions')} className={`p-3 rounded-xl transition-all ${activeTab === 'suggestions' ? 'bg-secondary text-black shadow-glow' : 'text-gray-400 hover:text-white'}`} title="AI Suggestions"><Sparkles size={24} /></button>
                </div>
                <div className="mt-auto flex flex-col gap-4">
                    <button onClick={handleExport} className="p-3 bg-green-600 text-white rounded-xl hover:bg-green-500 shadow-lg" title="Download PDF"><Download size={24} /></button>
                    <button onClick={handleSave} className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 shadow-lg" title="Save"><Save size={24} /></button>
                </div>
            </div>

            {/* EDITOR PANEL */}
            <div className="w-[450px] bg-[#111b33] border-r border-white/10 flex flex-col shadow-2xl z-20">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#111b33]">
                    <h2 className="text-xl font-heading font-bold text-white uppercase tracking-wider">
                        {activeTab === 'editor' && 'Resume Content'}
                        {activeTab === 'visual' && 'Design & Style'}
                        {activeTab === 'suggestions' && 'AI Assistant'}
                    </h2>
                    <span className={`text-xs font-mono font-bold px-2 py-1 rounded ${saveStatus === 'Saved' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-500'}`}>{saveStatus}</span>
                </div>

                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-700 pb-24 space-y-8">

                    {activeTab === 'editor' && (
                        <>
                            {/* Personal Info */}
                            <section className="space-y-4">
                                <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-2 border-b border-white/10 pb-2">Personal Details</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <input type="text" name="fullName" placeholder="Full Name" value={formData.personalInfo.fullName} onChange={handleInfoChange} className="input input-dark col-span-2" />
                                    <input type="text" name="title" placeholder="Job Title" value={formData.personalInfo.title} onChange={handleInfoChange} className="input input-dark col-span-2" />
                                    <input type="email" name="email" placeholder="Email" value={formData.personalInfo.email} onChange={handleInfoChange} className="input input-dark" />
                                    <input type="text" name="phone" placeholder="Phone" value={formData.personalInfo.phone} onChange={handleInfoChange} className="input input-dark" />
                                    <input type="text" name="address" placeholder="City, Country" value={formData.personalInfo.address} onChange={handleInfoChange} className="input input-dark col-span-2" />

                                    <h4 className="text-xs text-gray-500 font-bold uppercase mt-2 col-span-2">Social Links</h4>
                                    <input type="text" name="linkedin" placeholder="LinkedIn URL" value={formData.personalInfo.linkedin} onChange={handleInfoChange} className="input input-dark col-span-2" />
                                    <input type="text" name="github" placeholder="GitHub URL" value={formData.personalInfo.github} onChange={handleInfoChange} className="input input-dark col-span-2" />
                                    <input type="text" name="website" placeholder="Portfolio Website" value={formData.personalInfo.website} onChange={handleInfoChange} className="input input-dark col-span-2" />
                                </div>
                                <textarea name="summary" placeholder="Professional Summary" value={formData.personalInfo.summary} onChange={handleInfoChange} className="input input-dark h-32 text-sm leading-relaxed" />
                            </section>

                            {/* Skills (CATEGORIZED) */}
                            <section className="space-y-4">
                                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                    <h3 className="text-sm font-bold text-secondary uppercase tracking-widest">Skills & Expertise</h3>
                                    <button onClick={addSkillCategory} className="text-xs text-green-400 hover:text-green-300 font-bold flex items-center gap-1"><Plus size={12} /> New Category</button>
                                </div>
                                {formData.skills.map((cat, cIdx) => (
                                    <div key={cIdx} className="bg-black/20 p-3 rounded-lg border border-white/5">
                                        <div className="flex justify-between mb-2">
                                            <input className="bg-transparent font-bold text-sm text-secondary outline-none w-full" value={cat.category} onChange={(e) => updateCategoryName(cIdx, e.target.value)} placeholder="Category Name (e.g. Tools)" />
                                            <button onClick={() => removeAccessory('skills', cIdx)} className="text-gray-600 hover:text-red-500"><Trash2 size={14} /></button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {cat.items.map((item, iIdx) => (
                                                <div key={iIdx} className="flex items-center gap-1 bg-white/5 rounded px-2 py-1 text-xs">
                                                    <input className="bg-transparent w-full outline-none" value={item} onChange={(e) => updateSkillItem(cIdx, iIdx, e.target.value)} />
                                                    <button onClick={() => removeSkillItem(cIdx, iIdx)} className="text-gray-500 hover:text-red-400"><X size={10} /></button>
                                                </div>
                                            ))}
                                            <button onClick={() => addSkillToCategory(cIdx)} className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded hover:bg-secondary/20">+ Add</button>
                                        </div>
                                    </div>
                                ))}
                            </section>

                            {/* Certifications (NEW) */}
                            <section className="space-y-4">
                                <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-2 border-b border-white/10 pb-2">Certifications</h3>
                                {formData.certifications.map((cert, index) => (
                                    <div key={index} className="bg-black/20 p-3 rounded-lg border border-white/5 relative group flex gap-2">
                                        <input className="bg-transparent font-bold text-white text-sm w-1/2 outline-none" placeholder="Certificate Name" value={cert.name} onChange={(e) => {
                                            const newCerts = [...formData.certifications]; newCerts[index].name = e.target.value; setFormData({ ...formData, certifications: newCerts });
                                        }} />
                                        <input className="bg-transparent text-gray-400 text-sm w-1/4 outline-none" placeholder="Issuer" value={cert.issuer} onChange={(e) => {
                                            const newCerts = [...formData.certifications]; newCerts[index].issuer = e.target.value; setFormData({ ...formData, certifications: newCerts });
                                        }} />
                                        <input className="bg-transparent text-gray-400 text-sm w-1/4 outline-none text-right" placeholder="Year" value={cert.year} onChange={(e) => {
                                            const newCerts = [...formData.certifications]; newCerts[index].year = e.target.value; setFormData({ ...formData, certifications: newCerts });
                                        }} />
                                        <button className="absolute -right-2 -top-2 bg-[#111b33] p-1 rounded-full text-red-500 opacity-0 group-hover:opacity-100 shadow border border-white/10" onClick={() => removeAccessory('certifications', index)}><X size={12} /></button>
                                    </div>
                                ))}
                                <button className="w-full py-2 border border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-white hover:border-gray-400 text-xs uppercase font-bold tracking-wide" onClick={() => {
                                    setFormData({ ...formData, certifications: [...formData.certifications, { name: '', issuer: '', year: '' }] });
                                }}>+ Add Certification</button>
                            </section>

                            {/* Experience */}
                            <section className="space-y-4">
                                <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-2 border-b border-white/10 pb-2">Experience</h3>
                                {formData.experience.map((exp, index) => (
                                    <div key={index} className="bg-black/20 p-4 rounded-lg border border-white/5 relative group">
                                        <div className="mb-2">
                                            <input className="bg-transparent font-bold w-full text-white text-sm outline-none" placeholder="Job Title" value={exp.title} onChange={(e) => {
                                                const newExp = [...formData.experience]; newExp[index].title = e.target.value; setFormData({ ...formData, experience: newExp });
                                            }} />
                                            <div className="flex justify-between text-xs text-secondary">
                                                <input className="bg-transparent outline-none w-1/2 opacity-80" placeholder="Company" value={exp.company} onChange={(e) => {
                                                    const newExp = [...formData.experience]; newExp[index].company = e.target.value; setFormData({ ...formData, experience: newExp });
                                                }} />
                                                <input className="bg-transparent outline-none w-1/2 text-right opacity-80" placeholder="Duration" value={exp.duration} onChange={(e) => {
                                                    const newExp = [...formData.experience]; newExp[index].duration = e.target.value; setFormData({ ...formData, experience: newExp });
                                                }} />
                                            </div>
                                        </div>
                                        <textarea className="w-full bg-transparent text-gray-300 text-xs h-24 outline-none resize-none leading-relaxed" placeholder="Description (Bullet points recommended)..." value={exp.description} onChange={(e) => {
                                            const newExp = [...formData.experience]; newExp[index].description = e.target.value; setFormData({ ...formData, experience: newExp });
                                        }} />
                                        <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100" onClick={() => removeAccessory('experience', index)}><Trash2 size={14} /></button>
                                    </div>
                                ))}
                                <button className="w-full py-2 border border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-white hover:border-gray-400 text-xs uppercase font-bold tracking-wide" onClick={() => {
                                    setFormData({ ...formData, experience: [...formData.experience, { title: '', company: '', duration: '', description: '' }] });
                                }}>+ Add Position</button>
                            </section>

                            {/* Education */}
                            <section className="space-y-4">
                                <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-2 border-b border-white/10 pb-2">Education</h3>
                                {formData.education.map((edu, index) => (
                                    <div key={index} className="bg-black/20 p-3 rounded-lg border border-white/5 relative group">
                                        <input className="bg-transparent font-bold w-full text-white text-sm outline-none" placeholder="University" value={edu.school} onChange={(e) => {
                                            const newEdu = [...formData.education]; newEdu[index].school = e.target.value; setFormData({ ...formData, education: newEdu });
                                        }} />
                                        <div className="flex gap-2 text-xs text-gray-400">
                                            <input className="bg-transparent outline-none w-2/3" placeholder="Degree" value={edu.degree} onChange={(e) => {
                                                const newEdu = [...formData.education]; newEdu[index].degree = e.target.value; setFormData({ ...formData, education: newEdu });
                                            }} />
                                            <input className="bg-transparent outline-none w-1/3 text-right" placeholder="Year" value={edu.year} onChange={(e) => {
                                                const newEdu = [...formData.education]; newEdu[index].year = e.target.value; setFormData({ ...formData, education: newEdu });
                                            }} />
                                        </div>
                                        <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100" onClick={() => removeAccessory('education', index)}><X size={14} /></button>
                                    </div>
                                ))}
                                <button className="w-full py-2 border border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-white hover:border-gray-400 text-xs uppercase font-bold tracking-wide" onClick={() => {
                                    setFormData({ ...formData, education: [...formData.education, { school: '', degree: '', year: '' }] });
                                }}>+ Add Education</button>
                            </section>

                            {/* Projects */}
                            <section className="space-y-4">
                                <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-2 border-b border-white/10 pb-2">Projects</h3>
                                {formData.projects.map((proj, index) => (
                                    <div key={index} className="bg-black/20 p-4 rounded-lg border border-white/5 relative group">
                                        <input className="bg-transparent font-bold w-full text-white text-sm mb-1 outline-none" placeholder="Project Title" value={proj.title} onChange={(e) => {
                                            const newProjs = [...formData.projects]; newProjs[index].title = e.target.value; setFormData({ ...formData, projects: newProjs });
                                        }} />
                                        <input className="bg-transparent text-blue-400 w-full text-xs mb-2 outline-none" placeholder="Link (Optional)" value={proj.link} onChange={(e) => {
                                            const newProjs = [...formData.projects]; newProjs[index].link = e.target.value; setFormData({ ...formData, projects: newProjs });
                                        }} />
                                        <textarea className="w-full bg-transparent text-gray-300 text-xs h-16 outline-none resize-none" placeholder="Description..." value={proj.description} onChange={(e) => {
                                            const newProjs = [...formData.projects]; newProjs[index].description = e.target.value; setFormData({ ...formData, projects: newProjs });
                                        }} />
                                        <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100" onClick={() => removeAccessory('projects', index)}><Trash2 size={14} /></button>
                                    </div>
                                ))}
                                <button className="w-full py-2 border border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-white hover:border-gray-400 text-xs uppercase font-bold tracking-wide" onClick={() => {
                                    setFormData({ ...formData, projects: [...formData.projects, { title: '', description: '', link: '' }] });
                                }}>+ Add Project</button>
                            </section>

                        </>
                    )}

                    {activeTab === 'visual' && (
                        <div className="space-y-8">
                            <section>
                                <h3 className="flex items-center gap-2 text-sm font-bold text-secondary uppercase tracking-widest mb-4"><Type size={16} /> Typography</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    <button onClick={() => setVisualConfig(c => ({ ...c, font: 'font-sans' }))} className={`p-3 rounded border text-sm ${visualConfig.font === 'font-sans' ? 'border-secondary bg-secondary/10 text-white' : 'border-gray-700 text-gray-400'}`}>Modern (Sans)</button>
                                    <button onClick={() => setVisualConfig(c => ({ ...c, font: 'font-heading' }))} className={`p-3 rounded border text-sm font-heading ${visualConfig.font === 'font-heading' ? 'border-secondary bg-secondary/10 text-white' : 'border-gray-700 text-gray-400'}`}>Bold (Poppins)</button>
                                </div>
                            </section>
                            <section>
                                <h3 className="flex items-center gap-2 text-sm font-bold text-secondary uppercase tracking-widest mb-4"><Palette size={16} /> Color Theme</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs text-gray-400 mb-1 block">Accent Color</label>
                                        <div className="flex gap-2">
                                            {['#FFC300', '#00C4A1', '#EC4899', '#3B82F6', '#8B5CF6'].map(color => (
                                                <button key={color} onClick={() => setVisualConfig(c => ({ ...c, accent: color }))} className={`w-8 h-8 rounded-full border-2 ${visualConfig.accent === color ? 'border-white scale-110' : 'border-transparent'}`} style={{ backgroundColor: color }} />
                                            ))}
                                            <input type="color" value={visualConfig.accent} onChange={(e) => setVisualConfig(c => ({ ...c, accent: e.target.value }))} className="w-8 h-8 p-0 border-0 rounded-full overflow-hidden" />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                    {activeTab === 'suggestions' && (
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-secondary/20 to-transparent p-4 rounded-xl border border-secondary/20">
                                <h3 className="flex items-center gap-2 font-bold text-secondary mb-2"><Wand2 size={18} /> AI Assistant</h3>
                                <p className="text-sm text-gray-300">Click any valid suggestion below to add it to your summary.</p>
                            </div>
                            <input type="text" placeholder="Search job title..." className="input input-dark" value={suggestionQuery} onChange={(e) => setSuggestionQuery(e.target.value)} />
                            <div className="space-y-2">
                                {getSuggestions()?.map(text => (
                                    <div key={text} onClick={() => addSuggestion(text)} className="p-3 bg-black/20 hover:bg-white/10 border border-white/5 hover:border-secondary/50 rounded-lg cursor-pointer transition-colors text-sm text-gray-300">
                                        + {text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* PREVIEW PANEL */}
            <div className="flex-1 bg-gray-900 p-8 flex justify-center overflow-y-auto">
                <div id="resume-preview" className={`bg-white text-black w-[210mm] min-h-[297mm] h-fit shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-300 origin-top scale-95 overflow-hidden`}>
                    {currentLayout === 'classic' ? <ClassicLayout data={formData} visualConfig={visualConfig} /> : <ModernLayout data={formData} visualConfig={visualConfig} />}
                </div>
            </div>
        </div>
    )
}

export default ResumeBuilder
