'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { updateFile, deleteFile } from '@/lib/api'
import { Edit2, Trash2, Save, X, FileIcon, Image, FileText, Film, MoreVertical, Share2,} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from '@/hooks/use-toast'

type FileItemProps = {
  file: { id: string; name: string; url: string; type: string }
  onUpdate: () => void
  onDelete: () => void
  viewMode: 'grid' | 'list'
}

const fileIcons = {
  image: Image,
  document: FileText,
  video: Film,
  default: FileIcon,
}

export default function FileItem({ file, onUpdate, onDelete, viewMode }: FileItemProps) {
  const [editing, setEditing] = useState(false)
  const [newName, setNewName] = useState(file.name)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleUpdate = async () => {
    try {
      await updateFile(file.id, newName)
      setEditing(false)
      onUpdate()
      toast({
        title: "File updated",
        description: "Your file has been successfully renamed.",
        duration: 3000,
      })
    } catch (error) {
      console.error('Update failed:', error)
      toast({
        title: "Update failed",
        description: "There was an error updating your file. Please try again.",
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteFile(file.id)
      onDelete()
      toast({
        title: "File deleted",
        description: "Your file has been successfully deleted.",
        duration: 3000,
      })
    } catch (error) {
      console.error('Delete failed:', error)
      toast({
        title: "Delete failed",
        description: "There was an error deleting your file. Please try again.",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(file.url)
      toast({
        title: "Link copied!",
        description: "The file link has been copied to your clipboard.",
        duration: 3000,
      })
    } catch (error) {
      console.error('Failed to copy link:', error)
      toast({
        title: "Failed to copy link",
        description: "Please try again.",
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  const FileTypeIcon = fileIcons[file.type as keyof typeof fileIcons] || fileIcons.default;


  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`${viewMode === 'grid' ? 'h-full' : ''} overflow-hidden`}>
        <CardContent className={`p-4 ${viewMode === 'grid' ? 'flex flex-col h-full' : 'flex items-center'}`}>
          <motion.div
            className={`flex ${viewMode === 'grid' ? 'flex-col h-full' : 'items-center flex-grow'} justify-between`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`flex ${viewMode === 'grid' ? 'flex-col items-center mb-4' : 'items-center'} space-x-4`}>
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <FileTypeIcon className={`${viewMode === 'grid' ? 'h-16 w-16 mb-2' : 'h-8 w-8'} text-blue-500`} />
              </motion.div>
              <AnimatePresence mode="wait">
                {editing ? (
                  <motion.div
                    key="input"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="max-w-xs text-sm md:text-base"
                    />
                  </motion.div>
                ) : (
                  <motion.a 
                    key="link"
                    href={file.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline text-sm md:text-base font-medium truncate max-w-[150px] md:max-w-xs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {file.name}
                  </motion.a>
                )}
              </AnimatePresence>
            </div>
            <div className={`space-x-2 ${viewMode === 'grid' ? 'mt-auto' : ''} hidden md:flex`}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleShare} size="sm" variant="outline">
                  <Share2 className="h-4 w-4 mr-1" /> Share
                </Button>
              </motion.div>
              <AnimatePresence mode="wait">
                {editing ? (
                  <>
                    <motion.div
                      key="save"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button onClick={handleUpdate} size="sm" variant="outline">
                        <Save className="h-4 w-4 mr-1" /> Save
                      </Button>
                    </motion.div>
                    <motion.div
                      key="cancel"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button onClick={() => setEditing(false)} size="sm" variant="outline">
                        <X className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                    </motion.div>
                  </>
                ) : (
                  <motion.div
                    key="edit"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button onClick={() => setEditing(true)} size="sm" variant="outline">
                      <Edit2 className="h-4 w-4 mr-1" /> Edit
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button onClick={handleDelete} size="sm" variant="destructive" disabled={isDeleting}>
                  {isDeleting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                    </motion.div>
                  ) : (
                    <Trash2 className="h-4 w-4 mr-1" />
                  )}
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
              </motion.div>
            </div>
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" /> Share
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setEditing(!editing)}>
                    {editing ? (
                      <>
                        <X className="h-4 w-4 mr-2" /> Cancel
                      </>
                    ) : (
                      <>
                        <Edit2 className="h-4 w-4 mr-2" /> Edit
                      </>
                    )}
                  </DropdownMenuItem>
                  {editing && (
                    <DropdownMenuItem onClick={handleUpdate}>
                      <Save className="h-4 w-4 mr-2" /> Save
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleDelete} className="text-red-600" disabled={isDeleting}>
                    {isDeleting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                      </motion.div>
                    ) : (
                      <Trash2 className="h-4 w-4 mr-2" />
                    )}
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}