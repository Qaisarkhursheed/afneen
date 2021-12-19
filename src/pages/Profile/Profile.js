import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import ImageContainer from "../../components/ImageComponent/ImageComponent";
import BannerImage from "../../styles/images/b-2.jpg";
import InfoForm from "./InfoForm/InfoForm";
import AddressBook from "./AddressBook/AddressBook";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { asyncActionGenerator, UPLOAD_PICTURE } from "../../redux/actions";
import "./Profile.css";
import { uploadPicture } from "../../services/User";
import BookingHistory from "./BookingHistory/BookingHistory";
import Vouchers from "./Vouchers/Vouchers";
import Rating from "./Rating/Rating";
import Favorite from "./Favorite/Favorite";
import OrderHistory from "./OrderHistory/OrderHistory";
import { withNamespaces } from "react-i18next";
// import CreditCard from "./CreditCards/CreditCards";

const imageActions = asyncActionGenerator(UPLOAD_PICTURE);


const Profile = (props) => {
  const { history, isAuthenticated, uploadImage, picture, user,t } = props;
    const BannerSection = () => {
      return (
        <div className="banner-section">
          <h1 className="home-search-text">{t("Profile")}</h1>
          <p className="home-search-subtext">
          {t("Manage your profile,address book, credit card and more")}
          </p>
        </div>
      );
    };
  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/signup");
    }
  }, [history, isAuthenticated]);

  const [file, setFile] = useState(null);
  const [clickedValue, setClickedValue] = useState("tab-1");
  const handleTabClicked = (value) => {
    setClickedValue(value);
  };
  const onImage = (event) => {
    if (event.target.files.length > 0) {
      setFile(event.target.files[0]);
      // const formData = new FormData()
      // console.log('formdate=>',formData )
      // formData.append('file', event.target.files[0]);
      // // File.append('file',event.target.files[0])
      // // const file = URL.createObjectURL(event.target.files[0]);
      // uploadImage({
      //   email: user.email,
      //   avatar: "image"
      // });
      //   setFile(file);
    }
  };

  const handleImageUpload = e => {
    if (e.target.files.length > 0) {
      const img = URL.createObjectURL(e.target.files[0]);
      // setShowImage(img);
      const file = new FormData();
      file.append("avatar",  e.target.files[0]);
      file.append("email",user.email);
      // setImage(file);
      uploadPicture(file);
    }
    // const formData = new FormData();
    // formData.append("avatar", e.target.files);
    // formData.append("email", user.email);
  };
  return (
    <div className="profile-section">
      <ImageContainer imagePath={BannerImage} content={BannerSection} />
      <div className="information-picture-section">
        <div className="information-picture-container">
          <div className="information-tabs-wrapper">
            <div className="information-tabs-box">
              <ul className="information-tabs">
                <li
                  onClick={() => handleTabClicked("tab-1")}
                  className={clickedValue === "tab-1" ? "selected" : ""}
                >
                  <i className="ion-android-contact"></i>
                  <span>
                    <span
                      className="iconify"
                      data-icon="whh:profile"
                      data-inline="false"
                    ></span>
                    <span className="tab-name">{t("Profile")}</span>
                  </span>
                </li>
                <li
                  onClick={() => handleTabClicked("tab-2")}
                  className={clickedValue === "tab-2" ? "selected" : ""}
                >
                  <i className="ion-android-contact"></i>
                  <span>
                    <span
                      className="iconify"
                      data-icon="entypo:location-pin"
                      data-inline="false"
                    ></span>
                    <span className="tab-name">{t("Address Book")}</span>
                  </span>
                </li>
                <li
                  onClick={() => handleTabClicked("tab-3")}
                  className={clickedValue === "tab-3" ? "selected" : ""}
                >
                  <i className="ion-android-contact"></i>
                  <span>
                    <span
                      className="iconify"
                      data-icon="bytesize:book"
                      data-inline="false"
                    ></span>
                    <span className="tab-name">{t("Order History")}</span>
                  </span>
                </li>
                <li
                  onClick={() => handleTabClicked("tab-4")}
                  className={clickedValue === "tab-4" ? "selected" : ""}
                >
                  <i className="ion-android-contact"></i>
                  <span>
                    <span
                      className="iconify"
                      data-icon="cil:book"
                      data-inline="false"
                    ></span>
                    <span className="tab-name">{t("Booking History")}</span>
                  </span>
                </li>
                <li
                onClick={() => handleTabClicked("tab-5")}
                className={clickedValue === "tab-5" ? "selected" : ""}
                >
                  <i className="ion-android-contact"></i>
                  <span>
                    <span
                      className="iconify"
                      data-icon="ant-design:heart-outlined"
                      data-inline="false"
                    ></span>
                    <span className="tab-name">{t("Favorites")}</span>
                  </span>
                </li>
                <li
                onClick={() => handleTabClicked("tab-6")}
                className={clickedValue === "tab-6" ? "selected" : ""}
                >
                  <i className="ion-android-contact"></i>
                  <span>
                  <span 
                  className="iconify"
                  data-icon="bi:star-half"
                  data-inline="false">
                  </span>
                    <span className="tab-name">{t("Reviews")}</span>
                  </span>
                </li>
                <li
                  onClick={() => handleTabClicked("tab-7")}
                  className={clickedValue === "tab-7" ? "selected" : ""}
                >
                  <i className="ion-android-contact"></i>
                  <span>
                    <span
                      className="iconify"
                      data-icon="el:credit-card"
                      data-inline="false"
                    ></span>
                    <span className="tab-name">{t("Vouchers")}</span>
                  </span>
                </li>
              </ul>
              <div className="tabs-data-part">
                <div
                  className={
                    clickedValue === "tab-1" ? "show-tab-data" : "hide-tab-data"
                  }
                >
                  <InfoForm />
                </div>
                <div
                  className={
                    clickedValue === "tab-2" ? "show-tab-data" : "hide-tab-data"
                  }
                >
                  <AddressBook />
                </div>
                <div
                  className={
                    clickedValue === "tab-3" ? "show-tab-data" : "hide-tab-data"
                  }
                >
                  <OrderHistory />
                </div>
                <div
                  className={
                    clickedValue === "tab-4" ? "show-tab-data" : "hide-tab-data"
                  }
                >
                  <BookingHistory />
                </div>
                <div
                  className={
                    clickedValue === "tab-5" ? "show-tab-data" : "hide-tab-data"
                  }
                >
                  <Favorite />
                </div>
                <div
                  className={
                    clickedValue === "tab-6" ? "show-tab-data" : "hide-tab-data"
                  }
                >
                  <Rating />
                </div>
                <div
                  className={
                    clickedValue === "tab-7" ? "show-tab-data" : "hide-tab-data"
                  }
                >
                  <Vouchers />
                </div>
              </div>
            </div>
          </div>
          <div className="profile-picture-box">
            <div className="profile-picture-wrapper">
              <div className="avatar-wrapper">
                <Avatar src={file} icon={<UserOutlined />}></Avatar>
              </div>
              <div className="upload-box">
              <label className="custom-file-upload-food">
                    <input type="file" onChange={handleImageUpload} />
                    {t("Browse")}
                  </label>
                {/* <form onSubmit={(e) => handleSubmit(e)}>
                  <input
                    type="file"
                    name="image"
                    className="profile-input"
                    onChange={handleImageChange}
                  />
                  Browse
                </form> */}
              </div>
              <div className="line-top-bottom">
                {t("Update your profile picture")}
              </div>
              <div className="connected-wrap">
                <div className="mytable-web">
                  <div className="mycol-1">
                    <i className="fa fa-globe" aria-hidden="true"></i>
                  </div>
                  <div className="mycol-2">
                    <span className="small">{t("Connected as")}</span>
                    <br></br>
                    <span className="bold">{user ? user.first_name : ""}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.AuthenticationReducer.isAuthenticated,
  picture: state.ProfileReducer.picture,
  user: state.AuthenticationReducer.loginResponse.user,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      uploadImage: imageActions.request,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withNamespaces()(Profile)));
