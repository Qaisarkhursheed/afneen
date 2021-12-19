import React, {useEffect} from "react";
import { withNamespaces } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import i18n from "../../../i18n";
import location4 from "../../../styles/images/location_list_4.jpg";
import location5 from "../../../styles/images/location_list_5.jpg";
import takaway from '../../../styles/images/icons8-take-away-food-50.png'
import PropTypes from 'prop-types';
import CustomSpinner from "../../../components/Spinner/CustomSpinner";
import "./BestDeals.css";

import { asyncActionGenerator, GET_RESTAURANTS } from "../../../redux/actions";
import { Button } from "antd";
import { withRouter } from "react-router";

const getRestaurantsAction = asyncActionGenerator(GET_RESTAURANTS);

const BestDeals = (props) => {
    const {
        t,
        restaurants,
        isGettingRestaurant,
        getRestaurants,
        history,
        match
    } = props;

    useEffect(()=>{
        getRestaurants();
    }, [getRestaurants])

  return (
    <div className="deals-container">
      <div className="Restaurants-top res-top2">
        <span>
            <em></em>
        </span>
        <div className="heading-with-view-all">
        <h2>{t("Our Very Best Deals")}</h2>
        <Button type="link" className="view-all-button" onClick={()=>history.push('/pick-restaurant')}>
            View All
        </Button>
        </div>
      <p className="catagory-sub-heading">
        {t("Cum doctus civibus efficiantur in imperdiet deterruisset")}
      </p>
      </div>
      <CustomSpinner loading={isGettingRestaurant}>
      <div className="deals-row">
       <div className="deals">
               {restaurants.slice(0, 6).map(item=>
                <div className="deals-list" onClick={()=>history.push(`/menu/${item.id}`)}>
                      <figure>
                          <img src={item.logo}/>
                      </figure>
                      <div className="score1">
                        <strong>{item.rating ? parseFloat(item.rating).toFixed(2) : 0}</strong>
                      </div>
                    <em>{item.Cuisine ? item.Cuisine : ''}</em>
                    <h3>{item.restaurant_name}</h3>
                      <small>{item.Street_address}</small>
                      <ul>
                          <li>
                            {item.discount ?<span className="ribbon2">-{item.discount}%</span> :
                            <span className="ribbon2"> -0%</span>}
                          </li>
                          {match.path.includes('take-away') ?
                           <li>
                           <span className={item.Services.includes('Pickup') ? "loc-open1" : "loc-open1 open2" }><img src={takaway}/>Take away</span>
                           <span className={item.Services.includes('Delivery') ? "loc-open1" : "loc-open1 open2" }><i class="fa fa-motorcycle" aria-hidden="true"></i>Delivery</span>
                          </li> :
                          <li>Average price $35</li>
                          }
                      </ul>
                  </div>)}
{/*                        
                  <div className="deals-list">
                      <figure>
                          <img src={location5}/>
                      </figure>
                      <div className="score1">
                          <strong>9.5</strong>
                      </div>
                      <em>Italian</em>
                      <h3>La Monnalisa</h3>
                      <small>8 Patriot Square E2 9NF</small>
                      <ul>
                          <li>
                              <span className="ribbon2">-30%</span>
                          </li>
                          <li>Average price $35</li>
                      </ul>
                  </div>
                        
                  <div className="deals-list">
                      <figure>
                          <img src={location4}/>
                      </figure>
                      <div className="score1">
                          <strong>9.5</strong>
                      </div>
                      <em>Italian</em>
                      <h3>La Monnalisa</h3>
                      <small>8 Patriot Square E2 9NF</small>
                      <ul>
                          <li>
                              <span className="ribbon2">-30%</span>
                          </li>
                          <li>Average price $35</li>
                      </ul>
                  </div>       
                  <div className="deals-list">
                      <figure>
                          <img src={location4}/>
                      </figure>
                      <div className="score1">
                          <strong>9.5</strong>
                      </div>
                      <em>Italian</em>
                      <h3>La Monnalisa</h3>
                      <small>8 Patriot Square E2 9NF</small>
                      <ul>
                          <li>
                              <span className="ribbon2">-30%</span>
                          </li>
                          <li>Average price $35</li>
                      </ul>
                  </div>  
                  <div className="deals-list">
                      <figure>
                          <img src={location4}/>
                      </figure>
                      <div className="score1">
                          <strong>9.5</strong>
                      </div>
                      <em>Italian</em>
                      <h3>La Monnalisa</h3>
                      <small>8 Patriot Square E2 9NF</small>
                      <ul>
                          <li>
                              <span className="ribbon2">-30%</span>
                          </li>
                          <li>Average price $35</li>
                      </ul>
                  </div>  
                  <div className="deals-list">
                      <figure>
                          <img src={location4}/>
                      </figure>
                      <div className="score1">
                          <strong>9.5</strong>
                      </div>
                      <em>Italian</em>
                      <h3>La Monnalisa</h3>
                      <small>8 Patriot Square E2 9NF</small>
                      <ul>
                          <li>
                              <span className="ribbon2">-30%</span>
                          </li>
                          <li>Average price $35</li>
                      </ul>
                      
                      /div>      
           */}
       </div>
      </div>
      </CustomSpinner>
    </div>
  );
};

const mapStateToProps = state => (
    {
      restaurants: state.RestaurantReducer.restaurantsList,
      isGettingRestaurant: state.RestaurantReducer.isLoading,
    }
  )
  
const mapDispatchToProps = dispatch => 
    bindActionCreators({
        getRestaurants: getRestaurantsAction.request
    }, dispatch);
BestDeals.propTypes = {
    restaurant: PropTypes.string,
    isGettingRestaurant: PropTypes.bool,
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withNamespaces()(BestDeals)));
