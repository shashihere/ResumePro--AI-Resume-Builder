import { useState } from 'react'
import { Users, Briefcase, TrendingUp, Search, Bell, Settings, LogOut, CheckCircle, Clock, XCircle, Star, Filter, Download, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function RecruiterDashboard() {
    const { user } = useSelector((state) => state.auth)
    const [activeTab, setActiveTab] = useState('overview') // overview | talent | jobs

    // MOCK DATA - "Grand" quality
    const stats = [
        { title: 'Total Candidates', value: '1,248', change: '+12%', icon: Users, color: 'from-blue-500 to-indigo-600' },
        { title: 'Active Jobs', value: '14', change: '+2', icon: Briefcase, color: 'from-emerald-500 to-teal-600' },
        { title: 'Interviews Set', value: '38', change: 'This Week', icon: Clock, color: 'from-amber-500 to-orange-600' },
        { title: 'Hiring Rate', value: '85%', change: '+5%', icon: TrendingUp, color: 'from-purple-500 to-pink-600' },
    ]

    const candidates = [
        { id: 1, name: 'Sarah Jenkins', role: 'Senior UX Designer', exp: '7 Yrs', match: 98, skills: ['Figma', 'React', 'Prototyping'], status: 'New', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop' },
        { id: 2, name: 'Michael Chen', role: 'Full Stack Engineer', exp: '5 Yrs', match: 94, skills: ['Node.js', 'PostgreSQL', 'AWS'], status: 'Interview', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop' },
        { id: 3, name: 'Emily Davis', role: 'Product Manager', exp: '9 Yrs', match: 89, skills: ['Agile', 'Strategy', 'Jira'], status: 'Shortlisted', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop' },
        { id: 4, name: 'David Kim', role: 'DevOps Engineer', exp: '6 Yrs', match: 92, skills: ['Docker', 'Kubernetes', 'CI/CD'], status: 'New', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop' },
        { id: 5, name: 'Jessica Lee', role: 'Marketing Lead', exp: '8 Yrs', match: 85, skills: ['SEO', 'Content', 'Analytics'], status: 'Review', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop' },
        { id: 6, name: 'Robert Wilson', role: 'Frontend Developer', exp: '4 Yrs', match: 78, skills: ['Vue.js', 'Tailwind', 'TS'], status: 'Rejected', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop' },
    ]

    const activeJobs = [
        { id: 1, title: 'Senior UX Designer', dept: 'Design', applicants: 45, status: 'Active', posted: '2 days ago' },
        { id: 2, title: 'Backend Lead', dept: 'Engineering', applicants: 12, status: 'Urgent', posted: '5 days ago' },
        { id: 3, title: 'Product Owner', dept: 'Product', applicants: 28, status: 'Active', posted: '1 week ago' },
    ]

    return (
        <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-secondary selection:text-black pb-20">
            {/* GRADIENT BACKGROUND BLOB */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

            {/* HEADER */}
            <div className="pt-24 pb-8 px-8 container mx-auto flex justify-between items-end border-b border-white/5">
                <div>
                    <h1 className="text-4xl font-heading font-bold mb-2">
                        Welcome back, <span className="text-secondary">{user?.name || 'Recruiter'}</span>
                    </h1>
                    <p className="text-gray-400">Here's what's happening in your hiriing pipeline today.</p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition">
                        <Settings size={18} /> Settings
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-secondary text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(255,195,0,0.3)] transition transform hover:-translate-y-0.5">
                        <Plus size={18} /> Post New Job
                    </button>
                </div>
            </div>

            {/* STATS GRID */}
            <div className="container mx-auto px-8 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="relative overflow-hidden p-6 bg-[#1e293b]/60 backdrop-blur-xl border border-white/5 rounded-2xl hover:border-white/10 transition group">
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition`}></div>
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                                <stat.icon size={24} />
                            </div>
                            <span className={`text-sm font-bold ${stat.change.includes('+') ? 'text-green-400' : 'text-gray-400'}`}>{stat.change}</span>
                        </div>
                        <h3 className="text-3xl font-bold font-heading mb-1">{stat.value}</h3>
                        <p className="text-gray-400 text-sm">{stat.title}</p>
                    </div>
                ))}
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="container mx-auto px-8 mt-12 grid grid-cols-12 gap-8">

                {/* LEFT COL: TALENT POOL (8 Cols) */}
                <div className="col-span-12 lg:col-span-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold font-heading flex items-center gap-2">
                            <Users size={24} className="text-secondary" /> Top Talent Pool
                        </h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input type="text" placeholder="Search skills, roles..." className="pl-10 pr-4 py-2 bg-black/20 border border-white/10 rounded-lg text-sm focus:border-secondary outline-none w-64 transition cursor-not-allowed" disabled />
                        </div>
                    </div>

                    <div className="space-y-4">
                        {candidates.map((c) => (
                            <div key={c.id} className="group p-5 bg-[#1e293b]/40 border border-white/5 rounded-2xl hover:bg-[#1e293b] hover:border-secondary/20 transition-all duration-300 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <img src={c.img} alt={c.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-white/10 group-hover:border-secondary/50 transition-colors" />
                                    <div>
                                        <h3 className="font-bold text-lg text-white group-hover:text-secondary transition-colors">{c.name}</h3>
                                        <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                                            <span>{c.role}</span>
                                            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                            <span>{c.exp} Exp</span>
                                        </div>
                                        <div className="flex gap-2">
                                            {c.skills.map((s, i) => (
                                                <span key={i} className="text-xs px-2 py-0.5 bg-white/5 rounded border border-white/5 text-gray-300">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-3">
                                    <div className="flex items-center gap-2">
                                        <div className="text-right">
                                            <span className="block text-2xl font-bold font-heading text-secondary">{c.match}%</span>
                                            <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Match</span>
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-4 border-[#1e293b] justify-center items-center flex" style={{
                                            background: `conic-gradient(#FFC300 ${c.match}%, #334155 0)`
                                        }}>
                                            <div className="w-8 h-8 bg-[#1e293b] rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                                        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/20 text-white" title="View Profile"><Download size={18} /></button>
                                        <button className="p-2 rounded-lg bg-secondary/10 hover:bg-secondary text-secondary hover:text-black transition-colors" title="Contact Candidate"><MessageSquare size={18} /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT COL: ACTIVE JOBS (4 Cols) */}
                <div className="col-span-12 lg:col-span-4 space-y-8">

                    {/* Active Jobs Widget */}
                    <div className="p-6 bg-[#1e293b]/60 border border-white/5 rounded-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold font-heading">Active Requisitions</h2>
                            <Link to="#" className="text-xs text-secondary hover:underline">View All</Link>
                        </div>
                        <div className="space-y-4">
                            {activeJobs.map(job => (
                                <div key={job.id} className="p-4 bg-black/20 rounded-xl border-l-4 border-secondary">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold">{job.title}</h4>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${job.status === 'Urgent' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>{job.status}</span>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-3">{job.dept} • {job.posted}</p>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-white font-bold">{job.applicants} Applicants</span>
                                        <button className="text-gray-400 hover:text-white transition-colors"><Settings size={14} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 py-3 border border-dashed border-gray-600 rounded-xl text-gray-400 hover:text-white hover:border-gray-400 transition-colors flex justify-center items-center gap-2">
                            <Plus size={16} /> Create Job Post
                        </button>
                    </div>

                    {/* Quick Actions / Tips */}
                    <div className="p-6 bg-gradient-to-br from-secondary/20 to-transparent border border-secondary/20 rounded-2xl">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-secondary text-black rounded-lg"><Star size={20} /></div>
                            <h3 className="font-bold text-lg text-secondary">Pro Tip</h3>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            Candidates with detailed "Project" sections have a 40% higher success rate in technical interviews. Filter your search by "Has Portfolio" to find them quicker.
                        </p>
                    </div>

                </div>

            </div>
        </div>
    )
}

function Plus({ size }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
}

export default RecruiterDashboard
