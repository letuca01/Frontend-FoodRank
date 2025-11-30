import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Search, User, LogOut } from 'lucide-react'
import Button from '../ui/Button'

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FR</span>
            </div>
            <span className="text-xl font-bold text-gray-900">FoodRank</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/explore" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Explorar
            </Link>
            <Link to="/rankings" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Ranking
            </Link>
            {user ? (
              <Link to="/profile" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Perfil
              </Link>
            ) : null}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-700 hidden sm:block">
                  Olá, {user.name}
                </span>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={handleLogout}
                  className="flex items-center space-x-2"
                >
                  <LogOut size={16} />
                  <span>Sair</span>
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="secondary" size="small">
                    Entrar
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="small">
                    Cadastrar
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header