import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    // Simular envio de email
    setTimeout(() => {
      setMessage('Email de recuperação enviado! Verifique sua caixa de entrada.')
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg"></div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Recuperar senha</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Digite seu email para receber o link de recuperação
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {message ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Email enviado!</h3>
              <p className="mt-1 text-sm text-gray-500">{message}</p>
              <div className="mt-6">
                <Link to="/login" className="text-primary-600 hover:text-primary-500 font-medium">
                  Voltar para o login
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input
                label="Email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                autoComplete="email"
              />

              <div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Enviar link de recuperação'}
                </Button>
              </div>

              <div className="text-center">
                <Link to="/login" className="text-sm text-primary-600 hover:text-primary-500">
                  Voltar para o login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword