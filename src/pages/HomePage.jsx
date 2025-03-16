import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import './homepage.css'
import FoodMenu from '../components/FoodMenu'
import HeroSection from '../components/HeroSection/HeroSection'

export default function HomePage() {
  return (
    <div className='home text-center min-h-screen min-w-screen'>
        <Navbar/>
        <HeroSection/>
        <FoodMenu/>
    </div>
  )
}
