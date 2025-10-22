import React, { useState } from 'react'

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    businessName: 'Matthew Enterprise',
    businessEmail: 'matthewenterprise@gmail.com',
    documentType: 'CAC',
    password: '',
    businessAddress: 'No. 7 Ubakason Plaza, Alaba Intl. Market, Lagos',
    phoneNumber: '+234 901 **** 917',
    confirmPassword: '',
    agreeToTerms: false,
    rememberMe: false
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Save user to localStorage
  const saveUserToStorage = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('isLoggedIn', 'true')
  }

  // Check user credentials
  const checkUserCredentials = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    return users.find(user => user.businessEmail === email && user.password === password)
  }

  // Save new user
  const saveNewUser = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    users.push(userData)
    localStorage.setItem('users', JSON.stringify(users))
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.businessEmail || !formData.password) {
      setMessage('Please fill all required fields')
      return
    }

    if (!isLogin) {
      if (!formData.businessName || !formData.confirmPassword) {
        setMessage('Please fill all required fields')
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setMessage('Passwords do not match')
        return
      }
      if (!formData.agreeToTerms) {
        setMessage('Please agree to the terms and conditions')
        return
      }
    }

    setLoading(true)
    
    setTimeout(() => {
      setLoading(false)
      
      if (isLogin) {
        const user = checkUserCredentials(formData.businessEmail, formData.password)
        if (user) {
          saveUserToStorage(user)
          setMessage('Login successful!')
          // Redirect to dashboard or next page here
        } else {
          setMessage('Invalid email or password')
        }
      } else {
        const newUser = {
          id: Date.now(),
          businessName: formData.businessName,
          businessEmail: formData.businessEmail,
          documentType: formData.documentType,
          password: formData.password,
          businessAddress: formData.businessAddress,
          phoneNumber: formData.phoneNumber,
          createdAt: new Date().toISOString()
        }
        
        saveNewUser(newUser)
        saveUserToStorage(newUser)
        setMessage('Account created successfully!')
        
        // Switch to login after successful signup
        setTimeout(() => {
          setIsLogin(true)
          setMessage('')
        }, 2000)
      }
    }, 1000)
  }

  const switchMode = () => {
    setIsLogin(!isLogin)
    setFormData({
      businessName: 'Matthew Enterprise',
      businessEmail: 'matthewenterprise@gmail.com',
      documentType: 'CAC',
      password: '',
      businessAddress: 'No. 7 Ubakason Plaza, Alaba Intl. Market, Lagos',
      phoneNumber: '+234 901 **** 917',
      confirmPassword: '',
      agreeToTerms: false,
      rememberMe: false
    })
    setMessage('')
  }

  // Reusable form field component
  const FormField = ({ label, name, type = 'text', value, onChange, placeholder }) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <div className="mt-1">
          <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {isLogin ? 'Login' : 'Sign up'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin 
                ? 'Login to access your skulmart vendor account' 
                : 'Let\'s get you all set up so you can access your skulmart vendor account'
              }
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
            {/* SIGNUP FIELDS */}
            {!isLogin && (
              <>
                <FormField
                  label="Business Name"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                />

                <FormField
                  label="Business Email"
                  name="businessEmail"
                  type="email"
                  value={formData.businessEmail}
                  onChange={handleChange}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Document Type"
                    name="documentType"
                    value={formData.documentType}
                    onChange={handleChange}
                  />
                  <FormField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Address
                  </label>
                  <textarea
                    name="businessAddress"
                    rows={2}
                    value={formData.businessAddress}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Document
                    </label>
                    <div className="flex items-center">
                      <span className="block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-600 bg-gray-50 text-sm">
                        cac_registration.pdf
                      </span>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-300" />

                <FormField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••"
                />

                <hr className="border-gray-300" />

                <div className="flex items-center">
                  <input
                    name="agreeToTerms"
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    I agree to all the Terms and Privacy Policies
                  </label>
                </div>
              </>
            )}

            {/* LOGIN FIELDS */}
            {isLogin && (
              <>
                <FormField
                  label="Business Email"
                  name="businessEmail"
                  type="email"
                  value={formData.businessEmail}
                  onChange={handleChange}
                />

                <FormField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••"
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      name="rememberMe"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
                  <div>
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                      Forgot Password
                    </a>
                  </div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Create account')}
              </button>
            </div>

            {/* Switch Mode */}
            <div className="text-center">
              <span className="text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={switchMode}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  {isLogin ? 'Sign up' : 'Login'}
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
  )
}

export default AuthForm