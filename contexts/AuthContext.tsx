"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"

interface AuthContextType {
  isAdminAuthenticated: boolean
  setIsAdminAuthenticated: (value: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (token) {
      // Verify token with backend
      fetch(`${BACKEND_URL}/api/admin/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.ok) {
            setIsAdminAuthenticated(true)
          } else {
            localStorage.removeItem("adminToken")
          }
        })
        .catch(() => {
          localStorage.removeItem("adminToken")
        })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAdminAuthenticated, setIsAdminAuthenticated }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
