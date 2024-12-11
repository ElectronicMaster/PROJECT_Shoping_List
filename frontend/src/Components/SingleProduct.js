import React, { useState } from 'react'
import {errorHandle,successHandle} from "../Utils/success_errorHangle"
import { ToastContainer } from 'react-toastify'

function SingleProduct({data,setUserProductData}) {
    const [isUpdate,setIsUpdate] = useState(false)
    const [newData,setNewData] = useState({
        name: data.name,
        image: data.image,
        price: data.price,
        link: data.link
    })

    const handleOnChange = (e) => {
        const {name,value} = e.target
        setNewData((prevData) => ({
            ...prevData,
            [name] : value
        }))
    }

    const handleClick = () => {
        if(data.link === ""){
            errorHandle("URL was not provided")
        }else{
            window.location.href = newData.link
        }
    }

    const handleUpdate = () => {
        setIsUpdate(true)
    }

    const handleSubmitUpdate = async() =>{
        const auth = localStorage.getItem('token')
        console.log(data._id)
        try{
            const response =await fetch(`http://localhost:5000/product/${data._id}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": auth
                },
                body: JSON.stringify(newData)
            })
            const result = await response.json()
            successHandle(result.message)
            setIsUpdate(false)
        }catch(err){
            console.log(err)
        }
    }

    const handleDelete = async() => {
        const auth = localStorage.getItem('token')
        try{
            const response = await fetch(`http://localhost:5000/product/${data._id}`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": auth
                },
                body: JSON.stringify(newData)
            })
            const result = await response.json()
            if(result.status){
                setUserProductData((prev)=>prev.filter(item => item._id != result.data._id))
            }
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className='single-product-container'>
            {
                isUpdate ? <div>
                    <div className='single-update-content-container'>
                        <div>
                            <label htmlFor='image' className='single-content-container-label-update'>Image Link: </label>
                            <input name='image' onChange={handleOnChange} className='single-content-container-input-update' value={newData.image} placeholder='(optional) image url'/>
                        </div>
                        <div>
                            <label htmlFor='name' className='single-content-container-label-update'>Name: </label>
                            <input name='name' onChange={handleOnChange} className='single-content-container-input-update' value={newData.name} placeholder='Name'/>
                        </div>
                        <div>
                            <label htmlFor='price' className='single-content-container-label-update'>Price: </label>
                            <input name='price' onChange={handleOnChange} className='single-content-container-input-update' value={newData.price} placeholder='Price'/>
                        </div>
                        <div>
                            <label htmlFor='link' className='single-content-container-label-update'>Image Link: </label>
                            <input name='link' onChange={handleOnChange} className='single-content-container-input-update' value={newData.link} placeholder='(optional) Amazon Link'/>
                        </div>
                        <div>
                            <button className='update-submit-button' onClick={handleSubmitUpdate}>Submit Update</button>
                        </div>
                    </div>
                    </div> : <div>
                        <div className='single-image-contianer'>
                            <img src={newData.image} alt='no image found'/>
                        </div>
                        <div className='single-content-container'>
                            <label className='single-content-container-label'><b>Name : {newData.name}</b></label>
                            <label className='single-content-container-label'>Price : {newData.price}</label>
                            <button className='single-content-container-button' onClick={handleClick}>Link</button>
                        </div>
                        <div className='single-edit-button'>
                            <button className='single-edit-update-button' onClick={handleUpdate}>Update</button>
                            <button className='single-edit-delete-button' onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
            }
            <ToastContainer/>
        </div>
    )
}

export default SingleProduct