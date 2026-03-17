import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Shield, Zap, Layout, Download, TrendingUp, Users, Target, Search, Briefcase, Award, CheckCircle } from 'lucide-react'

function Features() {
    const [activeRole, setActiveRole] = useState('seeker') // seeker | recruiter | coach

    return (
        <div className="min-h-screen bg-[#0f172a] text-white pt-24 pb-20 font-sans selection:bg-secondary selection:text-black">

            {/* HERO */}
            <div className="container mx-auto px-6 text-center mb-16">
                <h1 className="text-5xl lg:text-6xl font-heading font-bold mb-6 animate-fadeIn">
                    The Ultimate <span className="text-secondary">Career Ecosystem</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                    Whether you're building your future, finding the next unicorn talent, or guiding others to success,
                    ResumePro provides the industry-grade tools you need to succeed.
                </p>

                {/* ROLE TABS */}
                <div className="flex justify-center gap-4 mb-12">
                    {[
                        { id: 'seeker', label: 'For Job Seekers', icon: FileText },
                        { id: 'recruiter', label: 'For Recruiters', icon: Users },
                        { id: 'coach', label: 'For Job Coaches', icon: Award }
                    ].map(role => (
                        <button
                            key={role.id}
                            onClick={() => setActiveRole(role.id)}
                            className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:-translate-y-1 ${activeRole === role.id
                                    ? 'bg-secondary text-black shadow-[0_0_20px_#FFC300]'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <role.icon size={20} /> {role.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* CONTENT SECTIONS */}
            <div className="container mx-auto px-6 max-w-6xl">

                {/* JOB SEEKER SECTION */}
                {activeRole === 'seeker' && (
                    <div className="animate-slideUp space-y-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <h2 className="text-4xl font-heading font-bold">Build Your Legacy. <br /><span className="text-blue-400">Not Just a Resume.</span></h2>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    Our visual builder empowers you to create ATS-optimized, designer-quality resumes in minutes.
                                    Stop fighting with formatting and start applying with confidence.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "Real-time Drag & Drop Builder",
                                        "ATS-Optimized Templates (Fortune 500 Ready)",
                                        "Smart Analytics & Profile Strength",
                                        "Application Tracking System"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-lg font-medium">
                                            <CheckCircle className="text-green-400" size={24} /> {item}
                                        </li>
                                    ))}
                                </ul>
                                <div className="pt-4">
                                    <Link to="/register" className="px-8 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-lg transition inline-flex items-center gap-2">
                                        Start Building Free <ArrowIcon />
                                    </Link>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full"></div>
                                <div className="relative bg-[#1e293b] border border-white/10 p-6 rounded-2xl shadow-2xl rotate-2 hover:rotate-0 transition duration-500">
                                    <div className="flex gap-4 mb-4">
                                        <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
                                        <div className="space-y-2">
                                            <div className="w-48 h-4 bg-gray-700 rounded"></div>
                                            <div className="w-32 h-4 bg-gray-700 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="w-full h-4 bg-gray-800 rounded"></div>
                                        <div className="w-full h-4 bg-gray-800 rounded"></div>
                                        <div className="w-2/3 h-4 bg-gray-800 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { t: "Template Library", d: "Choose from dozens of styles.", i: Layout },
                                { t: "PDF Export", d: "High-resolution, print-ready files.", i: Download },
                                { t: "Live Preview", d: "See changes instantly.", i: Zap }
                            ].map((c, i) => (
                                <div key={i} className="p-6 bg-white/5 rounded-xl border border-white/5 hover:border-blue-500/30 transition">
                                    <c.i className="text-blue-400 mb-4" size={32} />
                                    <h3 className="text-xl font-bold mb-2">{c.t}</h3>
                                    <p className="text-gray-400">{c.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                {/* RECRUITER SECTION */}
                {activeRole === 'recruiter' && (
                    <div className="animate-slideUp space-y-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1 relative">
                                <div className="absolute inset-0 bg-secondary/20 blur-[100px] rounded-full"></div>
                                <div className="relative bg-[#1e293b] border border-white/10 p-6 rounded-2xl shadow-2xl -rotate-1 hover:rotate-0 transition duration-500">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg">
                                            <span className="font-bold text-gray-300">Candidates</span>
                                            <span className="text-secondary font-bold">1,240</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg">
                                            <span className="font-bold text-gray-300">Open Roles</span>
                                            <span className="text-blue-400 font-bold">8</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg">
                                            <span className="font-bold text-gray-300">Interviews</span>
                                            <span className="text-green-400 font-bold">12</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 md:order-2 space-y-6">
                                <h2 className="text-4xl font-heading font-bold">Find Top Talent. <br /><span className="text-secondary">Faster than Ever.</span></h2>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    Streamline your hiring pipeline with our advanced applicant tracking and candidate management dashboard.
                                    Identify the perfect match with AI-driven insights.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "Centralized Candidate Pool",
                                        "Direct Resume Access",
                                        "Job Requisition Management",
                                        "Match Score Technology"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-lg font-medium">
                                            <CheckCircle className="text-secondary" size={24} /> {item}
                                        </li>
                                    ))}
                                </ul>
                                <div className="pt-4">
                                    <Link to="/register" className="px-8 py-3 bg-secondary text-black font-bold rounded-lg transition inline-flex items-center gap-2">
                                        Access Recruiter Portal <ArrowIcon />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* COACH SECTION */}
                {activeRole === 'coach' && (
                    <div className="animate-slideUp text-center max-w-4xl mx-auto space-y-12">
                        <div className="inline-block p-4 rounded-full bg-purple-500/10 mb-4">
                            <Award size={48} className="text-purple-400" />
                        </div>
                        <h2 className="text-4xl font-heading font-bold">Empower Your Clients</h2>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Give your clients the competitive edge they need. Manage multiple profiles, track progress,
                            and provide direct feedback on their resumes—all from one dedicated dashboard.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                            {[
                                { t: "Client Management", d: "Track multiple job seekers in one view." },
                                { t: "Direct Editing", d: "Make suggestions directly on their drafts." },
                                { t: "Progress Tracking", d: "See when they apply and interview." }
                            ].map((c, i) => (
                                <div key={i} className="p-8 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/20 rounded-2xl">
                                    <h3 className="text-xl font-bold mb-3 text-purple-300">{c.t}</h3>
                                    <p className="text-gray-400">{c.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

function ArrowIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
    )
}

export default Features
