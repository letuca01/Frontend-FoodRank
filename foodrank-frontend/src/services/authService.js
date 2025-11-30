// Serviço mockado - substitua por chamadas reais da API quando o backend estiver pronto
export const authService = {
  // Login de usuário (mock)
  async login(credentials) {
    // Simular chamada API
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          id: 1,
          name: credentials.email.split('@')[0],
          email: credentials.email
        }
        
        localStorage.setItem('authToken', 'mock-jwt-token')
        localStorage.setItem('user', JSON.stringify(user))
        
        resolve({
          token: 'mock-jwt-token',
          user: user
        })
      }, 1000)
    })
  },

  // Registro de novo usuário (mock)
  async register(userData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          id: 1,
          name: userData.name,
          email: userData.email
        }
        
        localStorage.setItem('authToken', 'mock-jwt-token')
        localStorage.setItem('user', JSON.stringify(user))
        
        resolve({
          token: 'mock-jwt-token',
          user: user
        })
      }, 1000)
    })
  },

  // Logout
  logout() {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  },

  // Obter usuário atual
  getCurrentUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  // Obter token
  getToken() {
    return localStorage.getItem('authToken')
  },

  // Verificar se está autenticado
  isAuthenticated() {
    return !!localStorage.getItem('authToken')
  }
}