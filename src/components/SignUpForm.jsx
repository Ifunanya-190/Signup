import React, { useState } from 'react'
import skulmartLogo from '../assets/payskul logo.png'
import { IoEye, IoEyeOff } from 'react-icons/io5'

const SignUpForm = ({ onSwitchToLogin, onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    businessEmail: '',
    documentType: '',
    password: '',
    businessAddress: '',
    phoneNumber: '',
    confirmPassword: '',
    agreeToTerms: false,
    documentFile: null
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Save new user to localStorage
  const saveNewUser = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const existingUser = users.find(user => user.businessEmail === userData.businessEmail)
    if (existingUser) {
      throw new Error('User with this email already exists')
    }
    
    users.push(userData)
    localStorage.setItem('users', JSON.stringify(users))
  }

  const saveUserToStorage = (userData) => {
    localStorage.setItem('currentUser', JSON.stringify(userData))
    localStorage.setItem('isLoggedIn', 'true')
  }

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0] // Store the file object
      }))
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.businessName || !formData.businessEmail || !formData.password || !formData.confirmPassword) {
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

    setLoading(true)
    setMessage('')
    
    setTimeout(() => {
      try {
        const newUser = {
          id: Date.now(),
          businessName: formData.businessName,
          businessEmail: formData.businessEmail,
          documentType: formData.documentType,
          password: formData.password,
          businessAddress: formData.businessAddress,
          phoneNumber: formData.phoneNumber,
          documentFile: formData.documentFile ? formData.documentFile.name : null,
          createdAt: new Date().toISOString()
        }
        
        saveNewUser(newUser)
        saveUserToStorage(newUser)
        setMessage('Account created successfully! Redirecting to login...')
        
        setFormData({
          businessName: '',
          businessEmail: '',
          documentType: '',
          password: '',
          businessAddress: '',
          phoneNumber: '',
          confirmPassword: '',
          agreeToTerms: false,
          documentFile: null
        })
        
        setTimeout(() => {
          onSignupSuccess && onSignupSuccess()
          onSwitchToLogin()
        }, 2000)
        
      } catch (error) {
        setMessage(error.message)
      } finally {
        setLoading(false)
      }
    }, 1500)
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
              Sign up
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Let's get you all set up so you can access your skulmart vendor account.
            </p>
          </div>

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
            {/* Business Name */}
            <div className="relative border border-gray-300 rounded-lg pt-4 pb-2 px-3 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500">
              <label className="absolute -top-3 left-3 bg-white px-2 text-sm font-medium text-gray-700">
                Business Name
              </label>
              <input
                name="businessName"
                type="text"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full border-0 focus:outline-none focus:ring-0 p-0 text-gray-900 placeholder-gray-400"
                placeholder="Matthew Enterprise"
              />
            </div>

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

            {/* Document Type & Password */}
            <div className="grid grid-cols-2 gap-4">
              {/* Document Type */}
              <div className="relative border border-gray-300 rounded-lg pt-4 pb-2 px-3 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500">
                <label className="absolute -top-3 left-3 bg-white px-2 text-sm font-medium text-gray-700">
                  Document Type
                </label>
                <input
                  name="documentType"
                  type="text"
                  value={formData.documentType}
                  onChange={handleChange}
                  className="w-full border-0 focus:outline-none focus:ring-0 p-0 text-gray-900 placeholder-gray-400"
                  placeholder="CAC"
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
                    {showPassword ? <IoEyeOff className="h-5 w-5" /> : <IoEye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Business Address */}
            <div className="relative border border-gray-300 rounded-lg pt-4 pb-2 px-3 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500">
              <label className="absolute -top-3 left-3 bg-white px-2 text-sm font-medium text-gray-700">
                Business Address
              </label>
              <textarea
                name="businessAddress"
                rows={2}
                value={formData.businessAddress}
                onChange={handleChange}
                className="w-full border-0 focus:outline-none focus:ring-0 p-0 resize-none text-gray-900 placeholder-gray-400"
                placeholder="No. 7 Ubakason Plaza, Alaba Intl. Market, Lagos"
              />
            </div>

            {/* Phone Number & Upload Document */}
            <div className="grid grid-cols-2 gap-4">
              {/* Phone Number */}
              <div className="relative border border-gray-300 rounded-lg pt-4 pb-2 px-3 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500">
                <label className="absolute -top-3 left-3 bg-white px-2 text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  name="phoneNumber"
                  type="text"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full border-0 focus:outline-none focus:ring-0 p-0 text-gray-900 placeholder-gray-400"
                  placeholder="+234 901 **** 917"
                />
              </div>

              {/* Upload Document */}
            <div className="relative border border-gray-300 rounded-lg pt-4 pb-2 px-3 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500">
              <label className="absolute -top-3 left-3 bg-white px-2 text-sm font-medium text-gray-700">
               Upload Document
              </label>
             <div className="flex items-center justify-between">
             <span className="text-sm text-gray-500">
               {formData.documentFile ? formData.documentFile.name : "No file chosen"}
            </span>
             <label className="cursor-pointer bg-purple-50 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors">
             Choose File
           <input
            name="documentFile"
            type="file"
            onChange={handleChange}
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
           />
           </label>
           </div>
           </div>
            </div>

            <hr className="border-gray-300" />

            {/* Confirm Password */}
            <div className="relative border border-gray-300 rounded-lg pt-4 pb-2 px-3 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500">
              <label className="absolute -top-3 left-3 bg-white px-2 text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="flex items-center">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full border-0 focus:outline-none focus:ring-0 p-0 text-gray-900 placeholder-gray-400"
                  placeholder="••••••"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="text-gray-400 hover:text-purple-500 focus:outline-none ml-2"
                >
                  {showConfirmPassword ? <IoEyeOff className="h-5 w-5" /> : <IoEye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <hr className="border-gray-300" />

            <div className="flex items-center">
              <input
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                I agree to all the <span className='text-red-500'>Terms</span> and <span className='text-red-500'>Privacy Policies</span>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 active:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="font-medium text-red-600 hover:text-purple-500"
                >
                  Login
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
    

export default SignUpForm