import React,{useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { IoHome } from "react-icons/io5";
import SingleProduct from '../Components/SingleProduct';
import NavBar from '../Components/NavBar.js';

function SearchResultPage() {
    const location = useLocation()
    const data = location.state || []
    const name = localStorage.getItem('name')
    const nameTitle = name.charAt(0).toUpperCase() + name.slice(1);
    const [search, setSearch] = useState("")
    const [searchData,setSearchData] = useState(data)

    const navigate = useNavigate()

    const handleHome = () => {
        navigate("/home")
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

        if(search.length === 0){
            setSearchData([])
            return
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
            setSearchData(result['data'])
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <NavBar name={localStorage.getItem('name')}/>
            <div>
            <div className='homepage-container'>
                <div className='hompage-product-container'>
                {
                    searchData.length > 0 ? (
                    searchData.map((element) => (
                        <SingleProduct key={element._id} data={element} />
                    ))
                    ) : (
                    <h1>No Data Found</h1>
                    )
                }
                </div>
            </div>
            </div>
        </div>
    )
}

export default SearchResultPage