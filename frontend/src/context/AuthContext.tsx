import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authService } from '../services/auth'
import { AuthContextType, User } from '../types/User'

const initialState: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {}
}

export const AuthContext = createContext<AuthContextType>(initialState)

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true)
      
      try {
        if (authService.isAuthenticated()) {
          const storedUser = authService.getCurrentUser()
          
          if (storedUser) {
            setUser(storedUser)
          } else {
            const fetchedUser = await authService.getProfile()
            setUser(fetchedUser)
          }
        }
      } catch (err) {
        console.error('Erro ao carregar usuário:', err)
        authService.logout()
        setError('Sessão expirada. Por favor, faça login novamente.')
      } finally {
        setIsLoading(false)
      }
    }
    
    loadUser()
  }, [])
  
  const login = async (username: string, password: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await authService.login({ username, password })
      setUser(response.user)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erro ao fazer login. Verifique suas credenciais.')
      throw err
    } finally {
      setIsLoading(false)
    }
  }
  
  const register = async (username: string, email: string, password: string, fullName?: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      await authService.register({ 
        username, 
        email, 
        password,
        full_name: fullName 
      })

      await login(username, password)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erro ao criar conta. Tente novamente.')
      throw err
    } finally {
      setIsLoading(false)
    }
  }
  
  const logout = () => {
    authService.logout()
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout
  }
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}