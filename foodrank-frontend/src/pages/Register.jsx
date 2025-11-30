import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      setLoading(false)
      return
    }

    try {
      await register(formData)
      navigate('/')
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg"></div>
            <span className="ml-2 text-2xl font-bold text-gray-900">FoodRank</span>
          </div>

          <div className="mt-8">
            <h2 className="text-3xl font-bold text-gray-900">Crie sua conta</h2>
            <p className="mt-2 text-sm text-gray-600">
              Já tem uma conta?{' '}
              <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                Faça login
              </Link>
            </p>
          </div>

          <div className="mt-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input
                label="Nome completo"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Seu nome completo"
                autoComplete="name"
              />

              <Input
                label="Email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                autoComplete="email"
              />

              <Input
                label="Senha"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Crie uma senha"
                autoComplete="new-password"
              />

              <Input
                label="Confirmar senha"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirme sua senha"
                autoComplete="new-password"
              />

              <div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? 'Criando conta...' : 'Criar conta'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-success-400 to-success-600">
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white px-8">
              <h3 className="text-4xl font-bold mb-4">Junte-se à comunidade</h3>
              <p className="text-xl opacity-90">Avalie e descubra restaurantes incríveis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register