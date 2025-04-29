import { User } from '../types/User'
import api from './api'

interface RegisterData {
  username: string
  email: string
  password: string
  full_name?: string
}

interface LoginData {
  username: string
  password: string
}

interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}

export const authService = {
  async register(data: RegisterData): Promise<User> {
    const response = await api.post<User>('/api/auth/register', data)
    return response.data
  },

  async login(data: LoginData): Promise<AuthResponse> {

    const formData = new FormData()
    formData.append('username', data.username)
    formData.append('password', data.password)
    
    const response = await api.post<AuthResponse>('/api/auth/login', formData)
    
    localStorage.setItem('ubatuba_token', response.data.access_token)
    localStorage.setItem('ubatuba_user', JSON.stringify(response.data.user))
    
    return response.data
  },
  
  async getProfile(): Promise<User> {
    const response = await api.get<User>('/api/auth/me')
    return response.data
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('ubatuba_token')
  },

  getCurrentUser(): User | null {
    const user = localStorage.getItem('ubatuba_user')
    return user ? JSON.parse(user) : null
  },
  
  logout(): void {
    localStorage.removeItem('ubatuba_token')
    localStorage.removeItem('ubatuba_user')
  }
}