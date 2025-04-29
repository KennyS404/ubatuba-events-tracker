import { useState, useEffect } from 'react'
import api from '../services/api'
import { Event } from '../types/Event'

export const useEvents = (
  searchQuery: string = '',
  category: string = '',
  myEvents: boolean = false
) => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      setError(null)

      try {
        const endpoint = myEvents ? '/api/events/my' : '/api/events'
        
        const params: Record<string, string> = {}
        
        if (searchQuery) {
          params.search = searchQuery
        }
        
        if (category) {
          params.category = category
        }

        const response = await api.get<Event[]>(endpoint, { params })
        setEvents(response.data)
      } catch (err) {
        console.error('Erro ao buscar eventos:', err)
        setError('Não foi possível carregar os eventos. Tente novamente mais tarde.')
        setEvents([])
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [searchQuery, category, myEvents])

  return {
    events,
    loading,
    error,
    setEvents 
  }
}