import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEvents } from '../hooks/useEvents'
import { Event } from '../types/Event'
import { Search, Calendar, MapPin, Tag, Loader, PlusCircle, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from '../context/TranlationContext'

interface EventListProps {
  myEvents?: boolean;
  darkMode?: boolean;
}

export default function EventList({ myEvents = false, darkMode = false }: EventListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const { t, language } = useTranslation()
  
  const { events, loading, error } = useEvents(searchQuery, selectedCategory, myEvents)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value)
  }

  const categories = [
    { value: '', label: t('eventList.allCategories') },
    { value: 'General', label: t('categories.general') },
    { value: 'Music', label: t('categories.music') },
    { value: 'Sports', label: t('categories.sports') },
    { value: 'Art', label: t('categories.art') },
    { value: 'Technology', label: t('categories.technology') },
    { value: 'Food', label: t('categories.food') },
    { value: 'Education', label: t('categories.education') },
    { value: 'Business', label: t('categories.business') },
    { value: 'Health', label: t('categories.health') },
    { value: 'Other', label: t('categories.other') }
  ]
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(language, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-blue-900' : 'text-blue-900'}`}>
          {myEvents ? t('eventList.myEvents') : t('eventList.exploreEvents')}
        </h1>
        
        <div className={`p-6 rounded-xl mb-8 shadow-md border ${
          darkMode 
            ? 'bg-gradient-to-br from-blue-900/70 to-indigo-900/70 border-blue-700' 
            : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
        }`}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className={darkMode ? 'text-blue-300' : 'text-blue-500'} />
              </div>
              <input
                className={`pl-10 border p-3 w-full rounded-lg shadow-sm
                  ${darkMode 
                    ? 'bg-blue-800/50 border-blue-600 text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent' 
                    : 'bg-white border-blue-300 placeholder-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  }`}
                placeholder={t('eventList.searchByTitle')}
                value={searchQuery}
                onChange={handleSearchChange}
                aria-label={t('eventList.searchEvents')}
              />
            </div>
            
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag size={18} className={darkMode ? 'text-blue-500' : 'text-blue-500'} />
              </div>
              <div className="relative">
                <select
                  className={`pl-10 border p-3 w-full rounded-lg appearance-none shadow-sm
                    ${darkMode 
                      ? 'bg-blue-800/50 border-blue-600 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent' 
                      : 'bg-white border-blue-300 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    }`}
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  aria-label={t('eventList.filterByCategory')}
                  style={{
                    colorScheme: darkMode ? 'dark' : 'light'
                  }}
                >
                  {categories.map(category => (
                    <option 
                      key={category.value} 
                      value={category.value}
                      className={darkMode ? 'bg-blue-800 text-white' : 'bg-white text-gray-800'}
                    >
                      {category.label}
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
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className={`animate-spin h-10 w-10 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
          </div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-4 rounded-md flex items-start mb-6 ${
              darkMode 
                ? 'bg-red-900/30 border-l-4 border-red-600 text-red-300' 
                : 'bg-red-100 border-l-4 border-red-500 text-red-700'
            }`}
          >
            <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        ) : events.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center py-16 rounded-xl border shadow-md ${
              darkMode 
                ? 'bg-gradient-to-br from-blue-900/60 to-indigo-900/60 border-blue-700' 
                : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
            }`}
          >
            <Calendar className={`mx-auto h-16 w-16 mb-6 ${darkMode ? 'text-blue-300' : 'text-blue-500'}`} />
            <h3 className={`text-xl font-medium mb-3 ${darkMode ? 'text-white' : 'text-blue-900'}`}>
              {t('eventList.noEventsFound')}
            </h3>
            <p className={`mb-8 max-w-md mx-auto ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
              {myEvents 
                ? t('eventList.noEventsCreated')
                : t('eventList.noEventsWithFilters')}
            </p>
            {myEvents && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/new" 
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg inline-flex items-center shadow-md transition-colors"
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  {t('eventList.createFirstEvent')}
                </Link>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event: Event, index: number) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link 
                  to={`/events/${event.id}`} 
                  className={`rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden border flex flex-col h-full group ${
                    darkMode 
                      ? 'bg-gradient-to-br from-blue-900/80 to-indigo-900/80 border-blue-700 hover:from-blue-800/80 hover:to-indigo-800/80' 
                      : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100'
                  }`}
                >
                  <div className={`h-48 relative overflow-hidden ${darkMode ? 'bg-blue-800/60' : 'bg-blue-100'}`}>
                    {event.image_content_type ? (
                      <img 
                        src={`${import.meta.env.VITE_API_URL}/api/events/${event.id}/image`}
                        alt={event.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center ${
                        darkMode ? 'bg-blue-700/20' : 'bg-blue-300/20'
                      }`}>
                        <Calendar className={darkMode ? 'h-16 w-16 text-blue-300' : 'h-16 w-16 text-blue-400'} />
                      </div>
                    )}
                    
                    {event.category && (
                      <span className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold text-white rounded-full shadow-md ${
                        darkMode ? 'bg-blue-500' : 'bg-blue-600'
                      }`}>
                        {t(`categories.${event.category.toLowerCase()}`)}
                      </span>
                    )}
                  </div>
                  
                  <div className="p-6 flex-grow">
                    <h2 className={`text-xl font-bold mb-3 line-clamp-2 transition-colors ${
                      darkMode 
                        ? 'text-white group-hover:text-blue-200' 
                        : 'text-blue-900 group-hover:text-blue-700'
                    }`}>
                      {event.title}
                    </h2>
                    
                    <div className={`flex items-center mb-3 ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                      <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{formatDate(event.date)}</span>
                    </div>
                    
                    <div className={`flex items-center ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="text-sm line-clamp-1">{event.location}</span>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-4">
                    <div className="w-full h-8 flex justify-end">
                      <div className={`rounded-full px-3 py-1 text-xs font-medium flex items-center transition-colors ${
                        darkMode 
                          ? 'bg-blue-700 text-blue-200 group-hover:bg-blue-600' 
                          : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
                      }`}>
                        {t('eventList.viewDetails')}
                        <svg className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}