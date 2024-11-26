import React from 'react'
import AdminSidebar from './sidebar'
import AdminHeader from './header'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'

const AdminLayout = () => {
  const [Open,setOpen] = useState(false)
  console.log(Open)
  return (
    <div className='flex min-h-screen w-full'>
        { /*  admin sidebar */}
        <AdminSidebar Open={Open} setOpen={setOpen}/>
        <div className="flex flex-1 flex-col">
             {/* admin header */}
             <AdminHeader Open={Open}  setOpen={setOpen}/>
            <main className='flex-1 flex-col flex bg-muted/40 p-4 md:p-6'>
                <Outlet/>
            </main>
        </div>

    </div>
  )
}

export default AdminLayout