import React from "react";
import "./Contact.css";
import LoginSignupBack from "../../styles/images/b-2.jpg";
import { Form, Input, Button } from "antd";
import ImageContainer from "../../components/ImageComponent/ImageComponent";
import Map from "./Map";
import LeafLetMap from "../../components/LeafLetMap/LeafLetMap";
import { withNamespaces } from "react-i18next";

const Contact = (props) => {
  const { t } = props;

  const BannerSection = () => {
    return (
      <div className="banner-section-contact">
        <h1 className="home-search-text">{t("Contact Us")}</h1>
        <p className="home-search-subtext"> {t("My Gastro Fox Switzerland")}</p>
        <p className="home-search-subtext">+41 31 911 10 85</p>
        <p className="home-search-subtext">{t("info@mygastrofox.ch")}</p>
      </div>
    );
  };
  return (
    <div className="login-signup">
      <ImageContainer imagePath={LoginSignupBack} content={BannerSection} />
      <div className="contact-section">
        <LeafLetMap />
        <div id="map-contact">
          <div className="inner-container">
            <div className="inner">
              <div className="inner-content">
                <h2>{t("Contact MY GASTRO FOX")}</h2>
                <p>
                  {t(
                    "We are always happy to hear from our clients and visitors, you may contact us anytime"
                  )}
                </p>
                <p>{t("MY GASTRO FOX | KEWAG & Partner GmbH")}</p>
              </div>
              <div className="inner-form">
                <div className="top30"></div>
                <Form
                  name="login-form"
                  //   onFinish={onFinish}
                  validateTrigger="onSubmit"
                >
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your name!",
                      },
                    ]}
                  >
                    <Input placeholder="Name" autoComplete="off" />
                  </Form.Item>
                  <div className="top20"></div>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input placeholder="E-mail Adress" autoComplete="off" />
                  </Form.Item>
                  <div className="top20"></div>
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone!",
                      },
                    ]}
                  >
                    <Input placeholder="Phone" autoComplete="off" />
                  </Form.Item>
                  <div className="top20"></div>
                  <Form.Item
                    name="country"
                    rules={[
                      {
                        required: true,
                        message: "Please input country name!",
                      },
                    ]}
                  >
                    <Input placeholder="Country" autoComplete="off" />
                  </Form.Item>
                  <div className="top20"></div>
                  <Form.Item
                    name="message"
                    rules={[
                      {
                        required: true,
                        message: "Please input require feilds!",
                      },
                    ]}
                  >
                    <Input.TextArea placeholder="Message" />
                  </Form.Item>
                  <div className="top20"></div>
                  <Form.Item className="submit-button">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-button"
                    >
                      {t("Submit")}
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withNamespaces()(Contact);
