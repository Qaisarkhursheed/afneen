import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import BrowseRestaurantImage from "../../styles/images/banner-5.jpg";
import ImageContainer from "../../components/ImageComponent/ImageComponent";
import { Steps, Avatar, Button, Rate, Spin, Collapse } from "antd";
import { withRouter } from "react-router-dom";
import PickupMerchant from "./PickupMerchant";
import ViewMenu from "./ViewMenu";
import PaymentInformation from "./PaymentInformation";
import ConfirmOrder from "./ConfirmOrder";
import Receipt from "./Reciept";
import { withNamespaces } from "react-i18next";
import "./RestaurantSearching.css";
import { asyncActionGenerator, ADD_FAVORITE , GET_OPENING } from "../../redux/actions";
import { bindActionCreators } from "redux";
import deliveryman from "../../styles/images/icons8-delivery-scooter-64.png";
import ViewMap from "../BrowseRestaurant/ViewMap";

const addFavActions = asyncActionGenerator(ADD_FAVORITE);
const getOpeningHours = asyncActionGenerator(GET_OPENING);

const TabsPage = (props) => {
  const { Panel } = Collapse;
  const { t, menu, isLoading, isAddingFavorites, addFavorite, getOpening, user,isAuthenticated,restaurantList, openinghours } = props;
  const { Step } = Steps;
  const [showMap, setShowMap] = useState(false);
  const { match, location } = props;
  const [current, setCurrent] = useState(1);
  const [pack, setPack] = useState({});
  const next = (item) => {
    setCurrent(current + 1);
    setPack(item);
  };
  const onHeartClick = record => {
    if(isAuthenticated) {
      addFavorite({
        user_id: user.id,
        merchant_id: record.id
      });
    }
  };
  const onButtonClick = () => {
    setShowMap(!showMap);
  }
  const today = ['Sunday','Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()];
// console.log(today, openinghours)

  const BannerSection = () => {
    return (
      <>
        {
          location.pathname === "/pick-restaurant" && menu ?
          <div className="banner-section">
            <h1 className="home-search-text">Creating Order</h1>
            <p className="home-search-subtext">Please Select food Items</p>
          </div>
          : <Spin spinning={isLoading || isAddingFavorites}>
              <div className="banner-section1">
                <div className="banner-info">
                  <div className="restaurant-image">
                    <Avatar src={menu.logo || ''} shape="square"/>
                  </div>
                    <div className="restaurant-inner-block">
                    <Rate disabled value={parseFloat(menu.rating) ? parseFloat(menu.rating) : 0} />
                    <span className="total-rating">({menu.total_rating} Reviews)</span>
                      {/* <span className="open">open</span>
                      <span className="min">Minimum Order : {menu.minimum_order_delivery || ''}CHF</span>
                      <Button className="add-to-favorites" type="link" onClick={()=>onHeartClick(menu)}>
                        <i class="far fa-heart"></i>
                      </Button> */}
                    <h1 className="res-decriptio">{menu.restaurant_name}</h1>
                    <p className="res-decription">{menu.Cuisine}</p>
                    </div>
                  </div>
                  <div className="restaurant-banner-info2">
                    <div className="delivery-man">
                    <i class="fas fa-motorcycle"></i>
                    <p className="res-decription">Delivery fee: £10.00</p>
                    <p className="res-decription">Min Order : £10.00</p>
                    </div>
                    {/* <p className="res-free-above">Free Delivery Above {menu.free_delivery_above}</p> */}
                    <Collapse className="banner-collapse opening-collapse" >
                      <Panel header={`Today : ${openinghours && openinghours[today.toLowerCase()] ? openinghours[today.toLowerCase()].slice(0,5)+" am "
                       +openinghours[today.toLowerCase()].slice(14,19)+" pm": "--"}`} key="1">
                      <ul className="opening-panel-ul">
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
                      </Panel>
                    </Collapse>
                  </div>
                </div>
            </Spin> 
        }
      </>  
    );
  };
  
  useEffect(() => {
    if (location.pathname === "/pick-restaurant") setCurrent(1);
    else if (location.pathname.includes("/menu/")) setCurrent(2);
    else if (location.pathname === "/payment") setCurrent(3);
    else if (location.pathname === "/confirm-order") setCurrent(4);
    else if (location.pathname === "/receipt") setCurrent(5);
  }, [props.match, location.pathname]);

  useEffect(()=>{
    if(match.params.id){
      getOpening({ merchant_id: match.params.id});
    }
  }, [match, getOpening])
  const steps = [
    {
      title: <span>{t("Search")}</span>,
      content: <></>,
    },
    {
      title: <span>{t("Pick Merchant")}</span>,
      content: (
        <PickupMerchant
          onSuccess={next}
          pack={pack}
          urlParam={props.match.params.type}
          onButtonClick={onButtonClick}
        />
      ),
    },
    {
      title: <span>{t("Create Order")}</span>,
      content: <ViewMenu onSuccess={next} pack={pack} />,
    },
    {
      title: <span>{t("Payment Information")}</span>,
      content: (
        <PaymentInformation
          onSuccess={next}
          pack={pack}
          urlParam={props.match.params.type}
        />
      ),
    },
    {
      title: <span>{t("Confirm Order")}</span>,
      content: (
        <ConfirmOrder
          onSuccess={next}
          pack={pack}
          urlParam={props.match.params.type}
        />
      ),
    },
    {
      title: <span>{t("Receipt")}</span>,
      content: (
        <Receipt
          onSuccess={next}
          pack={pack}
          urlParam={props.match.params.type}
        />
      ),
    },
  ];

  return (
    <div className="restaurant-signup">
      {location.pathname === "/pick-restaurant" ? null : <ImageContainer
        imagePath={BrowseRestaurantImage}
        content={BannerSection}
      />}
      <div className="process">
      {location.pathname === "/pick-restaurant" ? null :  <div className="process-steps">
          <Steps current={current} className="restaurant-searching-steps">
            {steps.map((item) => (
              <Step key={item.title} title={<span>{item.title}</span>} />
            ))}
          </Steps>
        </div>}
        <div className="steps-content">{steps[current].content}</div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  restaurantList: state.RestaurantReducer.restaurantsList,
  menu: state.RestaurantReducer.menu,
  isLoading: state.RestaurantReducer.isLoading,
  isAddingFavorites: state.ProfileReducer.isAddingFavorites,
  user: state.AuthenticationReducer.loginResponse.user,
  isAuthenticated: state.AuthenticationReducer.isAuthenticated,
  openinghours : state.RestaurantReducer.openinghours,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addFavorite: addFavActions.request,
      getOpening: getOpeningHours.request,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withNamespaces()(TabsPage)));
