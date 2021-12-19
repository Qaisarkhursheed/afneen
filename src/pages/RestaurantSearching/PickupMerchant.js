import React, { useState, useEffect } from "react";
import StickyBox from "react-sticky-box";
import {
  Button,
  Input,
  Avatar,
  Radio,
  Checkbox,
  Rate,
  Tooltip,
  Collapse,
  Pagination,
  Breadcrumb
 } from "antd";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import QRCode from "react-qr-code";
import { asyncActionGenerator, GET_RESTAURANTS, GET_ALL_CUISINES } from "../../redux/actions";
import { withNamespaces } from "react-i18next";
import ViewMap from "../BrowseRestaurant/ViewMap";
import { NavLink } from "react-router-dom";


const getAllRestaurantActions = asyncActionGenerator(GET_RESTAURANTS);
const getCuisineActions = asyncActionGenerator(GET_ALL_CUISINES);

const ByDelivery = [
 
  "Delivery Only",
  "Pickup Only",
  "Dinein Only",
  "Delivery Pickup Dinein",

];
const MinimumDelivery = ["5", "10", "15", "20"];
// const FreeDelivery = ["Free Delivery"]

const ByCuisine = ["Thai", "American", "Chinese"];

const compare = (a, b, property = "Name") => {
  switch (property) {
    case "Name":
      if (a.restaurant_name < b.restaurant_name) {
        return -1;
      }
      break;
    default:
      break;
  }
};
const PickupMerchant = (props) => {
  const { restaurantList, onSuccess, history, getAllRestaurants, getCuisines, t, cuisines } = props;
  const [searchName, setSearchName] = useState("");
  const [restaurants, setRestaurants] = useState(restaurantList);
  const [searchCuisine, setsearchCuisine] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(9);
  const [value, setValue] = useState("");
  const handlePageSizeChange = (value) => {
    if (value <= 1) {
      setMinValue(0);
      setMaxValue(9);
    } else {
      setMinValue(maxValue);
      setMaxValue(value * 9);
    }
  };
  const onButtonClick = () => {
    setShowMap(!showMap);
  }
  // useEffect(() => {
  //   getAllRestaurants();
  // }, [getAllRestaurants]);
  useEffect(() => {
    setRestaurants(restaurantList);
    getCuisines();
  }, [restaurantList, getCuisines]);
  const onDeliveryChange = (e) => {
    const { value } = e.target;
    const str = value.split(" ")[0];
    const temp = restaurantList.filter((item) => item.Services.includes(str));
    setRestaurants(temp);
  };
  const onMinimumDeliver = (e) => {
    const { value } = e.target;
    const temp = restaurantList.filter(
      (item) => parseFloat(item.minimum_order_delivery) >= parseFloat(value)
    );
    setRestaurants(temp);
  };
  const RatingSelect = e => {
    console.log(e.target.value);
    const temp = e.target.value > 2 ? restaurantList.filter(item => parseFloat(item.rating).toFixed(0) === e.target.value) :
    restaurantList.filter(item => parseFloat(item.rating).toFixed(0) <= e.target.value);
    setRestaurants(temp);
  }
  const onCuisineChange = (value) => {
    // if (value.length > 0) {
      const found = restaurantList.filter((item) =>
        // item.Cuisine.some((v) => value.indexOf(v) !== -1)
        item.Cuisine.includes(value)
      );
      setRestaurants(found);
    // }
  };
  // const onDeliveryFee = value => {
  //     console.log(value);
  // };
  const onNameChange = (e) => {
    const { value } = e.target;
    setSearchName(value.toLowerCase());
  };
  const onSubmitSearch = () => {
    const temp = restaurantList.filter((item) =>
      item.restaurant_name.toLowerCase().includes(searchName)
    );
    setRestaurants(temp);
    setSearchName("");
  };
  const onClearClick = () => {
    setRestaurants(restaurantList);
  };
  const onSort = () => {
    const temp = restaurants.sort(compare);
    setRestaurants(temp);
    setsearchCuisine([]);
  };
  return (
    <>
    <div className="new-search-pick-merchant">
      <div className="bread-crumb-with-data">
        <div className="bread-crumb-div">
            <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to="/">Home</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <NavLink to="/pick-merchant">Pick Restaurant</NavLink>
            </Breadcrumb.Item>
            </Breadcrumb>
        </div>
        <div className="after-data">
          <h1>
          {restaurantList.length} restaurants in Convent Street 2983
          </h1>
        </div>
      </div>
      <div className="search-with-search-button">
        <Input
          placeholder="Search Restaurant"
          className="search-box"
          value={value}
          onChange={(e) => {
            const currValue = e.target.value.toLowerCase();
            setValue(currValue);
            const filteredData = restaurantList.filter((entry) =>
              Object.values(entry).some(
                (val) =>
                  typeof val === "string" &&
                  val.toLowerCase().includes(currValue)
              )
            );
            setRestaurants(filteredData);
          }}
        />
        <button className="press-search">
          Search
        </button>
      </div>
    </div>
    <div className={showMap ? "pick-merchant-map-view" : "hide-map"}>
      <ViewMap restaurantList={restaurantList || []} />
    </div>
    <div className="pickup-merchant-section">
      <div className="pickup-merchant-container">
        <div className="pickup-merchant-content-row">
          <div className="restaurant-filters">
        <StickyBox offsetTop={20} offsetBottom={20}>
            <div className="list-filters filter-value">
              <div className="view-by-map-button-div">
                <Button className="view-by-map-button" onClick={onButtonClick}>
                  {showMap ? "Hide Map" : "View By Map"}
                </Button>
              </div>
              <div className="collapse-div">
                <Collapse expandIconPosition="right">
                  <Collapse.Panel header="Cuisine" key="1">
                  <div className="filter-value-By-Cuisines">
                  <Checkbox.Group
                    options={cuisines.map(item => item.cuisine_name)}
                    onChange={onCuisineChange}
                  />
                </div>
                  </Collapse.Panel>
                  <Collapse.Panel header="Rating" key="2">
                  <div className="filter-value
                  pMinimum Deliveryp">
                  <Radio.Group onChange={RatingSelect}>
                    <Radio value="5">5 Stars</Radio>
                    <Radio value="4">4 Stars</Radio>
                    <Radio value="3">3 Stars</Radio>
                    <Radio value="2">Less Than 3 Stars</Radio>
                  </Radio.Group>
                </div>
                  </Collapse.Panel>
                  <Collapse.Panel header="Delivery Option" key="3">
                  <Radio.Group onChange={onDeliveryChange}>
                  {ByDelivery.map((item) => (
                      <Radio key={item} value={item}>{item}</Radio>
                    ))}
                  </Radio.Group>
                  </Collapse.Panel>
                  <Collapse.Panel header="Minimum Delivery" key="4">
                  <Radio.Group onChange={onMinimumDeliver}>
                    {MinimumDelivery.map((item) => (
                        <Radio value={item}>{` $${item}`}</Radio>
                      ))}
                    </Radio.Group>
                  </Collapse.Panel>
                </Collapse>
              </div>
              <div className="filter-clear-button-div">
                <Button className="filter-clear-button" onClick={onClearClick}>
                  Clear Filter
                </Button>
              </div>
            </div>
          </StickyBox>
          </div>
          <div className="list-of-all-restaurant">
            {/* <Select placeholder="Enter value to sort" onChange={onSort}>
              <Select.Option value="Name" key="Name">
                Name
              </Select.Option>
            </Select> */}
            <div className="restaurants-list">
              {restaurants &&
                restaurants.length > 0 &&
                restaurants.slice(minValue, maxValue).map((item) => (
                <div className="single-restaurant-item2">
                  <div className="restaurant-stripe">
                    <figure>
                    {item.discount ? <span className="ribbon">-{item.discount}%</span> : <span></span>}
                      <img className="pick-merchant-img" src={item.logo}/>
                      <div       
                       onClick={() => {
                         history.push(`/menu/${item.id}`);
                       }}
                       className="strip_info"
                     >
                       <Tooltip title={item.Cuisine || ""}>
                        <small className="small"> {item.Cuisine ? item.Cuisine : ''}</small>
                       </Tooltip>
                        <div className="merchant_nam">
                          <h3>{item.restaurant_name}</h3>
                       <small>{item.Street_address}</small>
                        </div>
                     </div>
                    </figure>
                    <ul>
                      <li>
                        <span className="priz">Avg. Price 24$</span>
                      </li>
                      <li>
                        <div className="score2">
                          <span>Superb
                            <em>{item.total_rating ? item.total_rating : 0} Reviews</em>
                          </span>
                          <strong>{item.rating ? parseFloat(item.rating).toFixed(2) : 'No Rating'}</strong>
                        </div>
                      </li>
                    </ul>
                    {/* <div className="restaurant-item-content-data-left">
                      <div className="merchant-logo">
                        <Avatar shape="square" src={item.logo} />
                      </div>
                      <div className="merchant-options merchant-options11">
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
                    </div> */}
                    {/* <div className="restaurant-item-content-data-right">
                      <div className="status-and-reviews"></div>
                      <Button
                        type="default"
                        onClick={() => {
                          history.push(`/menu/${item.id}`);
                        }}
                        className="view-menu-button yyyy"
                      >
                        {t("Order Now")}
                      </Button>
                      <div className='pick-merchant-qrcode'>
                        <QRCode value={`https://devlab.mygastrofox.ch/menu/${item.id}`} size={100} />
                      </div>
                      <h2>{item.restaurant_name}</h2>
                      <div className="open-min-fav rating">
                        <Rate disabled defaultValue={3} />
                        <span>{item.total_rating} Reviews</span>
                        <span className="open open-pick">open</span>
                        <span className="min">
                          Minimum Order : {item.minimum_order_delivery || ""}CHF
                        </span>
                      </div>
                      <p class="merchant-address-text">
                        {item.Street_address}
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
                        Delivery Est:
                        {item.delivery_estimation || "not available"}
                      </p>
                      <p className="extra-text">
                        Delivery Distance:
                        {item.distance_covered || "not available"}
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
                          history.push(`/menu/${item.id}`);
                        }}
                        className="view-menu-button xxxx"
                      >
                        {t("Order Now")}
                      </Button>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
            <Pagination
            defaultCurrent={1}
            defaultPageSize={9}
            onChange={handlePageSizeChange}
            total={restaurantList.length || 0}/>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  restaurantList: state.RestaurantReducer.restaurantsList,
  cuisines: state.RestaurantReducer.cuisines,
  isLoading: state.RestaurantReducer.isLoading,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllRestaurants: getAllRestaurantActions.request,
      getCuisines: getCuisineActions.request,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withNamespaces()(PickupMerchant)));
