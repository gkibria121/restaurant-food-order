import React,{useEffect,useContext} from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { ItemContext } from './ItemContext'


export default function Header() {

  const getAuth = useContext(ItemContext);

  const navigate = useNavigate();
  const [nav, setnav] = useState(false);
  const handleNav = ()=>{setnav(!nav)};
  
  const [Auth, setAuth] = useState(localStorage.getItem('token'))
  const [Admin, setAdmin] = useState(localStorage.getItem('role')=='admin') 
  useEffect(() => {
    setAuth(getAuth.headerState.Auth)
    setAdmin(getAuth.headerState.Admin)

  }, [getAuth])
  
  



  return (
    <>
    {/* navBar */}
    <div className='flex justify-between w-full bg-slate-200 h-[100px] py-10 px-2'>
        <ul>
            {/* navBar logo */}
            <li>Logo</li>
        </ul>
        {/* nav Items  */}
        <ul className='sm:flex flex-row space-x-4 hidden '>
          <li onClick={()=>{ navigate('/home')}}  className='cursor-pointer'>Home</li>
           <li onClick={()=>{ navigate('/')}} className={Auth? 'cursor-pointer' : 'hidden'}>Order Now</li>
           <li  onClick={()=>{ navigate('/about')}} className='cursor-pointer'>About Us</li>
           <li  onClick={()=>{ navigate('/contact')}} className='cursor-pointer'>Contact Us</li>
        </ul>
        {/* Owner Optinos */}
        <ul className={Auth && Admin ? 'sm:flex flex-row space-x-4 hidden' : 'hidden'}>
            <li className='cursor-pointer' onClick={()=>{navigate('/product/manage')}}>Manage Products</li>
            <li className='cursor-pointer' onClick={()=>{navigate('/product/orders')}}>Manage Orders</li>
            <li className='cursor-pointer' onClick={()=>{navigate('/product/create')}}>Create</li>
        </ul>
        {/* login options */}

        <ul className='sm:flex flex-row space-x-4 hidden'>

            <li className={!Auth? 'cursor-pointer' : 'hidden'} onClick={()=>{navigate('/register')}}>Sign Up</li>
            <li className={!Auth? 'cursor-pointer' : 'hidden'} onClick={()=>{navigate('/login')}}>Log In</li>
            <li className={Auth? 'cursor-pointer' : 'hidden'} onClick={()=>{navigate('/logout') }}>Log Out</li>


        </ul>
        {/* hamburger */}
        <ul className='sm:hidden' onClick={handleNav}>
            <li className='rotate-90 px-2 cursor-pointer '>|||</li>
        </ul>
    </div>
    {/* navBar mobile options */}
    <div className={nav ? 'w-full h-[260px] bg-slate-200 sm:hidden': 'hidden'} >
      <ul className='text-center space-y-1'>
      <ul className='sm:flex flex-row space-y-4'>
          <li onClick={()=>{ navigate('/home')}}  className='cursor-pointer'>Home</li>
           <li onClick={()=>{ navigate('/')}} className={Auth || Admin ? 'cursor-pointer' : 'hidden'}>Order Now</li>
           <li  onClick={()=>{ navigate('/about')}} className='cursor-pointer'>About Us</li>
           <li  onClick={()=>{ navigate('/contact')}} className='cursor-pointer'>Contact Us</li>
        </ul>

        <ul  className={Auth && Admin ? 'sm:flex flex-row space-y-4' : 'hidden' } >
        <li className='cursor-pointer' onClick={()=>{navigate('/product/manage') }}>Manage Products</li>
            <li className='cursor-pointer' onClick={()=>{navigate('/product/orders') }}>Manage Orders</li>
            <li className='cursor-pointer' onClick={()=>{navigate('/product/create') }}>Create</li>
        </ul>
      </ul>
    </div>
    </>
  )
}
