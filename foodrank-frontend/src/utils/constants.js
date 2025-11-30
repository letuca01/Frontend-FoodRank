export const APP_CONFIG = {
  name: 'FoodRank',
  version: '1.0.0',
  apiBaseUrl: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  defaultPageSize: 10,
  maxFileSize: 5 * 1024 * 1024, // 5MB
  supportedImageTypes: ['image/jpeg', 'image/png', 'image/webp']
}

export const CUISINE_TYPES = [
  'Brasileira',
  'Italiana',
  'Japonesa',
  'Chinesa',
  'Mexicana',
  'Árabe',
  'Francesa',
  'Americana',
  'Vegetariana',
  'Vegana',
  'Frutos do Mar',
  'Churrascaria',
  'Fast Food',
  'Doces & Sobremesas',
  'Café & Lanchonete',
  'Bar & Petiscos'
]

export const PRICE_RANGES = [
  { value: '$', label: 'Econômico', description: 'Até R$ 30 por pessoa' },
  { value: '$$', label: 'Moderado', description: 'R$ 30 - R$ 70 por pessoa' },
  { value: '$$$', label: 'Caro', description: 'Acima de R$ 70 por pessoa' }
]

export const RATING_LABELS = {
  1: 'Péssimo',
  2: 'Ruim',
  3: 'Regular',
  4: 'Bom',
  5: 'Excelente'
}

export const DELIVERY_TIMES = [
  '15-25 min',
  '20-30 min',
  '25-35 min',
  '30-40 min',
  '35-45 min',
  '40-50 min',
  '45-55 min',
  '50-60 min'
]