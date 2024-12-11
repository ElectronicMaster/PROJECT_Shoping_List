import React, { useState,useEffect } from 'react'
import "../Style/style.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { CiCirclePlus } from "react-icons/ci";
import { IoHome } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";

function NavBar({name}) {
    const nameTitle = name.charAt(0).toUpperCase() + name.slice(1);
    const [routePage, setRoutePage] = useState(`Home`)
    const [search, setSearch] = useState("")
    const location = useLocation()
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1240)
    const [isRotated, setIsRotated] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1240)
        }
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize);
          };
    }, [])

    console.log(isMobile)

    const handleAddProduct = () => {
        console.log(routePage)
        if(location.pathname === "/home"){
            setRoutePage("Add Product")
            navigate("/addProduct")
        }else if(location.pathname === "/addProduct" || location.pathname === "/searchResults"){
            setRoutePage("Home")
            navigate("/home")
        }
    }

    const handleLogout= () =>{
        localStorage.clear()
        navigate("/login")
    }

    const handleOnChange = (e) => {
        setSearch((prev) => prev = e.target.value)
    }

    const handleSearch = async() => {
        const auth = localStorage.getItem('token')
        const userID = localStorage.getItem('userID')

        if(!auth){
            navigate("/login")
        }

        try{
            const response = await fetch(`http://localhost:5000/product/${search}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": auth
                },
                body: JSON.stringify({userID:userID})
            })

            const result = await response.json()
            navigate("/searchResults", {state: result['data']})
        }catch(err){
            console.log(err)
        }
    }

    const handleRotate = () =>{
        if(isRotated){
            setIsRotated(false)
        }else{
            setIsRotated(true)
        }
    }

    return (
        isMobile ? (
            <div className={`navBar-small-container ${isRotated?'extended':''}`}>
                <div className='navBar-small-screen'>
                    <div>
                        <h1><span>Welcome</span> {nameTitle}</h1>
                    </div>
                    <div>
                        <button className={`navBar-small-button ${isRotated ? "rotated" : ""}`} onClick={handleRotate}><TiThMenu /></button>
                    </div>
                </div>
                <div>
                    {
                        isRotated ? (
                            <div className='navBar-small-search-container'>
                                {(location.pathname === "/home" || location.pathname === "/searchResults") && (
                                    <div className='navBar-small-search'>
                                        <input onChange={handleOnChange} className="navBar-input" type="text" placeholder="Search" />
                                        <button className="navBar-button-search" onClick={handleSearch}>Search</button>
                                    </div>
                                )}
                                <div className='navBar-small-buttons'>
                                    <button className='navBar-button' onClick={handleAddProduct}>{(location.pathname === "/addProduct" || location.pathname === "/searchResults") ? (<>Home <IoHome /></>):(<>Add Product <CiCirclePlus /></>)}</button>
                                    <button className='navBar-button' onClick={handleLogout}>Logout</button>
                                </div>
                            </div>
                        ) : <></>
                    }
                </div>
            </div>
        ) : (
            <div className='navbar-container'>
                <div>
                    <h1><span>Welcome</span> {nameTitle}</h1>
                </div>
                {(location.pathname === "/home" || location.pathname === "/searchResults") && (
                    <div className='navBar-input-container'>
                        <input onChange={handleOnChange} className="navBar-input" type="text" placeholder="Search" />
                        <button className="navBar-button-search" onClick={handleSearch}>Search</button>
                    </div>
                )}
                <div>
                    <button className='navBar-button' onClick={handleAddProduct}>{(location.pathname === "/addProduct" || location.pathname === "/searchResults") ? (<>Home <IoHome /></>):(<>Add Product <CiCirclePlus /></>)}</button>
                    <button className='navBar-button' onClick={handleLogout}>Logout</button>
                </div>
            </div>
        )      
    )
}

export default NavBar