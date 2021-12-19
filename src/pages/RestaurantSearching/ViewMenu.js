import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import StickyBox from "react-sticky-box";
import { Link } from 'react-scroll';
import CreateMenu from "./CreateMenu";
// import star from "../../styles/images/star.png";
// import order from "../../styles/images/your-order.png";
// import delivery from "../../styles/images/delivery-option.png";
import OpeningHours from "./OpeningHours";
import { message, Tabs, Input, Collapse, Checkbox, Tag } from "antd";
import { withNamespaces } from "react-i18next";
import {
  asyncActionGenerator,
  ORDER,
  ORDER_METHOD,
  GET_MENU,
  SET_CHECKEDOUT,
} from "../../redux/actions";
import OrderModalEdit from "./OrderModalEdit";
import BookTable from "./BookTable";
import Cart from "./Cart";
import Rating from "./Rating";
import RestaurantInfo from "./RestaurantInfo"
import RestaurantMap from "./RestaurantMap";
const orderActions = asyncActionGenerator(ORDER);
const addOrderMethodAction = asyncActionGenerator(ORDER_METHOD);
const getMenuActions = asyncActionGenerator(GET_MENU);
const setCheckout = asyncActionGenerator(SET_CHECKEDOUT);

const ViewMenu = (props) => {
  const {TabPane}  = Tabs;
  const plainOptions = ['Vegetarian', 'Vegan', 'Gultan-free'];
  const { CheckableTag } = Tag;
  const { t } = props;
  const {
    menu,
    orders,
    creatOrder,
    editingOrder,
    deleteOrder,
    sub_total,
    addOrderMethod,
    history,
    location,
    match,
    getMenu,
    setCheckedout,
  } = props;
  const { Panel } = Collapse;
  let categories = menu.menu ?
    menu.menu.map(i => i.food_category):
    [];
  categories = categories.filter((item, index) => categories.indexOf(item) === index);
    console.log(categories);
  // useEffect(()=> {
  //   if( !isAuthenticated) {
  //     history.push('/signup');
  //   }
  // },[history, isAuthenticated])
  const [selectedTags, setselectedTags] = useState([]);
  const [clickedValue, setClickedValue] = useState("tab-1");
  const [orderMethod, setOrderMethod] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    if (menuId) getMenu({ merchant_id: menuId });
  }, [getMenu]);
  useEffect(() => {
    if (menuId) getMenu({ merchant_id: menuId });
  }, [getMenu]);

  useEffect(() => {
    if (location.pathname.includes("/menu/")) setCheckedout(false);
  }, [location.pathname]);
  const onCancel = () => {
    setIsEdit(false);
  };
  const handleCheckoutClicked = () => {
    if (orderMethod === "") {
      message.error("Select an order Method");
    } else {
      history.push("/payment");
    }
  };
  const menuId = match.params.id || null;

  const onEditClick = (item) => {
    // setCurrentMenu(
    //   menu.menu
    //     ? menu.menu.filter((i) => i.food_name === item.item_name)[0]
    //     : {}
    // );
    setIsEdit(true);
  };
  const editOrder = (item) => {
    setIsEdit(false);
    console.log(item);
    editingOrder(item);
  };
  const handleTabClicked = (value) => {
    setClickedValue(value);
  };
  const onDeleteClick = (item) => {
    deleteOrder(item);
  };
  const onDeliverySelect = (value) => {
    addOrderMethod(value);
    setOrderMethod(value);
  };
  const handleChange = (tag, checked) =>{
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag) ;
    console.log('You are interested in: ', nextSelectedTags);
    setselectedTags(nextSelectedTags);
  }
  return (
    <div className="menu-section">
      <div className="menu-start-section">
        <div className="menu-order-container">
          <div className="left-categories-menu">
         
          {window.innerWidth <= 892 ? <Collapse className="left-categories" >
        <Panel header="Categories By" key="1" className="left-categories-header">
            <div className="left-sticky-bar">
              <div className="categories-menu-wrapper">
                <div className="categories-menu">
                  <h6><i class="fas fa-utensils"> Categories</i></h6>
                  <ul className="categories-menu-list">
                    {
                      categories.map(item => <li>
                        <Link to={item} spy={true} smooth={true} >{item.charAt(0).toUpperCase() + item.slice(1)}</Link>
                        </li>)
                    }
                  </ul>
                  <h6><i class="fas fa-utensils"> Deitary</i></h6>
                </div>
              </div>
            </div>
            </Panel>
          </Collapse>:
           <StickyBox offsetTop={20} offsetBottom={20}>
           <div className="left-sticky-bar">
           <div className="categories-menu-wrapper">
             <div className="categories-menu">
               <h6><i class="fas fa-utensils"> Categories</i></h6>
               <ul className="categories-menu-list">
                 {
                   categories.map(item => <li>
                     <Link to={item} spy={true} smooth={true} >{item.charAt(0).toUpperCase() + item.slice(1)}</Link>
                     </li>)
                 }
               </ul>
             </div>
               <Collapse expandIconPosition="right" className="left-categories-deitary" >
                 <Panel header="Deitary" key="1"  className="left-categories-header">
                 {/* <Checkbox.Group
                   options={plainOptions} /> */}
                  {plainOptions.map(tag => (
                      <CheckableTag
                        key={tag}
                        checked={selectedTags.includes(tag)}
                        onChange={checked => handleChange(tag, checked)}
                      >
                        {tag}
                      </CheckableTag>
                    ))}
                 </Panel>
               </Collapse>
           </div>
         </div>
            </StickyBox>
          }
          </div>
          <div className="menu-listing-wrapper">
            {/* <div className="information-tabs-box">
              <ul className="information-tabs">
                <li
                  onClick={() => handleTabClicked("tab-1")}
                  className={clickedValue === "tab-1" ? "selected" : ""}
                >
                  <span>
                  <i class="fas fa-pizza-slice"></i>
                    <span className="tab-name">{t("Menu")}</span>
                  </span>
                </li>
                <li
                  onClick={() => handleTabClicked("tab-2")}
                  className={clickedValue === "tab-2" ? "selected" : ""}
                >
                  <span>
                  <i class="far fa-hourglass"></i>
                    <span className="tab-name">{t("Opening Hours")}</span>
                  </span>
                </li>
                <li
                  onClick={() => handleTabClicked("tab-3")}
                  className={clickedValue === "tab-3" ? "selected" : ""}
                >
                  <span>
                  <i class="fas fa-map-marked-alt"></i>
                    <span className="tab-name">{t("Map")}</span>
                  </span>
                </li>
                <li
                  onClick={() => handleTabClicked("tab-4")}
                  className={clickedValue === "tab-4" ? "selected" : ""}
                >
                  <span>
                  <i class="fas fa-bookmark"></i>
                    <span className="tab-name">{t("Book a table")}</span>
                  </span>
                </li>
                <li
                  onClick={() => handleTabClicked("tab-5")}
                  className={clickedValue === "tab-5" ? "selected" : ""}
                >
                  <span>
                  <i class="fas fa-star-half-alt"></i>
                    <span className="tab-name">{t("Reviews")}</span>
                  </span>
                </li>
              </ul>
              <div className="tabs-data-part">
                <div
                  className={
                    clickedValue === "tab-1" ? "show-tab-data" : "hide-tab-data"
                  }
                >
                  <CreateMenu creatOrder={creatOrder} />
                </div>
                <div
                  className={
                    clickedValue === "tab-2" ? "show-tab-data" : "hide-tab-data"
                  }
                >
                  <OpeningHours />
                </div>
                <div
                  className={
                    clickedValue === "tab-3" ? "show-tab-data" : "hide-tab-data"
                  }
                >
                  <RestaurantMap restaurant={menu}/>
                </div>
                <div
                  className={
                    clickedValue === "tab-4" ? "show-tab-data" : "hide-tab-data"
                  }
                >
                  <BookTable />
                </div>
                <div
                  className={
                    clickedValue === "tab-5" ? "show-tab-data" : "hide-tab-data"
                  }
                >
                  <Rating/>
                </div>
              </div>
            </div> */} 
            <div>
              <Tabs type="card">          
                <TabPane tab={<i class="fas fa-hamburger"> Menu</i>} key="1">
                  <CreateMenu creatOrder={creatOrder} />
                </TabPane>
                <TabPane tab={<i class="fas fa-comment-alt"> Reviews</i>} key="2">
                  <Rating/>
                </TabPane>
                <TabPane tab={<i class="fas fa-utensils"> Book a Table</i>} key="3">
                  <BookTable />
                </TabPane>
                <TabPane tab={<i class="fas fa-info"> Restaurant Info</i>} key="4">   
                  <RestaurantInfo/>     
                </TabPane>
              </Tabs>
            </div>
          </div>
          <div className="order-info-container">
          <StickyBox offsetTop={20} offsetBottom={20}>
            <Cart />
          </StickyBox>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  restaurantList: state.RestaurantReducer.restaurantsList,
  menu: state.RestaurantReducer.menu,
  orders: state.RestaurantReducer.orders,
  sub_total: state.RestaurantReducer.sub_total,
  isLoading: state.RestaurantReducer.isLoading,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      creatOrder: orderActions.add,
      editingOrder: orderActions.edit,
      deleteOrder: orderActions.delete,
      addOrderMethod: addOrderMethodAction.add,
      getMenu: getMenuActions.request,
      setCheckedout: setCheckout.add,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withNamespaces()(ViewMenu)));
