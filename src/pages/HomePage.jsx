import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import './homepage.css'
import FoodMenu from '../components/FoodMenu'
import HeroSection from '../components/HeroSection/HeroSection'
import { useState } from 'react'


export default function HomePage() {
  
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };
  



  return (
    <div className='home-bg text-center min-h-screen min-w-screen'>
        <Navbar/>
        <HeroSection/>
        <FoodMenu cart={cart} addToCart={addToCart}/>
    </div>
  )
}
