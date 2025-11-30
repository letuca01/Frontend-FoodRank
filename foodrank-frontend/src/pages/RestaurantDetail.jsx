import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { MapPin, Clock, Phone, Globe, Star, Calendar, Heart } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useRestaurants } from '../hooks/useRestaurants'
import { useReviews } from '../hooks/useReviews'
import ReviewCard from '../components/restaurant/ReviewCard'
import RatingStars from '../components/restaurant/RatingStars'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const RestaurantDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { getRestaurantById } = useRestaurants()
  const { getReviewsByRestaurant } = useReviews()
  
  const [restaurant, setRestaurant] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const restaurantData = getRestaurantById(parseInt(id))
        const reviewsData = getReviewsByRestaurant(parseInt(id))
        
        setRestaurant(restaurantData)
        setReviews(reviewsData)
      } catch (error) {
        console.error('Error fetching restaurant details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, getRestaurantById, getReviewsByRestaurant])

  const handleAddReview = () => {
    if (!user) {
      navigate('/login')
      return
    }
    navigate(`/review/${id}`)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando restaurante...</p>
        </div>
      </div>
    )
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Restaurante não encontrado</h1>
          <Link to="/explore" className="text-primary-600 hover:text-primary-500">
            Voltar para explorar
          </Link>
        </div>
      </div>
    )
  }

  const ratingBreakdown = [
    { stars: 5, count: Math.floor(reviews.filter(r => r.rating === 5).length / reviews.length * 100) },
    { stars: 4, count: Math.floor(reviews.filter(r => r.rating === 4).length / reviews.length * 100) },
    { stars: 3, count: Math.floor(reviews.filter(r => r.rating === 3).length / reviews.length * 100) },
    { stars: 2, count: Math.floor(reviews.filter(r => r.rating === 2).length / reviews.length * 100) },
    { stars: 1, count: Math.floor(reviews.filter(r => r.rating === 1).length / reviews.length * 100) }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Restaurant Header */}
        <Card className="overflow-hidden mb-8">
          <div className="relative">
            <img 
              src={restaurant.image} 
              alt={restaurant.name}
              className="w-full h-64 md:h-80 object-cover"
            />
            <button
              onClick={toggleFavorite}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
            >
              <Heart 
                size={24} 
                className={isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'} 
              />
            </button>
          </div>

          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
                <p className="text-xl text-gray-600 mb-4">{restaurant.cuisine} • {restaurant.priceRange}</p>
                
                <div className="flex items-center space-x-6 text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin size={18} className="mr-2" />
                    <span>{restaurant.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={18} className="mr-2" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Phone size={16} className="mr-1" />
                    <span>(11) 9999-9999</span>
                  </div>
                  <div className="flex items-center">
                    <Globe size={16} className="mr-1" />
                    <span>www.{restaurant.name.toLowerCase().replace(/\s+/g, '')}.com.br</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 lg:mt-0 lg:ml-6">
                <div className="bg-gray-50 rounded-lg p-4 min-w-[200px]">
                  <div className="flex items-center justify-center mb-2">
                    <div className="flex items-center">
                      <Star size={24} className="text-amber-500 fill-amber-500 mr-2" />
                      <span className="text-2xl font-bold text-gray-900">{restaurant.rating}</span>
                    </div>
                  </div>
                  <p className="text-center text-gray-600 text-sm mb-3">
                    {restaurant.reviewCount} avaliações
                  </p>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium text-center ${
                    restaurant.isOpen 
                      ? 'bg-success-100 text-success-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {restaurant.isOpen ? '🟢 Aberto Agora' : '🔴 Fechado'}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button onClick={handleAddReview} className="flex-1">
                Fazer Avaliação
              </Button>
              <Button variant="secondary" className="flex-1">
                Ver Cardápio
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Rating Breakdown */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Avaliações dos Usuários</h3>
              
              {ratingBreakdown.map((item, index) => (
                <div key={item.stars} className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 w-4">{item.stars}</span>
                    <Star size={16} className="text-amber-500 fill-amber-500" />
                  </div>
                  <div className="flex-1 mx-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-amber-500 h-2 rounded-full" 
                        style={{ width: `${item.count}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 w-8 text-right">{item.count}%</span>
                </div>
              ))}

              <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                <h4 className="font-semibold text-primary-900 mb-2">Categorias de Avaliação</h4>
                <div className="space-y-2 text-sm text-primary-700">
                  <div className="flex justify-between">
                    <span>Comida</span>
                    <span>4.8/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Serviço</span>
                    <span>4.6/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ambiente</span>
                    <span>4.7/5</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Reviews */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Avaliações ({reviews.length})
              </h2>
              <Button onClick={handleAddReview}>
                Escrever Avaliação
              </Button>
            </div>

            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma avaliação ainda</h3>
                <p className="text-gray-500 mb-6">Seja o primeiro a avaliar este restaurante!</p>
                <Button onClick={handleAddReview}>
                  Escrever Primeira Avaliação
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantDetail