import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { register, reset } from '../redux/authSlice'
import { UserPlus } from 'lucide-react'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'jobseeker'
    })

    const { name, email, password, confirmPassword, role } = formData

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

        if (password !== confirmPassword) {
            alert('Passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password,
                role
            }
            dispatch(register(userData))
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen pt-20 px-4 pb-12">
            <div className="bg-[#F7F7F7] p-10 rounded-2xl w-full max-w-lg shadow-2xl relative" style={{ boxShadow: 'var(--shadow-float)' }}>

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-heading font-bold text-primary mb-2">Join ResumePro</h1>
                    <p className="text-gray-500">Create your professional profile today</p>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="form-group">
                        <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Full Name</label>
                        <input
                            type="text"
                            className="input bg-white border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 shadow-inner"
                            id="name"
                            name="name"
                            value={name}
                            placeholder="John Doe"
                            onChange={onChange}
                        />
                    </div>
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
                        <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">I am a...</label>
                        <select name="role" value={role} onChange={onChange} className="input bg-white border border-gray-200 cursor-pointer">
                            <option value="jobseeker">Job Seeker</option>
                            <option value="recruiter">Recruiter</option>
                            <option value="jobcoach">Job Coach</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
                            <input
                                type="password"
                                className="input bg-white border border-gray-200"
                                id="password"
                                name="password"
                                value={password}
                                placeholder="••••••••"
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Confirm</label>
                            <input
                                type="password"
                                className="input bg-white border border-gray-200"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                placeholder="••••••••"
                                onChange={onChange}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-full text-lg py-4 mt-8" disabled={isLoading}>
                        {isLoading ? 'Creating Account...' : 'Get Started'} <UserPlus size={20} />
                    </button>
                </form>

                <p className="not-italic text-center mt-8 text-gray-500 font-medium">
                    Already have an account? <Link to="/login" className="text-secondary hover:text-yellow-600 font-bold">Login</Link>
                </p>

            </div>
        </div>
    )
}

export default Register
