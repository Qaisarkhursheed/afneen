import React, { useEffect } from "react";
import LoginSignupBack from "../../styles/images/b-2.jpg";
import ImageContainer from "../../components/ImageComponent/ImageComponent";
import Login from "../../components/Login/Login";
import Signup from "../../components/Signup/Signup";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./LoginSignup.css";
import { withNamespaces } from "react-i18next";

const LoginSignup = (props) => {
  const { t } = props;
  const BannerSection = () => {
    return (
      <div className="banner-section-login">
        <h1 className="home-search-text">{t("Login & Signup")}</h1>
        <p className="home-search-subtext">{t("sign up to start ordering")}</p>
      </div>
    );
  };
  const { isAuthenticated, history } = props;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/profile");
    }
  }, [history, isAuthenticated]);
  return (
    <div className="login-signup">
      {/* <ImageContainer imagePath={LoginSignupBack} content={BannerSection} /> */}
      <div className="login-signup-section">
          <Signup /> 
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
)(withRouter(withNamespaces()(LoginSignup)));
