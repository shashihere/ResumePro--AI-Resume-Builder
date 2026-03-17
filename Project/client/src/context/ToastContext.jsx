import React, { createContext, useContext, useState, useEffect } from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        // Auto-dismiss after 2 seconds as requested
        setTimeout(() => {
            setToast(null);
        }, 2000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {/* Toast UI Overlay */}
            {toast && (
                <div className="fixed top-24 right-5 z-[9999] animate-slideIn">
                    <div className={`
                        flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border border-white/10 backdrop-blur-md transition-all duration-300
                        ${toast.type === 'success' ? 'bg-green-600/90 text-white' : ''}
                        ${toast.type === 'error' ? 'bg-red-600/90 text-white' : ''}
                        ${toast.type === 'info' ? 'bg-blue-600/90 text-white' : ''}
                    `}>
                        {toast.type === 'success' && <CheckCircle size={24} className="text-white drop-shadow-md" />}
                        {toast.type === 'error' && <XCircle size={24} />}
                        {toast.type === 'info' && <Info size={24} />}
                        <div>
                            <p className="font-bold text-base tracking-wide">{toast.message}</p>
                        </div>
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    );
};
