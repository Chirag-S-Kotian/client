'use client'

import { motion, AnimatePresence } from 'framer-motion'
import FileItem from './file-item'
import { Input } from '@/components/ui/input'
import { Search, Loader2 } from 'lucide-react'
import { useState } from 'react'

// Define a specific interface for the file structure
interface File {
  id: string;
  name: string;
  url: string;
  type: string;
}


interface FileListProps {
  files: File[]
  viewMode: 'grid' | 'list'
  isLoading: boolean
  onUpdate: () => void
}

export default function FileList({ files, viewMode, isLoading, onUpdate }: FileListProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8 text-sm md:text-base"
        />
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center h-32"
          >
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </motion.div>
        ) : filteredFiles.length > 0 ? (
          <motion.div
            key="file-list"
            className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
            }}
          >
            {filteredFiles.map((file) => (
              <FileItem
                key={file.id}
                file={file}
                onUpdate={onUpdate}
                onDelete={onUpdate}
                viewMode={viewMode}
              />
            ))}
          </motion.div>
        ) : (
          <motion.p
            key="no-files"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-center text-muted-foreground text-sm md:text-base"
          >
            No files found
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
