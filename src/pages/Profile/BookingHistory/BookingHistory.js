import React, {useState, useEffect} from 'react';
import {Select, Input, Button, message, Spin } from 'antd';
import ModalWithForm from '../../../components/ModalWithForm/ModalWithForm';
import { bindActionCreators } from 'redux';
import { asyncActionGenerator, GET_BOOKING } from '../../../redux/actions';
import { connect } from 'react-redux';
import { withNamespaces } from "react-i18next";
// import './OrderHistory.css';

const getBookingActions = asyncActionGenerator(GET_BOOKING);


const BookingHistory = props => {
  const { getBooking, bookings, user, isGettingBooking, t } = props;

  useEffect(()=>{
    if(user) getBooking({
      user_id : user.id,
    })
  },[getBooking, user])

  return (
    <Spin spinning={isGettingBooking}>
    <div className="credit-tab">
      <div className="address-table-box">
        <table className="address-table">
          <thead>
            <tr>
              <th className="address-head">{t("Guest Name")}</th>
              <th className="location-head">{t("Date of Booking")}</th> 
              <th className="default-head">{t("Time of booking")}</th>
              <th className="default-head">{t("Number of guests")}</th>
              <th className="default-head">{t("Added on")}</th>
            </tr>
            </thead>
              {
                bookings.length > 0 ? bookings.map(item=> (
                  <tr>
                    <td>{`${item.guest_name}`}
                    {/* <div className="options">
                    <Button type="link" className="options-button" onClick={()=>handleEdit(item)}>
                      <span className="iconify" data-icon="bx:bxs-edit" data-inline="false"></span>
                    </Button>
                    <Button type="link" className="options-button" onClick={()=>handleDelete(item)}>
                      <span className="iconify" data-icon="ant-design:delete-filled" data-inline="false">
                      </span>
                    </Button>
                    </div> */}
                    </td>
                    <td>{item.date_booking}</td>
                    <td>{item.date}</td>
                    <td>{item.no_of_guests}</td>
                    <td>{item.created_at}</td>
                  </tr>
                )) : null
              }
        </table>
      </div>
    </div>
    </Spin>
  );
};
const mapStateToProps = state=>({
  bookings: state.ProfileReducer.bookings,
  user: state.AuthenticationReducer.loginResponse.user,
  isGettingBooking : state.ProfileReducer.isGettingBooking,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getBooking: getBookingActions.request, 
  }, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(withNamespaces()(BookingHistory));
