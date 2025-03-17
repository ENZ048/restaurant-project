import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import './homepage.css'
import FoodMenu from '../components/FoodMenu'
import HeroSection from '../components/HeroSection/HeroSection'
import { useState } from 'react'


export default function HomePage() {

  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]); // Add as a new entry
    alert("item added to cart");
  };
  



  return (
    <div className='home text-center min-h-screen min-w-screen'>
        <Navbar/>
        <HeroSection/>
        <FoodMenu cart={cart} addToCart={addToCart}/>
    </div>
  )
}
