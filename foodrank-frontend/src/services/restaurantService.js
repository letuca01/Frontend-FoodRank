import api from './api'

export const restaurantService = {
  // Obter todos os restaurantes
  async getRestaurants(filters = {}) {
    const response = await api.get('/restaurants', { params: filters })
    return response.data
  },

  // Obter restaurante por ID
  async getRestaurantById(id) {
    const response = await api.get(`/restaurants/${id}`)
    return response.data
  },

  // Buscar restaurantes
  async searchRestaurants(query, filters = {}) {
    const response = await api.get('/restaurants/search', { 
      params: { q: query, ...filters } 
    })
    return response.data
  },

  // Obter restaurantes por categoria
  async getRestaurantsByCategory(category) {
    const response = await api.get(`/restaurants/category/${category}`)
    return response.data
  },

  // Obter restaurantes favoritos
  async getFavoriteRestaurants() {
    const response = await api.get('/users/favorites')
    return response.data
  },

  // Adicionar restaurante aos favoritos
  async addToFavorites(restaurantId) {
    const response = await api.post(`/users/favorites/${restaurantId}`)
    return response.data
  },

  // Remover restaurante dos favoritos
  async removeFromFavorites(restaurantId) {
    const response = await api.delete(`/users/favorites/${restaurantId}`)
    return response.data
  },

  // Criar novo restaurante (admin)
  async createRestaurant(restaurantData) {
    const response = await api.post('/restaurants', restaurantData)
    return response.data
  },

  // Atualizar restaurante (admin)
  async updateRestaurant(id, restaurantData) {
    const response = await api.put(`/restaurants/${id}`, restaurantData)
    return response.data
  },

  // Deletar restaurante (admin)
  async deleteRestaurant(id) {
    const response = await api.delete(`/restaurants/${id}`)
    return response.data
  }
}