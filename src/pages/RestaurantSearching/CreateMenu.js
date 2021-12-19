import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Button, Spin,Input } from 'antd';
import OrderModal from './OrderModal';
import { bindActionCreators } from 'redux';
// import { asyncActionGenerator, CREATE_ORDER } from '../../redux/actions';

// creatOrderActions = asyncActionGenerator(CREATE_ORDER);
const CreateMenu = props => {
    const {
        creatOrder,
        editOrder,
        deleteOrder,
        order,
        menu,
        orders,
        isLoading,
        currentOrder,
        isEdit,
        onOrderEdit,
    } = props;
  
    const restaurantMenu = menu.menu ? menu.menu : [];
  const [value, setValue] = useState("");
  const [restaurants, setRestaurants] = useState(restaurantMenu);
  console.log(restaurants);
    useEffect( ()=>{ 
      setRestaurants(restaurantMenu)
    },[restaurantMenu])
    let result = restaurantMenu.reduce((prev, current)=> {
        if(!prev[current.food_category]) {
            prev[current.food_category] = [];
        };
        prev[current.food_category].push(current);
        return prev;
    }, {});
    console.log(result);

    let cartOrder = orders.reduce((prev, current)=> {
      if(!prev[current.item_name]) {
          prev[current.item_name] = {};
      };
      prev[current.item_name]=current;
      return prev;
  }, {});
  console.log(cartOrder);
  
    return (
        <Spin spinning={isLoading}>
        <div className="view-menu-section">
            <div className="view-menu-container">
            <div className="menu-top-search">
                <input
                  placeholder="Search food item"
                  className="menu-search-box"
                  value={value}
                  onChange={(e) => {
                    const currValue = e.target.value.toLowerCase();
                    setValue(currValue);
                    const filteredData = restaurantMenu.filter((entry) =>
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
                <i className="iconify" data-icon="ion:search-outline"></i>
                </button>
              </div>
                {
                    restaurants.length === 0 ? 'no menu' :
                    Object.keys(result).filter(single => restaurants.find(item => item.food_category === single))
                    .map(value => <div id={value} className="single-menu-item-with-category">
                    <h5 className="category-heading">{value.charAt(0).toUpperCase() + value.slice(1)}</h5>
                    {result[value].filter((item) => restaurants.find(i => i.food_name === item.food_name)).map(item =>
                    <div key={item.food_name} className={orders.map(or=>or.item_name).includes(item.food_name) ? 
                    "single-menu-item selected-item-cart" : "single-menu-item"}>
                      <div className={orders.find(ord=>ord.item_name === item.food_name) ? "quantity-tag-menu": ""}>
                        {orders.find(ord=>ord.item_name === item.food_name) ? 
                        cartOrder[item.food_name].quantity: null}</div>
                          <OrderModal
                          onCreate={creatOrder}
                          onEdit={editOrder}
                          order={order}
                          menu={item}
                          rest = {menu}
                          />
                 </div>)}</div>)
                    // restaurantMenu.map(item=> <div key={item.food_name} className="single-menu-item">
                    //    <OrderModal
                    //    onCreate={creatOrder}
                    //    onEdit={editOrder}
                    //    order={order}
                    //    menu={item}
                    //    rest = {menu}
                    //    />
                    // </div>)
                }
            </div>
        </div>
        </Spin>
    )
};
const mapStateToProps = state => ({
    restaurantList: state.RestaurantReducer.restaurantsList,
    isLoading: state.RestaurantReducer.isLoading,
    menu: state.RestaurantReducer.menu,
    orders: state.RestaurantReducer.orders,
  });
  const mapDispatchToProps = dispatch =>
  bindActionCreators({
  }, dispatch)
  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateMenu));
