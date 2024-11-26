import React from 'react'
import { AlignJustify,LogOut} from 'lucide-react'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import { logOutUser } from '@/store/auth-slice'
const AdminHeader = ({Open,setOpen}) => {
  console.log(Open)
  const dispatch = useDispatch()
  const logOutHandler=()=>{
    console.log("logout is calling")
    dispatch(logOutUser()).then((data)=>console.log(data)).catch((error)=>console.log("Error has occured"))
  }
  
  return (
    <header className='flex items-center justify-between px-4 py-3 bg-background border-b'>
      <Button onClick={()=>{
        setOpen(true);
        console.log('button is running')}} 
      className='lg:hidden text-black sm:block bg-blue-950 hover:bg-blue-500 rounded-[8px]'>
      <AlignJustify className='white text-white '/>
      <span className='sr-only text-black'>Toggle Menu</span>
      </Button>
      <div className='flex flex-1 justify-end' onClick={logOutHandler}>
        <Button className="bg-blue-950 inline-flex gap-2 px-4 py-2 text-sm font-mediuum shadow text-white rounded-[8px] hover:bg-red-600" ><LogOut className='text-white'/>LogOut</Button>
      </div>

    </header>
  )
}

export default AdminHeader