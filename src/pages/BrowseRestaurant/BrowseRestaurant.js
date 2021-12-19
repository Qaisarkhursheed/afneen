import React, { useEffect, useState } from "react";
import { Tabs, Button, Avatar, Spin, Rate, Tooltip,  Input,
  Breadcrumb, Collapse, Checkbox, Radio, Select, Slider } from "antd";
import { connect } from "react-redux";
import StickyBox from "react-sticky-box";
import BrowseRestaurantImage from "../../styles/images/banner-5.jpg";
import ImageContainer from "../../components/ImageComponent/ImageComponent";
import ByAddress from "../../styles/images/byaddress.png";
import LeafLetMap from "../../components/LeafLetMap/LeafLetMap";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
import { asyncActionGenerator, GET_RESTAURANTS } from "../../redux/actions";
import adjust from "../../styles/images/adjust-vert.svg"
import { withNamespaces } from "react-i18next";
import QRCode from "react-qr-code";
import Featured from "./Featured";
import Newest from './Newest';
import { NavLink } from "react-router-dom";
import ViewMap from "./ViewMap";
import "./BrowseRestaurant.css";
import { Loading3QuartersOutlined } from '@ant-design/icons';
const antIcon = <Loading3QuartersOutlined style={{ fontSize: 40, color: '#5cb85c' }} spin />;


const { TabPane } = Tabs;

const getAllRestaurantsActions = asyncActionGenerator(GET_RESTAURANTS);

