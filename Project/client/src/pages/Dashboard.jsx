import { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { getResumes, deleteResume, createResume } from '../redux/resumeSlice'
import { Trash2, Edit, Plus, FileText, CheckCircle, Clock, Target, Calendar, Briefcase, TrendingUp, MoreHorizontal, ArrowRight, Zap, Award, Layout, Grid, Search, Filter, X, Activity, BarChart2, Layers } from 'lucide-react'
import { getTemplateDefault } from '../data/templateDefaults';
import { templates, industries, styles } from '../data/templates';

import { useToast } from '../context/ToastContext';

function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();
    const { showToast } = useToast();
    const { user } = useSelector((state) => state.auth)
    const { resumes, isLoading } = useSelector((state) => state.resume)
    const [activeTab, setActiveTab] = useState('overview')
    const [showProModal, setShowProModal] = useState(false)

    // Template Filters
    const [templateSearch, setTemplateSearch] = useState('')
    const [selectedIndustry, setSelectedIndustry] = useState('All')
    const [selectedStyle, setSelectedStyle] = useState('All')

    // Effect to handle navigation from "Career Hub" click or other links
    useEffect(() => {
        // If state has a requested tab, use it (optional)
        // But mainly rely on user interaction. 
        // We could implement query param ?tab=resumes if we wanted deep linking.
    }, [location]);

    useEffect(() => {
        if (!user) {
            navigate('/login')
        } else {
            dispatch(getResumes())
        }
    }, [user, navigate, dispatch])

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this resume?')) {
            const res = await dispatch(deleteResume(id));
            if (res.type === 'resumes/delete/fulfilled') {
                showToast('Resume deleted successfully', 'success');
            }
        }
    }

    const handleCreateClick = () => {
        setActiveTab('templates');
    }

    // AUTO-NAMING LOGIC
    const handleTemplateSelect = (templateId) => {
        // OPTIMIZED: Navigate immediately to builder with ID. 
        // Creation happens on "Save" in the builder to prevent empty spam and improve speed.
        navigate('/builder', { state: { templateId: templateId } });
    }

    const handleResumeClick = (resume) => {
        navigate('/builder', { state: { resumeData: resume } });
    }

    const filteredTemplates = useMemo(() => {
        return templates.filter(t => {
            const matchesSearch = t.name.toLowerCase().includes(templateSearch.toLowerCase());
            const matchesIndustry = selectedIndustry === 'All' || t.industry === selectedIndustry;
            const matchesStyle = selectedStyle === 'All' || t.style === selectedStyle;
            return matchesSearch && matchesIndustry && matchesStyle;
        });
    }, [templateSearch, selectedIndustry, selectedStyle]);


    // DYNAMIC ANALYTICS LOGIC (Real Data)
    const analytics = useMemo(() => {
        if (!resumes || resumes.length === 0) return { strength: 0, completion: 0, keywords: 0, label: 'N/A' };

        let totalScore = 0;
        resumes.forEach(r => {
            let score = 0;
            if (r.personalInfo?.summary?.length > 50) score += 20;
            if (r.experience?.length > 0) score += 30;
            if (r.education?.length > 0) score += 20;
            if (r.skills?.length > 3) score += 30;
            totalScore += score;
        });

        const avgScore = Math.round(totalScore / resumes.length);

        let label = 'Needs Work';
        if (avgScore > 90) label = 'Excellent';
        else if (avgScore > 75) label = 'Strong';
        else if (avgScore > 50) label = 'Good';

        return {
            strength: avgScore,
            label: label,
            docCount: resumes.length
        };
    }, [resumes]);


    return (
        <div className="min-h-screen bg-[#0f172a] text-white font-sans pb-20 selection:bg-secondary selection:text-black relative">
            {/* BACKGROUND BLOBS */}
            <div className="fixed top-20 left-10 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

            {/* PRO MODAL */}
            {showProModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn" onClick={() => setShowProModal(false)}>
                    <div className="bg-gradient-to-br from-[#FFC300] to-[#FFD60A] text-black p-1 rounded-2xl max-w-lg w-full m-4 shadow-[0_0_50px_rgba(255,195,0,0.5)] transform scale-100 transition-all" onClick={e => e.stopPropagation()}>
                        <div className="bg-[#0f172a] text-white p-8 rounded-xl relative overflow-hidden">
                            {/* Gold Shine Effect */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/20 rounded-full blur-[80px] -z-10"></div>

                            <button onClick={() => setShowProModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></button>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-yellow-400 text-black rounded-lg shadow-lg"><Award size={32} /></div>
                                <h2 className="text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">Upgrade to Pro</h2>
                            </div>

                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-lg"><CheckCircle className="text-yellow-400" size={20} /> Unlimited Resume Versions</li>
                                <li className="flex items-center gap-3 text-lg"><CheckCircle className="text-yellow-400" size={20} /> AI-Powered Content Suggestions</li>
                                <li className="flex items-center gap-3 text-lg"><CheckCircle className="text-yellow-400" size={20} /> Premium Harvard & Modern Templates</li>
                                <li className="flex items-center gap-3 text-lg"><CheckCircle className="text-yellow-400" size={20} /> Priority Support</li>
                            </ul>

                            <button className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold text-xl rounded-xl hover:shadow-[0_0_20px_rgba(255,195,0,0.6)] transition transform hover:-translate-y-1">
                                Get Pro Access - $9.99/mo
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* HEADER */}
            <div className="pt-24 pb-4 px-6 lg:px-12 container mx-auto flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8 mb-8">
                <div>
                    <h1 className="text-5xl font-heading font-bold mb-3 tracking-tight">
                        Hello, <span className="text-secondary">{user?.name?.split(' ')[0] || 'Seeker'}</span>
                    </h1>
                    <p className="text-xl text-gray-400">Welcome to your Career Command Center.</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={() => setShowProModal(true)} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-lg font-bold shadow-lg hover:shadow-yellow-500/20 transition transform hover:-translate-y-0.5">
                        <Award className="text-white" size={20} />
                        <span>Upgrade to Pro</span>
                    </button>
                </div>
            </div>

            {/* TABS Navigation */}
            <div className="container mx-auto px-6 lg:px-12 mt-6">
                <div className="flex gap-8 border-b border-white/10 mb-10">
                    {['overview', 'resumes', 'templates'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 text-lg font-bold uppercase tracking-wider transition-all relative px-2 ${activeTab === tab ? 'text-secondary' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {tab === 'resumes' ? 'My Resumes' : tab === 'templates' ? 'Template Library' : tab}
                            {activeTab === tab && (
                                <span className="absolute bottom-0 left-0 w-full h-1 bg-secondary shadow-[0_0_15px_#FFC300]"></span>
                            )}
                        </button>
                    ))}
                </div>
            </div>


            {/* --- VIEW: OVERVIEW (GRAND & SCALED) --- */}
            {activeTab === 'overview' && (
                <div className="container mx-auto px-6 lg:px-12 animate-fadeIn pb-20">

                    {/* TOP ROW: BIG METRICS */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
                        {/* Card 1: Strength */}
                        <div className="lg:col-span-1 p-8 bg-[#1e293b] border-t-4 border-green-500 rounded-2xl shadow-xl flex flex-col justify-between h-48 hover:-translate-y-1 transition duration-300">
                            <div>
                                <p className="text-gray-400 font-bold uppercase tracking-wider text-sm mb-2">Profile Strength</p>
                                <h3 className={`text-5xl font-heading font-bold ${analytics.strength >= 90 ? 'text-green-400' : 'text-yellow-400'}`}>{analytics.strength}%</h3>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 p-2 rounded-lg self-start">
                                <Activity size={16} className={analytics.strength >= 90 ? 'text-green-400' : 'text-yellow-400'} />
                                <span>{analytics.label} Condition</span>
                            </div>
                        </div>

                        {/* Card 2: Documents */}
                        <div className="lg:col-span-1 p-8 bg-[#1e293b] border-t-4 border-blue-500 rounded-2xl shadow-xl flex flex-col justify-between h-48 hover:-translate-y-1 transition duration-300">
                            <div>
                                <p className="text-gray-400 font-bold uppercase tracking-wider text-sm mb-2">My Resumes</p>
                                <h3 className="text-5xl font-heading font-bold text-white">{analytics.docCount}</h3>
                            </div>
                            <button onClick={() => setActiveTab('resumes')} className="text-blue-400 text-sm font-bold hover:underline self-start">Manage Documents &rarr;</button>
                        </div>

                        {/* Card 3: Action Center (Wide) */}
                        <div className="lg:col-span-2 p-8 bg-gradient-to-br from-indigo-900 to-[#1e293b] rounded-2xl shadow-xl flex flex-col justify-center relative overflow-hidden h-48 group cursor-pointer" onClick={handleCreateClick}>
                            <div className="absolute right-0 top-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] -z-0"></div>
                            <div className="relative z-10">
                                <h3 className="text-3xl font-heading font-bold mb-2">Ready for your next role?</h3>
                                <p className="text-gray-300 mb-6 max-w-md">Create a tailored resume in minutes using our new AI-powered templates.</p>
                                <button className="px-6 py-3 bg-secondary text-black font-bold rounded-lg hover:shadow-glow transition flex items-center gap-2 w-fit">
                                    <Plus size={20} /> Create New Resume
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* MIDDLE ROW: DETAILED WIDGETS */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* 1. Recent Activity Timeline */}
                        <div className="lg:col-span-2 bg-[#1e293b] border border-white/5 rounded-2xl p-8">
                            <h3 className="text-xl font-bold font-heading mb-6 flex items-center gap-2"><Clock size={20} className="text-gray-400" /> Recent Activity</h3>
                            <div className="space-y-6 relative ml-2">
                                {/* Vertical Line */}
                                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-white/10"></div>

                                {resumes.slice(0, 3).map((r, i) => (
                                    <div key={r._id} className="relative pl-8">
                                        <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-blue-500 border-4 border-[#1e293b]"></div>
                                        <div className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition cursor-pointer" onClick={() => handleResumeClick(r)}>
                                            <div className="flex justify-between mb-1">
                                                <h4 className="font-bold text-lg">{r.title}</h4>
                                                <span className="text-xs text-gray-400">{new Date(r.updatedAt).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-sm text-gray-400">Edited {r.templateId || 'Standard'} Template</p>
                                        </div>
                                    </div>
                                ))}
                                {resumes.length === 0 && <p className="text-gray-500 pl-8">No recent activity.</p>}
                            </div>
                        </div>

                        {/* 2. Skills Analysis (Mock Visual) */}
                        <div className="lg:col-span-1 bg-[#1e293b] border border-white/5 rounded-2xl p-8">
                            <h3 className="text-xl font-bold font-heading mb-6 flex items-center gap-2"><Target size={20} className="text-red-400" /> Skills Analysis</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Technical Skills</span>
                                        <span className="text-green-400">High</span>
                                    </div>
                                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="w-[85%] h-full bg-green-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Soft Skills</span>
                                        <span className="text-yellow-400">Med</span>
                                    </div>
                                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="w-[60%] h-full bg-yellow-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Experience Impact</span>
                                        <span className="text-blue-400">Strong</span>
                                    </div>
                                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="w-[75%] h-full bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                                <h4 className="font-bold text-purple-300 text-sm mb-1">Career Coach Tip</h4>
                                <p className="text-xs text-gray-400 leading-relaxed">Adding 2 more leadership-focused keywords to your summary could boost your match rate by 15%.</p>
                            </div>
                        </div>

                    </div>
                </div>
            )}


            {/* --- VIEW: MY RESUMES --- */}
            {activeTab === 'resumes' && (
                <div className="container mx-auto px-6 lg:px-12 animate-fadeIn pb-20">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-heading font-bold">My Documents</h2>
                        <button onClick={handleCreateClick} className="px-6 py-3 bg-secondary text-black font-bold rounded-lg shadow-lg hover:shadow-[0_0_15px_rgba(255,195,0,0.4)] transition flex items-center gap-2">
                            <Plus size={18} /> Create New
                        </button>
                    </div>

                    {resumes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {resumes.map((resume) => (
                                <div key={resume._id} onClick={() => handleResumeClick(resume)} className="group cursor-pointer relative p-8 bg-[#1e293b] border border-white/5 rounded-2xl hover:border-secondary/30 transition-all duration-300 hover:-translate-y-2 shadow-lg">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold text-sm shadow-inner ring-1 ring-white/10">
                                            {resume.templateId ? resume.templateId.substring(0, 2).toUpperCase() : 'CV'}
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={(e) => handleDelete(e, resume._id)} className="p-2 hover:bg-red-500/20 rounded-full text-gray-400 hover:text-red-500 transition-colors" title="Delete Resume">
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    <h3 className="font-bold text-2xl mb-2 truncate text-white group-hover:text-secondary transition-colors">{resume.title || 'Untitled Resume'}</h3>
                                    <p className="text-sm text-gray-400 mb-6">{resume.personalInfo?.fullName || 'No Name'}</p>

                                    <div className="pt-6 border-t border-white/5 flex justify-between items-center text-xs text-gray-500">
                                        <span className="flex items-center gap-1"><Clock size={14} /> {new Date(resume.updatedAt).toLocaleString()}</span>
                                        <span className="px-3 py-1 bg-white/5 rounded border border-white/5">{resume.templateId}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 px-8 border border-white/5 rounded-3xl bg-white/5">
                            <FileText size={48} className="mx-auto text-gray-600 mb-4" />
                            <h3 className="text-xl font-bold mb-2">No resumes found</h3>
                            <p className="text-gray-400 mb-6">Get started by creating your first professional resume today.</p>
                            <button onClick={handleCreateClick} className="px-6 py-3 bg-secondary text-black font-bold rounded-lg hover:shadow-glow transition">
                                Create New Resume
                            </button>
                        </div>
                    )}
                </div>
            )}


            {/* --- VIEW: TEMPLATE LIBRARY --- */}
            {activeTab === 'templates' && (
                <div className="container mx-auto px-6 lg:px-12 animate-fadeIn pb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-heading font-bold mb-4">Choose a Template</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">Select a professionally designed template to get started.</p>
                    </div>

                    {/* FILTERS & SEARCH */}
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
                        {/* Search */}
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search templates..."
                                value={templateSearch}
                                onChange={(e) => setTemplateSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-base focus:border-secondary outline-none transition shadow-lg"
                            />
                        </div>

                        {/* Industry Filter */}
                        <select
                            value={selectedIndustry}
                            onChange={(e) => setSelectedIndustry(e.target.value)}
                            className="w-full md:w-56 px-6 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-base focus:border-secondary outline-none transition cursor-pointer appearance-none shadow-lg"
                        >
                            {industries.map(i => <option key={i} value={i}>{i === 'All' ? 'All Industries' : i}</option>)}
                        </select>

                        {/* Style Filter */}
                        <select
                            value={selectedStyle}
                            onChange={(e) => setSelectedStyle(e.target.value)}
                            className="w-full md:w-56 px-6 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-base focus:border-secondary outline-none transition cursor-pointer appearance-none shadow-lg"
                        >
                            {styles.map(s => <option key={s} value={s}>{s === 'All' ? 'All Styles' : s}</option>)}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {filteredTemplates.map((template) => (
                            <div key={template.id} className="group relative bg-[#1e293b] rounded-2xl overflow-hidden border border-white/10 hover:border-secondary/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-2">
                                {/* Image */}
                                <div className="relative aspect-[3/4] overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60"></div>
                                    <img src={template.image} alt={template.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-secondary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col items-center justify-center p-6 text-center translat-y-4 group-hover:translate-y-0">
                                        <h3 className="text-black font-heading font-bold text-2xl mb-2">{template.name}</h3>
                                        <p className="text-black/80 text-sm font-medium mb-6">{template.industry} Series</p>
                                        <button
                                            onClick={() => handleTemplateSelect(template.id)}
                                            className="px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-white hover:text-black transition-colors w-full flex items-center justify-center gap-2"
                                        >
                                            <Edit size={16} /> Use Template
                                        </button>
                                    </div>
                                </div>

                                {/* Info Footer */}
                                <div className="p-5 border-t border-white/5 bg-[#0f172a]">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-bold text-white text-lg">{template.name}</h4>
                                        <span className="text-[10px] px-2 py-1 bg-white/10 rounded uppercase tracking-wider text-gray-400">{template.style}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    )
}

export default Dashboard
