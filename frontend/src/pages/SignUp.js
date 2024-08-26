import React, { useState } from 'react'
import loginicons from "../assest/signin.gif"
import { FaEye } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import imageUpload from '../helpers/imageUpload'

function SignUp() {

//CREATING A STATE FOR THE FORM INPUT
 const [data,setData] = useState({
    name:"",
    email :"",
    password:"",
    confirmPassword:"",
    profileImage:""
 })
 
 //CREATING A FUNCTION FOR THE FORM INPUT
 const handleChange = (e) =>{
    const {name , value} = e.target

    setData((prevState)=>{
        return{
            ...prevState,
            [name]:value
        }
    })
 }
 console.log(data)
//CREATING A FUNCTION FOR THE UPLOADING PROFILE IMAGE

const profileUpload = async (e) => {
  const file = e.target.files[0]

  const imagePic = await imageUpload(file)
  // console.log("imagePic",imagePic)
  setData((prevState)=>{
    return {
      ...prevState,
      profileImage:imagePic
    }
  })
}

  return (
    <section id='login'>
      <div className='mx-auto container p-4 mt-[80px]'>
            <div className='bg-white p-2 py-5 w-full max-w-sm mx-auto rounded-md'>
                <div className='w-20 h-20 mx-auto overflow-hidden relative rounded-full'>
                  <div>
                    <img src={data.profileImage || loginicons} alt='login icons'/>
                  </div>
                  <form>
                    <label>
                      <div className='text-xs pb-4 pt-2 bg-opacity-80 cursor-pointer bg-slate-200 text-center w-full absolute bottom-0'>
                      Upload image
                      </div>
                      <input type='file' onChange={profileUpload} className='hidden'/>
                    </label>
                  </form>
                </div>

                <form className='pt-6 flex flex-col gap-4'>
                <div className='grid'>
                        <label>Name:</label>
                        <div className='bg-slate-100 p-2'>
                            <input 
                               required
                                type='text'
                                name='name'
                                value={data.name} 
                                onChange={handleChange}
                                placeholder='enter your name'
                                className='w-full h-full outline-none bg-transparent'
                            />
                        </div>
                    </div>

                    <div className='grid'>
                        <label>Email :</label>
                        <div className='bg-slate-100 p-2'>
                            <input 
                                required
                                type='email'
                                name='email'
                                value={data.email} 
                                onChange={handleChange}
                                placeholder='enter email'
                                className='w-full h-full outline-none bg-transparent'
                            />
                        </div>
                    </div>

                    <div>
                        <label>Password :</label>
                        <div  className='bg-slate-100 p-2 flex items-center'>
                            <input 
                               required
                                type='password' 
                                name='password'
                                value={data.password} 
                                onChange={handleChange}
                                placeholder='enter password'
                                 className='w-full h-full outline-none bg-transparent'
                            />
                            <div className='cursor-pointer'>
                                <span><FaEye/></span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label>Confirm Password :</label>
                        <div  className='bg-slate-100 p-2 flex items-center'>
                            <input 
                                type='password' 
                                name='confirmPassword'
                                value={data.confirmPassword} 
                                onChange={handleChange}
                                placeholder='enter confirm password'
                                 className='w-full h-full outline-none bg-transparent'
                            />
                            <div className='cursor-pointer'>
                                <span><FaEye/></span>
                            </div>
                        </div>
                    </div>


                    <button className='bg-red-600 rounded-full text-white px-6 py-2 w-full max-w-[150px] mx-auto block mt-4'>Sign up</button>
                </form> 
                <p className='my-5'>Already have account ? <Link to={"/login"} className='hover:text-red-700 text-red-600 hover:underline'>Login</Link></p>
            </div>

      </div>
    </section>
  )
}

export default SignUp