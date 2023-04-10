import React from 'react'
import Services from './Services'
import Faq from './Faq'
import { FeedBack } from './feedback'
import HomeImg from './HomeVideo/HomeImg'

const Home = () => {

  return (
    /*first page*/
    <div>
      <HomeImg/>
      {/* <img alt='VCA' className="d-block w-100" style={{ height: '400px', objectFit: "cover" }} src={"/images/VCA_phtoto.jpg"}></img> */}
      <Services />
      <Faq />
      <FeedBack/>
    </div>
  )
}

export default Home;
