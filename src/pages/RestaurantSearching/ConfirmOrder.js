import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { Form, Input, Radio, Button, Avatar } from "antd";
import { withNamespaces } from "react-i18next";
import ByAddress from "../../styles/images/byaddress.png";
import {
  asyncActionGenerator,
  CREATE_ORDER,
  GET_CLIENT_ID,
  INFORMATION,
  PLACE_ORDER,
} from "../../redux/actions";
import PaypalButtons from "../../components/PaypalButton/PaypalButtons";
import StripePayment from "../../components/StripePayment/StripePayment";

const creatOrderActions = asyncActionGenerator(CREATE_ORDER);
const addInofrmationAction = asyncActionGenerator(INFORMATION);
const placeOrderAction = asyncActionGenerator(PLACE_ORDER);
const getAClientAction = asyncActionGenerator(GET_CLIENT_ID);
const ConfirmOrder = (props) => {
  const {
    sub_total,
    orderMethod,
    orders,
    address,
    cards,
    user,
    isAuthenticated,
    addInofrmation,
    information,
    history,
    finalOrder,
    placeOrder,
    getClient,
    voucher, 
    t
  } = props;
  const [paypalVisible, setPaypalVisible] = useState(false);
  const [stripeVisible, setStripeVisible] = useState(false);
  const onPaymentSuccess = (item) => {
    // history.push('/receipt')
    placeOrder({
      ...item,
      ...finalOrder,
      voucher: voucher && user ? {...voucher, user_id: user.id} : undefined,
    });
  };
  const sendOrder = () => {
    if (finalOrder.Payment_type === "Paypal") {
      setPaypalVisible(true);
    } else if (finalOrder.Payment_type === "Card") {
      setStripeVisible(true);
    }
    // placeOrder({
    //   ...finalOrder,
    //   voucher: voucher && user ? {...voucher, user_id: user.id} : undefined,
      
    // });
    // placeOrder({
    //     ...finalOrder,
    // });
  };
  // const getToReceipt = () => {
  //     history.push('/receipt')
  // }
  // useEffect(()=>{
  //     getClient();
  // },[getClient])
  return (
    <div className="payment-information-section">
      <div className="payment-information-container-section">
        <div className="form-with-payment">
          <h3 className="order-info-heading">{t("Order Information")}</h3>
          <hr></hr>
          <span className="name-detail">
          {t("Name")}:<span>{finalOrder.first_name}</span>
          </span>
          <span className="name-detail">
            {t("Merchant Name")}:<span>{finalOrder.Merchant_Name}</span>
          </span>
          <span className="name-detail">
            {t("Telephone")}:<span>{finalOrder.phone_number}</span>
          </span>
          {finalOrder.Address ? (
            <span className="name-detail">
            {t("Address")}:<span>{finalOrder.Address}</span>
            </span>
          ) : null}
          <span className="name-detail">
            {t("Order Type")}:<span>{finalOrder.Order_type}</span>
          </span>
          <span className="name-detail">
            {t("Payment Type")}:<span>{finalOrder.Payment_type}</span>
          </span>
          {finalOrder.Address ? (
            <span className="name-detail">
            {t("Deliver To")}:<span>{finalOrder.Address}</span>
            </span>
          ) : null}
          {finalOrder.Location_Name ? (
            <span className="name-detail">
            {t("Location Name")}:<span>{finalOrder.Location_Name}</span>
            </span>
          ) : null}
          <h4 className="item-name-heading">{t("Item")}:</h4>
          <span className="name-detail">
            <span>{finalOrder.Food_name ? JSON.parse(finalOrder.Food_name).map(item => <div>
            <p>{item.name}</p>
            <span>{item.quantity}*{item.price}</span>
            </div>): ''}</span>
          </span>
          <hr></hr>
          <span className="name-detail">
            {t("Sub Total")}:<span>{finalOrder.Sub_Total}</span>
          </span>
          <span className="name-detail">
            {t("Discount")}:<span>{finalOrder.discount}</span>
          </span>
          <span className="name-detail">
            {t("Delivery Fee")}:<span>{finalOrder.delivery_charges || "none"}</span>
          </span>
          <span className="name-detail">
            {t("Packaging")}:<span>Added</span>
          </span>
          <span className="name-detail">
            {t("Tax")}:<span>{finalOrder.Tax || "0"}%</span>
          </span>
          <span className="name-detail">
            {t("Total")}:<span>{finalOrder.Total} CHF</span>
          </span>
          <Button
            type="primary"
            className="give-margin-right checkout-button"
            onClick={sendOrder}
            disabled={orders.length === 0}
          >
            {t("Place Order")}
          </Button>
          {paypalVisible ? (
            <div className="paypal-div">
              paypal
              <PaypalButtons
                amount={finalOrder.Total}
                // amount={20}
                onPaymentSuccess={onPaymentSuccess}
              />
            </div>
          ) : null}
          {stripeVisible ? (
            <div className="stripe-div">
              Card Payment
              <StripePayment
                amount={finalOrder.Total}
                onPaymentSuccess={onPaymentSuccess}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sub_total: state.RestaurantReducer.sub_total,
  orderInformation: state.RestaurantReducer.orderInformation,
  information: state.RestaurantReducer.paymentInformation,
  finalOrder: state.RestaurantReducer.finalOrder,
  voucher: state.RestaurantReducer.voucher,
  orders: state.RestaurantReducer.orders,
  user: state.AuthenticationReducer.loginResponse.user,
  isAuthenticated: state.AuthenticationReducer.isAuthenticated,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      creatOrder: creatOrderActions.add,
      addInofrmation: addInofrmationAction.add,
      placeOrder: placeOrderAction.request,
      getClient: getAClientAction.request,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withNamespaces()(ConfirmOrder)));
