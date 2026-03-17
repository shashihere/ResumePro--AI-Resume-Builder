import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { login, reset } from '../redux/authSlice'
import { LogIn } from 'lucide-react'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            if (message === 'Server error') {
                alert('Server Error: Is your local MongoDB running?');
            } else {
                alert(message);
            }
        }

        if (isSuccess || user) {
            if (user.role === 'admin') navigate('/admin');
            else if (user.role === 'recruiter') navigate('/recruiter');
            else navigate('/dashboard');
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(login({ email, password }))
    }

    return (
        <div className="flex justify-center items-center min-h-screen pt-20 px-4">
            <div className="bg-[#F7F7F7] p-10 rounded-2xl w-full max-w-md shadow-2xl relative transform hover:scale-[1.01] transition-transform duration-500" style={{ boxShadow: 'var(--shadow-float)' }}>

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-heading font-bold text-primary mb-2">Welcome Back</h1>
                    <p className="text-gray-500">Sign in to continue your journey</p>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="form-group">
                        <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Address</label>
                        <input
                            type="email"
                            className="input bg-white border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 shadow-inner"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="name@example.com"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
                        <input
                            type="password"
                            className="input bg-white border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 shadow-inner"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="••••••••"
                            onChange={onChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-full text-lg py-4 mt-6" disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Login'} <LogIn size={20} />
                    </button>
                </form>

                <p className="not-italic text-center mt-8 text-gray-500 font-medium">
                    New here? <Link to="/register" className="text-secondary hover:text-yellow-600 font-bold">Create Account</Link>
                </p>
            </div>
        </div>
    )
}

export default Login
