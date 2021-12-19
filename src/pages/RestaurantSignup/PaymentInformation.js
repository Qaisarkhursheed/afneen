import React, { useState, useEffect } from "react";
import { Select, Button, Input, Radio, message } from "antd";
import { bindActionCreators } from "redux";
import {
  asyncActionGenerator,
  MERCHANT_CREDIT_CARD,
  RESTAURANT_SIGNUP,
  ADD_PAYMENT,
} from "../../redux/actions";
import { connect } from "react-redux";
import ModalWithForm from "../../components/ModalWithForm/ModalWithForm";
import StripePayment from "../../components/StripePayment/StripePayment";
import PaypalButtons from "../../components/PaypalButton/PaypalButtons";
import { withNamespaces } from "react-i18next";

const { Option } = Select;
const addCreditActions = asyncActionGenerator(MERCHANT_CREDIT_CARD);
const addPaymentActions = asyncActionGenerator(ADD_PAYMENT);
const restaurantSignupActions = asyncActionGenerator(RESTAURANT_SIGNUP);

const PaymentInformation = (props) => {
  const { cards, addCredit, onSuccess, addPayment, pack, moveToNextStep, signup, t,restaurantsInfo } = props;
  const [selected, setSelected] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [goForward, setGoForward] = useState(false);
  const [card, setCard] = useState({});
  const handleChange = (value) => {
    setSelected(value);
  };
  const onPaymentSuccess = (item) => {
    console.log(item);
    setGoForward(true);
  };
  const handleNext = () => {
    // onPaymentSuccess();
    if (goForward) {
      signup({
        ...restaurantsInfo,
        status: 1,
      });
      // message.error("Please Select a Method.");
    }
    // else if(selected === 'Paypal') {
    //   addPayment(
    //     {
    //       type: selected,
    //     }
    //   )
    // }
    // else if(cards.length === 0) {
    //   message.error("Please Enter a Card.");
    // }
    // else if(Object.getOwnPropertyNames(card).length === 0) {
    //   message.error("Please Select a Card.");
    // }
    // else {
    //   addPayment({
    //     type: selected,
    //     card: card,
    //   });
    // }
  };
  const handleModal = () => {
    setModalVisible(true);
  };
  const onCancel = () => {
    setModalVisible(false);
  };
  const onAddAddress = (values) => {
    addCredit(values);
    setModalVisible(false);
  };
  const onKeyPress = (e) => {
    const specialCharRegex = new RegExp("[0-9]");
    const pressedKey = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (!specialCharRegex.test(pressedKey)) {
      e.preventDefault();
      return false;
    }
  };
  const handleCardSelect = (e) => {
    setCard(e.target.value);
  };
  const formSchema = [
    {
      name: "cardName",
      heading: "Card Name",
      type: "text",
      rules: [
        {
          required: true,
          message: "Please input your card name",
        },
      ],
      component: <Input />,
    },
    {
      name: "cardNumber",
      heading: "Card Number",
      type: "text",
      rules: [
        {
          required: true,
          message: "Please input your card number",
        },
      ],
      component: <Input onKeyPress={onKeyPress} maxLength="16" />,
    },
    {
      name: "expMonth",
      heading: "Exp. month",
      type: "text",
      rules: [
        {
          required: true,
          message: "Please select expiry month",
        },
      ],
      component: (
        <Select>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
            <Option value={`0${item}`} key={item}>
              {item > 9 ? `${item}` : `0${item}`}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      name: "expYear",
      heading: "Exp. year",
      type: "text",
      rules: [
        {
          required: true,
          message: "Please select expiry year",
        },
      ],
      component: (
        <Select>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
            <Option value={`${2020 + item}`} key={item}>{`${
              2020 + item
            }`}</Option>
          ))}
        </Select>
      ),
    },
    {
      name: "billingAddress",
      heading: "Billing Address",
      type: "text",
      rules: [
        {
          required: true,
          message: "Please input your billing address",
        },
      ],
      component: <Input />,
    },
    {
      name: "cvv",
      heading: "CVV",
      type: "text",
      rules: [
        {
          required: true,
          message: "Please input your cvv",
        },
      ],
      component: <Input />,
    },
  ];
  useEffect(() => {
    console.log(pack)
    if (moveToNextStep) {
      onSuccess(); 
    } 
    // else if ( parseFloat(pack.price) < 1 ) {
    //   onSuccess();
    // } else if (!pack) {
    //   onSuccess();
    // }
  }, [moveToNextStep, onSuccess, pack]);
  return (
    <div className="restaurant-payment-section">
      <div className="payment-information">
        <h2>{t("Choose Payment Options")}</h2>
        <div className="heading-select">
          <p>{t("Payment Information")}</p>
          <Select onChange={handleChange}>
            {/* <Option value="Credit">Credit</Option> */}
            <Option value="Paypal">Paypal</Option>
          </Select>
          <Button
            type="default"
            className="next-button"
            onClick={() => {
              handleNext();
            }}
          >
            {t("Next")}
          </Button>
          {/* {selected === "Credit" ? (
            <div className="credit-card-portion">
              <p>Enter Credit Card Information</p>
              <StripePayment amount={0} onPaymentSuccess={onPaymentSuccess} />
            </div>
          ) : null} */}
          {selected === "Paypal" ? (
            <div className="credit-card-portion">
              <p>Pay through paypal</p>
              <PaypalButtons amount={parseFloat(pack.price)} onPaymentSuccess={onPaymentSuccess} />
            </div>
          ) : null}
        </div>
      </div>
      {/* <ModalWithForm
        visible={modalVisible}
        onCancel={onCancel}
        formData={formSchema}
        createField={onAddAddress}
      /> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cards: state.RestaurantReducer.creditCards,
  package_fee: state.RestaurantReducer,
  moveToNextStep: state.RestaurantReducer.moveToNextStep2,
  restaurantsInfo: state.RestaurantReducer.restaurantsInfo,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addCredit: addCreditActions.add,
      addPayment: addPaymentActions.success,
      signup: restaurantSignupActions.request,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(PaymentInformation));
