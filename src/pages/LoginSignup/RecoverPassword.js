import React, { useEffect } from "react";
import LoginSignupBack from "../../styles/images/b-2.jpg";
import ImageContainer from "../../components/ImageComponent/ImageComponent";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { asyncActionGenerator, RECOVER_PASSWORD } from "../../redux/actions";
import "./LoginSignup.css";
import { bindActionCreators } from "redux";

const recoverActions = asyncActionGenerator(RECOVER_PASSWORD);

const RecoverPassword = (props) => {
  const { t, recover } = props;
  const BannerSection = () => {
    return (
      <div className="banner-section-login">
        <h1 className="home-search-text">{t("Recover Password")}</h1>
        <p className="home-search-subtext">{t("Enter Old and New Password")}</p>
      </div>
    );
  };
  const { isAuthenticated, history } = props;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/profile");
    }
  }, [history, isAuthenticated]);
  const [form] = Form.useForm();

  const onFinish = values => {
    //   recover();
    console.log(values);
  };
  return (
    <div className="login-signup">
      <ImageContainer imagePath={LoginSignupBack} content={BannerSection} />
      <div className="login-signup-section">
        <div className="forms-container">
        <div className="recover-form">
        <div className="form-lable">
        <span
          className="iconify"
          data-icon="zondicons:compose"
          data-inline="false"
        ></span>
        <span className="form-lable-heading">{t("Recover Password")}</span>
        <b></b>
      </div>
            <Form
            form={form}
            colon={false}
            name="recover"
            onFinish={onFinish}
            hideRequiredMark
            validateTrigger="onSubmit"
        >
            <Form.Item
            name="old_password"
            rules={[
                {
                required: true,
                message: "Please input your old password!",
                },
            ]}
            >
            <Input.Password placeholder="Old Password" />
            </Form.Item>

            <Form.Item
            name="New_password"
            rules={[
                {
                required: true,
                message: "Please input your new password!",
                },
            ]}
            >
            <Input.Password placeholder="New Password" />
            </Form.Item>

            <Form.Item
            name="confirm"
            dependencies={["New_password"]}
            rules={[
                {
                required: true,
                message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                validator(rule, value) {
                    if (!value || getFieldValue("New_password") === value) {
                    return Promise.resolve();
                    }

                    return Promise.reject(
                    "The two passwords that you entered do not match!"
                    );
                },
                }),
            ]}
            >
            <Input.Password placeholder="Confirm Password" />
            </Form.Item>
            <Form.Item className="user-signup-button-wrapper">
            <Button
                type="primary"
                htmlType="submit"
                className="user-signup-button"
            >
                {t("Recover Password")}
            </Button>
            </Form.Item>
            </Form>
            </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.AuthenticationReducer.isAuthenticated,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      recover: recoverActions.request,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withNamespaces()(RecoverPassword)));
