import React, { useState, useMemo } from 'react'
import { Search, Filter, SlidersHorizontal } from 'lucide-react'
import { useRestaurants } from '../hooks/useRestaurants'
import RestaurantCard from '../components/restaurant/RestaurantCard'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCuisine, setSelectedCuisine] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [ratingFilter, setRatingFilter] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  
  const { restaurants, loading } = useRestaurants()

  const cuisines = ['Todos', 'Brasileira', 'Italiana', 'Japonesa', 'Mexicana', 'Chinesa', 'Árabe', 'Vegetariana']
  const priceRanges = [
    { value: 'all', label: 'Todos os preços' },
    { value: '$', label: '$ - Econômico' },
    { value: '$$', label: '$$ - Moderado' },
    { value: '$$$', label: '$$$ - Caro' }
  ]

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           restaurant.address.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCuisine = selectedCuisine === 'all' || selectedCuisine === 'Todos' || 
                            restaurant.cuisine === selectedCuisine
      
      const matchesPrice = priceRange === 'all' || restaurant.priceRange === priceRange
      
      const matchesRating = restaurant.rating >= ratingFilter

      return matchesSearch && matchesCuisine && matchesPrice && matchesRating
    })
  }, [restaurants, searchTerm, selectedCuisine, priceRange, ratingFilter])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCuisine('all')
    setPriceRange('all')
    setRatingFilter(0)
  }

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Explorar Restaurantes</h1>
          <p className="text-gray-600">Encontre os melhores lugares para comer</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          {/* Search Bar */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Buscar restaurantes, comidas, endereços..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
            <Button
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal size={16} />
              Filtros
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
              {/* Cuisine Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Cozinha
                </label>
                <select
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  className="w-full input-field"
                >
                  {cuisines.map(cuisine => (
                    <option key={cuisine} value={cuisine}>{cuisine}</option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Faixa de Preço
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full input-field"
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating Mínimo
                </label>
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(Number(e.target.value))}
                  className="w-full input-field"
                >
                  <option value={0}>Todos os ratings</option>
                  <option value={4}>⭐ 4.0+</option>
                  <option value={4.5}>⭐ 4.5+</option>
                </select>
              </div>

              {/* Clear Filters */}
              <div className="md:col-span-3 flex justify-end">
                <Button variant="secondary" onClick={clearFilters}>
                  Limpar Filtros
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredRestaurants.length} restaurantes encontrados
            </h2>
            
            {filteredRestaurants.length > 0 && (
              <div className="text-sm text-gray-500">
                Ordenar por: 
                <select className="ml-2 border-none bg-transparent focus:ring-0">
                  <option>Mais bem avaliados</option>
                  <option>Mais próximos</option>
                  <option>Menor preço</option>
                </select>
              </div>
            )}
          </div>

          {filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
              <Search size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum restaurante encontrado</h3>
              <p className="text-gray-500 mb-6">Tente ajustar seus filtros de busca</p>
              <Button onClick={clearFilters}>
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Explore