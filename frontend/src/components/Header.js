import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className='h-16 shadow-md bg-white'>
        <div className='container mx-auto h-full flex items-center px-4 justify-between'>
            <div className='cursor-pointer'>
              <Link to={"/"}>
                <h1>MY LOGO</h1>
              </Link>
            </div>

            <div className='hidden lg:flex items-center w-full max-w-sm h-10 rounded-full justify-between border focus-within:shadow-md'>
               <input type='text' placeholder='search product here...' className='w-full outline-none pl-10'/>
               <div className='text-lg h-full min-w-[50px] flex items-center justify-center bg-red-400  rounded-r-full'>
                <IoSearchOutline />
               </div>
            </div>

            <div className='flex items-center gap-7'>
               <div className='text-lg cursor-pointer'>
                 <FaRegCircleUser />
               </div>
               <div className='text-lg cursor-pointer  relative'>
                  <FaShoppingCart />
                  <div className='bg-red-700 text-white w-5 p-1 h-5 flex items-center justify-center rounded-full absolute -top-2 -right-3'>
                    <p className='text-sm font-bold'>0</p>
                  </div>
               </div>

               <div>
                <Link to={"/login"}>
                 <button className='px-2 bg-red-600 py-1 rounded-full text-white'>Login</button>
                </Link>
               </div>
            </div>
        </div>
    </header>
  )
}

export default Header