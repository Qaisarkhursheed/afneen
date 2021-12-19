import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  asyncActionGenerator,
  LOGIN,
  FORGET_PASSWORD,
} from "../../redux/actions";
import "./Login.css";
import { withNamespaces } from "react-i18next";

const loginActions = asyncActionGenerator(LOGIN);
const forgetActions = asyncActionGenerator(FORGET_PASSWORD);

const Login = (props) => {
  const { t } = props;
  const { login, forgetPassword } = props;
  const [showForget, setShowForget] = useState(false);

  const setForgetShow = () => {
    setShowForget(!showForget);
  };
  const onFinish = (values) => {
    login({
      email: values.username,
      password: values.password,
    });
  };
  const onFinishForget = (values) => {
    forgetPassword({ email: values.forget_email });
  };
  // CookieService.set('hello','value', { path:'/' ,secure: true });
  return (
    <div className="forms-wrapper">
      <div className="login-box">
        <div className="form-lable">
          <span
            className="iconify"
            data-icon="cil:contact"
            data-inline="false"
          ></span>
          <span className="form-lable-heading">
            {t("Log in to your account")}
          </span>
          <b></b>
        </div>
        <Form name="login-form" onFinish={onFinish} validateTrigger="onSubmit">
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input placeholder="Mobile Number or E-mail" autoComplete="off" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password autoComplete="off" placeholder="Password" />
          </Form.Item>
          <Form.Item className="forget-login-button">
            <Button type="link" className="forget-link" onClick={setForgetShow}>
              {t("Forgot Password")} ?
            </Button>
            <Button type="primary" htmlType="submit" className="login-button">
              {t("Login")}
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={showForget ? "forget-box" : "hide-forget-box"}>
        <div className="form-lable">
          <span
            className="iconify"
            data-icon="fa-solid:unlock"
            data-inline="false"
          ></span>
          <span className="form-lable-heading">{t("Forgot Password")}</span>
          <b></b>
        </div>
        <Form
          name="forget-form"
          className={showForget ? "" : "remove-forget-box"}
          onFinish={onFinishForget}
          validateTrigger="onSubmit"
        >
          <Form.Item
            name="forget_email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder="E-mail Address" />
          </Form.Item>
          <Form.Item className="forget-login-button">
            <Button type="link" className="forget-link" onClick={setForgetShow}>
              {t("Close")}
            </Button>
            <Button type="primary" htmlType="submit" className="login-button">
              {t("Retrieve Password")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      login: loginActions.request,
      forgetPassword: forgetActions.request,
    },
    dispatch
  );
export default connect(null, mapDispatchToProps)(withNamespaces()(Login));
