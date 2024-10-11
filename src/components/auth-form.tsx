'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { login, register, verifyOTP } from '@/lib/api'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react'

type AuthFormProps = {
  type: 'login' | 'register'
}

export default function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      if (type === 'login') {
        const data = await login(email, password)
        localStorage.setItem('token', data.token)
        setSuccess('Login successful! Redirecting...')
        setTimeout(() => router.push('/dashboard'), 2000)
      } else {
        if (!isOtpSent) {
          await register(email, password)
          setIsOtpSent(true)
          setSuccess('Registration successful! Please check your email for the OTP.')
        } else {
          await verifyOTP(email, otp)
          setSuccess('Email verified successfully! You can now log in.')
          setTimeout(() => router.push('/login'), 2000)
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Authentication failed');
      } else {
        setError('Authentication failed');
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence>
          {!isOtpSent && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 pr-4 py-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-4 py-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </motion.div>
          )}
          {isOtpSent && type === 'register' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  OTP
                </Label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter OTP"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
              role="alert"
            >
              <AlertCircle className="flex-shrink-0 inline w-4 h-4 mr-3" />
              <span className="sr-only">Error</span>
              <div>
                <span className="font-medium">{error}</span>
              </div>
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
              role="alert"
            >
              <CheckCircle className="flex-shrink-0 inline w-4 h-4 mr-3" />
              <span className="sr-only">Success</span>
              <div>
                <span className="font-medium">{success}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <Button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {type === 'login' ? 'Log In' : (isOtpSent ? 'Verify OTP' : 'Register')}
        </Button>
      </form>
      <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
        {type === 'login' ? "Don't have an account?" : "Already have an account?"}
        <Link 
          href={type === 'login' ? '/register' : '/login'}
          className="font-medium text-blue-600 hover:underline dark:text-blue-500 ml-1"
        >
          {type === 'login' ? 'Sign up' : 'Log in'}
        </Link>
      </p>
    </motion.div>
  )
}