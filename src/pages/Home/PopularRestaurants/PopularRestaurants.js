import React, {useEffect} from "react";
import { withNamespaces } from "react-i18next";
import Carousel from 'react-elastic-carousel';
import i18n from "../../../i18n";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import pic1 from "../../../styles/images/afneen/1.png";
import pic2 from "../../../styles/images/afneen/2.png";
import pic3 from "../../../styles/images/afneen/3.png";
import cycle from "../../../styles/images/afneen/cycle.svg";
import circle from "../../../styles/images/afneen/circle.png";
import arow1 from "../../../styles/images/afneen/arow1.png";
import arow2 from "../../../styles/images/afneen/arow2.png";
import takaway from '../../../styles/images/icons8-take-away-food-50.png'
import CustomSpinner from "../../../components/Spinner/CustomSpinner";
import location1 from "../../../styles/images/location_1.jpg";
import location2 from "../../../styles/images/location_2.jpg";
import location3 from "../../../styles/images/location_4.jpg";

import "./PopularRestaurants.css";
import { Button } from "antd";
import { withRouter } from "react-router";


const PopularRestaurants = (props) => {
  const {
    t,
    restaurants,
    isGettingRestaurant,
    getRestaurants,
    history,
    match,
  } = props;
  return (
    <div className="Restaurants-container">
      <div className="Restaurants-top">
        <div className="heading-with-view-all">
          <h2 style={{fontFamily: "sofia pro regular"}}>{t("Jobs might suit your skills")}</h2>
          <Button type="link" className="view-all-button">
            See All jobs
        </Button>
        </div>
      </div>
      <div className="Restaurants-row">
      {/* <Carousel   breakPoints={[
            { width: 1, itemsToShow: 1 },
            { width: 550, itemsToShow: 2 },
            { width: 850, itemsToShow: 3 },
            { width: 1150, itemsToShow: 4 },
          ]}>
        */}
       <div className="Restaurants" style={{display:"flex", justifyContent:"space-between"}}>
          <div className="skills-box">
            <div className="empty-skills-box"></div>
            <div style={{display:"flex"}}>
            <img src={pic3} alt="image" className="pic"/>
            <div className="profile-name">Khalid Abdullah
            <p className="profile-p">+ 4.9 (12)</p>
            </div>
            </div>
            <p className="skills-lorum">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore.</p>
            <div>
              <span className="span-items">Classic</span>
              <span className="span-items">jazz</span>
              <span className="span-items">Pop music</span>
              <span className="span-items">Singing</span>
            </div>
            <span  className="music">Music & Auditory Art</span>
            <span className="music">Riyadh</span>
          </div>
          <div className="skills-box">
            <div className="empty-skills-box"></div>
            <div style={{display:"flex"}}>
            <img src={pic2} alt="image" className="pic"/>
            <div className="profile-name">Abdullah Saud
            <p className="profile-p">+ 4.9 (12)</p>
            </div>
            </div>
            <p className="skills-lorum">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore.</p>
            <div>
              <span className="span-items">Classic</span>
              <span className="span-items">jazz</span>
              <span className="span-items">Pop music</span>
              <span className="span-items">Singing</span>
            </div>
            <span  className="music">Music & Auditory Art</span>
            <span className="music">Jeddah</span>
          </div>
          <div className="skills-box">
            <div className="empty-skills-box"></div>
            <div style={{display:"flex"}}>
            <div>
              <img src={pic1} alt="image" className="pic"/>
            </div>
            <div className="profile-name">Reem Ahmad
            <p className="profile-p">+ 4.9 (12)</p>
            </div>
            </div>
            <p className="skills-lorum">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore.</p>
            <div>
              <span className="span-items">Classic</span>
              <span className="span-items">jazz</span>
              <span className="span-items">Pop music</span>
              <span className="span-items">Singing</span>
            </div>
            <span  className="music">Music & Auditory Art</span>
            <span className="music">Riyadh</span>
          </div>
        </div>
      {/* </Carousel> */}
      </div>
      <div className="banner-lazy">
      <div className="wrapper-lazy">
      {/* <small>foogra</small> */}
      <h3 style={{fontFamily: "Prettywise-Regular"}}>We only hire Creative Talents</h3>
      {/* <p>Book a table easly at the best price</p> */}
      <a href="#" className="btn-lazy2" >Showcase your Talent</a>
      </div>
      </div>

          <img src={circle} alt="image" className="job-post-cicle"/>
      <div className="job-post">
          <img src={cycle} alt="image" className="job-post-cycle"/>
          <h2 style={{fontSize:"52px",fontFamily: "Prettywise-Regular"}}>Post your Job</h2>
          <h3 style={{fontSize:"25px",fontFamily: "sofia pro regular"}}>A business solution designed for teams</h3>
          <p style={{width:"465px"}}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, 
            sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
             Ut wisi enim ad minim veniam, quis nostrud exerci</p>
             <a href="#" className="btn-lazy" >Get Started</a>
      </div>
    </div>
  );
};
export default (withRouter(withNamespaces()(PopularRestaurants)));
