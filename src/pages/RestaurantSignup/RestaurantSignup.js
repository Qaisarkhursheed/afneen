import React from "react";
import { connect } from "react-redux";
import BrowseRestaurantImage from "../../styles/images/banner-5.jpg";
import { withRouter } from "react-router-dom";
import ImageContainer from "../../components/ImageComponent/ImageComponent";
import { Button } from "antd";
import "./RestaurantSignup.css";
import { withNamespaces } from "react-i18next";

const RestaurantSignup = (props) => {
  const { t } = props;

  // const BannerSection = () => {
  //   return (
  //     <div className="banner-section">
  //       <h1 className="home-search-text">{t("Restaurant Signup")}</h1>
  //       <p className="home-search-subtext">
  //         {t("Please Choose A Package Below To Signup")}
  //       </p>
  //     </div>
  //   );
  // };

  return (
    <div className="restaurant-signup">
      {/* <ImageContainer
        imagePath={BrowseRestaurantImage}
        content={BannerSection}
      /> */}
      <div className="choose-package">
        <div className="package-1">
          <h1>{t("Membership")}</h1>
          <p>{t("You will be charged a monthly or yearly fee")}</p>
          <Button
            type="default"
            onClick={() => {
              props.history.push("/restaurant-signup/membership");
            }}
          >
            {t("Click here")}
          </Button>
        </div>
        <div className="package-2">
          <h1>{t("Commision")}</h1>
          <p>{t("5% Commision per order")}</p>
          <Button
            type="default"
            onClick={() => {
              props.history.push("/restaurant-signup/commission");
            }}
          >
            {t("Click here")}
          </Button>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  restaurantList: state.RestaurantReducer.restaurantsList,
});
export default connect(
  mapStateToProps,
  null
)(withRouter(withNamespaces()(RestaurantSignup)));
