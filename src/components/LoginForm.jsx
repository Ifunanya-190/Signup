import React, { useState } from 'react'
import skulmartLogo from '../assets/payskul logo.png'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const LoginForm = ({ onSwitchToSignup, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    businessEmail: '',
    password: '',
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Check user credentials
  const checkUserCredentials = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    return users.find(user => user.businessEmail === email && user.password === password)
  }

  const saveUserToStorage = (userData) => {
    localStorage.setItem('currentUser', JSON.stringify(userData))
    localStorage.setItem('isLoggedIn', 'true')
    if (formData.rememberMe) {
      localStorage.setItem('rememberedUser', userData.businessEmail)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.businessEmail || !formData.password) {
      setMessage('Please fill all fields')
      return
    }

    setLoading(true)
    setMessage('')
    
    setTimeout(() => {
      const user = checkUserCredentials(formData.businessEmail, formData.password)
      if (user) {
        saveUserToStorage(user)
        setMessage('Login successful! Redirecting...')
        
        // Reset form
        setFormData({
          businessEmail: '',
          password: '',
          rememberMe: false
        })
        
        // Call success callback
        setTimeout(() => {
          onLoginSuccess && onLoginSuccess(user)
        }, 1500)
      } else {
        setMessage('Invalid email or password')
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="text-center mb-8">
          <div className='flex items-center justify-start mb-6'>
           <img 
        src={skulmartLogo} 
        alt="Skulmart" 
        className="h-10 mr-3 text-gray-900  "
      />
      <h2 className="text-2xl mr-4 font-bold text-gray-300">
        SKUL 
        <span className='text-gray-800'>MART</span>
      </h2>
          </div>
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Login
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Login to access your skulmart vendor account
            </p>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`mb-4 p-3 rounded-md text-sm ${
              message.includes('successful') 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Business Email */}
            <div className="relative border border-gray-300 rounded-lg pt-4 pb-2 px-3 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500">
              <label className="absolute -top-3 left-3 bg-white px-2 text-sm font-medium text-gray-700">
                Business Email
              </label>
              <input
                name="businessEmail"
                type="email"
                value={formData.businessEmail}
                onChange={handleChange}
                className="w-full border-0 focus:outline-none focus:ring-0 p-0 text-gray-900 placeholder-gray-400"
                placeholder="matthewenterprise@gmail.com"
              />
            </div>

            {/* Password */}
            <div className="relative border border-gray-300 rounded-lg pt-4 pb-2 px-3 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500">
              <label className="absolute -top-3 left-3 bg-white px-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="flex items-center">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border-0 focus:outline-none focus:ring-0 p-0 text-gray-900 placeholder-gray-400"
                  placeholder="••••••"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-400 hover:text-purple-500 focus:outline-none ml-2"
                >
                  {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div>
                <a href="#" className="text-sm text-red-600 hover:text-purple-500">
                  Forgot Password
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 active:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Login'}
              </button>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={onSwitchToSignup}
                  className="font-medium text-red-600 hover:text-purple-500"
                >
                  Sign up
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block flex-1 bg-gray-100">
        <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
          <div className="text-center">
            <div className="w-64 h-64 bg-blue-200 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-500 text-sm">Your Image Here</span>
            </div>
            <p className="text-gray-500 text-sm">
              Add your image in this area
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default LoginForm