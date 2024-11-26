import React, { Fragment } from 'react'
import { ChartNoAxesCombined } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { BadgeCheck,LayoutDashboard,ShoppingBasket } from "lucide-react"
import {Sheet, SheetContent,SheetDescription,SheetHeader, SheetTitle } from '../ui/sheet'
 const AdminMenuItems = [
  {
     id:"dashboard",
     label:"Dashboard",
     path:"/admin/dashboard",
     icon:<LayoutDashboard/>
  },
  /*{
     id:"features",
     label:"Features",
     path:"/admin/features",
     icon:
  }*/,
  {
     id:"orders",
     label:"Orders",
     path:"/admin/orders",
     icon:<BadgeCheck/>
  },
  {
     id:"products",
     label:"Products",
     path:"/admin/products",
     icon:<ShoppingBasket/>
  }
]

function MenuItems({setOpen}){
  const navigate = useNavigate()
  return <nav className = 'mt-8 flex-col flex gap-2'>
    {
    
      AdminMenuItems.map(menuItem=>
      <div key={menuItem.id} 
      onClick={()=>{
        setOpen?setOpen(false):null;
        navigate(menuItem.path)}} 
      className="flex gap-2 text-xl items-center cursor-pointer rounded-md px-3 py-2 text-muted-foreground hover:font-bold hover:bg-slate-200 hover:text-black hover:bg-muted  hover:text-foreground">
        {menuItem.icon}
        <span>{menuItem.label}</span>
      </div>)
    }
  </nav>
}
const AdminSidebar = ({Open,setOpen}) => {
  console.log(Open)
  const navigate = useNavigate()
  return (
    <Fragment>
      <Sheet open={Open} onOpenChange={()=>setOpen(!Open)}>
        <SheetContent side="left" className='w-100 bg-white w-[800px]' aria-describedby="search-dialog-description">
          <div className='flex flex-col h-full'>
          <SheetHeader className='border-b'>
          
            <SheetTitle className='flex gap-2'>
            
              <ChartNoAxesCombined size={30}/>
              <SheetDescription className='text-2xl font-extrabold'>Admin Panel</SheetDescription>
            
              
            </SheetTitle>
          </SheetHeader>
          {/* <div onClick={()=>{setOpen(false)
            console.log("Click of sidebar ",Open)
          }}> */}
          <MenuItems setOpen={setOpen}/>
          {/* </div> */}
          </div>
        </SheetContent>
      </Sheet>
      <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
        <div onClick={()=>navigate('/admin/dashboard')} className='flex items-center gap-2 cursor-pointer '>
          <ChartNoAxesCombined size={30} />
          <h1 className='text-2xl font-extrabold'>Admin Panel</h1>
        </div>
        <MenuItems/>
      </aside>
    </Fragment>
  )
}

export default AdminSidebar