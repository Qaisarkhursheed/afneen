import React,{useState} from "react";
import { withRouter } from "react-router";
import { withNamespaces } from "react-i18next";
import {BackTop ,Collapse} from 'antd';
import Afaneen_Pattern from "../../styles/images/afneen/Afaneen_Pattern.png";
import "./Footer.css";

const Footer = (props) => {
  const { t, location, match } = props;
  const { Panel } = Collapse;
  const [show,setShow] = useState(false);
  const onButtonClick = () => {
    setShow(true);
  }
  
  return (
    <div>
      <div style={{marginBottom:"82px", width:"100%"}}>   
      <img src={Afaneen_Pattern} alt="Afaneen_Pattern" style={{width:"inherit"}}/>
      </div>
    <div className="footer">
      <div className="back-to-top">
      <BackTop />
      </div>
    

        <div className="copyrights">
            <ul>
              {/* <li>Terms and conditions</li>
              <li>Privacy</li> */}
              <li>Afaneen © 2021</li>
            </ul>
        </div>
      </div>
      </div>
  );
};

export default withRouter(withNamespaces()(Footer));
