'use client'

import { registerUser } from '@/features/auth/authTunks'
import { AppDispatch, RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'
import {  useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { FaEyeSlash, FaRegEye } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

type RegisterFormInputs = {
  name: string
  email: string
  password: string
  photo: FileList
}

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { loading,  success } = useSelector((state: RootState) => state.auth)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>()

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('password', data.password)

      if (data.photo && data.photo[0]) {
        formData.append('photo', data.photo[0])
      }

      // dispatch register thunk
      await dispatch(registerUser(formData))
    } catch (error) {
      console.error('Something went wrong:', error)
    }
  }

  if (success) {
    router.push('/login')
  }

  return (
    <div className='bg-gray-100'>
      <div className='container mx-auto min-h-screen flex justify-center'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-white shadow-md my-20 p-6 rounded w-full md:w-1/3'
        >
          <h2 className='capitalize text-center py-3 font-semibold text-xl text-[#2b3445]'>
            welcome to <span className='text-[#e94560]'>ShopeEase</span>
          </h2>

          {/* name field */}
          <div className='flex flex-col text-[#2b3445] space-y-2 font-light'>
            <label>Full Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className='border-2 border-gray-200 rounded py-1 outline-none px-2'
            />
            {errors.name && <span className='text-red-500'>{errors.name.message}</span>}
          </div>

          {/* email field */}
          <div className='flex flex-col text-[#2b3445] space-y-2 font-light mt-3'>
            <label>Email</label>
            <input
              type='email'
              {...register('email', { required: 'Email is required' })}
              className='border-2 border-gray-200 rounded py-1 outline-none px-2'
            />
            {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
          </div>

          {/* password field */}
          <div className='flex flex-col text-[#2b3445] space-y-2 font-light mt-2 relative'>
            <label>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/,
                  message:
                    'Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character',
                },
              })}
              className='border-2 border-gray-200 rounded py-1 outline-none px-2'
            />
            {errors.password && <span className='text-red-500'>{errors.password.message}</span>}

            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-10'
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaRegEye size={18} />}
            </button>
          </div>

          {/* photo field */}
          <div className='flex flex-col text-[#2b3445] space-y-2 font-light mt-2'>
            <label>Photo</label>
            <input
              type='file'
              {...register('photo', { required: 'Photo is required' })}
              className='border-2 border-gray-200 rounded py-1 outline-none px-2'
            />
            {errors.photo && <span className='text-red-500'>{errors.photo.message}</span>}
          </div>

          <button
            type='submit'
            disabled={loading}
            className='mt-5 w-full bg-[#e94560] p-2 rounded text-white font-bold disabled:opacity-50'
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
