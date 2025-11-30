import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
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

    try {
      await login(formData)
      navigate('/')
    } catch (err) {
      setError('Email ou senha incorretos')
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
            <h2 className="text-3xl font-bold text-gray-900">Entre na sua conta</h2>
            <p className="mt-2 text-sm text-gray-600">
              Ou{' '}
              <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
                crie uma nova conta
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
                placeholder="Sua senha"
                autoComplete="current-password"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Lembrar de mim
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
                    Esqueceu sua senha?
                  </Link>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-primary-400 to-primary-600">
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white px-8">
              <h3 className="text-4xl font-bold mb-4">Descubra os melhores restaurantes</h3>
              <p className="text-xl opacity-90">Baseado em avaliações reais da comunidade</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login