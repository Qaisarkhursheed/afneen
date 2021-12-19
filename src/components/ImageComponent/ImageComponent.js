import React from 'react';
import { withRouter } from 'react-router';
import './ImageComponent.css'

const ImageContainer = ({ imagePath , content : Content , location}) => {
  return (
    <>
      <div className="image-container">
        {/* <img src={imagePath} alt='background'  */}
        {/* className={location.pathname.includes("/menu")?"menu-background-desktop" : "background-desktop"}/> */}
      </div>
      {/* <img src={imagePath} alt="mobile-background"  */}
      {/* className={location.pathname.includes("/menu")?"menu-background-mobile" : "background-mobile"}/> */}
      <div className="content-wrap">
        
        <div className="content">
          <Content />
        </div>
      </div>
     </>
  );
};

export default withRouter(ImageContainer);