'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { Logo } from '@/components/logo'

export default function LoginPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        
        // Clear error when typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const validateForm = () => {
        let valid = true
        const newErrors = { ...errors }
        
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required'
            valid = false
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required'
            valid = false
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
            valid = false
        }
        
        setErrors(newErrors)
        return valid
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        
        if (validateForm()) {
            // In a real app, you would authenticate the user here
            // For now, we'll just redirect to the wallet page
            router.push('/wallet')
        }
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="flex justify-center mb-6">
                    <Logo />
                </div>
                
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-slate-100 rounded-lg p-6 shadow-lg border border-slate-200"
                >
                    <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 text-transparent bg-clip-text text-center">
                        Login to Your Wallet
                    </h1>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-800 mb-1">
                                    Username
                                </label>
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className={errors.username ? "border-red-500" : "border-gray-300"}
                                    placeholder="Enter your username"
                                />
                                {errors.username && (
                                    <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                                )}
                            </div>
                            
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-1">
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={errors.password ? "border-red-500" : "border-gray-300"}
                                    placeholder="Enter your password"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                                )}
                            </div>
                            
                            <Button 
                                type="submit" 
                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90"
                            >
                                Sign In
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    )
}