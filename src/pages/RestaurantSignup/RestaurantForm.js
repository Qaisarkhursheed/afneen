import React, { useState, useEffect } from "react";
import { Form, Input, Select, Checkbox, Button } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  asyncActionGenerator,
  RESTAURANT_INFO_ADD,
  GET_ALL_CUISINES,
  RESTAURANT_SIGNUP
} from "../../redux/actions";
import { withNamespaces } from "react-i18next";

const addSignupInfoActions = asyncActionGenerator(RESTAURANT_INFO_ADD);
const getCuisineAction = asyncActionGenerator(GET_ALL_CUISINES);
const restaurantSignupActions = asyncActionGenerator(RESTAURANT_SIGNUP);
const { Option } = Select;

const RestaurantForm = (props) => {
  const { t } = props;
  const [form] = Form.useForm();
  const {
    pack,
    urlParam,
    addSignupInfo,
    moveToNextStep,
    onSuccess,
    cuisinesData,
    getCuisines,
    signup
  } = props;
  const [commissionType, setCommissionType] = useState("");
  // const prefixSelector1 = (
  //   <Form.Item name="rprefix" noStyle>
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
  // const prefixSelector2 = (
  //   <Form.Item name="cprefix" noStyle>
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
  useEffect(() => {
    getCuisines();
  }, [getCuisines]);
  const onFinish = (values) => {
    if(parseFloat(pack.price) === 0) {
      signup({
        restaurant_name: values.restaurant_name,
        restaurant_phone: values.restaurant_phone,
        Contact_name: values.Contact_name,
        Contact_phone: values.Contact_phone,
        Contact_email: values.Contact_email,
        Street_address: values.Street_address,
        Post_code: values.Post_code,
        Region: values.Region,
        City: values.City,
        Country: values.Country,
        Cuisine: values.Cuisine.toString(),
        Services: values.Services.toString(),
        payment_method: values.Payment.toString(),
        Username: values.Username,
        password: values.password,
        package_id: pack.id,
        package_price: pack.price,
        membership_expired: pack.expiration,
        status: 1,
      });
    } else if (parseFloat(pack.price) > 0 ) {
      addSignupInfo({
        restaurant_name: values.restaurant_name,
        restaurant_phone: values.restaurant_phone,
        Contact_name: values.Contact_name,
        Contact_phone: values.Contact_phone,
        Contact_email: values.Contact_email,
        Street_address: values.Street_address,
        Post_code: values.Post_code,
        Region: values.Region,
        City: values.City,
        Country: values.Country,
        Cuisine: values.Cuisine.toString(),
        Services: values.Services.toString(),
        payment_method: values.Payment.toString(),
        Username: values.Username,
        password: values.password,
        package_id: pack.id,
        package_price: pack.price,
        membership_expired: pack.expiration,
      });
    }
    else {
      signup({
        restaurant_name: values.restaurant_name,
        restaurant_phone: values.restaurant_phone,
        Contact_name: values.Contact_name,
        Contact_phone: values.Contact_phone,
        Contact_email: values.Contact_email,
        Street_address: values.Street_address,
        Post_code: values.Post_code,
        Region: values.Region,
        City: values.City,
        Country: values.Country,
        Cuisine: values.Cuisine.toString(),
        Services: values.Services.toString(),
        payment_method: values.Payment.toString(),
        Invoice_Terms: values.Invoice_terms,
        Username: values.Username,
        password: values.password,
        status: 0,
      });
    }
     
  };
  const handleCommissionSelected = (value) => {
    setCommissionType(value);
  };
  useEffect(() => {
    if (moveToNextStep) {
      onSuccess();
    }
  }, [moveToNextStep, onSuccess]);
  return (
    <div className="restaurant-form-section">
      <div className="restaurant-form">
        <Form
          form={form}
          colon={false}
          name="signup"
          onFinish={onFinish}
          hideRequiredMark
          validateTrigger="onSubmit"
          className="restaurant-signup-form"
        >
          <div className="res-personal-data">
          {urlParam === "membership" ? (
            <div className="selected-information">
              <p>
                <label className="ant-form-item-label">
                  {t("Selected Package")}
                </label>
                <span>{`${pack.title}`}</span>
              </p>
              <p>
                <label className="ant-form-item-label">{t("Price")}</label>
                <span>{`${pack.price}`}</span>
              </p>
              <p>
                <label className="ant-form-item-label">
                  {t("Membership Limit")}
                </label>
                <span>{`${pack.limit_merchant}`}</span>
              </p>
              <p>
                <label className="ant-form-item-label">{t("Usage")}</label>
                <span>{`${pack.usage}`}</span>
              </p>
            </div>
          ) : null}
          </div>
          <div className="res-personal-data">
          <Form.Item
            name="restaurant_name"
            label={t("Restaurant name")}
            rules={[
              {
                required: true,
                message: "Please input value",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="i.e Mcdonals" />
          </Form.Item>
          <Form.Item
            name="restaurant_phone"
            label={t("Restaurant phone")}
            rules={[
              {
                required: true,
                message: "Please input value",
              },
            ]}
          >
            <Input placeholder="i.e +41123456789"/>
          </Form.Item>
        
          <Form.Item
            name="Contact_name"
            label={t("Manager Name")}
            rules={[
              {
                required: true,
                message: "Please input value",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="i.e John Doe"/>
          </Form.Item>
          <Form.Item
            name="Contact_phone"
            label={t("Manager Contact phone")}
            rules={[
              {
                required: true,
                message: "Please input value",
              },
            ]}
          >
            <Input placeholder="i.e +41123456789"/>
          </Form.Item>
          <Form.Item
            name="Contact_email"
            label={t("Contact email")}
            // extra={t(
            //   "Please enter your correct email. we will sent an activation code to your email"
            // )}
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
            <Input placeholder="i.e john@example.com" />
          </Form.Item>
          </div>
          <Form.Item
            initialValue="Switzerland"
            name="Country"
            label={t("Country")}
            rules={[
              {
                required: true,
                message: "Please input value",
                whitespace: true,
              },
            ]}
          >
            <Select>
              <Option value="Switzerland">Switzerland</Option>
            </Select>
          </Form.Item>
          <div className="res-personal-data">
          <Form.Item
            name="Street_address"
            label={t("Street address")}
            rules={[
              {
                required: true,
                message: "Please input value",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="i.e Via Franscini 62"/>
          </Form.Item>
          <Form.Item
            name="Post_code"
            label={t("Postal/Zip code")}
            rules={[
              {
                required: true,
                message: "Please input value",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="i.e 3186"/>
          </Form.Item>
          <Form.Item
            name="Region"
            label={t("Region")}
            rules={[
              {
                required: true,
                message: "Please input value",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="i.e  Sense District"/>
          </Form.Item>
          <Form.Item
            name="City"
            label={t("City")}
            rules={[
              {
                required: true,
                message: "Please input value",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="i.e Uebewil"/>
          </Form.Item>
           </div>
          <Form.Item
            name="Cuisine"
            label={t("Cuisine")}
            rules={[
              {
                required: true,
                message: "Please input value",
              },
            ]}
          >
            <Select mode="multiple" placeholder="Please select some options">
              {cuisinesData.map((item) => (
                <Option value={item.cuisine_name}>{item.cuisine_name}</Option>
              ))}
            </Select>
          </Form.Item>
          <div className="res-personal-data">
          <Form.Item
            initialValue="Delivery"
            name="Services"
            label={t("Services")}
            rules={[
              {
                required: true,
                message: "Please input value",
                whitespace: true,
              },
            ]}
          >
            <Select>
              <Option value="Delivery">{t("Delivery")}</Option>
              <Option value="Pickup">{t("Pickup")}</Option>
              <Option value="Dine In">{t("Dine In")}</Option>
            </Select>
          </Form.Item>
          <Form.Item
            initialValue="Cash on Delivery"
            name="Payment"
            label={t("Payment Method")}
            rules={[
              {
                required: true,
                message: "Please input value",
                whitespace: true,
              },
            ]}
          >
            <Select>
              <Option value="Cash on Delivery">{t("Cash on Delivery")}</Option>
              <Option value="Pay on Delivery">{t("Pay on Delivery")}</Option>
              <Option value="Credit Cards">{t("Credit Cards")}</Option>
            </Select>
          </Form.Item>
          {urlParam !== "membership" ? (
            <>
              <h2>{t("Commission Type")}</h2>
              <Form.Item
                initialValue="Commission"
                name="Commission"
                label={t("Type")}
                rules={[
                  {
                    required: true,
                    message: "Please input value",
                    whitespace: true,
                  },
                ]}
              >
                <Select onSelect={handleCommissionSelected}>
                  <Option value="Commission">{t("Commission")}</Option>
                  <Option value="Commission+Invoice">
                    {t("Commission+Invoice")}
                  </Option>
                </Select>
              </Form.Item>
              {commissionType === "Commission+Invoice" ? (
                <Form.Item
                  name="Invoice_terms"
                  label={t("Invoice terms")}
                  rules={[
                    {
                      required: true,
                      message: "Please input value",
                      whitespace: true,
                    },
                  ]}
                >
                  <Select>
                    <Option value="Daily">{t("Daily")}</Option>
                    <Option value="Weekly">{t("Weekly")}</Option>
                  </Select>
                </Form.Item>
              ) : null}
            </>
          ) : null}
          </div>
          <h2>{t("Login Information")}</h2>
          <div className="res-personal-data">
          <Form.Item
            name="Username"
            label={t("Username")}
            rules={[
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input placeholder="username"/>
          </Form.Item>
          <Form.Item
            name="password"
            label={t("Password")}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
</div>
          {/* <Form.Item
            name="confirm"
            label={t("Confirm Password")}
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
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
          </Form.Item> */}
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject("Should accept agreement"),
              },
            ]}
          >
            <Checkbox>
              I Agree to <a href="/">The Terms and Conditions</a>
            </Checkbox>
          </Form.Item>
          <Form.Item className="user-signup-button-wrapper">
            <Button
              type="primary"
              htmlType="submit"
              className="user-signup-button"
            >
              {t("Signup")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  moveToNextStep: state.RestaurantReducer.moveToNextStep1,
  cuisinesData: state.RestaurantReducer.cuisines,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addSignupInfo: addSignupInfoActions.add,
      getCuisines: getCuisineAction.request,
      signup: restaurantSignupActions.request,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(RestaurantForm));
