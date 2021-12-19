import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import { Spin, message, Button } from "antd";
// import config from 'config';

const CLIENT = {
  sandbox:
    "ASSXPELvmuzoPa0bZ8YzeuvhFMbKfIbtht6MEz-yHB8EleUFOAYubi1TZXHPNV7FKtbFp2MfVLuIGYP_",
  //  production:
  //    "your_production_key"
};

const CLIENT_ID = CLIENT.sandbox;
// process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

let PayPalButton = null;
class PaypalButton extends React.Component {
  constructor(props) {
    super(props);
    console.log(process.env.REACT_APP_TEST_VAR);
    this.state = {
      showButtons: false,
      loading: true,
      paid: false,
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      this.setState({ loading: false, showButtons: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded =
      !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM,
        });
        this.setState({ loading: false, showButtons: true });
      }
    }
  }
  createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: "order",
          amount: {
            value: this.props.amount,
          },
        },
      ],
    });
  };

  onApprove = (data, actions) => {
    actions.order.capture().then((details) => {
      const paymentData = {
        payerID: data.payerID,
        orderID: data.orderID,
      };
      // message.success("Paid Successfully");
      this.props.onPaymentSuccess(details);
      // console.log("Payment Approved: ", details);
      this.setState({ showButtons: false, paid: true });
    });
  };

  render() {
    const { showButtons, loading, paid } = this.state;

    return (
      <div className="main">
        {loading && <Spin />}

        {showButtons && (
          <div>
            <div></div>
            <h3>Pay: {`${this.props.amount} CHF`}</h3>
            <PayPalButton
              createOrder={(data, actions) => this.createOrder(data, actions)}
              onApprove={(data, actions) => this.onApprove(data, actions)}
            />
          </div>
        )}

        {paid && (
          <div className="receipt-container">
            <div className="activation">
              <div className="tick-mark">
                <i className="far fa-check-circle"></i>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default scriptLoader(
  `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_CLIENT}&currency=CHF`
)(PaypalButton);
