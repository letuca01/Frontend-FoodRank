import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Star, Clock, MapPin } from 'lucide-react'
import { useRestaurants } from '../hooks/useRestaurants'
import RestaurantCard from '../components/restaurant/RestaurantCard'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { restaurants, loading } = useRestaurants()

  const featuredRestaurants = restaurants.slice(0, 6)
  const categories = [
    { name: 'Brasileira', icon: '🇧🇷', count: 24 },
    { name: 'Italiana', icon: '🇮🇹', count: 18 },
    { name: 'Japonesa', icon: '🇯🇵', count: 15 },
    { name: 'Fast Food', icon: '🍔', count: 32 },
    { name: 'Vegetariana', icon: '🥗', count: 12 },
    { name: 'Doces', icon: '🍰', count: 8 },
    { name: 'Frutos do Mar', icon: '🦞', count: 9 },
    { name: 'Churrascaria', icon: '🥩', count: 11 }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando restaurantes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Descubra restaurantes{' '}
              <span className="text-amber-300">incríveis</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Baseado em avaliações reais da comunidade FoodRank
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="text"
                    placeholder="Buscar restaurantes, comidas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 text-gray-900"
                  />
                </div>
                <Button className="px-8 py-3 bg-amber-500 hover:bg-amber-600 border-amber-500">
                  Buscar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Restaurants */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Restaurantes em Destaque</h2>
              <p className="text-gray-600 mt-2">Os mais bem avaliados pela comunidade</p>
            </div>
            <Link to="/explore">
              <Button variant="secondary">
                Ver todos
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Categorias Populares</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to="/explore"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow duration-200 group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} restaurantes</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">1,247</div>
              <div className="text-gray-600">Restaurantes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success-600 mb-2">8,956</div>
              <div className="text-gray-600">Avaliações</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-warning-600 mb-2">4.8</div>
              <div className="text-gray-600">Rating Médio</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">2,134</div>
              <div className="text-gray-600">Usuários</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home