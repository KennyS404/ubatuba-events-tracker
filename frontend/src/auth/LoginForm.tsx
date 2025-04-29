import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LogIn, AlertCircle, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from '../context/TranlationContext'


interface LoginFormProps {
  darkMode: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ darkMode }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()

  const from = (location.state as any)?.from?.pathname || '/'

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!username || !password) {
      setErrorMessage(t('login.fillAllFields'))
      return
    }
    
    setIsSubmitting(true)
    setErrorMessage('')
    
    try {
      await login(username, password)
      navigate(from, { replace: true })
    } catch (error: any) {
      setErrorMessage(error.response?.data?.detail || t('login.loginError'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-md w-full mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`relative overflow-hidden rounded-xl shadow-lg ${
          darkMode ? 'bg-gradient-to-br from-blue-900 to-indigo-900' : 'bg-gradient-to-br from-blue-50 to-indigo-50'
        }`}
      >
        <div className="absolute top-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full opacity-10">
            <path 
              fill={darkMode ? '#ffffff' : '#1e40af'} 
              fillOpacity="1" 
              d="M0,32L60,53.3C120,75,240,117,360,122.7C480,128,600,96,720,85.3C840,75,960,85,1080,90.7C1200,96,1320,96,1380,96L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            ></path>
          </svg>
        </div>

        <div className="p-8 pt-12 relative z-10">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
              <Calendar className={`h-10 w-10 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
            </div>
            <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-blue-800'}`}>
              {t('login.welcomeBack')}
            </h2>
            <p className={`${darkMode ? 'text-blue-200' : 'text-blue-600'}`}>
              {t('login.enterAccount')}
            </p>
          </div>

          {errorMessage && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md flex items-start"
            >
              <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                {t('login.username')}
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  darkMode 
                    ? 'bg-blue-800/50 border-blue-700 text-white placeholder-blue-300 backdrop-blur-sm' 
                    : 'bg-white border-blue-200 text-blue-900 placeholder-blue-400'
                }`}
                placeholder={t('login.usernamePlace')}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                {t('login.password')}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  darkMode 
                    ? 'bg-blue-800/50 border-blue-700 text-white placeholder-blue-300 backdrop-blur-sm' 
                    : 'bg-white border-blue-200 text-blue-900 placeholder-blue-400'
                }`}
                placeholder={t('login.passwordPlace')}
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center shadow-md"
            >
              {isSubmitting ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              ) : (
                <LogIn size={20} className="mr-2" />
              )}
              {isSubmitting ? t('login.loggingIn') : t('login.loginButton')}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className={`${darkMode ? 'text-blue-200' : 'text-blue-600'}`}>
              {t('login.noAccount')}{' '}
              <Link to="/register" className={`${darkMode ? 'text-white' : 'text-blue-700'} hover:underline font-medium`}>
                {t('app.register')}
              </Link>
            </p>
          </div>
        </div>


        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full opacity-10">
            <path 
              fill={darkMode ? '#ffffff' : '#1e40af'} 
              fillOpacity="1" 
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </motion.div>

      <div className="flex justify-center mt-6">
        <Link 
          to="/" 
          className={`px-4 py-2 rounded-lg flex items-center ${
            darkMode ? 'text-blue-300 hover:bg-blue-900/50' : 'text-blue-600 hover:bg-blue-50'
          }`}
        >
          <span>{t('login.backToHome')}</span>
        </Link>
      </div>
    </div>
  )
}

export default LoginForm