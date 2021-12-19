import React, { useState } from "react";
import { Form, Input, Select, Checkbox, Button } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { asyncActionGenerator, SIGNUP, SIGNUP_CHECK } from "../../redux/actions";
import { withNamespaces } from "react-i18next";
import { NavLink } from "react-router-dom";
import FB from '../../styles/images/fb.png';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import Google from '../../styles/images/google.jpg';
import { UserOutlined, LockOutlined, EditOutlined, PhoneOutlined } from '@ant-design/icons';
import "./Signup.css";
import LoginModal from "../Navbar/LoginModal";

const signupActions = asyncActionGenerator(SIGNUP);
const signupCheckActions = asyncActionGenerator(SIGNUP_CHECK);

// const { Option } = Select;

const Signup = (props) => {
  const { t, signup, ischecking, getPassword, signupCheck } = props;
  const [form] = Form.useForm();
  const [userinfo, SetUserInfo] = useState({ email: '', first_name: '', phone_number: '', google_id: '' });
  const [userinfo2, SetUserInfo2] = useState({ email: '', first_name: '', phone_number: '', facebook_id: '' });

  const responseGoogle = (response) => {
    const { email, givenName, googleId } = response.profileObj;
    SetUserInfo({ email: email, first_name: givenName, google_id: googleId })
    // SetHideField(true);
    signupCheck({ email: email })
    console.log(response);
  }
  console.log(userinfo.first_name);
  // const prefixSelector = (
  //   <Form.Item name="prefix" noStyle>
  //     <Select
  //       style={{
  //         width: 70,
  //       }}
  //     >
  //       <Option value="+41">+41</Option>
  //       <Option value="+92">+92</Option>
  //     </Select>
  //   </Form.Item>
  // );
  const onFinish = (values) => {
    const phone = values.prefix + values.phone_number
    if (getPassword) {
      signup({
        first_name: userinfo.first_name,
        email: userinfo.email,
        password: values.password,
        google_id: userinfo.google_id,
      });
      form.resetFields();
    }
    else {
      signup({
        first_name: values.first_name,
        // last_name: values.last_name,
        phone_number: phone,
        email: values.email,
        password: values.password,
      });
      form.resetFields();
    }
  };
  // console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
  const responseFacebook = (response) => {
    const { email, name, id } = response;
    SetUserInfo({ email: email, first_name: name, google_id: id })
    // SetHideField(true);
    signupCheck({ email: email })
    console.log(response);
  }

  return (
    <div className="signup-box">
      <div className="signup-green-heading">
        <h3>Sign Up</h3>
      </div>
      <Form
        form={form}
        colon={false}
        name="signup"
        onFinish={onFinish}
        hideRequiredMark
        validateTrigger="onSubmit"
        className="login-modal"
      >
        {getPassword ?
          <div className="sign-in-wrapper">
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password" />
            </Form.Item>
            <Form.Item className="user-signup-button-wrapper">
              <Button
                type="primary"
                htmlType="submit"
                className="user-signup-button"
              >
                {t("Sign up Now")}
              </Button>
            </Form.Item>
          </div>
          :
          <div className="sign-in-wrapper">
            {/* <NavLink to="#" className="social_bt facebook">
              <img src={FB} /> Signup with Facebook
              </NavLink> */}
              <FacebookLogin
                appId="261506975134663"
                callback={responseFacebook}
                cookie={'single_host_origin'}
                fields="name,email,picture"
                render={renderProps => (
                  <button
                    className="social_bt facebook"
                    onClick={renderProps.onClick}>  <img src={FB} /> Signup with Facebook</button>
                )}
              />
              <GoogleLogin
                clientId="270530134319-h8sqmfj26bt1kqsckgghurjnrfhhdno0.apps.googleusercontent.com"
                render={renderProps => (
                  <button
                    className="social_bt google"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}>
                    <img src={Google} /> Signup with Google</button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />

              <div className="divider-login"><span>Or</span></div>
              <Form.Item
                name="first_name"
                rules={[
                  {
                    required: true,
                    message: "Please input your First Name",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  prefix={<EditOutlined className="site-form-item-icon" />}
                  placeholder="First and Last Name" />
              </Form.Item>
              <Form.Item
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined className="site-form-item-icon" />}
                  placeholder="Phone Number" />
              </Form.Item>
              <Form.Item
                name="email"
                validateTrigger="onSubmit"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="E-mail" />
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
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Password" />
              </Form.Item>
              <Form.Item className="user-signup-button-wrapper">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="user-signup-button"
                >
                  {t("Sign up Now")}
                </Button>
              </Form.Item>
          </div>
        }
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
        ischecking: state.AuthenticationReducer.isChecking,
  getPassword: state.AuthenticationReducer.getPassword,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
      {
        signup: signupActions.request,
      signupCheck: signupCheckActions.request,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(Signup));
