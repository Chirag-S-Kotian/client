'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Layout from '@/components/layout'
import FileList from '@/components/file-list'
import FileUpload from '@/components/file-upload'
import { HardDrive, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getFiles } from '@/lib/api'

export default function DashboardPage() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [fileList, setFileList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchFiles = useCallback(async () => {
    setIsLoading(true)
    try {
      const files = await getFiles()
      setFileList(files)
    } catch (error) {
      console.error('Error fetching files:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    fetchFiles()
  }, [router, fetchFiles])

  const handleUploadComplete = useCallback(async () => {
    await fetchFiles() // Refetch all files after a new upload
  }, [fetchFiles])

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <motion.h1
              className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              CDrive Dashboard
            </motion.h1>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              >
                <HardDrive className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Files
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FileUpload onUploadComplete={handleUploadComplete} />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Your Files</CardTitle>
                </CardHeader>
                <CardContent>
                  <FileList 
                    files={fileList} 
                    viewMode={viewMode} 
                    isLoading={isLoading}
                    onUpdate={fetchFiles}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
}