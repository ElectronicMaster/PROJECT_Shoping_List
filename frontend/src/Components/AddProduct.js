import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar.js'
import { errorHandle, successHandle } from '../Utils/success_errorHangle.js'

function AddProduct() {
  const navigate = useNavigate()
  const [imageURL, setImageUrl] = useState("https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png")
  const name = localStorage.getItem('name')
  const [newProductDetails, setNewProductDetails] = useState({
    name: "",
    image: "",
    price: "",
    link: "",
    userID: localStorage.getItem("userID")
  })
  const [windowWidth, setWindowWidth] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleOnChange = (e) => {
    const {name,value} = e.target
    let temp = newProductDetails
    temp[name] = value
    setNewProductDetails(temp)
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    const auth = localStorage.getItem('token')

    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i;
    if(!newProductDetails.image){
      newProductDetails.image = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
    }else if (!urlPattern.test(newProductDetails.image)) {
      errorHandle("Please provide a valid image URL ending with .png, .jpg, .jpeg, .gif, .webp, or .svg")
      newProductDetails.image = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
    }else{
      setImageUrl(newProductDetails.image)
    }

    if(!auth){
      localStorage.removeItem('email')
      localStorage.removeItem('name')
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    }

    try{
      const response = await fetch("https://shopping-wish-list-api.vercel.app/product",{
        method: "POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":auth
        },
        body: JSON.stringify(newProductDetails)
      })
      const result = await response.json()
      if(result.status){
        successHandle(result.message)
        navigate("/home")
      }else{
        errorHandle(result.message)
      }
    }catch(err){
      errorHandle("Unexpected Error please try again")
      setTimeout(() => {
        navigate("/home")
      },2000)
    }
  }

  return (
    <div>
      <NavBar name={name}/>
      <div className={`container-newProduct`}>
        <form className={`newProduct-container-object ${windowWidth?"small":""}`} onSubmit={handleSubmit}>
          <div className='newProduct-image-box'><img src={imageURL} alt="Product"/></div>
          <div className={`newProduct-input-box`}>
            <div className='newProduct-input'>
              <label htmlFor='name' className='addProduct-label'>Name</label>
              <input name='name' onChange={handleOnChange} type='text' placeholder='Enter product name' required/>
            </div>
            <div className='newProduct-input'>
              <label htmlFor='price' className='addProduct-label'>Price</label>
              <input name='price' onChange={handleOnChange} type='number' placeholder='Enter product price' required/>
            </div>
            <div className='newProduct-input'>
              <label htmlFor='image' className='addProduct-label'>Image Link (optional)</label>
              <input name='image' onChange={handleOnChange} type='text' placeholder={"(optional) default image is shown"}/>
            </div>
            <div className='newProduct-input'>
              <label htmlFor='link' className='addProduct-label'>Amazon Link (optional)</label>
              <input name='link' onChange={handleOnChange} type='text' placeholder={"(optional)"}/>
            </div>
            <div className='newProduct-input'>
              <button className='newProduct-input-button' type='submit'>Add Product</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct
