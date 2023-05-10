import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { IoClose} from "react-icons/io5"
import GoogleLogo from '../../public/assets/images/GoogleLogo.png'
import FacebookLogo from '../../public/assets/images/FacebookLogo.png'

const LoginPage = ({ onClose, expiredSession = false }) => {

  const [email, setEmail] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    signIn('email', { email, callbackUrl: 'http://localhost:3000' })
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
  }, [])

  const loginDescription = expiredSession
                            ? `Your session has expired. To regain access, please sign in again using your email address. You will receive an email containing a unique, time-sensitive login link. Click the link in the email to verify your identity and complete the sign-in process.`
                            : `By signing in with your email address, you can quickly and securely access your account without the need for a password. Simply enter your email address and click the "Login" button. You will receive an email containing a unique, time-sensitive login link. Click the link in the email to verify your identity and complete the sign-in process. Once you're signed in, you can manage your account settings and preferences at any time. We value your privacy and will never share your information without your consent.`

  return (
<div>
      <div
        className="login-page-container max-h-[95vh] overflow-y-auto relative login-page w-full max-w-md bg-white px-5 py-3 bg-opacity-50 border border-white rounded-xl shadow-md"
        ref={loginPageRef}
      >
        <button onClick={onClose} className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-[#ed1b24]">
          <IoClose />
        </button>
        <h2 className="text-xl font-[500] text-gray-700 mb-6">Login</h2>
        <div className='text-sm text-justify pb-5'>
            {loginDescription}
        </div>
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
          <button
            type="submit"
            disabled={!termsAccepted}
            className={`w-full py-2 px-4 shadow border border-blue-200 text-gray-700 font-semibold rounded-md bg-gradient-to-b from-blue-50 to-blue-200 hover:bg-gradient-to-b hover:from-blue-100 hover:to-blue-300 active:shadow-none ${
              !termsAccepted ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Login
          </button>
        
        </form>
        <div className="flex justify-center items-center my-6">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mr-2"
            />
             <label htmlFor="terms" className="text-sm font-[600]">
              I have read and agree to the{' '}
              <a href="/terms" target="_blank" className="text-blue-500">
                terms and conditions
              </a>
            </label>
          </div> 
        <div className="flex flex-col gap-4">
          <button 
                className={`w-full flex items-center justify-center gap-4 py-2 px-4 shadow- border border-blue-200 text-gray-700 font-semibold rounded-md bg-gradient-to-b from-blue-50 to-blue-200 hover:bg-gradient-to-b hover:from-blue-100 hover:to-blue-300 active:shadow-none ${
                  !termsAccepted ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => handleSignIn('google')}
            >
              <Image
                    className='cursor-pointer w-[20px]'
                    src={GoogleLogo}
                    alt='GoogleLogo'
              />
              Sign in with Google
          </button>
          <button 
                className={`w-full flex items-center justify-center gap-4 py-2 px-4 shadow border border-blue-200 text-gray-700 font-semibold rounded-md bg-gradient-to-b from-blue-50 to-blue-200 hover:bg-gradient-to-b hover:from-blue-100 hover:to-blue-300 active:shadow-none ${
                  !termsAccepted ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => handleSignIn('facebook')}>
              <Image
                    className='cursor-pointer w-[30px]'
                    src={FacebookLogo}
                    alt='FacebookLogo'
              />
              Sign in with Facebook
            </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage