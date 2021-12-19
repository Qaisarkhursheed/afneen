import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CreateMenu from "./CreateMenu";
import star from "../../styles/images/star.png";
import order from "../../styles/images/your-order.png";
import delivery from "../../styles/images/delivery-option.png";
// import OpeningHours from "./OpeningHours";
import { Button, Select, message, Input, Spin, Radio } from "antd";
import { withNamespaces } from "react-i18next";
import {
  asyncActionGenerator,
  ORDER,
  ORDER_METHOD,
  GET_MENU,
  GET_SINGLE_VOUCHER,
  SET_CHECKEDOUT,
  CART_ITEM
} from "../../redux/actions";
import OrderModalEdit from "./OrderModalEdit";

const orderActions = asyncActionGenerator(ORDER);
const addOrderMethodAction = asyncActionGenerator(ORDER_METHOD);
const getMenuActions = asyncActionGenerator(GET_MENU);
const getVoucherActions = asyncActionGenerator(GET_SINGLE_VOUCHER);
const setCheckout = asyncActionGenerator(SET_CHECKEDOUT);
const editQuantityActions = asyncActionGenerator(CART_ITEM);


const Cart = (props) => {
  const { t } = props;
  const {
    incrementItem,
    decrementItem,
    menu,
    orders,
    creatOrder,
    editingOrder,
    deleteOrder,
    sub_total,
    addOrderMethod,
    history,
    match,
    getMenu,
    isAuthenticated,
    voucher,
    isGettingVoucher,
    getVoucher,
    voucher_discount,
    user,
    isCheckedout,
    setCheckedout,
  } = props;
  // useEffect(()=> {
  //   if( !isAuthenticated) {
  //     history.push('/signup');
  //   }
  // },[history, isAuthenticated])
  const [clickedValue, setClickedValue] = useState("tab-1");
  const [currentOrder, setCurrentOrder] = useState({});
  const [currentMenu, setCurrentMenu] = useState({});
  const [orderMethod, setOrderMethod] = useState("Delivery");
  const [code, setCode] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showDelivery, setShowDilvery]= useState(true)

  const onCancel = () => {
    setIsEdit(false);
    setCurrentOrder({});
  };
  const handleCheckoutClicked = () => {
    if (orderMethod === "") {
      message.error("Select an order Method from Cart");
    } else {
      setCheckedout(true);
      history.push("/payment");
    }
  };
  const menuId = match.params.id || null;

  const onEditClick = (item) => {
    setCurrentOrder(item);
    setCurrentMenu(
      menu.menu
        ? menu.menu.filter((i) => i.food_name === item.item_name)[0]
        : {}
    );
    
    setIsEdit(true);
  };
  const editOrder = (item) => {
    setIsEdit(false);
    editingOrder(item);
  };
  const handleTabClicked = (value) => {
    setClickedValue(value);
  };
  const onDeleteClick = (item) => {
    deleteOrder(item);
  };
  const onDeliverySelect = e => {
    console.log(e.target.value)
    setShowDilvery(e.target.value=== "Delivery"? true : false);
    addOrderMethod(e.target.value);
    setOrderMethod(e.target.value);
  };
  const handleBackClicked = () => {
    history.goBack();
  };
 const handleVoucherChange = e => {
   const {value} = e.target;
   setCode(value);
 }
 const handleUseVoucher = () => {
  if(!isAuthenticated) {
    message.info('You need to Login for vouchers.');
    return;
   }
   getVoucher({
     id: code,
     user_id: user.id,
     merchant_name: menu.restaurant_name,
   });
 };
 const OnIncrement = (item) =>{
   item.total_bill =  item.total_bill + parseFloat(item.price);
  incrementItem(item);
 }
 const OnDecrement = (item) =>{
  item.total_bill =  item.total_bill - parseFloat(item.price);
  decrementItem(item);
}
  return (
    <>
    <Spin spinning={isGettingVoucher}>
        <div className="cart-wrapper">
            <div className="cart-header">
                <Button className="cart-header-button"
                onClick={handleBackClicked}
                ><i class="fas fa-arrow-left"></i></Button>
            </div>
            <div className="star-menu">
            {/* <div className="star-margin">
                <img src={star} />
            </div> */}
            <h2 className="delivery-info">
            {t("Order Summary")}
            </h2>
            </div>
            <div className="inner-chart-sum">
            {orders.length > 0 ? (
            orders.map((item) => (
                <div className="orders-data">
                <Button type="text" className="order-delete-button" onClick={() => onDeleteClick(item)}>
                <i class="fas fa-minus-circle"></i>
                </Button>
                <span className="quantity">{item.quantity}x</span>
                <span className="name-of-item" onClick={() => onEditClick(item)} >{item.item_name}</span>
                <div className="cart-in-button">
                <Button  onClick={() =>OnIncrement(item)}><i class="fas fa-plus"></i></Button>
                <Button  onClick={item.quantity > 1 ? () =>OnDecrement(item):()=>{}}><i class="fas fa-minus"></i></Button>
                </div>
                <span className="quantity-and-price">CHF {item.quantity*item.price}</span>
                {/* <ul className="addons-cart-list">
                  {
                    item.addons ? item.addons.map(i => <li>
                      <span>{i.name}:</span>
                      <span>{i.quantity}*</span>
                      <span>{i.price}</span>
                      </li>) 
                    : null
                  }
                </ul> */}
                {/* <Button type="text" className="cart-order-edit" onClick={() => onEditClick(item)}>
                    Edit
                </Button> */}
                </div>
            ))
            ) : (
            <div className="single-order">
                {t("Empty")}
                <i class="fas fa-shopping-cart"></i>
            </div>
            )}
            <p className="sub-total sub-totol-top">
              <span>
              {t("Sub Total")}
              </span> CHF {sub_total}</p>
              <p className="sub-total">
              <span>
              {t("Dilvery fee")}
            </span> CHF {showDelivery? menu.delivery_charges : 0}</p>
              <p className="total-price">
              <span>
              {t("Total")}
              </span> CHF {showDelivery?sub_total+ parseFloat(menu.delivery_charges): sub_total}</p>

            <div className="avail-voucher-box">
              <Input
              type="number"
              placeholder="Enter Voucher Code"
              disabled={voucher_discount !== 0}
              onChange={handleVoucherChange} />
              <Button 
              disabled={voucher_discount !== 0} 
              className="use-voucher" 
              onClick={handleUseVoucher}>
                {t("Use Voucher")}
                </Button>
            </div>
              <div className="order-method-checkboxes">
            <Radio.Group onChange={onDeliverySelect} value={orderMethod}>
              <Radio value="Delivery">Delivery</Radio>
              <Radio value="PickUp">Pick up</Radio>
            </Radio.Group>
            </div>
            {/* <Select
            onSelect={onDeliverySelect}
            className="select-delivery-method-drop"
            >
            <Select.Option value="Delivery">Delivery</Select.Option>
            <Select.Option value="DineIn">Dine In</Select.Option>
            <Select.Option value="PickUp">Pick Up</Select.Option>
            </Select> */}
            {!isCheckedout ?
              <Button
            type="default"
            className="checkout-button"
            onClick={() => handleCheckoutClicked()}
            disabled={orders.length === 0}
            >
            {t("Order Now")}
            </Button> : null}
            </div>
        </div>
    <OrderModalEdit
        isEdit={isEdit}
        currentOrder={isEdit ? currentOrder : {}}
        onCancel={onCancel}
        onEditClick={onEditClick}
        menu={currentMenu}
        editOrder={editOrder}
    />
    </Spin>
  </>
  );
};

const mapStateToProps = (state) => ({
  restaurantList: state.RestaurantReducer.restaurantsList,
  menu: state.RestaurantReducer.menu,
  orders: state.RestaurantReducer.orders,
  sub_total: state.RestaurantReducer.sub_total,
  isLoading: state.RestaurantReducer.isLoading,
  isAuthenticated: state.AuthenticationReducer.isAuthenticated,
  voucher: state.RestaurantReducer.voucher,
  isGettingVoucher: state.RestaurantReducer.isGettingVoucher,
  voucher_discount: state.RestaurantReducer.voucher_discount,
  user: state.AuthenticationReducer.loginResponse.user,
  isCheckedout: state.RestaurantReducer.isCheckedout,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      creatOrder: orderActions.add,
      editingOrder: orderActions.edit,
      deleteOrder: orderActions.delete,
      addOrderMethod: addOrderMethodAction.add,
      getMenu: getMenuActions.request,
      getVoucher: getVoucherActions.request,
      setCheckedout: setCheckout.add,
      incrementItem: editQuantityActions.increment,
      decrementItem: editQuantityActions.decrement,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withNamespaces()(Cart)));
