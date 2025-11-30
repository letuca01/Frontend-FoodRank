import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/layout/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Explore from './pages/Explore'
import RestaurantDetail from './pages/RestaurantDetail'
import ReviewForm from './pages/ReviewForm'
import Profile from './pages/Profile'
import Rankings from './pages/Rankings'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/restaurant/:id" element={<RestaurantDetail />} />
              <Route path="/review/:restaurantId" element={<ReviewForm />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/rankings" element={<Rankings />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App