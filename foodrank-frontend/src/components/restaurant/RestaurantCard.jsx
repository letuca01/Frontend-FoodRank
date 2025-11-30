import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, MapPin } from 'lucide-react'
import Card from '../ui/Card'

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/restaurant/${restaurant.id}`)
  }

  return (
    <Card hover className="overflow-hidden" onClick={handleClick}>
      <div className="aspect-w-16 aspect-h-9">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
            {restaurant.name}
          </h3>
          <div className="flex items-center bg-success-100 text-success-800 px-2 py-1 rounded text-sm font-medium">
            <span>⭐ {restaurant.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-2">
          {restaurant.cuisine} • {restaurant.priceRange}
        </p>
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin size={14} className="mr-1" />
          <span className="line-clamp-1">{restaurant.address}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-600 text-sm">
            <Clock size={14} className="mr-1" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <span className={`text-sm font-medium ${
            restaurant.isOpen ? 'text-success-600' : 'text-red-600'
          }`}>
            {restaurant.isOpen ? '🟢 Aberto' : '🔴 Fechado'}
          </span>
        </div>
      </div>
    </Card>
  )
}

export default RestaurantCard