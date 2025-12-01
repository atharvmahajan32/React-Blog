// API service layer for blog backend communication

const API_BASE_URL = "http://localhost:8000"

export interface Post {
  id: string
  title: string
  content: string
  created_at?: string
}

export interface Reason {
  id: string
  name: string
  why: string
  created_at?: string
}

export interface AuthResponse {
  admin: boolean
  token?: string
  name?: string
  why?: string
}

interface PostsResponse {
  posts: Post[]
}

interface ReasonsResponse {
  posts: Reason[] // Backend returns reasons under "posts" key
}

// Helper to get auth headers for Form data
function getAuthHeaders(): HeadersInit {
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

// Handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (response.status === 401) {
    // Token expired or invalid
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_token")
      window.location.href = "/"
    }
    throw new Error("Session expired. Please login again.")
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "An error occurred" }))
    throw new Error(error.detail || error.message || "An error occurred")
  }

  return response.json()
}

// Auth endpoint
export async function submitWhyForm(name: string, why: string): Promise<AuthResponse> {
  // Submits reason, also used for admin login (uses Form data)
  const formData = new FormData()
  formData.append("name", name)
  formData.append("why", why)

  const response = await fetch(`${API_BASE_URL}/where_to`, {
    method: "POST",
    body: formData,
  })
  return handleResponse<AuthResponse>(response)
}

// Public endpoints
export async function getPosts(): Promise<Post[]> {
  // Fetch all posts
  const response = await fetch(`${API_BASE_URL}/get`)
  const data = await handleResponse<PostsResponse>(response)
  return data.posts
}

export async function getReasons(): Promise<Reason[]> {
  // Fetch all submitted reasons
  const response = await fetch(`${API_BASE_URL}/get_reasons`)
  const data = await handleResponse<ReasonsResponse>(response)
  return data.posts
}

// Admin endpoints
export async function createPost(title: string, content: string): Promise<Post> {
  // Create a new post (admin only, uses Form data)
  const formData = new FormData()
  formData.append("title", title)
  formData.append("content", content)

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  })
  return handleResponse<Post>(response)
}

export async function updatePost(postId: string, data: { title?: string; content?: string }): Promise<Post> {
  // Update a post (admin only, uses Form data)
  const formData = new FormData()
  if (data.title) formData.append("title", data.title)
  if (data.content) formData.append("content", data.content)

  const response = await fetch(`${API_BASE_URL}/update/${postId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: formData,
  })
  return handleResponse<Post>(response)
}

export async function deletePost(postId: string): Promise<void> {
  // Delete a post (admin only)
  const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  })
  if (!response.ok) {
    await handleResponse(response)
  }
}

export async function deleteReason(reasonId: string): Promise<void> {
  // Delete a reason (admin only)
  const response = await fetch(`${API_BASE_URL}/reasons/${reasonId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  })
  if (!response.ok) {
    await handleResponse(response)
  }
}

export async function getPostById(postId: string): Promise<Post> {
  // Fetch a single post by ID
  const response = await fetch(`${API_BASE_URL}/get/${postId}`)
  return handleResponse<Post>(response)
}
