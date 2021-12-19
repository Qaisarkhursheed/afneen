import React, {useState, useEffect} from 'react';
import {Select, Input, Button, message, Spin } from 'antd';
import ModalWithForm from '../../../components/ModalWithForm/ModalWithForm';
import { bindActionCreators } from 'redux';
import { asyncActionGenerator, GET_VOUCHERS} from '../../../redux/actions';
import { connect } from 'react-redux';
import { withNamespaces } from "react-i18next";
// import './OrderHistory.css';

const getVouchersAction = asyncActionGenerator(GET_VOUCHERS);

const Vouchers = props => {
  const {
    t,
    vouchers,
    user,
    isGettingVouchers,
    getVoucher
    } = props;
 
  useEffect(()=>{
    getVoucher();
  },[getVoucher])

  return (
    <Spin spinning={isGettingVouchers}>
    <div className="credit-tab">
      <div className="address-table-box">
        <table className="address-table">
          <thead>
            <tr>
              <th className="address-head">{t("Code")}</th>
              <th className="location-head">{t("Voucher Name")}</th> 
              <th className="default-head">{t("Discount")}</th>
              <th className="default-head">{t("On Restaurant")}</th>
              <th className="default-head">{t("Availed")}</th>
            </tr>
            </thead>
              {
                vouchers.length > 0 ? vouchers.map(item=> (
                  <tr>
                    <td>{`${item.id}`}
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
                    <td>{item.name}</td>
                    <td>{item.discount}</td>
                    <td>{item.restaurant_name}</td>
                    <td>{item.used_by ? 'Yes' : 'No'}</td>
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
  vouchers: state.ProfileReducer.vouchers,
  user: state.AuthenticationReducer.loginResponse.user,
  isGettingVouchers : state.ProfileReducer.isGettingVouchers,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getVoucher: getVouchersAction.request,
  }, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(withNamespaces()(Vouchers));
