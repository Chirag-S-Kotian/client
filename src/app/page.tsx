"use client"

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { HardDrive, Lock, Share2, Twitter, Linkedin, Github, Globe, FileType, Upload } from 'lucide-react'
import { useTheme } from 'next-themes'

const MotionDiv = dynamic(() => import('framer-motion').then((mod) => mod.motion.div), { ssr: false })
const MotionLink = dynamic(() => import('framer-motion').then((mod) => mod.motion(Link)), { ssr: false })

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <MotionDiv
      className={`min-h-screen flex flex-col ${isDark ? 'bg-gray-900' : 'bg-gradient-to-b from-blue-50 to-white'} text-gray-900 dark:text-gray-100`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <header className="w-full flex justify-between items-center p-4 md:p-6 fixed top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">CDrive</Link>
        </MotionDiv>
        <nav className="flex items-center space-x-4">
          <ThemeToggle />
          <MotionLink href="/login" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="ghost" size="sm">Login</Button>
          </MotionLink>
          <MotionLink href="/register"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="sm">Register</Button>
          </MotionLink>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-20">
        <MotionDiv
          ref={targetRef}
          className="text-center max-w-4xl mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <MotionDiv
            className="text-4xl md:text-6xl font-bold mt-4 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            Welcome to CDrive
          </MotionDiv>
          <MotionDiv
            className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Your secure personal cloud storage solution for the modern age
          </MotionDiv>
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <MotionLink href="/register"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Started Now
              </Button>
            </MotionLink>
          </MotionDiv>
        </MotionDiv>

        <MotionDiv
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, staggerChildren: 0.2 }}
        >
          <FeatureCard
            icon={<HardDrive className="h-12 w-12 mb-4 text-blue-500" />}
            title="Ample Storage"
            description="Store all your important files with generous storage limits up to 10MB per file."
          />
          <FeatureCard
            icon={<Lock className="h-12 w-12 mb-4 text-green-500" />}
            title="Secure"
            description="Your files are encrypted and protected with state-of-the-art security measures."
          />
          <FeatureCard
            icon={<Share2 className="h-12 w-12 mb-4 text-purple-500" />}
            title="Easy Sharing"
            description="Share files and folders with friends and colleagues effortlessly."
          />
        </MotionDiv>

        <MotionDiv
          className="w-full max-w-4xl mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Supported File Types</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <FileTypeCard type="JPEG" icon={<FileType className="h-8 w-8 text-blue-500" />} />
            <FileTypeCard type="PNG" icon={<FileType className="h-8 w-8 text-green-500" />} />
            <FileTypeCard type="PDF" icon={<FileType className="h-8 w-8 text-red-500" />} />
            <FileTypeCard type="DOCX" icon={<FileType className="h-8 w-8 text-purple-500" />} />
          </div>
        </MotionDiv>

        <MotionDiv
          className="w-full max-w-4xl mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
          <ol className="list-decimal list-inside space-y-4">
            <li className="text-lg">Sign up for a free account</li>
            <li className="text-lg">Upload your files (up to 10MB each)</li>
            <li className="text-lg">Access your files from anywhere, anytime</li>
            <li className="text-lg">Share files securely with others</li>
          </ol>
        </MotionDiv>

        <MotionDiv
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <MotionLink href="/register"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white">
              <Upload className="mr-2 h-5 w-5" />
              Start Uploading Now
            </Button>
          </MotionLink>
        </MotionDiv>
      </main>

      <footer className="w-full bg-gray-100 dark:bg-gray-800 py-8 mt-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
              © 2024 CDrive. All rights reserved. Made By Chirag S Kotian 🐦‍🔥.
            </div>
            <div className="flex space-x-4">
              <SocialIcon href="https://twitter.com/Chirag_S_kotian" icon={<Twitter />} />
              <SocialIcon href="https://www.linkedin.com/in/Chirag-S-Kotian" icon={<Linkedin />} />
              <SocialIcon href="https://github.com/Chirag-S-Kotian" icon={<Github />} />
              <SocialIcon href="https://chirag-blockchian.vercel.app" icon={<Globe />} />
            </div>
          </div>
        </div>
      </footer>
    </MotionDiv>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <MotionDiv
      className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg text-center"
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      <MotionDiv
        initial={{ rotateY: 0 }}
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.8 }}
      >
        {icon}
      </MotionDiv>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </MotionDiv>
  )
}

function FileTypeCard({ type, icon }: { type: string, icon: React.ReactNode }) {
  return (
    <MotionDiv
      className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md text-center"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <MotionDiv
        initial={{ rotate: 0 }}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.8 }}
      >
        {icon}
      </MotionDiv>
      <p className="mt-2 font-semibold">{type}</p>
    </MotionDiv>
  )
}

function SocialIcon({ href, icon }: { href: string, icon: React.ReactNode }) {
  return (
    <MotionDiv
      whileHover={{ scale: 1.2, rotate: 15 }}
      whileTap={{ scale: 0.8 }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
      >
        {icon}
      </a>
    </MotionDiv>
  )
}
