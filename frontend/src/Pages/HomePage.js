import React, { useEffect, useState } from 'react'
import "../Style/style.css"
import NavBar from '../Components/NavBar.js';
import SingleProduct from '../Components/SingleProduct.js';
import { useNavigate } from 'react-router-dom';
import { errorHandle } from '../Utils/success_errorHangle.js';

function HomePage() {
  const name = localStorage.getItem('name')
  const userID = localStorage.getItem('userID')
  const navigate = useNavigate()
  const [userProductData, setUserProductData] = useState([])

  const fullProductData = async() => {
    const auth = localStorage.getItem('token')

    if(!auth){
      navigate("/login")
    }

    console.log(userID)

    try{
      const response = await fetch(`http://localhost:5000/product?userID=${userID}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": auth
        }
      })

      if(response.ok){
        const {status,data} = await response.json()
        console.log(data)
        if(status){
          if(data.length === 0){
            return
          }else{
            setUserProductData(data)
          }
        }else{
          throw new Error("Failed to fetch products.");
        }
      }
    }catch(err){
      errorHandle(err)
      navigate("/login")
    }
  }

  useEffect(() => {
    fullProductData()
  },[])

  useEffect(() => {
    if (userProductData.length > 0) {
      console.log("Fetched Products", userProductData);
    }
  }, [userProductData]);

  return (
    <div className='home-page'>
      <NavBar name={name}/>
      <div className='homepage-container'>
        <div className='hompage-product-container'>
          {
            userProductData.length > 0 ? (
              userProductData.map((element) => (
                <SingleProduct key={element._id} setUserProductData={setUserProductData} data={element} />
              ))
            ) : (
              <h1>No Product added to list yet</h1>
            )
          }
        </div>
      </div>
    </div>

  )
}

export default HomePage
