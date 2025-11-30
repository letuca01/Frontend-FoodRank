import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useReviews } from '../hooks/useReviews'
import { useRestaurants } from '../hooks/useRestaurants'
import RatingStars from '../components/restaurant/RatingStars'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const ReviewForm = () => {
  const { restaurantId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addReview } = useReviews()
  const { getRestaurantById } = useRestaurants()
  
  const restaurant = getRestaurantById(parseInt(restaurantId))

  const [formData, setFormData] = useState({
    rating: 0,
    foodRating: 0,
    serviceRating: 0,
    ambianceRating: 0,
    comment: '',
    title: ''
  })
  const [loading, setLoading] = useState(false)

  const handleRatingChange = (category, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: value
    }))
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!user) {
      navigate('/login')
      return
    }

    if (formData.rating === 0) {
      alert('Por favor, selecione uma avaliação geral')
      return
    }

    setLoading(true)

    try {
      const reviewData = {
        ...formData,
        restaurantId: parseInt(restaurantId),
        userId: user.id,
        userName: user.name,
        userAvatar: user.name.charAt(0),
        date: new Date().toISOString().split('T')[0]
      }

      await addReview(reviewData)
      navigate(`/restaurant/${restaurantId}`)
    } catch (error) {
      console.error('Error submitting review:', error)
      alert('Erro ao enviar avaliação. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Faça login para avaliar</h2>
          <p className="text-gray-600 mb-6">Você precisa estar logado para escrever uma avaliação.</p>
          <Button onClick={() => navigate('/login')}>
            Fazer Login
          </Button>
        </Card>
      </div>
    )
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Restaurante não encontrado</h1>
          <Button onClick={() => navigate('/explore')}>
            Voltar para Explorar
          </Button>
        </div>
      </div>
    )
  }

  const isFormValid = formData.rating > 0 && formData.comment.trim().length > 0

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Avaliar {restaurant.name}
            </h1>
            <p className="text-gray-600">
              Compartilhe sua experiência para ajudar outros usuários
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Overall Rating */}
            <div className="text-center">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Avaliação Geral
              </label>
              <RatingStars
                rating={formData.rating}
                onRatingChange={(value) => handleRatingChange('rating', value)}
                interactive={true}
                size="large"
              />
              {formData.rating > 0 && (
                <p className="mt-2 text-sm text-gray-600">
                  Você avaliou com {formData.rating} estrela{formData.rating > 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Detailed Ratings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Qualidade da Comida
                </label>
                <RatingStars
                  rating={formData.foodRating}
                  onRatingChange={(value) => handleRatingChange('foodRating', value)}
                  interactive={true}
                />
              </div>

              <div className="text-center">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Atendimento
                </label>
                <RatingStars
                  rating={formData.serviceRating}
                  onRatingChange={(value) => handleRatingChange('serviceRating', value)}
                  interactive={true}
                />
              </div>

              <div className="text-center">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Ambiente
                </label>
                <RatingStars
                  rating={formData.ambianceRating}
                  onRatingChange={(value) => handleRatingChange('ambianceRating', value)}
                  interactive={true}
                />
              </div>
            </div>

            {/* Review Title */}
            <Input
              label="Título da Avaliação (Opcional)"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: Experiência incrível!"
              maxLength={100}
            />

            {/* Review Comment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sua Avaliação *
              </label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 resize-none"
                placeholder="Compartilhe detalhes da sua experiência: qualidade da comida, atendimento, ambiente, preços, etc."
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.comment.length}/500 caracteres
              </p>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Dicas para uma boa avaliação:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Seja específico sobre o que gostou ou não gostou</li>
                <li>• Mencione pratos que experimentou</li>
                <li>• Descreva o ambiente e atendimento</li>
                <li>• Seja honesto e construtivo</li>
              </ul>
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4 pt-4">
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={() => navigate(`/restaurant/${restaurantId}`)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={!isFormValid || loading}
              >
                {loading ? 'Enviando...' : 'Publicar Avaliação'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default ReviewForm