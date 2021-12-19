import React, {useState, useEffect} from 'react';
import {Rate, Spin } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { asyncActionGenerator, GET_MERCHANT_RATING } from '../../redux/actions';
import { withRouter } from 'react-router';
import { withNamespaces } from "react-i18next";

const getRestaurantRatingActions = asyncActionGenerator(GET_MERCHANT_RATING);

const Rating = props => {
  const {
    ratings,
    isGettingRating,
    getRating,
    match,
    t
  } = props;
  const menuId = match.params.id || null;
 
  useEffect(()=>{
    if(menuId) getRating({
      merchant_id : menuId,
    })
  },[getRating, menuId])

  return (
    <Spin spinning={isGettingRating}>
    <div className="credit-tab">
      {/* <Button className="add-new-button" onClick={()=>{handleModal()}}>Add New</Button> */}
      <div className="address-table-box">
        <table className="address-table">
          <thead>
            <tr>
              <th className="address-head">{t("Rating")}</th>
              <th className="location-head">{t("Comments")}</th> 
              <th className="default-head">{t("User Name")}</th>
              <th className="default-head">{t("Restaurant Name")}</th>
            </tr>
            </thead>
              {
                ratings.length > 0 ? ratings.map(item=> (
                  <tr>
                    <td>
                    <Rate disabled value={item.rating ? item.rating : 0} />
                    </td>
                    <td>{item.comments}</td>
                    <td>{item.user_name}</td>
                    <td>{item.merchant_name}</td>
                  </tr>
                )) : null
              }
        </table>
      </div>
      {/* <Button className="save-new-button" onClick={()=>{onSaveClick()}}>Save</Button> */}
    </div>
    </Spin>
  );
};
const mapStateToProps = state=>({
  ratings: state.RestaurantReducer.ratings,
  isGettingRating: state.RestaurantReducer.isGettingRating,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getRating: getRestaurantRatingActions.request, 
  }, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withNamespaces()(Rating)));
