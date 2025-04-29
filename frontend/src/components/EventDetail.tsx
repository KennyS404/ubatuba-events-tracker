import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import { Event } from '../types/Event'
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Tag, 
  User, 
  Clock, 
  Trash2, 
  Edit, 
  AlertCircle,
  Loader
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { enUS } from 'date-fns/locale'
import { motion } from 'framer-motion'
import { useTranslation } from '../context/TranlationContext'
interface EventDetailProps {
  darkMode?: boolean;
}

export default function EventDetail({ darkMode = false }: EventDetailProps) {
  const { id } = useParams<{ id: string }>()
  const [event, setEvent] = useState<Event | null>(null)
  const [imageError, setImageError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const { t, language } = useTranslation()
  
  const isOwner = isAuthenticated && event?.creator_id === user?.id

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const response = await api.get<Event>(`/api/events/${id}`)
        setEvent(response.data)
      } catch (err: any) {
        console.error('Erro ao buscar evento:', err)
        setError(err.response?.data?.detail || t('eventDetail.unableToLoadEvent'))
        setEvent(null)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchEvent()
    }
  }, [id, t])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(language, {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }
  
  const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString)
    return formatDistanceToNow(date, { 
      addSuffix: true,
      locale: language === 'pt-BR' ? ptBR : enUS
    })
  }
  
  const handleDelete = async () => {
    if (!id || !isOwner) return
    
    setIsDeleting(true)
    
    try {
      await api.delete(`/api/events/${id}`)
      navigate('/')
    } catch (err: any) {
      console.error('Erro ao excluir evento:', err)
      setError(err.response?.data?.detail || t('eventDetail.unableToDeleteEvent'))
      setShowDeleteConfirm(false)
    } finally {
      setIsDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader className={`animate-spin h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <Link to="/" className={`flex items-center mb-4 ${
          darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
        }`}>
          <ArrowLeft className="h-5 w-5 mr-1" />
          {t('common.back')}
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`px-4 py-3 rounded-lg flex items-start shadow-md ${
            darkMode 
              ? 'bg-red-900/30 border border-red-800 text-red-400'
              : 'bg-red-100 border border-red-400 text-red-700'
          }`}
        >
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-bold">{t('eventDetail.errorLoadingEvent')}</p>
            <p>{error || t('eventDetail.eventNotFound')}</p>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Link to="/" className={`flex items-center mb-4 ${
        darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
      }`}>
        <ArrowLeft className="h-5 w-5 mr-1" />
        {t('common.back')}
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`rounded-xl shadow-lg overflow-hidden border ${
          darkMode 
            ? 'bg-gradient-to-br from-blue-900 to-indigo-900 border-blue-800'
            : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
        }`}
      >
        {id && !imageError && (
          <div className={`w-full h-64 sm:h-80 relative ${darkMode ? 'bg-blue-800' : 'bg-blue-100'}`}>
            <img 
              src={`${import.meta.env.VITE_API_URL}/api/events/${id}/image`} 
              alt={event.title} 
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
            
            {event.category && (
              <span className={`absolute top-4 right-4 px-3 py-1 text-white rounded-full text-sm font-semibold shadow-md ${
                darkMode ? 'bg-blue-500' : 'bg-blue-600'
              }`}>
                {t(`categories.${event.category.toLowerCase()}`)}
              </span>
            )}
          </div>
        )}

        <div className="p-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
            <div>
              <div className={`flex items-center text-sm mb-2 ${
                darkMode ? 'text-blue-300' : 'text-blue-600'
              }`}>
                <Calendar className="h-4 w-4 mr-1" />
                <span>{formatDate(event.date)}</span>
              </div>
              
              <h1 className={`text-3xl font-bold mb-3 ${
                darkMode ? 'text-white' : 'text-blue-900'
              }`}>{event.title}</h1>
              
              <div className={`flex items-center text-sm ${
                darkMode ? 'text-blue-300/70' : 'text-blue-600/70'
              }`}>
                <Clock className="h-4 w-4 mr-1" />
                <span>{t('eventDetail.published')} {formatRelativeDate(event.created_at)}</span>
              </div>
            </div>
            

            {isOwner && (
              <div className="flex space-x-2">
                <Link 
                  to={`/events/${id}/edit`} 
                  className={`px-3 py-2 rounded-lg transition-colors flex items-center shadow-md ${
                    darkMode 
                      ? 'bg-blue-800 text-blue-200 hover:bg-blue-700'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  {t('eventDetail.edit')}
                </Link>
                
                <button 
                  onClick={() => setShowDeleteConfirm(true)}
                  className={`px-3 py-2 rounded-lg transition-colors flex items-center shadow-md ${
                    darkMode 
                      ? 'bg-red-900/50 text-red-300 hover:bg-red-800/50'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  {t('eventDetail.delete')}
                </button>
              </div>
            )}
          </div>
          

          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`rounded-xl p-6 max-w-md w-full shadow-xl border ${
                  darkMode 
                    ? 'bg-blue-900 border-blue-800'
                    : 'bg-white border-blue-200'
                }`}
              >
                <h3 className={`text-xl font-bold mb-4 ${
                  darkMode ? 'text-white' : 'text-blue-900'
                }`}>{t('eventDetail.confirmDelete')}</h3>
                <p className={`mb-6 ${
                  darkMode ? 'text-blue-200' : 'text-blue-800'
                }`}>
                  {t('eventDetail.deleteConfirmMessage', { title: event.title })}
                </p>
                <div className="flex justify-end space-x-3">
                  <button 
                    onClick={() => setShowDeleteConfirm(false)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      darkMode 
                        ? 'border border-blue-700 text-blue-300 hover:bg-blue-800'
                        : 'border border-blue-300 text-blue-700 hover:bg-blue-50'
                    }`}
                    disabled={isDeleting}
                  >
                    {t('common.cancel')}
                  </button>
                  <button 
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center shadow-md"
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        {t('eventDetail.deleting')}
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4 mr-1" />
                        {t('eventDetail.delete')}
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className={`text-xl font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-blue-900'
              }`}>{t('eventDetail.aboutEvent')}</h2>
              <div className="prose max-w-none">
                <p className={`whitespace-pre-line ${
                  darkMode ? 'text-blue-200' : 'text-blue-800'
                }`}>
                  {event.description || t('eventDetail.noDescription')}
                </p>
              </div>
            </div>
            

            <div className="md:col-span-1 space-y-6">
              <div className={`p-5 rounded-lg shadow-inner border ${
                darkMode 
                  ? 'bg-blue-800/30 border-blue-700'
                  : 'bg-blue-100/50 border-blue-200'
              }`}>
                <h3 className={`font-medium mb-4 ${
                  darkMode ? 'text-white' : 'text-blue-900'
                }`}>{t('eventDetail.details')}</h3>
                
                <div className="space-y-5">
                  <div className="flex items-start">
                    <MapPin className={`h-5 w-5 mr-2 mt-0.5 flex-shrink-0 ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                    <div>
                      <p className={`font-medium ${
                        darkMode ? 'text-blue-200' : 'text-blue-800'
                      }`}>{t('eventDetail.location')}</p>
                      <p className={darkMode ? 'text-blue-300' : 'text-blue-700'}>{event.location}</p>
                    </div>
                  </div>
                  
                  {event.category && (
                    <div className="flex items-start">
                      <Tag className={`h-5 w-5 mr-2 mt-0.5 flex-shrink-0 ${
                        darkMode ? 'text-blue-400' : 'text-blue-600'
                      }`} />
                      <div>
                        <p className={`font-medium ${
                          darkMode ? 'text-blue-200' : 'text-blue-800'
                        }`}>{t('eventDetail.category')}</p>
                        <p className={darkMode ? 'text-blue-300' : 'text-blue-700'}>
                          {t(`categories.${event.category.toLowerCase()}`)}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start">
                    <User className={`h-5 w-5 mr-2 mt-0.5 flex-shrink-0 ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                    <div>
                      <p className={`font-medium ${
                        darkMode ? 'text-blue-200' : 'text-blue-800'
                      }`}>{t('eventDetail.organizer')}</p>
                      <p className={darkMode ? 'text-blue-300' : 'text-blue-700'}>
                        {isOwner ? t('eventDetail.you') : `${t('eventDetail.user')} #${event.creator_id}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}