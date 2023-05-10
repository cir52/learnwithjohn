import { signIn } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import { IoClose} from "react-icons/io5";

const LoginPage = ({ onClose }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    signIn('credentials', { email, password, callbackUrl: 'http://localhost:3000' })
  }

  const loginPageRef = useRef()
  
  const handleSignIn = (provider) => {
    signIn(provider, { callbackUrl: 'http://localhost:3000' })
  }

  const handleClickOutside = (e) => {
    if (loginPageRef.current && !loginPageRef.current.contains(e.target)) {
      onClose()
    }
  }

  //Escaping the LoginPage
  const handleEscapePress = (e) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscapePress)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapePress)
    };
  }, []);


  return (
<div>
      <div
        className="relative login-page w-full max-w-md bg-white px-5 py-3 bg-opacity-50 border border-white rounded-xl shadow-md"
        ref={loginPageRef}
      >
        <button onClick={onClose} className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-[#ed1b24]">
          <IoClose />
        </button>
        <h2 className="text-xl font-[500] text-gray-700 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-blue-200 rounded-md focus:outline-none focus:border-blue-500 focus-visible:ring-0"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-blue-200 rounded-md focus:outline-none focus:border-blue-500 focus-visible:ring-0"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 shadow-md border border-blue-200 text-gray-700 font-semibold rounded-full hover:bg-blue-500 focus:bg-blue-300 bg-gradient-to-b from-blue-50 to-blue-200"
          >
            Login
          </button>
        </form>
        <div className="mt-6 flex justify-between">
          <button onClick={() => handleSignIn('google')}>Login with Google</button>
          <button onClick={() => handleSignIn('facebook')}>Login with Facebook</button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage