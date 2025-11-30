import { useState, useEffect } from 'react'

// Dados mockados - substitua por chamadas reais da API
const mockReviews = [
  {
    id: 1,
    userId: 1,
    userName: 'João Silva',
    userAvatar: 'JS',
    restaurantId: 1,
    rating: 4.5,
    title: 'Experiência incrível!',
    comment: 'Comida excelente e atendimento perfeito! Recomendo o feijão tropeiro e a picanha. Ambiente muito agradável e preço justo.',
    date: '2024-01-15',
    foodRating: 5,
    serviceRating: 4,
    ambianceRating: 4,
    likes: 12,
    isLiked: false
  },
  {
    id: 2,
    userId: 2,
    userName: 'Maria Santos',
    userAvatar: 'MS',
    restaurantId: 2,
    rating: 5,
    title: 'Melhor pizza da cidade!',
    comment: 'A massa é perfeita, crocante por fora e macia por dentro. Experimentei a pizza margherita e estava divina. Atendimento muito atencioso.',
    date: '2024-01-10',
    foodRating: 5,
    serviceRating: 5,
    ambianceRating: 5,
    likes: 25,
    isLiked: true
  }
]

export const useReviews = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Simular carregamento de reviews
    setReviews(mockReviews)
  }, [])

  const getReviewsByRestaurant = (restaurantId) => {
    return reviews.filter(review => review.restaurantId === restaurantId)
  }

  const getUserReviews = (userId) => {
    return reviews.filter(review => review.userId === userId)
  }

  const addReview = async (reviewData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newReview = {
          id: reviews.length + 1,
          ...reviewData,
          likes: 0,
          isLiked: false
        }
        setReviews(prev => [newReview, ...prev])
        resolve(newReview)
      }, 1000)
    })
  }

  const likeReview = (reviewId) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { 
            ...review, 
            likes: review.isLiked ? review.likes - 1 : review.likes + 1,
            isLiked: !review.isLiked 
          }
        : review
    ))
  }

  return {
    reviews,
    loading,
    getReviewsByRestaurant,
    getUserReviews,
    addReview,
    likeReview
  }
}