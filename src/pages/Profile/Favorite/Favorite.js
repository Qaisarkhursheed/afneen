import React, {useEffect} from 'react';
import { Button, Spin } from 'antd';
import ModalWithForm from '../../../components/ModalWithForm/ModalWithForm';
import { bindActionCreators } from 'redux';
import { asyncActionGenerator, GET_FAVORITE, REMOVE_FAVORITE} from '../../../redux/actions';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { withNamespaces } from "react-i18next";

const getFavActions = asyncActionGenerator(GET_FAVORITE);
const removeFavActions = asyncActionGenerator(REMOVE_FAVORITE);

const Favorite = props => {
  const {
    user,
    favorites,
    isGettingFavorites,
    isRemovingFavorites,
    getFav,
    removeFav,
    t
  } = props;

  const handleDelete = record => {
    removeFav(record)
  }  
  useEffect(()=>{
    if(user) getFav({
      user_id : user.id,
    })
  },[getFav, user])

  return (
    <Spin spinning={
        isGettingFavorites ||
        isRemovingFavorites
        }>
    <div className="credit-tab">
      {/* <Button className="add-new-button" onClick={()=>{handleModal()}}>Add New</Button> */}
      <div className="address-table-box">
        <table className="address-table">
          <thead>
            <tr>
              <th className="address-head">{t("Restaurant Name")}</th>
              <th className="location-head">{t("Restaurant Phone")}</th> 
              <th className="default-head">{t("Cusines")}</th>
            </tr>
            </thead>
              {
                favorites.length > 0 ? favorites.map(item=> (
                  <tr>
                    <td>
                    <NavLink to={`/menu/${item.id}`}>
                    {item.restaurant_name}
                    </NavLink>
                    <div className="options">
                    <Button type="link" className="options-button" onClick={()=>handleDelete(item)}>
                      <span className="iconify" data-icon="ant-design:delete-filled" data-inline="false">
                      </span>
                    </Button>
                    </div>
                    </td>
                    <td>{item.restaurant_phone}</td>
                    <td>{item.Cuisine}</td>
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
  user: state.AuthenticationReducer.loginResponse.user,
  favorites: state.ProfileReducer.favorites,
  isGettingFavorites: state.ProfileReducer.isGettingFavorites,
  isRemovingFavorites: state.ProfileReducer.isRemovingFavorites,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getFav: getFavActions.request,
    removeFav: removeFavActions.request, 
  }, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(withNamespaces()(Favorite));
