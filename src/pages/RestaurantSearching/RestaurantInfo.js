import React, {useState, useEffect} from 'react';
import {Rate, Spin } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LeafLetMap from "../../components/LeafLetMap/LeafLetMap";
import { asyncActionGenerator, GET_RESTAURANT, GET_OPENING } from '../../redux/actions';
import { withRouter } from 'react-router';
import { withNamespaces } from "react-i18next";

const getRestaurantInfoActions = asyncActionGenerator(GET_RESTAURANT);
const getOpeningHours = asyncActionGenerator(GET_OPENING);

const RestaurantInfo = props => {
  const {
    openinghours,
    restaurantInfo,
    getOpening,
    getRestaurantInfo,
    isGettingRestaurantInfo,
    match,
    t
  } = props;
  console.log(restaurantInfo);
  const menuId = match.params.id || null;
  console.log(menuId);
 
  useEffect(()=>{
    if(menuId){
      getOpening({ merchant_id: menuId});
    }
  }, [menuId, getOpening])

  useEffect(()=>{
    if(menuId) getRestaurantInfo({
      merchant_id : menuId,
    })
  },[getRestaurantInfo, menuId])

  return (
    <Spin spinning={isGettingRestaurantInfo}>
    <div className="restaurant-info">
        <div>
            <h2>Overview McDonalds</h2>
            <p>Base prepared fresh daily. Extra toppings are available in choose extra
                Choose you sauce: Go for BBQ sauce or piri piri sauce on your pizza base 
                for no extra cost.Choose your cut: Triangular, square, fingers or Un cut on any size pizza</p>
        </div>
                <div className="restaurant-info-map">
                        <LeafLetMap
                          latitude={restaurantInfo.latitude}
                          longitude={restaurantInfo.longitude}
                          name={restaurantInfo.restaurant_name}
                        />
                </div>
                <div className="restaurant-info-bottom">
                    <div className="restaurant-info-bottom-left">
                        <h2>Contact Details</h2>
                          <div><i class="fas fa-phone"></i>{restaurantInfo.restaurant_phone}</div>
                          <div><i class="fas fa-envelope"></i>{restaurantInfo.Contact_email}</div>
                      

                    </div>
                    <div className="restaurant-info-bottom-right">
                        <h2>Opening Hours</h2>
                        <ul className="opening-panel-ul res-info-ul">
                    <li>Monday :  {openinghours && openinghours["monday"] ? openinghours["monday"].slice(0,5)+" am "
                       +openinghours["monday"].slice(14,19)+" pm": "--"}</li>
                     <li>Tueday :  {openinghours && openinghours["tuesday"] ? openinghours["tuesday"].slice(0,5)+" am "
                       +openinghours["tuesday"].slice(14,19)+" pm": "--"}</li>
                     <li>Wednesday :  {openinghours && openinghours["wednesday"] ? openinghours["wednesday"].slice(0,5)+" am "
                       +openinghours["wednesday"].slice(14,19)+" pm": "--"}</li>
                     <li>Thursday :  {openinghours && openinghours["thursday"] ? openinghours["thursday"].slice(0,5)+" am "
                       +openinghours["thursday"].slice(14,19)+" pm": "--"}</li>
                     <li>Friday :  {openinghours && openinghours["friday"] ? openinghours["friday"].slice(0,5)+" am "
                       +openinghours["friday"].slice(14,19)+" pm": "--"}</li>
                     <li>Saturday :  {openinghours && openinghours["saturday"] ? openinghours["saturday"].slice(0,5)+" am "
                       +openinghours["saturday"].slice(14,19)+" pm": "--"}</li>
                      <li>Sunday :  {openinghours && openinghours["sunday"] ? openinghours["sunday"].slice(0,5)+" am "
                       +openinghours["sunday"].slice(14,19)+" pm": "--"}</li>
                      </ul>

                    </div>

                </div>
    </div>
    </Spin>
  );
};
const mapStateToProps = state=>({
  restaurantInfo: state.RestaurantReducer.restaurantInfo,
  isGettingRestaurantInfo: state.RestaurantReducer.isGettingRestaurantInfo,
  openinghours : state.RestaurantReducer.openinghours,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getRestaurantInfo: getRestaurantInfoActions.request, 
    getOpening: getOpeningHours.request,
  }, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withNamespaces()(RestaurantInfo)));
