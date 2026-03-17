import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../redux/authSlice'
import { FileText, LogOut, User } from 'lucide-react'

function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    const getDashboardLink = () => {
        if (!user) return '/';
        if (user.role === 'admin') return '/admin';
        if (user.role === 'recruiter') return '/recruiter';
        return '/dashboard';
    }

    return (
        <header className="fixed top-0 w-full z-50 bg-primary/80 backdrop-blur-md border-b border-white/5">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-secondary p-2 rounded-lg group-hover:shadow-glow transition-all">
                        <FileText size={24} className="text-primary" />
                    </div>
                    <span className="text-2xl font-heading font-bold text-white tracking-tight">
                        Resume<span className="text-secondary">Pro</span>
                    </span>
                </Link>

                {/* Navigation */}
                <nav>
                    <ul className="flex items-center gap-8">
                        {/* Back Button for Sub-pages */}
                        {user && location.pathname !== '/dashboard' && location.pathname !== '/' && (
                            <li>
                                <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
                                    &larr; Back
                                </button>
                            </li>
                        )}

                        {user ? (
                            <>
                                <li>
                                    <Link to="/features" className="text-gray-300 hover:text-white font-medium transition-colors">Introduction</Link>
                                </li>
                                <li>
                                    <Link
                                        to={getDashboardLink()}
                                        className="text-gray-300 hover:text-white font-medium transition-colors relative group py-2"
                                    >
                                        Career Hub
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
                                    </Link>
                                </li>
                                {user.role === 'jobseeker' && (
                                    <li>
                                        <Link to="/builder" className="text-gray-300 hover:text-white font-medium transition-colors">Builder</Link>
                                    </li>
                                )}

                                {/* Role Badge */}
                                <li className="px-3 py-1 bg-white/10 rounded-full border border-white/10">
                                    <span className="text-xs font-bold text-secondary uppercase tracking-wider">{user.role}</span>
                                </li>

                                <li>
                                    <button
                                        onClick={onLogout}
                                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                                        title="Logout"
                                    >
                                        <LogOut size={20} />
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/features" className="text-gray-300 hover:text-white font-medium transition-colors">Introduction</Link>
                                </li>
                                <li>
                                    <Link
                                        to="/login"
                                        className={location.pathname === '/login'
                                            ? "btn btn-primary px-6 py-2 rounded-full shadow-lg hover:shadow-glow"
                                            : "text-gray-300 hover:text-white font-medium transition-colors"
                                        }
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/register"
                                        className={location.pathname === '/register'
                                            ? "btn btn-primary px-6 py-2 rounded-full shadow-lg hover:shadow-glow"
                                            : "text-gray-300 hover:text-white font-medium transition-colors"
                                        }
                                    >
                                        Get Started
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar
