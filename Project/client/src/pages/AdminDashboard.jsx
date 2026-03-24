import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Check, Shield, FileText, AlertCircle } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function AdminDashboard() {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    const [users, setUsers] = useState([])
    const [logs, setLogs] = useState([])

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login')
            return;
        }

        const fetchData = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` }
                }
                const userRes = await axios.get(`${API_URL}/api/admin/users`, config)
                setUsers(userRes.data)

                const logRes = await axios.get(`${API_URL}/api/admin/logs`, config)
                setLogs(logRes.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [user, navigate])

    const validateUser = async (id) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            }
            await axios.put(`${API_URL}/api/admin/validate/${id}`, {}, config)
            setUsers(users.map(u => u._id === id ? { ...u, isVerified: true } : u))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="container mx-auto px-6 pt-24 pb-20">
            <div className="mb-12">
                <h1 className="text-4xl font-heading font-extrabold text-white mb-2">Admin Console</h1>
                <p className="text-gray-400">Manage user validations and audit system logs.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Validation Queue */}
                <div className="card h-fit">
                    <div className="flex items-center gap-3 mb-6 p-4 border-b border-white/10">
                        <Shield className="text-secondary" />
                        <h2 className="text-xl font-bold text-white">Validation Queue</h2>
                    </div>

                    <div className="space-y-4 px-4 pb-4">
                        {users.filter(u => (u.role === 'recruiter' || u.role === 'jobcoach') && !u.isVerified).length === 0 && (
                            <div className="p-8 text-center text-gray-500 bg-black/20 rounded-xl">
                                <Check size={48} className="mx-auto mb-2 opacity-20" />
                                <p>All professionals verified.</p>
                            </div>
                        )}
                        {users.filter(u => (u.role === 'recruiter' || u.role === 'jobcoach') && !u.isVerified).map(user => (
                            <div key={user._id} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                                <div>
                                    <p className="font-bold text-white text-lg">{user.name}</p>
                                    <p className="text-sm text-gray-400">{user.email}</p>
                                    <span className="inline-block mt-2 text-xs font-bold px-2 py-1 bg-secondary/20 text-secondary rounded uppercase">{user.role}</span>
                                </div>
                                <button
                                    onClick={() => validateUser(user._id)}
                                    className="btn btn-primary text-sm shadow-none"
                                >
                                    Verify
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Audit Logs */}
                <div className="card h-fit">
                    <div className="flex items-center gap-3 mb-6 p-4 border-b border-white/10">
                        <FileText className="text-blue-400" />
                        <h2 className="text-xl font-bold text-white">System Logs</h2>
                    </div>
                    <div className="space-y-2 px-4 pb-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
                        {logs.map(log => (
                            <div key={log._id} className="text-sm border-b border-white/5 py-3 flex gap-4">
                                <span className="font-mono text-xs text-gray-500 whitespace-nowrap">{new Date(log.createdAt).toLocaleTimeString()}</span>
                                <div>
                                    <span className={`font-bold ${log.action.includes('fail') ? 'text-red-400' : 'text-green-400'}`}>{log.action}</span>
                                    <p className="text-gray-400 mt-1 break-all">{JSON.stringify(log.details)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
