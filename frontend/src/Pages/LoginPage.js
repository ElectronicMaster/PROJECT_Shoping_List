import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import "../Style/style.css"
import {successHandle,errorHandle} from "../Utils/success_errorHangle.js"



function Login({setIsAuthenticated}) {
    const [loginDetails,setLoginDetails] = useState({
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
        setLoginDetails((prev) => ({
            ...prev, [name]: value
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        try{
            const response = await fetch("http://localhost:5000/user/login",{
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(loginDetails)
            })

            const result = await response.json()
            const {status,message,JWTtoken,email,name,userID} = result

            if(status){
                setIsAuthenticated(true)
                localStorage.setItem("token",JWTtoken)
                localStorage.setItem("email",email)
                localStorage.setItem("name",name)
                localStorage.setItem("userID",userID)
                successHandle(message)
                navigate("/home")
            }else{
                setIsAuthenticated(false)
                errorHandle(message)
            }
        }catch(err){
            console.error("Error:", err);
            setIsAuthenticated(false)
            errorHandle("An error occurred. Please try again.");
        }
    }

    return (
        <div className='centre-wrapper'>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div>
                        <label htmlFor='email'>Email : </label>
                        <input className='ls-input' type='email' onChange={handleChange} name='email' required placeholder='Enter your email'/>
                    </div>
                    <div>
                        <label htmlFor='password'>Password : </label>
                        <input className='ls-input' type='password' onChange={handleChange} name='password' required placeholder='Enter your password'/>
                    </div>
                    <button className='ls-button' type='submit'>Login</button>
                    <div>
                        <span>If do not have an account please : </span>
                        <Link to={"/signup"}>Sign up</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login