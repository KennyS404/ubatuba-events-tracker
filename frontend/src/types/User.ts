export interface User {
    id: number
    username: string
    email: string
    full_name?: string
    created_at: string
  }
  
  export interface AuthUser {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null
  }
  
  export interface AuthContextType extends AuthUser {
    login: (username: string, password: string) => Promise<void>
    register: (username: string, email: string, password: string, fullName?: string) => Promise<void>
    logout: () => void
  }