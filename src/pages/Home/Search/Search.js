import React, { useState, useEffect } from "react";
import axios from "axios";
import { AutoComplete } from "antd";
import { withNamespaces } from "react-i18next";
import i18n from "../../../i18n";
import { withRouter } from "react-router";
import nude from "../../../styles/images/afneen/nude.svg";
import "./Search.css";
import { connect } from "react-redux";
import { asyncActionGenerator, SEARCH_MERCHANT } from "../../../redux/actions";
import { bindActionCreators } from "redux";

const searchActions = asyncActionGenerator(SEARCH_MERCHANT);

const { Option } = AutoComplete;
const Search = (props) => {
  const { t, history, searchRestaurant } = props;
  const [clickedValue, setclickedValue] = useState("address");
  const [fade, setFade] = useState(false);
  const [result, setResult] = useState([]);
  const [param, setParam] = useState("");

  const handleIconClicked = (name) => {
    setclickedValue(name);
    setFade(true);
  };
  const handleSelected = (value) => {
    console.log(value);
    setParam(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ param, query: clickedValue });
    searchRestaurant({ query: param, params: clickedValue });
    // history.push('/pick-restaurant');
  };
  const handleSearch = async (value) => {

  };
  return (
    <div className="flex">
      <div className="icons left-flex">
        <h3 className="afanin-h3">Afanin is A Creative Platform</h3>
        <h2 className="afanin-h2">The New Way To Discover <span className="h2-talent">Talents</span></h2>
        <p className="afanin-p">Lorem ipsum dolor amet, consectetuer adipiscing elit, sed diam</p>
        <button className="afanin-button">Get Inspired</button>
      </div>
      <div className="right-flex" style={{marginLeft: "300px", position: "relative"}}>
        <div className="find-talent-box">
          <img src={nude} alt="image" className="nude" style={{width: "155px"}} />
          <h2 className="find-talent">Find talents easily</h2>
          <div style={{fontSize: "12px", fontWeight: "500", textAlign: "start", padding:"2px 46px", fontFamily: "sofia pro regular" }}>
            <span style={{marginRight: "40px"}}>Location</span>
            <span style={{marginRight: "40px"}}>Category</span>
            <span>Talent</span>
          </div>
          <div style={{borderBottom: "1px solid #F2F0F2"}}></div>
          <div className="talent-dropdown">Riyadh</div>
          <div>
            <button className="afanin-button2">Next</button>
          </div>
        </div>
        <div className="search-box">
          Tell us... Whats in your mind?
          <button className="search-button">
                    <i className="iconify" data-icon="ion:search-outline"></i>
          </button>
        </div>
        <div className="flex">
          <div className="flex-left-box">
            <div className="empty-box1"></div>
            <div className="empty-box2"></div>
          </div>  
          <div className="flex-right-box">
            <div className="empty-box2"></div>
            <div className="empty-box1"></div>
          </div> 
        </div>  
      </div>

    </div>
  );
};
export default (withRouter(withNamespaces()(Search)));
