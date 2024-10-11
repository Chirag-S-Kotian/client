'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { uploadFile } from '@/lib/api'
import { Upload, CheckCircle, AlertCircle, Coffee } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

type FileUploadProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUploadComplete: (uploadedFile: any) => void
}

export default function FileUpload({ onUploadComplete }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState('')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const maxFileSize = 10 * 1024 * 1024 // 10MB limit

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!file) {
      setError('Please select a file to upload.')
      return
    }

    if (file.size > maxFileSize) {
      setError('File size exceeds the 10MB limit.')
      return
    }

    setUploading(true)
    try {
      const uploadedFile = await uploadFile(file, name)
      onUploadComplete(uploadedFile)
      setFile(null)
      setName('')
      setSuccess(true)
      toast({
        title: "Upload Successful",
        description: "Your file has been uploaded successfully!",
        duration: 3000,
      })
    } catch (error) {
      setError('Upload failed. Please try again.')
      console.error('Upload failed:', error)
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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
        </AnimatePresence>
        <div>
          <Label htmlFor="file">File</Label>
          <Input
            id="file"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
            className="cursor-pointer"
          />
        </div>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter file name"
          />
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button type="submit" disabled={uploading} className="w-full">
            {uploading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Upload className="mr-2 h-4 w-4" />
              </motion.div>
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        </motion.div>
      </form>
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center justify-between"
          >
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5" />
              <span>File uploaded successfully!</span>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-sm text-green-600 cursor-pointer"
              onClick={() => setSuccess(false)}
            >
              Dismiss
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400"
      >
        <p>Thank you for using CDrive! We hope you&apos;re enjoying our service.</p>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="inline-flex items-center mt-2 text-blue-600 dark:text-blue-400 cursor-pointer"
        >
          <Coffee className="mr-1 h-4 w-4" />
          <a href="https://chirag-blockchian.vercel.app" target="_blank" rel="noopener noreferrer">
          <span>Buy the developer a coffee</span>
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}