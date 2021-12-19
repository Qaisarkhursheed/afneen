import React, { useEffect }  from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,

} from "@stripe/react-stripe-js";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { message, Button, Spin } from "antd";
import { asyncActionGenerator, GET_PUBLISHABLE_KEY } from "../../redux/actions";
import { withRouter } from "react-router";

const getPublishKeyActions = asyncActionGenerator(GET_PUBLISHABLE_KEY);

const CheckoutForm = ({ success, amount, publish_key,onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

    const handleSubmit = async event => {
      event.preventDefault();
  
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement)
      });
  
      if (!error) {
        const { id } = paymentMethod;
  
        try {
          const { data } = await axios.post("https://devlab.mygastrofox.ch/laravel/public/api/payment", 
          { payment_method:id, amount: amount*100, currency: 'chf' });
          console.log(data);
          success();
          onPaymentSuccess(data);
        } catch (error) {
          console.log(error);
        }
      }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <h3>Price: {`${amount}`} CHF</h3>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

// you should use env variables here to not commit this
// but it is a public key anyway, so not as sensitive

const StripePayment = props => {
  const {
    publish_key,
    isGettingPublishKey,
    getPublishKey,
    publishable_key
  } = props;
  const stripePromise = loadStripe('pk_test_51HHnaEE9JPUqi45sHR96aP6gByRQWuKMZtdQgftcdvsfps6c0TenZBiqbjI8RLp4glf6I6VhiR5SjlxEmTLMH3Dd00LhOSjmNK');
  // useEffect(()=>{
  //   getPublishKey()
  // },[getPublishKey])
  const [status, setStatus] = React.useState("ready");
  if (status === "success") {
    // message.success("Paid Successfully");

    return (
      <div className="stripe-success">
            <div className="receipt-container">
            <div className="activation">
                <div className="tick-mark">
                    <i className="far fa-check-circle"></i>
                </div>
            </div>
            </div>
        </div>
    );
  }

  return (
    <Spin spinning={isGettingPublishKey}>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          success={() => {
            setStatus("success");
          }}
          onPaymentSuccess={props.onPaymentSuccess}
          amount={props.amount}
          publish_key={publish_key}
        />
      </Elements>
    </Spin>
  );
};

const mapStateToProps = (state) => ({
  publish_key: state.RestaurantReducer.publishable_key,
  isGettingPublishKey: state.RestaurantReducer.isGettingPublishKey,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPublishKey: getPublishKeyActions.request,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(StripePayment));
