import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function RefreshHandler({setIsAuthenticated,isAunthenticated}) {
    const token = localStorage.getItem('token')
    const location = useLocation()

    console.log("hello",isAunthenticated)
    console.log("auth",setIsAuthenticated)
    console.log("token",token)

    useEffect(() => {
        console.log("token : ", token)
        if(token){
            setIsAuthenticated(true)
            console.log("hello")
        }else{
            setIsAuthenticated(false)
        }
    }, [])

    // useEffect(() => {
    //     if(location.pathname === "/login" || location.pathname === "/signup"){
    //       localStorage.clear()
    //     }
    //   }, [location])

    return (
        null
    )
}

export default RefreshHandler