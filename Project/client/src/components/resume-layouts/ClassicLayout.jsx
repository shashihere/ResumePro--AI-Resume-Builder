import React from 'react';

// Harvard-Style Classic Layout (Dense, Text-Heavy, Serif Preferred)
const ClassicLayout = ({ data, visualConfig }) => {
    const { personalInfo, experience, education, skills, projects, certifications } = data;
    const accent = '#000000'; // Harvard style is strictly black
    const font = 'font-serif'; // Enforce serif for classic

    // Normalize Skills
    const skillCategories = Array.isArray(skills) && skills.length > 0 && typeof skills[0] === 'string'
        ? [{ category: 'Skills', items: skills }]
        : skills || [];

    return (
        <div className={`w-full min-h-full p-10 bg-white text-black ${font} text-sm leading-snug`} style={{ color: '#000' }}>

            {/* HEADER */}
            <header className="text-center mb-6">
                <h1 className="text-2xl font-bold uppercase tracking-wide mb-2" style={{ color: '#000' }}>{personalInfo.fullName}</h1>
                <div className="flex justify-center flex-wrap gap-x-2 text-[10.5pt] text-black">
                    {personalInfo.address && <span>{personalInfo.address}</span>}
                    {(personalInfo.email || personalInfo.phone) && <span>|</span>}
                    {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>}
                    {personalInfo.phone && <span>| {personalInfo.phone}</span>}
                </div>
                <div className="flex justify-center flex-wrap gap-x-3 text-[10.5pt] text-black mt-1">
                    {personalInfo.linkedin && <a href={personalInfo.linkedin} className="hover:underline" target='_blank' rel='noreferrer'>LinkedIn</a>}
                    {personalInfo.github && <a href={personalInfo.github} className="hover:underline" target='_blank' rel='noreferrer'>GitHub</a>}
                    {personalInfo.website && <a href={personalInfo.website} className="hover:underline" target='_blank' rel='noreferrer'>Portfolio</a>}
                </div>
            </header>

            {/* EDUCATION */}
            {education?.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-sm font-bold uppercase border-b border-black mb-2 pb-0.5 tracking-wider">Education</h2>
                    <div className="space-y-2">
                        {education.map((edu, i) => (
                            <div key={i} className="flex justify-between items-start">
                                <div>
                                    <div className="font-bold text-[11pt]">{edu.school || edu.institution}</div>
                                    <div className="italic text-[11pt]">{edu.degree}</div>
                                </div>
                                <div className="text-right text-[11pt]">
                                    <div className="font-bold">{edu.year}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* CERTIFICATIONS (New) */}
            {certifications?.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-sm font-bold uppercase border-b border-black mb-2 pb-0.5 tracking-wider">Certifications</h2>
                    <div className="space-y-1">
                        {certifications.map((cert, i) => (
                            <div key={i} className="flex justify-between items-start text-[11pt]">
                                <div>
                                    <span className="font-bold">{cert.name}</span>
                                    {cert.issuer && <span className="italic"> — {cert.issuer}</span>}
                                </div>
                                <div className="text-right">
                                    <span>{cert.year}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* SKILLS */}
            {skillCategories?.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-sm font-bold uppercase border-b border-black mb-2 pb-0.5 tracking-wider">Skills</h2>
                    <div className="space-y-1 text-[11pt]">
                        {skillCategories.map((cat, i) => (
                            <div key={i}>
                                <span className="font-bold">{cat.category}: </span>
                                <span>{cat.items?.join(', ')}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* EXPERIENCE */}
            {experience?.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-sm font-bold uppercase border-b border-black mb-2 pb-0.5 tracking-wider">Experience</h2>
                    <div className="space-y-3">
                        {experience.map((exp, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h3 className="font-bold text-[11pt]">{exp.company}</h3>
                                    <span className="text-[11pt] whitespace-nowrap">{exp.duration}</span>
                                </div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="italic text-[11pt]">{exp.title}</span>
                                </div>
                                <p className="text-[10.5pt] text-justify whitespace-pre-line leading-relaxed">
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* PROJECTS */}
            {projects?.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-sm font-bold uppercase border-b border-black mb-2 pb-0.5 tracking-wider">Projects</h2>
                    <div className="space-y-2">
                        {projects.map((proj, i) => (
                            <div key={i}>
                                <div className="flex justify-between font-bold text-[11pt]">
                                    <span>{proj.title}</span>
                                    {proj.link && <a href={proj.link} className="text-black underline font-normal text-[10pt]" target='_blank' rel='noreferrer'>{proj.link}</a>}
                                </div>
                                <p className="text-[10.5pt] leading-relaxed">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ClassicLayout;
