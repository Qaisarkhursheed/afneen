import React from "react";
import {Result, Button} from 'antd';
import { withNamespaces } from "react-i18next";
import { withRouter } from "react-router";
import "./NoData.css";


// import LoginSignupBack from "../../styles/images/b-2.jpg";
// import ImageContainer from "../../components/ImageComponent/ImageComponent";


const ErrorShow = props => {
//   const { t } = props;
//   const BannerSection = () => {
//     return (
//       <div className="banner-section-login">
//         <h1 className="home-search-text">{t("OOPS!")}</h1>
//         <p className="home-search-subtext">{t("Sorry!")}</p>
//       </div>
//     );
//   };

  return (
    // <div className="content-not-found">
    //   <ImageContainer imagePath={LoginSignupBack} content={BannerSection} />
    //   <div className="error-section">
    //     <div className="error-message-container">
    //       <h1 className="class-404">Some Thing Went Wrong.</h1>
    //       <p className="not-found">There is a problem in loading site.</p>
    //     </div>
    //   </div>
    // </div>
    <Result
    status="500"
    title="Sorry, something went wrong."
    subTitle="Application Crashed"
    extra={<Button type="primary" onClick={()=>props.history.push('/')} >Back Home</Button>}
  />
  );
};

export default withRouter(withNamespaces()(ErrorShow));
