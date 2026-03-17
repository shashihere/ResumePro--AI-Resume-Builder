import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

// Industry-Standard Modern Layout (Dense, Two-Column)
const ModernLayout = ({ data, visualConfig }) => {
    const { personalInfo, experience, education, skills, projects, certifications } = data;
    const accent = visualConfig.accent || '#2563EB';
    const font = visualConfig.font === 'font-sans' ? 'font-sans' : 'font-serif';

    // Normalize Skills
    const skillCategories = Array.isArray(skills) && skills.length > 0 && typeof skills[0] === 'string'
        ? [{ category: 'Key Skills', items: skills }]
        : skills || [];

    return (
        <div className={`w-full min-h-full flex bg-white text-black ${font}`}>
            {/* LEFT SIDEBAR (30%) */}
            <aside className="w-[30%] bg-[#f8f9fa] p-6 flex flex-col gap-6 border-r border-gray-200">

                {/* CONTACT INFO */}
                <div className="space-y-4">
                    <h3 className="font-bold uppercase tracking-widest text-xs text-gray-500 border-b border-gray-300 pb-2 mb-2">Contact</h3>

                    {personalInfo.email && (
                        <div className="flex items-center gap-3 text-sm">
                            <div className="p-1.5 bg-white rounded shadow-sm text-gray-600"><Mail size={12} /></div>
                            <span className="truncate">{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo.phone && (
                        <div className="flex items-center gap-3 text-sm">
                            <div className="p-1.5 bg-white rounded shadow-sm text-gray-600"><Phone size={12} /></div>
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {personalInfo.address && (
                        <div className="flex items-center gap-3 text-sm">
                            <div className="p-1.5 bg-white rounded shadow-sm text-gray-600"><MapPin size={12} /></div>
                            <span>{personalInfo.address}</span>
                        </div>
                    )}
                    {personalInfo.linkedin && (
                        <div className="flex items-center gap-3 text-sm">
                            <div className="p-1.5 bg-white rounded shadow-sm text-gray-600"><Linkedin size={12} /></div>
                            <span className="truncate">{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
                        </div>
                    )}
                    {personalInfo.github && (
                        <div className="flex items-center gap-3 text-sm">
                            <div className="p-1.5 bg-white rounded shadow-sm text-gray-600"><Github size={12} /></div>
                            <span className="truncate">{personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>
                        </div>
                    )}
                    {personalInfo.website && (
                        <div className="flex items-center gap-3 text-sm">
                            <div className="p-1.5 bg-white rounded shadow-sm text-gray-600"><Globe size={12} /></div>
                            <span className="truncate">{personalInfo.website.replace(/^https?:\/\//, '')}</span>
                        </div>
                    )}
                </div>

                {/* EDUCATION (Sidebar as requested) */}
                {education?.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="font-bold uppercase tracking-widest text-xs text-gray-500 border-b border-gray-300 pb-2 mb-2">Education</h3>
                        {education.map((edu, i) => (
                            <div key={i} className="text-sm">
                                <div className="font-bold text-gray-900 leading-tight">{edu.school || edu.institution}</div>
                                <div className="text-xs text-gray-600 font-medium mb-1">{edu.degree}</div>
                                <div className="text-xs text-gray-400">{edu.year}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* CERTIFICATIONS (Sidebar as requested) */}
                {certifications?.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="font-bold uppercase tracking-widest text-xs text-gray-500 border-b border-gray-300 pb-2 mb-2">Certifications</h3>
                        {certifications.map((cert, i) => (
                            <div key={i} className="text-sm">
                                <div className="font-bold text-gray-900 leading-tight text-xs">{cert.name}</div>
                                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                                    <span>{cert.issuer}</span>
                                    <span>{cert.year}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* SKILLS (Categorized) */}
                {skillCategories?.length > 0 && (
                    <div className="flex-1 space-y-4">
                        {skillCategories.map((cat, i) => (
                            <div key={i}>
                                <h3 className="font-bold uppercase tracking-widest text-[10px] text-gray-500 border-b border-gray-300 pb-1 mb-2">{cat.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {cat.items && cat.items.map((skill, j) => (
                                        <span key={j} className="bg-white border border-gray-200 px-2 py-0.5 rounded text-[10px] font-semibold text-gray-700 shadow-sm block w-full">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </aside>

            {/* RIGHT MAIN CONTENT (70%) */}
            <main className="w-[70%] p-8 pt-10">
                {/* HEADER */}
                <header className="mb-8 pb-6 border-b-2 border-gray-100" style={{ borderColor: accent }}>
                    <h1 className="text-4xl font-extrabold uppercase tracking-tight leading-none mb-2" style={{ color: accent }}>
                        {personalInfo.fullName}
                    </h1>
                    <p className="text-lg font-medium text-gray-500 tracking-wide uppercase">{personalInfo.title}</p>
                </header>

                {/* SUMMARY */}
                {personalInfo.summary && (
                    <section className="mb-8">
                        <h2 className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm mb-3 text-gray-400">
                            Profile
                        </h2>
                        <p className="text-sm text-gray-700 leading-relaxed text-justify">
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* EXPERIENCE */}
                {experience?.length > 0 && (
                    <section className="mb-8">
                        <h2 className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm mb-5 text-gray-400">
                            Professional Experience
                        </h2>
                        <div className="space-y-6">
                            {experience.map((exp, i) => (
                                <div key={i} className="relative pl-4 border-l-2 border-gray-200">
                                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gray-300"></div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-base text-gray-900">{exp.title}</h3>
                                        <span className="text-xs font-bold text-gray-500">{exp.duration}</span>
                                    </div>
                                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2" style={{ color: accent }}>{exp.company}</div>
                                    <p className="text-sm text-gray-700 w-full whitespace-pre-line leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* PROJECTS */}
                {projects?.length > 0 && (
                    <section>
                        <h2 className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm mb-5 text-gray-400">
                            Key Projects
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                            {projects.map((proj, i) => (
                                <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-bold text-sm text-gray-900">{proj.title}</h3>
                                        {proj.link && <span className="text-xs text-blue-500 underline truncate max-w-[150px]">{proj.link}</span>}
                                    </div>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {proj.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default ModernLayout;
