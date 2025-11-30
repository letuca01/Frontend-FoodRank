import api from './api'

export const reviewService = {
  // Obter avaliações de um restaurante
  async getRestaurantReviews(restaurantId, page = 1, limit = 10) {
    const response = await api.get(`/restaurants/${restaurantId}/reviews`, {
      params: { page, limit }
    })
    return response.data
  },

  // Obter avaliações de um usuário
  async getUserReviews(userId, page = 1, limit = 10) {
    const response = await api.get(`/users/${userId}/reviews`, {
      params: { page, limit }
    })
    return response.data
  },

  // Criar nova avaliação
  async createReview(reviewData) {
    const response = await api.post('/reviews', reviewData)
    return response.data
  },

  // Atualizar avaliação
  async updateReview(reviewId, reviewData) {
    const response = await api.put(`/reviews/${reviewId}`, reviewData)
    return response.data
  },

  // Deletar avaliação
  async deleteReview(reviewId) {
    const response = await api.delete(`/reviews/${reviewId}`)
    return response.data
  },

  // Curtir avaliação
  async likeReview(reviewId) {
    const response = await api.post(`/reviews/${reviewId}/like`)
    return response.data
  },

  // Remover curtida da avaliação
  async unlikeReview(reviewId) {
    const response = await api.delete(`/reviews/${reviewId}/like`)
    return response.data
  },

  // Reportar avaliação
  async reportReview(reviewId, reason) {
    const response = await api.post(`/reviews/${reviewId}/report`, { reason })
    return response.data
  }
}