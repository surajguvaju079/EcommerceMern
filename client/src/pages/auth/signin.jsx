import CommonForm from '@/components/common/form'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { loginFormControls } from '@/config'
import { useDispatch } from 'react-redux'
import { loginUser } from '@/store/auth-slice'
import { useToast } from '@/hooks/use-toast'
const initialState = {
  email:'',
  password:''
}

const LoginAuth = () => {
  const {toast} = useToast()
  const dispatch = useDispatch()
  //const navigate = useNavigate()
  const onSubmit =(e)=>{
    e.preventDefault();
    dispatch(loginUser(formData)).then((data)=>{
      console.log(data)
      if(data?.payload?.success){
        //navigate('/shop')
        toast({
          title:data?.payload?.message,
          variant:'destructive'
        })
      }
        else
        {
          toast({
            title:data?.payload?.message,
            variant:'destructive'
          })
        }
      
    })
    


  }
  const [formData,setFormData] = useState(initialState)
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
     <div className='text-center'>
      <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sign in your account</h1>
      <p className='mt-2'>Don't have an account</p>
      <Link className="font-medium ml-2 text-primary hover:underline" to='/auth/register'>Sign Up</Link>
      </div>
      <CommonForm
      formControl={loginFormControls}
      buttonText={'Sign In'}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      /> 
    </div>
  )
}

export default LoginAuth