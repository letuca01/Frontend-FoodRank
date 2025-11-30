// Formatar data para exibição
export const formatDate = (dateString, options = {}) => {
  const defaultOptions = { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  }
  
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', { ...defaultOptions, ...options })
}

// Formatar data relativa (ex: "há 2 dias")
export const formatRelativeTime = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now - date
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) {
    return 'hoje'
  } else if (diffInDays === 1) {
    return 'ontem'
  } else if (diffInDays < 7) {
    return `há ${diffInDays} dias`
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7)
    return `há ${weeks} semana${weeks > 1 ? 's' : ''}`
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30)
    return `há ${months} mês${months > 1 ? 'es' : ''}`
  } else {
    const years = Math.floor(diffInDays / 365)
    return `há ${years} ano${years > 1 ? 's' : ''}`
  }
}

// Formatar moeda brasileira
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount)
}

// Formatar distância em metros/quilômetros
export const formatDistance = (meters) => {
  if (meters < 1000) {
    return `${Math.round(meters)}m`
  } else {
    return `${(meters / 1000).toFixed(1)}km`
  }
}

// Formatar tempo de entrega
export const formatDeliveryTime = (minutes) => {
  if (minutes <= 60) {
    return `${minutes} min`
  } else {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h${remainingMinutes > 0 ? ` ${remainingMinutes}min` : ''}`
  }
}

// Formatar número de telefone
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  } else if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }
  
  return phone
}

// Truncar texto longo
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength) + '...'
}