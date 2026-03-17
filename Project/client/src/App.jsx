import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import AdminDashboard from './pages/AdminDashboard'
import RecruiterDashboard from './pages/RecruiterDashboard'

import Features from './pages/Features'

import { ToastProvider } from './context/ToastContext';

function App() {
    useEffect(() => {
        // Connect to backend
        const socket = io('http://localhost:5000')

        socket.on('connect', () => {
            console.log('Connected to socket server with ID:', socket.id)
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    return (
        <ToastProvider>
            <Router>
                <div className="container-main">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/features" element={<Features />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/recruiter" element={<RecruiterDashboard />} />
                        <Route path="/builder" element={<ResumeBuilder />} />
                    </Routes>
                </div>
            </Router>
        </ToastProvider>
    )
}

export default App
