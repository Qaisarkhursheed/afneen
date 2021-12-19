import React  from "react";
import { Button, Avatar, Spin, Rate } from "antd";
import { connect } from "react-redux";
import ByAddress from "../../styles/images/byaddress.png";
import LeafLetMap from "../../components/LeafLetMap/LeafLetMap";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
import { asyncActionGenerator, GET_RESTAURANTS } from "../../redux/actions";
import { withNamespaces } from "react-i18next";
import QRCode from "react-qr-code";
import "./BrowseRestaurant.css";

const getAllRestaurantsActions = asyncActionGenerator(GET_RESTAURANTS);

const Featured = (props) => {
  const { t } = props;
  const { restaurantList, isLoading } = props;
  return (
    <Spin spinning={isLoading}>
        {restaurantList.filter(i => i.is_featured).map((item) => (
            <div
            className="single-restaurant-item"
            key={item.restaurant_name}
            >
            <div className="single-restaurant-item-content">
                <div className="restaurant-item-content-data">
                <div className="restaurant-item-content-data-left">
                    <div className="merchant-logo">
                    <Avatar
                        shape="square"
                        src={item.logo || ByAddress}
                    />
                    </div>
                    <div className="merchant-options">
                    {item.Services.split(",").map((i) => (
                        <span>
                        {i} <i className="far fa-check-circle"></i>
                        </span>
                    ))}
                    </div>
                    <div className="merchant-options">
                    {item.payment_method
                        ? item.payment_method.split(",").map((i) => (
                            <span>
                            {i} <small>Available</small>
                            </span>
                        ))
                        : null}
                    </div>
                </div>
                <div className="restaurant-item-content-data-right">
                    <div className="open-min-fav rating">
                    <Rate disabled value={parseFloat(item.rating) ? parseFloat(item.rating) : 0 } />
                    {/* <span>42 Reviews</span> */}
                    <span className="open open-pick">open</span>
                    <span className="min">
                        Minimum Order :{" "}
                        {item.minimum_order_delivery || ""}CHF
                    </span>
                    </div>
                    <div className="data-right-and-qr">
                    <div className="data-side">
                        <h2>{item.restaurant_name}</h2>
                        <p class="merchant-address-text">
                        {item.restaurant_address}
                        </p>
                        <p class="cuisine-text">
                        {item.Cuisine.split(",").map((i, index) => (
                            <span>{(index ? ", " : "") + i}</span>
                        ))}
                        </p>
                        <p className="extra-text">
                        Minimum Order: {item.minimum_order_delivery}
                        </p>
                        <p className="extra-text">
                        Delivery Est: {item.delivery_estimation}
                        </p>
                        <p className="extra-text">
                        Delivery Distance: {item.distance_covered}
                        </p>
                        {item.free_delivery_above ? (
                        <p className="free-on-delivery">
                            {`Free Delivery on order above ${item.free_delivery_above}`}
                        </p>
                        ) : (
                        <p>&nbsp;</p>
                        )}
                        <Button
                        type="default"
                        onClick={() => {
                            props.history.push(`/menu/${item.id}`);
                        }}
                        className="view-menu-button"
                        >
                        View Menu
                        </Button>
                    </div>
                    <div className='qrcode'>
                        <QRCode value="https://devlab.mygastrofox.ch/menu/6" size={90} />
                    </div>
                    </div>
                </div>
                </div>
                <div className="restaurant-item-content-map">
                    <LeafLetMap
                        latitude={item.latitude}
                        longitude={item.longitude}
                        name={item.restaurant_name}
                    />
                    </div>
                </div>
            </div>
        ))}
    </Spin>
  );
};
const mapStateToProps = (state) => ({
  restaurantList: state.RestaurantReducer.restaurantsList,
  isLoading: state.RestaurantReducer.isLoading,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllRestaurants: getAllRestaurantsActions.request,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withNamespaces()(Featured)));
