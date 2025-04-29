import { useState, useEffect } from 'react'
import api from '../services/api'
import { useNavigate, Link, useParams } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import { registerLocale } from 'react-datepicker'
import { ptBR } from 'date-fns/locale/pt-BR'
import { enUS } from 'date-fns/locale/en-US'
import "react-datepicker/dist/react-datepicker.css"
import { Calendar, MapPin, Tag, PenSquare, Image, AlertCircle, ArrowLeft, Loader } from 'lucide-react'
import { EventFormData, Event } from '../types/Event'
import { motion } from 'framer-motion'
import { useTranslation } from '../context/TranlationContext'

registerLocale('pt-BR', ptBR)
registerLocale('en', enUS)

interface EventEditProps {
  darkMode: boolean;
}

export default function EventEdit({ darkMode }: EventEditProps) {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t, language } = useTranslation()
  
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)
  
  const [formData, setFormData] = useState<EventFormData>({ 
    title: '', 
    description: '', 
    date: null, 
    location: '', 
    category: 'General' 
  })
  
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [initialImageUrl, setInitialImageUrl] = useState<string | null>(null)

  useEffect(() => {
    const styleElement = document.createElement('style');
    
    styleElement.textContent = `
      .react-datepicker {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
        border-color: #e2e8f0;
      }
      
      .dark-datepicker .react-datepicker {
        background-color: #1e3a8a;
        border-color: #3b82f6;
      }
      
      .dark-datepicker .react-datepicker__header {
        background-color: #1e40af;
        border-color: #3b82f6;
      }
      
      .dark-datepicker .react-datepicker__current-month,
      .dark-datepicker .react-datepicker-time__header,
      .dark-datepicker .react-datepicker__day-name {
        color: #ffffff;
      }
      
      .dark-datepicker .react-datepicker__day,
      .dark-datepicker .react-datepicker__time-name {
        color: #e2e8f0;
      }
      
      .dark-datepicker .react-datepicker__day:hover {
        background-color: #3b82f6;
      }
      
      .dark-datepicker .react-datepicker__day--selected {
        background-color: #3b82f6;
        color: #ffffff;
      }
      
      .dark-datepicker .react-datepicker__time-container .react-datepicker__time {
        background-color: #1e3a8a;
      }
      
      .dark-datepicker .react-datepicker__time-container .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item {
        color: #e2e8f0;
      }
      
      .dark-datepicker .react-datepicker__time-container .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item:hover {
        background-color: #3b82f6;
      }
      
      .dark-datepicker .react-datepicker__time-container .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected {
        background-color: #3b82f6;
        color: #ffffff;
      }
      
      /* Light mode custom overrides to ensure text is visible */
      .light-datepicker .react-datepicker {
        background-color: #ffffff;
        color: #1e293b;
        border-color: #cbd5e1;
      }
      
      .light-datepicker .react-datepicker__header {
        background-color: #f1f5f9;
        border-color: #cbd5e1;
      }
      
      .light-datepicker .react-datepicker__current-month,
      .light-datepicker .react-datepicker-time__header,
      .light-datepicker .react-datepicker__day-name {
        color: #1e293b;
      }
      
      .light-datepicker .react-datepicker__day,
      .light-datepicker .react-datepicker__time-name {
        color: #1e293b;
      }
      
      .light-datepicker .react-datepicker__day:hover {
        background-color: #dbeafe;
      }
      
      .light-datepicker .react-datepicker__day--selected {
        background-color: #3b82f6;
        color: #ffffff;
      }
    `;
    
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const response = await api.get<Event>(`/api/events/${id}`)
        const event = response.data
        
        setFormData({
          title: event.title,
          description: event.description || '',
          date: new Date(event.date),
          location: event.location,
          category: event.category || 'General'
        })
        
        if (event.image_content_type) {
          setInitialImageUrl(`${import.meta.env.VITE_API_URL}/api/events/${id}/image`)
          setImagePreview(`${import.meta.env.VITE_API_URL}/api/events/${id}/image`)
        }
        
      } catch (err: any) {
        console.error('Error fetching event:', err)
        
        if (err.response?.status === 404) {
          setNotFound(true)
        } else {
          setError(err.response?.data?.detail || 'Failed to load event')
        }
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchEvent()
    }
  }, [id])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!formData.title || !formData.date || !formData.location) {
      setError(t('eventForm.fillAllRequired'))
      return
    }
    
    setSubmitting(true)
    setError(null)
    
    const data = new FormData()
    
    const formattedData = {
      ...formData,
      date: formData.date ? formData.date.toISOString().split('.')[0] : ''
    }
    
    Object.entries(formattedData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        data.append(key, String(value))
      }
    })
    
    if (image) {
      data.append('image', image)
    }
    
    try {
      await api.put(`/api/events/${id}`, data)
      navigate(`/events/${id}`)
    } catch (err: any) {
      console.error('Error updating event:', err)
      setError(err.response?.data?.detail || t('eventForm.createEventError'))
    } finally {
      setSubmitting(false)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleDateChange = (date: Date | null) => {
    setFormData(prevData => ({
      ...prevData,
      date
    }))
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setImage(file)
    
    if (file) {
      setInitialImageUrl(null)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(initialImageUrl)
    }
  }

  const categories = [
    'General', 'Music', 'Sports', 'Art', 'Technology', 
    'Food', 'Education', 'Business', 'Health', 'Other'
  ]

  const getCategoryLabel = (value: string) => {
    return t(`categories.${value.toLowerCase()}`)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader className={`animate-spin h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="p-4 max-w-2xl mx-auto">
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
            <p>{t('eventDetail.eventNotFound')}</p>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link to={`/events/${id}`} className={`flex items-center mb-4 ${
        darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
      }`}>
        <ArrowLeft className="h-5 w-5 mr-1" />
        {t('common.back')}
      </Link>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className={`text-2xl font-bold mb-6 ${
          darkMode ? 'text-white' : 'text-blue-900'
        }`}>{t('eventDetail.edit')} {formData.title}</h2>
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mb-6 p-4 border-l-4 rounded-md flex items-start ${
              darkMode 
                ? 'bg-red-900/30 border-red-600 text-red-300' 
                : 'bg-red-100 border-red-500 text-red-700'
            }`}
          >
            <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit} className={`rounded-xl shadow-lg p-8 border ${
          darkMode 
            ? 'bg-gradient-to-br from-blue-900/70 to-indigo-900/70 border-blue-700'
            : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
        }`}>
          <div className="mb-6">
            <label htmlFor="title" className={`flex items-center text-sm font-medium mb-2 ${
              darkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>
              <PenSquare size={16} className="mr-2" />
              {t('eventForm.title')}
            </label>
            <input
              id="title"
              name="title"
              className={`border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm ${
                darkMode 
                  ? 'border-blue-600 bg-blue-800/50 backdrop-blur-sm text-white placeholder-blue-300'
                  : 'border-blue-300 bg-white text-gray-800 placeholder-gray-500'
              }`}
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              placeholder={t('eventForm.eventNamePlaceholder')}
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="description" className={`flex items-center text-sm font-medium mb-2 ${
              darkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>
              <PenSquare size={16} className="mr-2" />
              {t('eventForm.description')}
            </label>
            <textarea
              id="description"
              name="description"
              className={`border p-3 w-full rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm ${
                darkMode 
                  ? 'border-blue-600 bg-blue-800/50 backdrop-blur-sm text-white placeholder-blue-300'
                  : 'border-blue-300 bg-white text-gray-800 placeholder-gray-500'
              }`}
              value={formData.description}
              onChange={handleInputChange}
              placeholder={t('eventForm.eventDetailsPlaceholder')}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-2">
              <label htmlFor="date" className={`flex items-center text-sm font-medium mb-2 ${
                darkMode ? 'text-blue-300' : 'text-blue-700'
              }`}>
                <Calendar size={16} className="mr-2" />
                {t('eventForm.dateAndTime')}
              </label>
              <DatePicker
                id="date"
                selected={formData.date}
                onChange={handleDateChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat={language === 'pt-BR' ? 'dd/MM/yyyy HH:mm' : 'MM/dd/yyyy hh:mm aa'}
                className={`border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm ${
                  darkMode 
                    ? 'border-blue-600 bg-blue-800/50 backdrop-blur-sm text-white placeholder-blue-300'
                    : 'border-blue-300 bg-white text-gray-800 placeholder-gray-500'
                }`}
                placeholderText={t('eventForm.selectDateAndTime')}
                locale={language === 'pt-BR' ? 'pt-BR' : 'en'}
                required
                calendarClassName={darkMode ? 'dark-datepicker' : 'light-datepicker'}
              />
            </div>
            
            <div className="mb-2">
              <label htmlFor="location" className={`flex items-center text-sm font-medium mb-2 ${
                darkMode ? 'text-blue-300' : 'text-blue-700'
              }`}>
                <MapPin size={16} className="mr-2" />
                {t('eventForm.location')}
              </label>
              <input
                id="location"
                name="location"
                className={`border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm ${
                  darkMode 
                    ? 'border-blue-600 bg-blue-800/50 backdrop-blur-sm text-white placeholder-blue-300'
                    : 'border-blue-300 bg-white text-gray-800 placeholder-gray-500'
                }`}
                type="text"
                value={formData.location}
                onChange={handleInputChange}
                placeholder={t('eventForm.eventAddressPlaceholder')}
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="category" className={`flex items-center text-sm font-medium mb-2 ${
              darkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>
              <Tag size={16} className="mr-2" />
              {t('eventForm.category')}
            </label>
            <div className="relative">
              <select
                id="category"
                name="category"
                className={`border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm appearance-none pr-10 ${
                  darkMode 
                    ? 'border-blue-600 bg-blue-800/50 backdrop-blur-sm text-white'
                    : 'border-blue-300 bg-white text-gray-800'
                }`}
                value={formData.category}
                onChange={handleInputChange}
                style={{
                  colorScheme: darkMode ? 'dark' : 'light'
                }}
              >
                {categories.map(category => (
                  <option 
                    key={category} 
                    value={category}
                    className={darkMode ? 'bg-blue-800 text-white' : 'bg-white text-gray-800'}
                  >
                    {getCategoryLabel(category)}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className={`h-5 w-5 ${darkMode ? 'text-blue-300' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <label htmlFor="image" className={`flex items-center text-sm font-medium mb-2 ${
              darkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>
              <Image size={16} className="mr-2" />
              {t('eventForm.image')}
            </label>
            <div className="flex items-center justify-center w-full">
              <label className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer shadow-inner ${
                darkMode 
                  ? 'border-blue-600 bg-blue-800/30 hover:bg-blue-800/50'
                  : 'border-blue-300 bg-blue-50/50 hover:bg-blue-100'
              }`}>
                {imagePreview ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                      <p className="text-white font-medium">{t('eventForm.changeImage')}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Image className={`w-12 h-12 mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                    <p className={`mb-2 text-sm font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                      {t('eventForm.clickToUpload')}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>
                      {t('eventForm.imageFormats')}
                    </p>
                  </div>
                )}
                <input 
                  id="image"
                  type="file" 
                  onChange={handleImageChange} 
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            disabled={submitting}
            className="px-6 py-3 w-full bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all font-medium text-center disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center shadow-md"
          >
            {submitting ? (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                {t('common.save')}...
              </>
            ) : (
              t('common.save')
            )}
          </motion.button>
        </form>
        
        <div className="mt-4 text-center">
          <span className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {t('eventForm.requiredFieldsNote')}
          </span>
        </div>
      </motion.div>
    </div>
  )
}