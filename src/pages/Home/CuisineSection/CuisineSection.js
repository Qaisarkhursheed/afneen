import React from "react";
import CuisineLogo from "../../../styles/images/cuisine.png";
import { withNamespaces } from "react-i18next";

import "./CuisineSection.css";

const CuisineSection = (props) => {
  const { t } = props;
  return (
    <div className="cuisine-container">
      <div className="cuisine-logo">
        <img src={CuisineLogo} alt="cuisine" />
      </div>
      <div className="cuisine-list">
        <h2>{t("Browse by cuisine")}</h2>
        <p className="cuisine-sub-heading">
          {t("choose from your favorite cuisine")}
        </p>
        <div className="cuisine-links">
          <div className="cuisine-item">
            <a href="/cuisine?category=1" className="even">
              {t("American")}
            </a>
          </div>
          <div className="cuisine-item">
            <a href="/cuisine?category=2" className="odd">
              {t("Deli")}
            </a>
          </div>
          <div className="cuisine-item">
            <a href="/cuisine?category=3" className="even">
              {t("Indian")}
            </a>
          </div>
          <div className="cuisine-item">
            <a href="/cuisine?category=4" className="odd">
              {t("Mediterranean")}
            </a>
          </div>
          <div className="cuisine-item">
            <a href="/cuisine?category=5" className="even">
              {t("Sandwiches")}
            </a>
          </div>
          <div className="cuisine-item">
            <a href="/cuisine?category=6" className="odd">
              {t("Barbeque")}
            </a>
          </div>
          <div className="cuisine-item">
            <a href="/cuisine?category=7" className="even">
              {t("Diner")}
            </a>
          </div>
          <div className="cuisine-item">
            <a href="/cuisine?category=8" className="odd">
              {t("Italian")}
            </a>
          </div>
          <div className="cuisine-item">
            <a href="/cuisine?category=9" className="even">
              {t("Mexican")}
            </a>
          </div>
          <div className="cuisine-item">
            <a href="/cuisine?category=10" className="odd">
              {t("Sushi")}
            </a>
          </div>
          <div className="cuisine-item">
            <a href="/cuisine?category=11" className="even">
              {t("Burgers")}
            </a>
          </div>
          <div className="cuisine-item">
            <a href="/cuisine?category=12" className="odd">
              {t("Greek")}
            </a>
          </div>
          <div className="cuisine-item">
            <a href="/cuisine?category=13" className="even">
              {t("Japanese")}
            </a>
          </div>
          <div className="cuisine-item">
            <a href="/cuisine?category=14" className="odd">
              {t("Middle Eastern")}
            </a>
          </div>
          <div className="cuisine-item">
            <a href="/cuisine?category=15" className="even">
              {t("Thai")}
            </a>
          </div>
          <div className="cuisine-item">
            <a href="/cuisine?category=16" className="odd">
              {t("Chinese")}
            </a>
          </div>
          <div className="cuisine-item">
            <a href="/cuisine?category=17" className="even">
              {t("Healthy")}
            </a>
          </div>
          <div className="cuisine-item">
            <a href="/cuisine?category=18" className="odd">
              {t("Korean")}
            </a>
          </div>
          <div className="cuisine-item">
            <a href="/cuisine?category=19" className="even">
              {t("Pizza")}
            </a>
          </div>
          <div className="cuisine-item">
            <a href="/cuisine?category=20" className="odd">
              {t("Vegetarian")}
            </a>
          </div>
          <div className="clear"></div>
        </div>
      </div>
    </div>
  );
};

export default withNamespaces()(CuisineSection);
