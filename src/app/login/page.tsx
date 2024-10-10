"use client"

import { motion } from 'framer-motion'
import AuthForm from '@/components/auth-form'
import { HardDrive } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 lg:p-8">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:w-1/2 max-w-md mb-8 lg:mb-0 lg:mr-8"
      >
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg mb-6"
          >
            <HardDrive className="w-12 h-12 text-blue-500" />
          </motion.div>
          <motion.h1 
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Welcome Back to CDrive
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Your secure personal cloud storage solution. Log in to access your files from anywhere.
          </motion.p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full lg:w-1/2 max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg p-8">
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
            Log in to your account
          </h2>
          <AuthForm type="login" />
        </div>
      </motion.div>
    </div>
  )
}