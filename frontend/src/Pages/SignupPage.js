import React, { useState,useEffect } from 'react'
import {Link, useNavigate} from "react-router-dom"
// import { ToastContainer } from "react-toastify";
import {successHandle,errorHandle} from "../Utils/success_errorHangle.js"
import "../Style/style.css"

function Signup() {
    const [signupDetails, setSignUpDetails] = useState({
        name: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('token')){
            navigate("/home")
        }
    }, [navigate])

    const handleChange = (e) =>{
        const {name,value} = e.target
        const temp = signupDetails
        temp[name] = value 
        setSignUpDetails(temp)
        console.log(signupDetails)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        try{
            const response = await fetch("https://shopping-wish-list-api.vercel.app/user/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify(signupDetails)
                }
            )

            const result = await response.json()
            const {status,message} = result

            if(!status){
                errorHandle(message)
                navigate("/login")
            }else{
                successHandle(message)
                navigate("/login")
            }
        }catch(err){
            errorHandle("Server Error")
        }
    }

    return (
        <div className='centre-wrapper'>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <h1>SIGN UP</h1>
                    <div>
                        <label htmlFor='name'>Name : </label>
                        <input className='ls-input' type='text' onChange={handleChange} name='name' required placeholder='Enter your name'/>
                    </div>
                    <div>
                        <label htmlFor='email'>Email : </label>
                        <input className='ls-input' type='email' onChange={handleChange} name='email' required placeholder='Enter your email'/>
                    </div>
                    <div>
                        <label htmlFor='password'>Password : </label>
                        <input className='ls-input' type='password' onChange={handleChange} name='password' required placeholder='Enter your password'/>
                    </div>
                    <button className='ls-button' type='submit'>Sign Up</button>
                    <div>
                        <span>If already have an account kindly : </span>
                        <Link to={"/login"}>Login</Link>
                    </div>
                </form>
                {/* <ToastContainer/> */}
            </div>
        </div>
    )
}

export default Signup
