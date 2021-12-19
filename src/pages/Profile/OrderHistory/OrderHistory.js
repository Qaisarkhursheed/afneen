import React, {useState, useEffect} from 'react';
import {Rate, Input,  Button, Spin } from 'antd';
import ModalWithForm from '../../../components/ModalWithForm/ModalWithForm';
import { bindActionCreators } from 'redux';
import { asyncActionGenerator, ADD_RATING, GET_ORDERS} from '../../../redux/actions';
import { connect } from 'react-redux';
import { withNamespaces } from "react-i18next";

const getOrderActions = asyncActionGenerator(GET_ORDERS);
const addRatingActions = asyncActionGenerator(ADD_RATING);

const Rating = props => {
  const {
    user,
    orders,
    isGettingOrders,
    isAddingRating,
    addRating,
    getOrders,
    t
  } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [obj, setObj] = useState('');

  const handleModal = (record) => {
    setModalVisible(true);
    setObj(record);
  }
  const onCancel = () =>{
   setModalVisible(false);
  }

  const onRatingAdd = values => {
    setModalVisible(false);
    addRating({
      user_id: user.id,
      user_name: user.first_name,
      merchant_name: obj.restaurant_name,
      merchant_id: obj.merchant_id,
      ...values
    });
  };

  const formSchema = [
    {
      name: 'rating',
      heading: <div>{t("Rating")}</div>,
      type: 'text',
      rules: [
       {
       required: true,
       message: 'Please select rating.',
       }
     ],
      component: <Rate />,
    },
    {
      name: 'comments',
      heading: <div>{t("Comments")}</div>,
      type: 'text',
      rules: [
       {
       required: true,
       message: 'Please enter a comment',
       }
     ],
      component: <Input.TextArea />,
    },
  ];
  useEffect(()=>{
    if(user) getOrders({
      user_id : user.id,
    })
  },[getOrders, user])

  return (
    <Spin spinning={
        isGettingOrders ||
        isAddingRating}>
    <div className="credit-tab">
      {/* <Button className="add-new-button" onClick={()=>{handleModal()}}>Add New</Button> */}
      <div className="address-table-box">
        <table className="address-table">
          <thead>
            <tr>
              <th className="address-head">{t("Name")}</th>
              <th className="location-head">{t("Food Item")}</th> 
              <th className="default-head">{t("Restaurant Name")}</th>
              <th className="default-head">{t("Address")}</th>
              <th className="default-head">{t("Total")}</th>
              <th className="default-head">{t("Payment Method")}</th>
              <th className="default-head">{t("Tax")}</th>
              <th className="default-head">{t("Discount")}</th>
            </tr>
            </thead>
              {
                orders.length > 0 ? orders.map(item=> (
                  <tr>
                    <td>
                    {item.Name}
                    <div className="options">
                    <Button type="link" className="options-button" onClick={()=>handleModal(item)}>
                      Add Review
                    </Button>
                    </div>
                    </td>
                    <td>{item.Food_name}</td>
                    <td>{item.Merchant_Name}</td>
                    <td>{item.Address}</td>
                    <td>{item.Total}</td>
                    <td>{item.Payment_type}</td>
                    <td>{item.Tax}</td>
                    <td>{item.Discount}</td>
                  </tr>
                )) : null
              }
        </table>
      </div>
      {/* <Button className="save-new-button" onClick={()=>{onSaveClick()}}>Save</Button> */}
      <ModalWithForm
        visible={modalVisible}
        onCancel={onCancel}
        createField={onRatingAdd}
        formData={formSchema}
      />
    </div>
    </Spin>
  );
};
const mapStateToProps = state=>({
  user: state.AuthenticationReducer.loginResponse.user,
  orders: state.ProfileReducer.orders,
  isGettingOrders: state.ProfileReducer.isGettingOrders,
  isAddingRating: state.ProfileReducer.isAddingRating,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    addRating: addRatingActions.request,
    getOrders: getOrderActions.request,
  }, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(withNamespaces()(Rating));
