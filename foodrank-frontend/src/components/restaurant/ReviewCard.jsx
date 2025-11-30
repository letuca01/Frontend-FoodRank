import React from 'react'
import { Star, Calendar } from 'lucide-react'
import Card from '../ui/Card'

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}
      />
    ))
  }

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">
            {review.userName.charAt(0)}
          </div>
          <div className="ml-3">
            <h4 className="font-semibold text-gray-900">{review.userName}</h4>
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar size={12} className="mr-1" />
              <span>{new Date(review.date).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          {renderStars(review.rating)}
          <span className="ml-2 font-semibold text-gray-900">{review.rating}.0</span>
        </div>
      </div>
      
      {review.title && (
        <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
      )}
      
      <p className="text-gray-700 mb-4">{review.comment}</p>
      
      <div className="flex space-x-6 text-sm text-gray-600">
        <div>
          <span className="font-medium">Comida:</span> {review.foodRating}/5
        </div>
        <div>
          <span className="font-medium">Serviço:</span> {review.serviceRating}/5
        </div>
        <div>
          <span className="font-medium">Ambiente:</span> {review.ambianceRating}/5
        </div>
      </div>
    </Card>
  )
}

export default ReviewCard