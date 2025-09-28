import React from 'react'
import Navbar from '../components/shared/Navbar'
import Hero from '../components/Home/Hero'
import AiTools from '@/components/Home/AiTools'
import Testimonial from '@/components/Home/Testimonial'
import Plan from '@/components/Home/Plan'
import Footer from '@/components/shared/Footer'

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Hero></Hero>
      <AiTools></AiTools>
      <Testimonial></Testimonial>
      <Plan></Plan>
      <Footer></Footer>
    </div>
  )
}

export default Home
