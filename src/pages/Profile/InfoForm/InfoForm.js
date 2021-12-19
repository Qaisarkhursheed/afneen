import React, {useState, useEffect} from 'react';
import {Form, Input, Select, Button,Spin } from 'antd';
import ModalWithForm from '../../../components/ModalWithForm/ModalWithForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNamespaces } from "react-i18next";
import { asyncActionGenerator, SAVE_PROFILE, CHANGE_PASSWORD, GET_PROFILE } from '../../../redux/actions';
import './InfoForm.css';

const profileActions = asyncActionGenerator(SAVE_PROFILE);
const changePasswordActions = asyncActionGenerator(CHANGE_PASSWORD);
const getProfileActions = asyncActionGenerator(GET_PROFILE);

const InfoForm = props => {
  const {saveProfile, changePassword, data, user, getProfile, isGettingProfile, t} = props;
  const [form] = Form.useForm();
  // const { Option } = Select;
  const [modalVisible, setModalVisible] = useState(false);
  const onFinish = values => {
    saveProfile({
      user_id: user.id,
      first_name: values.first_name,
      last_name: values.last_name,
      email:values.email,
      phone_number: values.phone_number,
    });
  };
 const handleModal = () => {
   setModalVisible(true);
 }
 const onCancel = () =>{
  setModalVisible(false);
 }
 const formSchema = [
   {
     name: 'old password',
     type: 'password',
     heading: <div>{t("Old Password")}</div>,
     className: 'info-form-password',
     rules: [
      {
      required: true,
      message: 'Please input your old password!',
      }
    ],
     component: <Input.Password placeholder="old password"/>,
   },
   {
    name: 'new password',
    type: 'password',
    heading: <div>{t("New Password")}</div>,
    className: 'info-form-password',
    rules: [
      {
      required: true,
      message: 'Please input your new password!',
      }
    ],
    component: <Input.Password placeholder="new password"/>,
  }
 ]
  // const prefixSelector = (
  //   <Form.Item name="prefix" noStyle>
  //     <Select
  //       style={{
  //         width: 70,
  //       }}
  //     >
  //       <Option value="+92">+92</Option>
  //       <Option value="+87">+87</Option>
  //     </Select>
  //   </Form.Item>
  // );
  useEffect(()=>{
    if(user) {
      getProfile({user_id: user.id});
    };
    
  }, [getProfile, user]);
  // useEffect(() => {
  //   form.setFieldsValue({
  //     firstname: data.first_name,
  //     lastname: data.last_name,
  //   });
  // },[form, data]);
  const setIntial = name => {
    form.setFieldsValue({
      [name]: data[name] || '',
    });
  }
  return (
    <Spin spinning={isGettingProfile}>
        <div className="info-tab">
          <Form
            form={form}
            colon={false}
            name="signup"
            onFinish={onFinish}
            hideRequiredMark
            validateTrigger="onSubmit"
          >
            <Form.Item
              name="first_name"
              label= {<div>{t("First Name")}</div>}
              initialValue={setIntial('first_name')}
              rules={[
                {
                  required: true,
                  message: 'Please input your First Name',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="last_name"
              label={<div>{t("Last Name")}</div>}
              rules={[
                {
                  required: true,
                  message: 'Please input your Last Name',
                  whitespace: true,
                },
              ]}
              initialValue={setIntial('last_name')}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label={<div>{t("Email")}</div>}
              validateTrigger='onSubmit'
              initialValue={setIntial('email')}
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input  disabled/>
            </Form.Item>
            <Form.Item
              name="phone_number"
            label={<div>{t("Contact Number")}</div>} 
              initialValue={setIntial('phone_number')}
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <div  className="change-and-save-button">
              <Button type="link" className="change-password-button" onClick={()=>{handleModal()}}>
                Change Password
              </Button>
              <Button type="primary" htmlType="submit" className="sava-data-button">
                {t("Save")}
              </Button>
            </div>
        </Form>
        <ModalWithForm
          visible={modalVisible}
          onCancel={onCancel}
          formData={formSchema}
          createField={changePassword}
        />
        </div>
    </Spin>
  );
};

const mapStateToProps = state => (
  {
    data: state.ProfileReducer.profile,
    isGettingProfile: state.ProfileReducer.isGettingProfile,
    user: state.AuthenticationReducer.loginResponse.user,
  }
);

const mapDispatchToProps = dispatch => 
 bindActionCreators({
   saveProfile: profileActions.request,
   changePassword: changePasswordActions.request,
   getProfile: getProfileActions.request,
 }, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(withNamespaces()(InfoForm));
