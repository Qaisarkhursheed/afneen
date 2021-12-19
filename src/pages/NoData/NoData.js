import React, { useEffect } from "react";
import LoginSignupBack from "../../styles/images/b-2.jpg";
import ImageContainer from "../../components/ImageComponent/ImageComponent";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import "./NoData.css";

const NoData = (props) => {
  const { t } = props;
  const BannerSection = () => {
    return (
      <div className="banner-section-login">
        <h1 className="home-search-text">{t("OOPS!")}</h1>
        <p className="home-search-subtext">{t("Sorry!")}</p>
      </div>
    );
  };

  return (
    <div className="content-not-found">
      <ImageContainer imagePath={LoginSignupBack} content={BannerSection} />
      <div className="error-section">
        <div className="error-message-container">
          <h1 className="class-404">404</h1>
          <p className="not-found">Content Not Found</p>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.AuthenticationReducer.isAuthenticated,
});
export default connect(
  mapStateToProps,
  null
)(withRouter(withNamespaces()(NoData)));
