import { useState, useEffect } from 'react'

// Dados mockados - substitua por chamadas reais da API
const mockRestaurants = [
  {
    id: 1,
    name: 'Sabor Brasileiro',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
    address: 'Rua das Flores, 123 - Centro, São Paulo - SP',
    cuisine: 'Brasileira',
    priceRange: '$$',
    rating: 4.5,
    reviewCount: 128,
    deliveryTime: '30-40 min',
    isOpen: true
  },
  {
    id: 2,
    name: 'Pizza Italiana',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    address: 'Av. Italia, 456 - Jardins, São Paulo - SP',
    cuisine: 'Italiana',
    priceRange: '$$$',
    rating: 4.8,
    reviewCount: 256,
    deliveryTime: '25-35 min',
    isOpen: true
  },
  {
    id: 3,
    name: 'Sushi Master',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    address: 'Rua Japão, 789 - Liberdade, São Paulo - SP',
    cuisine: 'Japonesa',
    priceRange: '$$$',
    rating: 4.7,
    reviewCount: 189,
    deliveryTime: '40-50 min',
    isOpen: false
  }
]

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true)
        // Simular chamada API
        setTimeout(() => {
          setRestaurants(mockRestaurants)
          setLoading(false)
        }, 1000)
      } catch (err) {
        setError('Erro ao carregar restaurantes')
        setLoading(false)
      }
    }

    fetchRestaurants()
  }, [])

  const getRestaurantById = (id) => {
    return restaurants.find(restaurant => restaurant.id === id)
  }

  const searchRestaurants = (query, filters = {}) => {
    return restaurants.filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
                           restaurant.cuisine.toLowerCase().includes(query.toLowerCase()) ||
                           restaurant.address.toLowerCase().includes(query.toLowerCase())
      
      const matchesCuisine = !filters.cuisine || filters.cuisine === 'all' || 
                            restaurant.cuisine === filters.cuisine
      
      const matchesPrice = !filters.priceRange || filters.priceRange === 'all' || 
                          restaurant.priceRange === filters.priceRange
      
      const matchesRating = !filters.minRating || restaurant.rating >= filters.minRating

      return matchesSearch && matchesCuisine && matchesPrice && matchesRating
    })
  }

  return {
    restaurants,
    loading,
    error,
    getRestaurantById,
    searchRestaurants
  }
}