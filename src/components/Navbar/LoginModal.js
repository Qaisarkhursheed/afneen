import React from 'react';
import {Modal, Form, Button, Input, Spin} from 'antd';
import { withNamespaces } from "react-i18next";
import { NavLink } from 'react-router-dom';
import { UserOutlined, LockOutlined, LoadingOutlined  } from '@ant-design/icons';
import FB from '../../styles/images/fb.png';
import Google from '../../styles/images/google.jpg';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { connect } from 'react-redux';
import {
    asyncActionGenerator,
    LOGIN,
    FORGET_PASSWORD,
  } from "../../redux/actions";
import { bindActionCreators } from 'redux';

const loginActions = asyncActionGenerator(LOGIN);
const forgetActions = asyncActionGenerator(FORGET_PASSWORD);
const antIcon = <LoadingOutlined  style={{ fontSize: 40, color: '#5cb85c' }} spin />;

const LoginModal = ({visible, onClose, t, login, isLoggingIn, isAuthenticated}) => {
    const [form] = Form.useForm();
    const onCancel = () => {
        form.resetFields();
        onClose();
    };
    const onFinish = (values) => {
        login({
          email: values.username,
          password: values.password,
        });
      };
      const responseGoogle = (response) => {
        const {email, googleId}= response.profileObj;
        console.log(response);
        login({
          email: email,
          google_id: googleId,
        });
      }
      const responseFacebook = (response) => {
        const { email, id } = response;
        console.log(response);
        login({
          email: email,
          google_id: id,
        });
      }

    return (
        <Modal
            className="login-modal"
            title="Sign In"
            visible={isAuthenticated ? false : visible}
            onCancel={onCancel}
            footer={false}
        >
        <Spin spinning={isLoggingIn} indicator={antIcon}>
         <Form name="login-form" onFinish={onFinish} validateTrigger="onSubmit" hideRequiredMark>
            <div className="sign-in-wrapper">
                {/* <NavLink to="#" className="social_bt facebook">
                    <img src={FB} /> Login with Facebook</NavLink> */}
                    <FacebookLogin
                        appId="261506975134663"
                        autoLoad={false}
                        callback={responseFacebook}
                        cookie={'single_host_origin'}
                        fields="name,email,picture"
                        render={renderProps => (
                            <button
                            className="social_bt facebook"
                            onClick={renderProps.onClick}> <img src={FB} /> Login with Facebook</button>
                        )}
                        />
                <GoogleLogin
                    clientId="270530134319-h8sqmfj26bt1kqsckgghurjnrfhhdno0.apps.googleusercontent.com"
                    render={renderProps => (
                    <button
                    className="social_bt google"
                    onClick={renderProps.onClick} 
                    disabled={renderProps.disabled}>
                    <img src={Google} /> Login with Google</button>
                    )}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <div className="divider-login"><span>Or</span></div>
                <label className="label-login-item">Email</label>
                <Form.Item
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: "Please input your username!",
                    },
                    ]}
                >
                    <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Email" autoComplete="off" />
                </Form.Item>
                <label className="label-login-item">Password</label>
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
                    autoComplete="off"
                    placeholder="Password" />
                </Form.Item>
                <div class="add_bottom_15">
					<div class="checkboxes float-left">
						<label class="container_check">Remember me
						  <input type="checkbox" />
						  <span class="checkmark"></span>
						</label>
					</div>
					<div class="float-right mt-1">
                        <NavLink to="/">Forgot Password?</NavLink>
                    </div>
				</div>
                    {/* <Button type="link" className="forget-link" onClick={setForgetShow}>
                    {t("Forgot Password")} ?
                    </Button> */}
                    <Button type="primary" htmlType="submit" className="forget-login-button">
                    {t("Login")}
                    </Button>
                <div className="signup-link-text">
					Don’t have an account? <NavLink to="/signup" onClick={onClose} >Sign up</NavLink>
				</div>
            </div>
        </Form>
        </Spin>
    </Modal>
    )
};

const mapStateToProps = state =>({
    isLoggingIn: state.AuthenticationReducer.isLoggingIn,
    isAuthenticated: state.AuthenticationReducer.isAuthenticated,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      login: loginActions.request,
      forgetPassword: forgetActions.request,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(LoginModal));