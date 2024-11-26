import CommonForm from '@/components/common/form'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { registerFormControls } from '@/config'
import { useDispatch } from 'react-redux'
import { registerUser } from '@/store/auth-slice'
import { useToast } from '@/hooks/use-toast'
const initialState = {
  username:'',
  email:'',
  password:''
}
const RegisterAuth = () => {
  const {toast} = useToast()
  const dispatch = useDispatch()
 // const [errorHandler,setErrorHandler]=useState();
  const navigate = useNavigate()
  const onSubmit =(e)=>{
    e.preventDefault()
    dispatch(registerUser(formData)).then((data)=>{
      console.log(data);
      if(data.payload.success){
        //setErrorHandler()
        toast({
          title:data.payload.message
        })
        navigate('/auth/login');
      }
      /*setErrorHandler((
        <div className='text-red-600 font-light text-8'>{data.payload.message}</div>
      ))*/
     else{
      toast({
        variant:"destructive",
        title:data.payload.message,
        
      })
     }
    })


  }
  const [formData,setFormData] = useState(initialState)
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
     <div className='text-center'>
      <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create new account</h1>
      <p className='mt-2'>Already have an account</p>
      <Link className="font-medium ml-2 text-primary hover:underline" to='/auth/login'>Login</Link>
      </div>
      <CommonForm
      formControl={registerFormControls}
      buttonText={'Sign Up'}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      /> 
  
    </div>
  )
}

export default RegisterAuth