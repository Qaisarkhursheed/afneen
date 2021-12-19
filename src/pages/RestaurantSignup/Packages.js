import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { Spin } from "antd";
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import './RestaurantSignup.css';
import { asyncActionGenerator, GET_ALL_PACKAGES } from '../../redux/actions';
import CustomSpinner from "../../components/Spinner/CustomSpinner";
import { bindActionCreators } from 'redux';
import { Loading3QuartersOutlined } from '@ant-design/icons';

const antIcon = <Loading3QuartersOutlined style={{ fontSize: 40, color: '#5cb85c' }} spin />;
const getAllPackagesActions = asyncActionGenerator(GET_ALL_PACKAGES);

const Packages = props => {
  const {onSuccess, packages, getAllPackages, isGettingPackages} = props;
  useEffect(()=>{
    getAllPackages();
  },[getAllPackages])
  return(
    <Spin spinning={isGettingPackages} indicator={antIcon}>
      <div className="package">
        <div className="catagory-container">
        <span>
            <em></em>
        </span>
      <h2>Our Pricing Plans</h2>
      <p className="catagory-sub-heading2">
      Cum doctus civibus efficiantur in imperdiet deterruisset
      </p>
        </div>
        <div className="package-row">
        {
          packages.map((item,index)=>( <div className={index===1? "packags package2" : "packags"}>
            <div className="package-title">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          </div>
          <p className="package-price">{item.price}</p>
          <ul className="package-plan">
            <li>
              <strong>Check and go</strong> included
            </li>
            <li> <strong>1 month</strong> Valid</li>
            <li>
            <strong>Unsubscribe</strong> anytime
            </li>
            {index===1 ?<li>
            <strong>Unsubscribe</strong> anytime
            </li>:null}
          </ul>
          {/* <h4>{`${item.description}`}</h4>
        <h4>{`Membership Limit ${item.expiration} Days`}</h4>
          <h4>{`Sell Limit ${item.limit_merchant}`}</h4>
          <h4>{`Usage ${item.usage}`}</h4> */}
           <div className="package-btn" type="default" onClick={()=>{onSuccess(item)}}
            >Submit</div>
         </div>))
        }
        </div>
      </div>
      </Spin>
  );
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getAllPackages: getAllPackagesActions.request,
  }, dispatch)
const mapStateToProps = state => ({
  packages: state.RestaurantReducer.packages,
  isGettingPackages: state.RestaurantReducer.isGettingPackages,
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Packages));
