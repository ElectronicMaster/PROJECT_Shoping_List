// import './App.css';
import { Routes,Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Login from './Pages/LoginPage.js';
import HomePage from './Pages/HomePage.js';
import Signup from './Pages/SignupPage.js';
import AddProduct from './Components/AddProduct.js';
import SearchResultPage from './Pages/SearchResultPage.js';
import { useEffect, useState } from 'react';


function App() {
  const [isAunthenticated, setIsAuthenticated] = useState(false)
  const location = useLocation()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  const PrivateRoute = ({ element }) => {
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!isAunthenticated) {
        navigate("/login");
      }
    }, [isAunthenticated, navigate]);
  
    if (isAunthenticated) {
      return element;
    } else {
      return <Navigate to="/login" />;
    }
  };

  const AllRoute = () => {
    if (!isAunthenticated) {
      return <Navigate to={"/login"} />;
    }
    return location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup" ? <Navigate to={"/home"} /> : null;
  };

  return (
    <div className="App">
      <Routes>
        <Route path='*' element={<AllRoute/>}/>
        <Route path='/' element={<Navigate to={"/login"}/>}/>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path='/home' element={<PrivateRoute element={<HomePage/>}/>}/>
        <Route path="/addProduct" element={<PrivateRoute element={<AddProduct/>}/>}/>
        <Route path="/searchResults" element={<PrivateRoute element={<SearchResultPage/>}/>}/>
      </Routes>
    </div>
  );
}

export default App;
