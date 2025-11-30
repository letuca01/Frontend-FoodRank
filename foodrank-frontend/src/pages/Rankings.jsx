import React, { useState, useMemo } from 'react'
import { Crown, Star, TrendingUp, Award } from 'lucide-react'
import { useRestaurants } from '../hooks/useRestaurants'
import RestaurantCard from '../components/restaurant/RestaurantCard'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const Rankings = () => {
  const { restaurants } = useRestaurants()
  const [activeCategory, setActiveCategory] = useState('overall')

  const categories = [
    { id: 'overall', name: 'Geral', icon: Crown },
    { id: 'food', name: 'Comida', icon: Star },
    { id: 'service', name: 'Serviço', icon: Award },
    { id: 'trending', name: 'Em Alta', icon: TrendingUp }
  ]

  const rankedRestaurants = useMemo(() => {
    let sorted = [...restaurants]
    
    switch (activeCategory) {
      case 'food':
        // Simular ranking por qualidade da comida
        sorted.sort((a, b) => (b.rating + 0.2) - (a.rating + 0.2))
        break
      case 'service':
        // Simular ranking por serviço
        sorted.sort((a, b) => (b.rating + 0.1) - (a.rating + 0.1))
        break
      case 'trending':
        // Simular restaurantes em alta (mais reviews recentes)
        sorted.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      default:
        // Ranking geral por rating
        sorted.sort((a, b) => b.rating - a.rating)
    }
    
    return sorted.slice(0, 20) // Top 20
  }, [restaurants, activeCategory])

  const getRankColor = (rank) => {
    if (rank === 1) return 'from-yellow-400 to-amber-500'
    if (rank === 2) return 'from-gray-400 to-gray-500'
    if (rank === 3) return 'from-amber-700 to-amber-800'
    return 'from-primary-500 to-primary-600'
  }

  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return rank
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center">
              <Crown size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Top Restaurantes</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubra os estabelecimentos mais bem avaliados pela comunidade FoodRank
          </p>
        </div>

        {/* Category Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map(category => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? 'primary' : 'secondary'}
                  onClick={() => setActiveCategory(category.id)}
                  className="flex items-center space-x-2 min-w-[120px]"
                >
                  <Icon size={16} />
                  <span>{category.name}</span>
                </Button>
              )
            })}
          </div>
        </Card>

        {/* Rankings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top 3 */}
          {rankedRestaurants.slice(0, 3).map((restaurant, index) => (
            <Card key={restaurant.id} className={`p-6 relative overflow-hidden ${
              index === 0 ? 'lg:col-span-2' : ''
            }`}>
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r ${getRankColor(index + 1)} opacity-5`}></div>
              
              <div className="relative flex items-center space-x-6">
                {/* Rank Badge */}
                <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r ${getRankColor(index + 1)} rounded-2xl flex items-center justify-center text-white font-bold text-xl`}>
                  {getRankIcon(index + 1)}
                </div>

                {/* Restaurant Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{restaurant.name}</h3>
                      <p className="text-gray-600">{restaurant.cuisine} • {restaurant.address}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end mb-1">
                        <Star size={20} className="text-amber-500 fill-amber-500 mr-1" />
                        <span className="text-lg font-bold text-gray-900">{restaurant.rating}</span>
                      </div>
                      <p className="text-sm text-gray-500">{restaurant.reviewCount} avaliações</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      restaurant.isOpen 
                        ? 'bg-success-100 text-success-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {restaurant.isOpen ? '🟢 Aberto' : '🔴 Fechado'}
                    </span>
                    <span className="text-gray-600">{restaurant.deliveryTime}</span>
                  </div>
                </div>
              </div>

              {/* Special Badge for #1 */}
              {index === 0 && (
                <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  🏆 Melhor Avaliado
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Rest of Rankings */}
        <div className="space-y-4">
          {rankedRestaurants.slice(3).map((restaurant, index) => (
            <Card key={restaurant.id} className="p-6">
              <div className="flex items-center space-x-6">
                {/* Rank */}
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">
                  {index + 4}
                </div>

                {/* Restaurant Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
                      <p className="text-gray-600 text-sm">{restaurant.cuisine} • {restaurant.address}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end mb-1">
                        <Star size={16} className="text-amber-500 fill-amber-500 mr-1" />
                        <span className="font-semibold text-gray-900">{restaurant.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500">{restaurant.reviewCount} avaliações</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      restaurant.isOpen 
                        ? 'bg-success-100 text-success-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>

                      {restaurant.isOpen ? '🟢 Aberto' : '🔴 Fechado'}
