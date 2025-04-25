'use client'

import { useState } from 'react'
// import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Logo } from '@/components/logo'
// import axiosInstance from '@/lib/axios'
import Link from 'next/link'
import { KeyRound } from 'lucide-react'

interface ResetPasswordError {
  username: string
  wordsecret: string
  newPassword: string
}

interface ResetPasswordFormData {
  username: string
  wordsecret: string
  newPassword: string
}

export default function ForgotPasswordPage() {
  // const router = useRouter()
  const [errors, setErrors] = useState<ResetPasswordError | null>({
    username: '',
    wordsecret: '',
    newPassword: ''
  })

  const handleResetPassword = async(formObj: ResetPasswordFormData) => {
    try {
      const body = {
        username: formObj.username,
        wordsecret: formObj.wordsecret,
        newPassword: formObj.newPassword
      }
      
      //   const res = await axiosInstance.post("/auth/reset-password", body)
        
      //   if (res.status === 200) {
      //     alert("Password reset successful")
      //     router.push('/login')
      //   } else {
      //     alert("Password reset failed")
      //   }
      console.log(body)
    } catch (error) {
      console.log(error)
      alert("Failed to reset password. Please check your details.")
    }
  }

  const validateForm = (formData: Record<string, string>): [boolean, ResetPasswordError] => {
    let isValid = true
    const errors: ResetPasswordError = {
      username: "",
      wordsecret: "",
      newPassword: ""
    }
    
    if (!formData.username.trim()) {
      errors.username = "Username is required"
      isValid = false
    }
  
    if (!formData.wordsecret.trim()) {
      errors.wordsecret = "Word secret is required"
      isValid = false
    } else if (formData.wordsecret.length !== 24) {
      errors.wordsecret = "Word secret must be exactly 24 characters"
      isValid = false
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.wordsecret)) {
      errors.wordsecret = "Word secret must contain only letters and numbers"
      isValid = false
    } else if (!/[a-zA-Z]/.test(formData.wordsecret) || !/[0-9]/.test(formData.wordsecret)) {
      errors.wordsecret = "Word secret must contain a mix of letters and numbers"
      isValid = false
    }
    
    if (!formData.newPassword) {
      errors.newPassword = "New password is required"
      isValid = false
    } else if (formData.newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters"
      isValid = false
    }
    
    return [isValid, errors]
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries()) as Record<string, string>;
    
    const formObj: ResetPasswordFormData = {
      username: formValues.username || '',
      wordsecret: formValues.wordsecret || '',
      newPassword: formValues.newPassword || ''
    };

    const [isValid, validationErrors] = validateForm(formValues)
    if(isValid) {
      handleResetPassword(formObj)
      setErrors(null)
    } else {
      setErrors(validationErrors)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        
        <h1 className="text-2xl font-semibold text-center text-blue-500 mb-8">
          Reset Your Password
        </h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div>
              <label htmlFor="username" className="block text-gray-700 mb-1">
                Username
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                className="w-full px-3 py-5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your username"
              />
              {errors?.username && (
                <p className="mt-1 text-sm text-red-500">{errors.username}</p>
              )}
            </div>
            
            <div className='mb-4 mt-4'>
              <label htmlFor="wordsecret" className="block text-gray-700 mb-1">
                Word Secret
              </label>
              <Input
                id="wordsecret"
                name="wordsecret"
                type="text"
                className="w-full px-3 py-5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your word secret"
              />
              {errors?.wordsecret && (
                <p className="text-red-500 text-xs mt-1">{errors.wordsecret}</p>
              )}
            </div>

            <div className='mb-4 mt-4'>
              <label htmlFor="newPassword" className="block text-gray-700 mb-1">
                New Password
              </label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                className="w-full px-3 py-5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your new password"
              />
              {errors?.newPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
              )}
            </div>

            <div className="mt-6 text-center text-sm text-gray-600 flex justify-end">
              <Link href="/login" className="text-blue-500 hover:underline">
                Back to Login
              </Link>
            </div>
            
            <Button 
              type="submit" 
              className="w-full flex items-center justify-center py-2 px-4 mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white font-large rounded-md transition-opacity"
            >
              <KeyRound className="w-5 h-5 mr-2" />
              Reset Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 