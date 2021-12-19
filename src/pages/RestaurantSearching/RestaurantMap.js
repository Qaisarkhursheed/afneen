import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import LeafLetMap from '../../components/LeafLetMap/LeafLetMap';

const RestaurantMap = ({restaurant}) => {
    return (
        <div className="view-menu-section">
             <LeafLetMap
                latitude={restaurant.latitude}
                longitude={restaurant.longitude}
                name={restaurant.restaurant_name}
            />
        </div>
    )
};
const mapStateToProps = state => ({
    restaurantList: state.RestaurantReducer.restaurantsList,
    menu: state.RestaurantReducer.menu,
  });
  export default connect(mapStateToProps, null)(withRouter(RestaurantMap));
