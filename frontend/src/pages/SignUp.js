import React, { useState } from 'react'
import loginicons from "../assest/signin.gif"
// import { FaEye } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import imageUpload from '../helpers/imageUpload'
import SummaryApi from '../common'
import { toast } from 'react-toastify';



function SignUp() {
  const [showPassword,setShowPassword] = useState(false)
  const [showConfirmPassword,setShowConfirmPassword] = useState(false)

  const navigate = useNavigate()

//CREATING A STATE FOR THE FORM INPUT
  const [data,setData] = useState({
    name:"",
    email :"",
    password:"",
    confirmPassword:"",
    profileImage:""
 })
 
 //CREATING A FUNCTION FOR THE FORM INPUT
 const handleOnChange = (e) =>{
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

const handleSubmit = async(e) =>{
  e.preventDefault()

  if (data.password === data.confirmPassword) {
    console.log("SummaryApi.signUp.url",SummaryApi.signUp.url)
    
    const dataResponse = await fetch(SummaryApi.signUp.url,{
      method:SummaryApi.signUp.method,
      headers:{
        "content-type":"application/json"
      },
      body : JSON.stringify(data)
    })
    const dataApi = await dataResponse.json()
    if (dataApi.success) {
      toast.success(dataApi.message)
      navigate("/login")
    }

    if (dataApi.error) {
      toast.error(dataApi.message)
    }
    // toast(dataApi.message)

    // console.log("data",dataApi)
  } else {
    toast.error("please confim passsword")
  }
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

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                      <div className='grid'>
                              <label>Name : </label>
                              <div className='bg-slate-100 p-2'>
                                  <input 
                                      type='text' 
                                      placeholder='enter your name' 
                                      name='name'
                                      value={data.name}
                                      onChange={handleOnChange}
                                      required
                                      className='w-full h-full outline-none bg-transparent'/>
                              </div>
                          </div>
                        <div className='grid'>
                            <label>Email : </label>
                            <div className='bg-slate-100 p-2'>
                                <input 
                                    type='email' 
                                    placeholder='enter email' 
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'/>
                            </div>
                        </div>

                        <div>
                            <label>Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder='enter password'
                                    value={data.password}
                                    name='password' 
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'/>
                                <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaEyeSlash/>
                                            )
                                            :
                                            (
                                                <FaEye/>
                                            )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label>Confirm Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input 
                                    type={showConfirmPassword ? "text" : "password"} 
                                    placeholder='enter confirm password'
                                    value={data.confirmPassword}
                                    name='confirmPassword' 
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'/>

                                <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                                    <span>
                                        {
                                            showConfirmPassword ? (
                                                <FaEyeSlash/>
                                            )
                                            :
                                            (
                                                <FaEye/>
                                            )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>

                    </form>
                <p className='my-5'>Already have account ? <Link to={"/login"} className='hover:text-red-700 text-red-600 hover:underline'>Login</Link></p>
            </div>

      </div>
    </section>
  )
}

export default SignUp