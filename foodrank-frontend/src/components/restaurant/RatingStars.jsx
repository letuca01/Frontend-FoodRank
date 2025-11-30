import React, { useState } from 'react'
import { Star } from 'lucide-react'

const RatingStars = ({ 
  rating = 0, 
  onRatingChange, 
  interactive = false,
  size = 'medium' 
}) => {
  const [hoverRating, setHoverRating] = useState(0)

  const sizes = {
    small: 16,
    medium: 20,
    large: 24
  }

  const handleClick = (newRating) => {
    if (interactive && onRatingChange) {
      onRatingChange(newRating)
    }
  }

  const handleMouseEnter = (starRating) => {
    if (interactive) {
      setHoverRating(starRating)
    }
  }

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0)
    }
  }

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const currentRating = hoverRating || rating
        const isFilled = star <= currentRating
        
        return (
          <button
            key={star}
            type="button"
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} ${
              isFilled ? 'text-amber-500' : 'text-gray-300'
            }`}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            disabled={!interactive}
          >
            <Star 
              size={sizes[size]} 
              className={isFilled ? 'fill-amber-500' : ''}
            />
          </button>
        )
      })}
    </div>
  )
}

export default RatingStars