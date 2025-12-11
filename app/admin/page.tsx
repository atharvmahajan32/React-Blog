"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { getPosts, createPost, updatePost, deletePost, getReasons, deleteReason, type Post, type Reason } from "@/lib/api"
import { Pencil, Trash2, Plus, LogOut, MessageSquare } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([])
  const [reasons, setReasons] = useState<Reason[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isDeleteReasonOpen, setIsDeleteReasonOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [selectedReason, setSelectedReason] = useState<Reason | null>(null)
  const [formData, setFormData] = useState({ title: "", content: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { isAdmin, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Protect admin route
  useEffect(() => {
    if (!isAdmin) {
      router.push("/")
    }
  }, [isAdmin, router])

  // Fetch posts and reasons
  useEffect(() => {
    async function fetchData() {
      try {
        const [postsData, reasonsData] = await Promise.all([
          getPosts(),
          getReasons()
        ])
        setPosts(postsData)
        setReasons(reasonsData)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (isAdmin) {
      fetchData()
    }
  }, [isAdmin, toast])

  const handleCreate = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const newPost = await createPost(formData.title, formData.content)
      setPosts([newPost, ...posts])
      setIsCreateOpen(false)
      setFormData({ title: "", content: "" })
      toast({
        title: "Success",
        description: "Post created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create post",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = async () => {
    if (!selectedPost || !formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const updatedPost = await updatePost(selectedPost.id, formData)
      setPosts(posts.map((p) => (p.id === selectedPost.id ? updatedPost : p)))
      setIsEditOpen(false)
      setSelectedPost(null)
      setFormData({ title: "", content: "" })
      toast({
        title: "Success",
        description: "Post updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update post",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedPost) return

    setIsSubmitting(true)
    try {
      await deletePost(selectedPost.id)
      setPosts(posts.filter((p) => p.id !== selectedPost.id))
      setIsDeleteOpen(false)
      setSelectedPost(null)
      toast({
        title: "Success",
        description: "Post deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete post",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteReason = async () => {
    if (!selectedReason) return

    setIsSubmitting(true)
    try {
      await deleteReason(selectedReason.id)
      setReasons(reasons.filter((r) => r.id !== selectedReason.id))
      setIsDeleteReasonOpen(false)
      setSelectedReason(null)
      toast({
        title: "Success",
        description: "Reason deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete reason",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const openEditDialog = (post: Post) => {
    setSelectedPost(post)
    setFormData({ title: post.title, content: post.content })
    setIsEditOpen(true)
  }

  const openDeleteDialog = (post: Post) => {
    setSelectedPost(post)
    setIsDeleteOpen(true)
  }

  const openDeleteReasonDialog = (reason: Reason) => {
    setSelectedReason(reason)
    setIsDeleteReasonOpen(true)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5F0] to-[#EEEEE8]">
      {/* Header */}
      <header className="bg-[#F5F5F0]/80 backdrop-blur-md border-b border-[#E5E5E0] sticky top-0 z-50">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <Link href="/home" className="group transition-all duration-300 hover:scale-105">
              <Image src="/favicon.png" alt="Atharv's Weekly Journal" width={40} height={40} />
            </Link>
            <div className="flex items-center gap-4">
              <span className="font-sans text-sm text-gray-500 bg-white/50 px-3 py-1 rounded-full border border-[#E5E5E0]">
                Admin Dashboard
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="group border-black/20 text-black hover:bg-black hover:text-white hover:border-black bg-white/50 rounded-full transition-all duration-300"
              >
                <LogOut className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          {/* Title and Create Button */}
          <div className="flex items-center justify-between mb-10 animate-fade-in">
            <div>
              <h1 className="font-serif text-4xl font-bold text-black mb-2">Manage Posts</h1>
              <p className="font-sans text-gray-500">Create, edit, and manage your blog content</p>
            </div>
            <Button
              onClick={() => {
                setFormData({ title: "", content: "" })
                setIsCreateOpen(true)
              }}
              className="group bg-black text-white hover:bg-black/90 rounded-full px-6 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              New Post
            </Button>
          </div>

          {/* Posts List */}
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className="shimmer rounded-2xl h-28"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-white border border-[#E5E5E0] rounded-2xl p-16 text-center animate-fade-in shadow-sm">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#F5F5F0] flex items-center justify-center">
                <Plus className="w-8 h-8 text-black/40" />
              </div>
              <p className="font-serif text-xl text-black mb-2">No posts yet</p>
              <p className="font-sans text-gray-500 mb-6">Create your first post to get started</p>
              <Button
                onClick={() => {
                  setFormData({ title: "", content: "" })
                  setIsCreateOpen(true)
                }}
                className="bg-black text-white hover:bg-black/90 rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Post
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post, index) => (
                <div
                  key={post.id}
                  className="group bg-white border border-[#E5E5E0] rounded-2xl p-6 flex items-start justify-between gap-6 hover-lift animate-fade-in-up opacity-0 shadow-sm hover:shadow-md transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-xl font-bold text-black mb-2 truncate group-hover:text-black/80 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="font-sans text-sm text-gray-500 line-clamp-2 leading-relaxed">{post.content}</p>
                    {post.created_at && (
                      <p className="font-sans text-xs text-gray-400 mt-3">
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(post)}
                      className="group/btn border-gray-200 hover:border-black hover:bg-black hover:text-white rounded-full w-10 h-10 p-0 transition-all duration-300"
                    >
                      <Pencil className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDeleteDialog(post)}
                      className="group/btn border-gray-200 hover:border-red-500 hover:bg-red-500 hover:text-white rounded-full w-10 h-10 p-0 transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Why People Visit Section */}
          <div className="mt-16 pt-10 border-t border-[#E5E5E0]">
            <div className="flex items-center gap-3 mb-8 animate-fade-in">
              <MessageSquare className="w-6 h-6 text-black/60" />
              <div>
                <h2 className="font-serif text-2xl font-bold text-black">Why People Visit</h2>
                <p className="font-sans text-gray-500 text-sm">Visitor submissions and reasons</p>
              </div>
            </div>

            {reasons.length === 0 ? (
              <div className="bg-white border border-[#E5E5E0] rounded-2xl p-12 text-center animate-fade-in shadow-sm">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#F5F5F0] flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-black/40" />
                </div>
                <p className="font-serif text-lg text-black mb-1">No visitor submissions yet</p>
                <p className="font-sans text-sm text-gray-500">Reasons will appear here when visitors submit them</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {reasons.map((reason, index) => (
                  <div
                    key={reason.id}
                    className="group bg-white border border-[#E5E5E0] rounded-2xl p-5 animate-fade-in-up opacity-0 shadow-sm hover:shadow-md transition-all duration-300"
                    style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-serif text-sm shrink-0">
                          {reason.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-sans font-semibold text-black text-sm truncate">{reason.name}</p>
                          <p className="font-sans text-xs text-gray-600 leading-relaxed mt-1 line-clamp-2">{reason.why}</p>
                          {reason.created_at && (
                            <p className="font-sans text-xs text-gray-400 mt-2">
                              {new Date(reason.created_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteReasonDialog(reason)}
                        className="group/btn text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full w-8 h-8 p-0 transition-all duration-300 opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Create Post Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="bg-white sm:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
          <DialogHeader className="shrink-0">
            <DialogTitle className="font-serif text-xl">Create New Post</DialogTitle>
            <DialogDescription className="font-sans text-gray-600">
              Add a new blog post to your journal.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 overflow-y-auto flex-1 min-h-0">
            <div className="space-y-2">
              <Label htmlFor="create-title" className="font-sans">
                Title
              </Label>
              <Input
                id="create-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter post title"
                className="border-[#E5E5E0]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-content" className="font-sans">
                Content
              </Label>
              <Textarea
                id="create-content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your post content..."
                rows={12}
                className="border-[#E5E5E0] resize-none min-h-[300px]"
              />
            </div>
          </div>
          <DialogFooter className="shrink-0 border-t border-[#E5E5E0] pt-4">
            <Button variant="outline" onClick={() => setIsCreateOpen(false)} className="border-gray-300">
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={isSubmitting} className="bg-black text-white hover:bg-black/90">
              {isSubmitting ? "Creating..." : "Create Post"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Post Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-white sm:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
          <DialogHeader className="shrink-0">
            <DialogTitle className="font-serif text-xl">Edit Post</DialogTitle>
            <DialogDescription className="font-sans text-gray-600">Make changes to your blog post.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 overflow-y-auto flex-1 min-h-0">
            <div className="space-y-2">
              <Label htmlFor="edit-title" className="font-sans">
                Title
              </Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter post title"
                className="border-[#E5E5E0]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-content" className="font-sans">
                Content
              </Label>
              <Textarea
                id="edit-content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your post content..."
                rows={12}
                className="border-[#E5E5E0] resize-none min-h-[300px]"
              />
            </div>
          </div>
          <DialogFooter className="shrink-0 border-t border-[#E5E5E0] pt-4">
            <Button variant="outline" onClick={() => setIsEditOpen(false)} className="border-gray-300">
              Cancel
            </Button>
            <Button onClick={handleEdit} disabled={isSubmitting} className="bg-black text-white hover:bg-black/90">
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-xl">Delete Post</AlertDialogTitle>
            <AlertDialogDescription className="font-sans text-gray-600">
              Are you sure you want to delete &quot;{selectedPost?.title}&quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-300">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isSubmitting}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {isSubmitting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Reason Confirmation Dialog */}
      <AlertDialog open={isDeleteReasonOpen} onOpenChange={setIsDeleteReasonOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-xl">Delete Reason</AlertDialogTitle>
            <AlertDialogDescription className="font-sans text-gray-600">
              Are you sure you want to delete the submission from &quot;{selectedReason?.name}&quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-300">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteReason}
              disabled={isSubmitting}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {isSubmitting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
