import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useReviews } from '../hooks/useReviews'
import { Edit3, Mail, Calendar, Star, MapPin, Phone } from 'lucide-react'
import ReviewCard from '../components/restaurant/ReviewCard'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'

const Profile = () => {
  const { user, logout } = useAuth()
  const { getUserReviews } = useReviews()
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '(11) 99999-9999',
    address: 'São Paulo, SP'
  })

  const userReviews = getUserReviews(user?.id)

  const stats = [
    { label: 'Avaliações', value: userReviews.length, color: 'blue' },
    { label: 'Rating Médio', value: '4.8', color: 'green' },
    { label: 'Seguidores', value: '156', color: 'purple' },
    { label: 'Seguindo', value: '89', color: 'amber' }
  ]

  const handleSave = () => {
    // Aqui você implementaria a atualização do perfil
    setIsEditing(false)
    // updateUserProfile(editForm)
  }

  const handleCancel = () => {
    setEditForm({
      name: user?.name || '',
      email: user?.email || '',
      phone: '(11) 99999-9999',
      address: 'São Paulo, SP'
    })
    setIsEditing(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Faça login para ver seu perfil</h2>
          <Button onClick={() => window.location.href = '/login'}>
            Fazer Login
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-primary-600 border-4 border-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-white">
                  {isEditing ? (
                    <Input
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="text-2xl font-bold bg-white/20 border-white text-white placeholder-white/70"
                      placeholder="Seu nome"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold">{user.name}</h1>
                  )}
                  <div className="flex items-center space-x-4 mt-2 text-white/90">
                    <div className="flex items-center">
                      <Mail size={16} className="mr-1" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      <span>Membro desde Jan 2024</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-0">
                {isEditing ? (
                  <div className="flex space-x-3">
                    <Button variant="secondary" onClick={handleCancel}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSave}>
                      Salvar
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2"
                  >
                    <Edit3 size={16} />
                    <span>Editar Perfil</span>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-2xl font-bold text-${stat.color}-600 mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Info */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações de Contato</h3>
              <div className="space-y-3">
                {isEditing ? (
                  <>
                    <Input
                      label="Telefone"
                      value={editForm.phone}
                      onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="(11) 99999-9999"
                    />
                    <Input
                      label="Localização"
                      value={editForm.address}
                      onChange={(e) => setEditForm(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Sua cidade, estado"
                    />
                  </>
                ) : (
                  <>
                    <div className="flex items-center text-gray-600">
                      <Phone size={16} className="mr-3" />
                      <span>{editForm.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-3" />
                      <span>{editForm.address}</span>
                    </div>
                  </>
                )}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                <Button variant="secondary" className="w-full justify-center">
                  Minhas Avaliações
                </Button>
                <Button variant="secondary" className="w-full justify-center">
                  Restaurantes Favoritos
                </Button>
                <Button variant="secondary" className="w-full justify-center">
                  Configurações
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full justify-center text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={logout}
                >
                  Sair
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Recent Reviews */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Minhas Avaliações Recentes</h2>
                <span className="text-sm text-gray-500">{userReviews.length} avaliações</span>
              </div>

              {userReviews.length > 0 ? (
                <div className="space-y-6">
                  {userReviews.slice(0, 5).map(review => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                  
                  {userReviews.length > 5 && (
                    <div className="text-center pt-4">
                      <Button variant="secondary">
                        Ver Todas as Avaliações
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Star size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma avaliação ainda</h3>
                  <p className="text-gray-500 mb-6">Comece a explorar restaurantes e compartilhe suas experiências!</p>
                  <Button onClick={() => window.location.href = '/explore'}>
                    Explorar Restaurantes
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile