import React from "react";
import MobileImage from "../../../styles/images/getapp-2.jpg";
import "./MobileAppSection.css";
import { withNamespaces } from "react-i18next";
import i18n from "../../../i18n";

const MobileAppSection = (props) => {
  const { t } = props;
  return (
    <div className="mobile-section-container">
      <div className="mobile-and-app-info">
        <div className="mobile-image">
          <img src={MobileImage} alt="mob" />
        </div>
        <div className="app-info">
          <h2>{t("MY GASTRO FOX in your mobile!")} </h2>
          <h3 className="green-text">
            {t("Get our app, it's the fastest way to order food on the go.")}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default withNamespaces()(MobileAppSection);
