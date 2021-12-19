import React from "react";
import Step1 from "../../../styles/images/step1.png";
import Step2 from "../../../styles/images/step2.png";
import Step3 from "../../../styles/images/step3.png";
import Step4 from "../../../styles/images/step4.png";
import { withNamespaces } from "react-i18next";
import i18n from "../../../i18n";

import "./StepsSection.css";

const StepsSection = (props) => {
  const { t } = props;
  return (
    <div className="steps-container">
      <h2>{t("How it works")}</h2>
      <p className="steps-sub-heading">
        {t("Get your favourite food in 4 simple steps")}
      </p>
      <div className="steps-row">
        <div className="step">
          <div className="step-icon">
            <img src={Step1} alt="step" />
          </div>
          <span>1</span>
          <h3>{t("Search")}</h3>
          <p>{t("Find all restaurants available near you")}</p>
        </div>
        <div className="step">
          <div className="step-icon">
            <img src={Step2} alt="step" />
          </div>
          <span>2</span>
          <h3>{t("Choose")}</h3>
          <p>{t("Browse hundreds of menus to find the food you like")}</p>
        </div>
        <div className="step">
          <div className="step-icon">
            <img src={Step3} alt="step" />
          </div>
          <span>3</span>
          <h3>{t("Pay")}</h3>
          <p>{t("It's quick, secure and easy")}</p>
        </div>
        <div className="step">
          <div className="step-icon">
            <img src={Step4} alt="step" />
          </div>
          <span>4</span>
          <h3>{t("Enjoy")}</h3>
          <p>{t("Food is prepared & delivered to your door")}</p>
        </div>
      </div>
    </div>
  );
};

export default withNamespaces()(StepsSection);
