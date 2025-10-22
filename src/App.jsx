import React, { useState } from 'react'
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LoginForm'

function App() {
  const [currentPage, setCurrentPage] = useState('login')
  const [user, setUser] = useState(null)

  const switchToSignup = () => {
    setCurrentPage('signup')
  }

  const switchToLogin = () => {
    setCurrentPage('login')
  }

  const handleLoginSuccess = (userData) => {
    setUser(userData)
    console.log('User logged in:', userData)
    // Here you can redirect to dashboard or show success message
  }

  const handleSignupSuccess = () => {
    console.log('Signup successful, switching to login')
  }

  return (
    <div className="App">
      {currentPage === 'login' ? (
        <LoginForm 
          onSwitchToSignup={switchToSignup}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : (
        <SignUpForm 
          onSwitchToLogin={switchToLogin}
          onSignupSuccess={handleSignupSuccess}
        />
      )}
    </div>
  )
}

export default App