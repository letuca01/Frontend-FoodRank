// Formatar número como rating
export const formatRating = (rating) => {
  return Number(rating).toFixed(1)
}

// Formatar número de avaliações
export const formatReviewCount = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k'
  }
  return count.toString()
}

// Calcular idade a partir da data
export const calculateAge = (birthDate) => {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}

// Validar email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validar telefone brasileiro
export const isValidPhone = (phone) => {
  const phoneRegex = /^(\+55)?[\s]?\(?[1-9]{2}\)?[\s]?(?:[2-8]|9[1-9])[0-9]{3}[\s-]?[0-9]{4}$/
  return phoneRegex.test(phone)
}

// Debounce function
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Gerar cor baseada na string (para avatares)
export const stringToColor = (string) => {
  let hash = 0
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  let color = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF
    color += ('00' + value.toString(16)).substr(-2)
  }
  
  return color
}

// Calcular contraste de cor para texto
export const getContrastColor = (hexcolor) => {
  const r = parseInt(hexcolor.substr(1, 2), 16)
  const g = parseInt(hexcolor.substr(3, 2), 16)
  const b = parseInt(hexcolor.substr(5, 2), 16)
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return (yiq >= 128) ? '#000000' : '#FFFFFF'
}