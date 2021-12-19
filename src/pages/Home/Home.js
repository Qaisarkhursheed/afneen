import React from 'react';
import Banner  from '../../styles/images/pexels-ella-olsson-1640777.jpg';
import ImageContainer from '../../components/ImageComponent/ImageComponent';
import Search from './Search/Search';

import './Home.css';
import StepsSection from './StepsSection/StepsSection';
import CuisineSection from './CuisineSection/CuisineSection';
import MobileAppSection from './MobileAppSection/MobileAppSection';
import Catagories from './Catagories/Catagories';
import PopularRestaurants from './PopularRestaurants/PopularRestaurants';
import BestDeals from './BestDeals/BestDeals';


const Home = () => {
  return (
    <div className="home">
      <ImageContainer imagePath={Banner} content={Search}/>
      <div className="working-steps">
        {/* <StepsSection /> */}
      </div>
      <div className="Catagories-steps">
        <Catagories />
      </div>
      <div className="PopularRestaurants">
        <PopularRestaurants />
      </div>
      {/* <div className="Bestdeals">
        <BestDeals />
      </div> */}
      {/* <div className="all-cuisines">
        <CuisineSection />
      </div>
      <div className="mobile-app-info">
        <MobileAppSection />
      </div> */}
    </div>
  );
};

export default Home;
