import React, {useEffect} from "react";
import { withNamespaces } from "react-i18next";
import Carousel from 'react-elastic-carousel';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import img1 from "../../../styles/images/afneen/img1.svg";
import img2 from "../../../styles/images/afneen/img2.svg";
import img3 from "../../../styles/images/afneen/img3.svg";
import img4 from "../../../styles/images/afneen/img4.svg";
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';  
// import 'owl.carousel/dist/assets/owl.theme.default.css'; 
import i18n from "../../../i18n";
import { asyncActionGenerator, GET_ALL_CUISINES } from "../../../redux/actions";
import "./Catagories.css";
import CustomSpinner from "../../../components/Spinner/CustomSpinner";
import pizza from '../../../styles/images/home_cat_pizza.jpg'
import { withRouter } from "react-router";


const Catagories = (props) => {
  const {
    t,
    cuisines,
    history,
    isGettingCuisines,
    getCuisines,
  } = props;

  return (
    <div className="catagory-container">
      <div style={{display: "flex", justifyContent: "space-between"}}>
      <h2 style={{fontFamily: "sofia pro regular"}}>{t("Explore our professional talents")}</h2>
      <span style={{marginTop: "20px",color: "#F05543", fontSize: "17px"}} type="link" className="view-all-span">
            See all talents 
        </span>
        </div>
      <div style={{display: "flex", justifyContent: "space-between"}} >
        <div>
        <img src={img1} alt="image" className="img1" style={{width: "270px"}} />
        <div style={{background:"#FEC555"}} className="image-text">Performing Art</div>
        </div>
        <div>
        <img src={img2} alt="image" className="img1" style={{width: "270px"}} />
        <div style={{background:"#F05543"}} className="image-text">Fine Art</div>
        </div>
        <div>
        <img src={img3} alt="image" className="img1" style={{width: "270px"}} />
        <div style={{background:"#AB90C3"}} className="image-text">Music & Auditory Art</div>
        </div>
        <div>
        <img src={img4} alt="image" className="img1" style={{width: "270px"}} />
        <div style={{background:"#469884"}} className="image-text">Casting</div>
        </div>
      </div>
    </div>
  );
};

export default (withRouter(withNamespaces()(Catagories)));
