import React from "react";
import bg from "../assets/bg.jpg"
import { IoEye } from "react-icons/io5";
import { useState } from "react";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userDataContext } from "../context/userContext";
import axios from "axios"


function SignUp(){

    const [showPassword, setShowPassword] = useState(false)

    const {serverUrl, userData, setUserData} = useContext(userDataContext)
    const navigate = useNavigate()

     const [name, setName] = useState("")
     const [email, setEmail] = useState("")
     const [loading, setLoading] = useState(false)
     const [password, setPassword] = useState("")

      const [err, setErr] = useState("")

     const handleSignUp = async (e) =>{
        e.preventDefault()
        setErr("")
        setLoading(true)
        try {
            let result = await axios.post(`${serverUrl}/api/auth/signup`, {
            name, email, password
      }, {withCredentials:true})

      setUserData(result.data)
      setLoading(false)
      navigate("/customize")
      

        } catch (error) {
            console.log(error)
            setUserData(null)
            setLoading(false)
            setErr(error.response.data.message)
        }

     }

    return (
        <div className='w-full h-[100vh] bg-cover flex justify-center items-center '
        style={{backgroundImage:`url(${bg})`}}>

            <form className='w-[90%] h-[600px] max-w-[500px] bg-[#00000066] backdrop-blur 
            shadow-[0_-10px_30px_0,0_10px_30px_0] shadow-cyan-400/40 flex flex-col justify-center 
            items-center gap-[20px] px-[20px] ' onSubmit={handleSignUp}>

                <h1 className='text-white text-[30px] font-semibold mb-[30px]'>
                Register to<span className='text-blue-400 '> Virtual Assistant</span></h1>

                <input type="text" placeholder='Enter Your Name' className='w-full h-[60px] outline-none
                border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] 
                text-[18px] rounded-full' required onChange={(e) => setName(e.target.value) } value={name} />

                <input type="email" placeholder='Email' className='w-full h-[60px] outline-none
                border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] 
                text-[18px] rounded-full' required onChange={(e) => setEmail(e.target.value) } value={email}/>

                <div className='w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full
                text-[18px] relative'>

                    <input type={showPassword ? "text" : "password"} placeholder='Password' className='w-full h-full rounded-full outline-none
                    bg-transparent placeholder-gray-300 px-[20px] py-[10px] ' required onChange={(e) => 
                    setPassword(e.target.value) } value={password} />
                    
                    {!showPassword && <IoEye className='absolute top-[18px] right-[20px] w-[22px] h-[22px] 
                    text-white cursor-pointer' onClick={() => setShowPassword(true)} />}

                    {showPassword && <IoEyeOff className='absolute top-[18px] right-[20px] w-[22px] h-[22px] 
                    text-white cursor-pointer' onClick={() => setShowPassword(false)} />}

                </div>

                {err.length>0 && <p className= 'text-red-500 text-[17px]'>
                *{err}</p>}

                <button className='min-w-[150px] h-[60px] mt-[30px] bg-white rounded-full text-black 
                font-bold text-[19px] cursor-pointer' disabled={loading} >{loading ? "Loading..." : "Sign Up"}</button>

                <p className='text-white text-[16px] cursor-pointer' onClick={() => navigate("/signin")}>
                Already have an account? <span className= 'text-cyan-300 text-[18px] font-semibold'> 
                Sign In</span></p>

            </form>
            
        </div>
    )
}

export default SignUp