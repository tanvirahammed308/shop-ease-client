'use client'

import { loginUser } from '@/features/auth/authTunks'
import { AppDispatch, RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { FaEyeSlash, FaRegEye } from 'react-icons/fa'

type LoginFormInputs = {
  email: string
  password: string
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>()

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true)
    try {
      await dispatch(loginUser(data)).unwrap()
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      console.log(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  
  useEffect(() => {
    // console.log('redux user',user);
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    }
  }, [isAuthenticated, user, router])

  return (
    <div className='bg-gray-100 min-h-screen flex items-center justify-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white shadow-md p-6 rounded w-full md:w-1/3'
      >
        <h2 className='text-center text-xl font-semibold py-3 text-[#2b3445]'>
          Welcome back to <span className='text-[#e94560]'>ShopeEase</span>
        </h2>

        {/* Email */}
        <div className='flex flex-col mt-3'>
          <label>Email</label>
          <input
            type='email'
            {...register('email', { required: 'Email is required' })}
            className='border-2 border-gray-200 rounded py-1 px-2 outline-none'
          />
          {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
        </div>

        {/* Password */}
        <div className='flex flex-col mt-3 relative'>
          <label>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password', { required: 'Password is required' })}
            className='border-2 border-gray-200 rounded py-1 px-2 outline-none'
          />
          <button
            type='button'
            className='absolute right-3 top-9'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaRegEye />}
          </button>
          {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
        </div>

        <button
          type='submit'
          disabled={loading}
          className='mt-5 w-full bg-[#e94560] text-white font-bold py-2 rounded disabled:opacity-50'
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login
