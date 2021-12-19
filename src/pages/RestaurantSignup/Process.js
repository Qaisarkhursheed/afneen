import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import BrowseRestaurantImage from "../../styles/images/banner-5.jpg";
import ImageContainer from "../../components/ImageComponent/ImageComponent";
import { Steps } from "antd";
import { withRouter } from "react-router-dom";
import Packages from "./Packages";
import RestaurantForm from "./RestaurantForm";
import PaymentInformation from "./PaymentInformation";
import Activation from "./Activation";
import "./RestaurantSignup.css";
import { withNamespaces } from "react-i18next";

const Process = (props) => {
  const { t } = props;
  const BannerSection = () => {
    return (
      <div className="banner-section">
        <h1 className="home-search-text">{t("Restaurant Signup")}</h1>
        <p className="home-search-subtext">
          {t("Please Choose A Package Below To Signup")}
        </p>
      </div>
    );
  };

  const { Step } = Steps;
  const [current, setCurrent] = useState(0);
  const [pack, setPack] = useState({});
  const next = (item) => {
    setCurrent(current + 1);
    setPack(item ? item : pack);
  };
  useEffect(() => {
    if (props.match.params.type === "membership") {
      setCurrent(0);
    } else setCurrent(1);
  }, [props.match.params]);

  const steps = [
    {
      title: <span>{t("Select Package")}</span>,
      content: <Packages onSuccess={next} />,
    },
    {
      title: <span>{t("Merchant Information")}</span>,
      content: (
        <RestaurantForm
          onSuccess={next}
          pack={pack}
          urlParam={props.match.params.type}
        />
      ),
    },
    {
      title: <span>{t("Payment Information")}</span>,
      content: <PaymentInformation onSuccess={next} pack={pack} />,
    },
    {
      title: <span>{t("Activation")}</span>,
      content: <Activation pack={pack} />,
    },
  ];

  return (
    <div className="restaurant-signup">
      {/* <ImageContainer
        imagePath={BrowseRestaurantImage}
        content={BannerSection}
      /> */}
      <div className="process">
        <div className="process-steps">
          <Steps current={current}>
            {steps.map((item) => (
              <Step key={item.title} title={<span>{item.title}</span>} />
            ))}
          </Steps>
        </div>
        <div className="steps-content">{steps[current].content}</div>
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
)(withRouter(withNamespaces()(Process)));
