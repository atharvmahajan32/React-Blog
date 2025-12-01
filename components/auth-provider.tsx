"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getToken, setToken, removeToken } from "@/lib/auth"

interface AuthContextType {
  isAdmin: boolean
  token: string | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const storedToken = getToken()
    if (storedToken) {
      setTokenState(storedToken)
      setIsAdmin(true)
    }
  }, [])

  const login = (newToken: string) => {
    setToken(newToken)
    setTokenState(newToken)
    setIsAdmin(true)
  }

  const logout = () => {
    removeToken()
    setTokenState(null)
    setIsAdmin(false)
  }

  return <AuthContext.Provider value={{ isAdmin, token, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