const BrowseRestaurant = (props) => {
  const [showSpinner,setShowSpinner]= useState(false);
  const [showfilter, setShowfilter] = useState(false);
  const { t } = props;
  
  const BannerSection = () => {
    return (
      <div className="banner-section">
        <h1 className="home-search-text">{t("Browse Restaurant")}</h1>
        <p className="home-search-subtext">
          {t("choose from your favorite restaurant")}
        </p>
      </div>
    );
  };
  const { restaurantList, getAllRestaurants, isLoading , history, cuisines} = props;
  const [count,setCount]=useState(4);
  const loadMore = ()=>{
    setCount(restaurantList.length);
    setShowSpinner(true);
    setInterval(()=> {
      setShowSpinner(false);
    }, 1000)
  }
  const filtersButton = () => {
    setShowfilter(!showfilter);
  }

  useEffect(() => {
    getAllRestaurants();
  }, [getAllRestaurants]);

  // if(window.innerWidth <= 1024){
  //   history.push("/pick-restaurant")
  // }
  return (
      <div className="browse-restaurant">
        {/* <ImageContainer
          imagePath={BrowseRestaurantImage}
          content={BannerSection}
        /> */}
        <div className="section-browse-restaurant">
        <div className="browse-map-top">
          <ViewMap />
          </div>
          <div className="tabs-container">
            {/* <Tabs defaultActiveKey="1" centered>
              <TabPane
                tab={
                  <span>
                    <i
                      className="iconify"
                      data-icon="ls:coffee"
                      data-inline="false"
                    ></i>
                    <span className="tab-name">{t("Restaurant List")}</span>
                  </span>
                }
                key="1"
              > */}
               <div className="new-search-pick-merchant">
      <div className="bread-crumb-with-data">
        <div className="bread-crumb-div">
            <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to="/">Home</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <NavLink to="/browse-restaurant">Browse Restaurant</NavLink>
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
          // value={value}
          // onChange={(e) => {
          //   const currValue = e.target.value.toLowerCase();
          //   setValue(currValue);
          //   const filteredData = restaurantList.filter((entry) =>
          //     Object.values(entry).some(
          //       (val) =>
          //         typeof val === "string" &&
          //         val.toLowerCase().includes(currValue)
          //     )
          //   );
          //   setRestaurants(filteredData);
          // }}
        />
        <button className="press-search">
          Search
        </button>
      </div>
    </div>
       <Spin spinning={isLoading} indicator={antIcon}>
             <div className="sort-by-popularity">
                 <Select
                    className="language-selector-dd"
                    // onSelect={this.onSelect}
                    defaultValue="Sort by Popularity"
                    >
                    <Select.Option value='1'>Sort by Popularity</Select.Option>
                    <Select.Option value='1'>Sort by Average rating</Select.Option>
                    <Select.Option value='1'>Sort by newness</Select.Option>
                    <Select.Option value='1'>Sort by Price: low to high</Select.Option>  
                    <Select.Option value='1'>Sort by Price: high to low</Select.Option> 
                  </Select>
                  <button className="view-browse-filters" onClick={filtersButton} >
                   <img src={adjust}  />
                  </button>
                  </div>
                  <div className={showfilter ? "show-filters" : "hide-filters filters-hidden"}>
                    <div className="browse-filter-flex">
                    <Radio.Group>
                    <Radio value="5">Delivery</Radio>
                    <Radio value="4">Take away</Radio>
                  </Radio.Group>
                      <div className="browse-filter-Cuisines">
                        <h3>Categories</h3>
                      <Checkbox.Group
                        options={cuisines.slice(0,4).map(item => item.cuisine_name)}
                        // onChange={onCuisineChange}
                      />
                      </div>
                      <h3>Distance</h3>
                      <p> Radius around selected destination </p>
                      <Slider defaultValue={0}  />
                    </div>
                  </div>
         <div className="display-flex-for-tablet">
                {restaurantList.slice(0,count).map((item) => (
                  <div
                    className="single-restaurant-item"
                    key={item.restaurant_name}
                  >
                    <div className="single-restaurant-item-content">
                      {/* <div className="restaurant-item-content-data">
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
                                    {i} <small>{t("Available")}</small>
                                  </span>
                                ))
                              : null}
                          </div>
                        </div>
                        <div className="restaurant-item-content-data-right">
                          <div className="open-min-fav rating">
                            <Rate disabled value={parseFloat(item.rating) ? parseFloat(item.rating) : 0 } />
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
                                {t("View Menu")}
                              </Button>
                            </div>
                            <div className='qrcode'>
                              <QRCode value={`https://devlab.mygastrofox.ch/menu/${item.id}`} size={90} />
                            </div>
                          </div>
                        </div>
                      </div> */}
                  <div   onClick={() => {
                         history.push(`/menu/${item.id}`);}} className="single-restaurant-item2">
                  <div className="restaurant-stripe">
                    <figure>
                    {item.discount ? <span className="ribbon">-{item.discount}%</span> : <span></span>}
                      <img   
                        className="pick-merchant-img" src={item.logo}/>
                      <div       
                      //  onClick={() => {
                      //    history.push(`/menu/${item.id}`);
                      //  }}
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
                    </div>
                    </div>
                      {/* <div className="restaurant-item-content-map">
                        <LeafLetMap
                          latitude={item.latitude}
                          longitude={item.longitude}
                          name={item.restaurant_name}
                        />
                      </div> */}
                    </div>
                  </div>
                ))}
                </div>
               </Spin>
               <div className="browse-res-button">
                         <Button
                            type="default"
                            onClick={loadMore}
                            className="laod-button"
                            loading={showSpinner}
                              >
                                {t("Load More")}
                          </Button>
                </div>
              {/* </TabPane> */}
              {/* <TabPane
                tab={
                  <span>
                    <i
                      className="iconify"
                      data-icon="ion:pizza-sharp"
                      data-inline="false"
                    ></i>
                    <span className="tab-name"> {t("Newest")}</span>
                  </span>
                }
                key="2"
              >
                <Newest />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <i
                      className="iconify"
                      data-icon="openmoji:fork-and-knife"
                      data-inline="false"
                    ></i>
                    <span className="tab-name"> {t("Featured")}</span>
                  </span>
                }
                key="3"
              >
               <Featured />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <i
                      className="iconify"
                      data-icon="openmoji:fork-and-knife"
                      data-inline="false"
                    ></i>
                    <span className="tab-name">{t("View by Map")}</span>
                  </span>
                }
                key="4"
              >
               <ViewMap />
              </TabPane> */}
            {/* </Tabs> */}
          </div>
          {/* <StickyBox offsetTop={20} offsetBottom={20}> */}
          <div className="browse-map">
          <ViewMap />
          </div>
          {/* </StickyBox> */}
        </div>
      </div>

  );
};
const mapStateToProps = (state) => ({
  restaurantList: state.RestaurantReducer.restaurantsList,
  isLoading: state.RestaurantReducer.isLoading,
  cuisines: state.RestaurantReducer.cuisines,
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
)(withRouter(withNamespaces()(BrowseRestaurant)));
