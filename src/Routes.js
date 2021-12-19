import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './pages/Home/Home';
import BrowseRestaurant from './pages/BrowseRestaurant/BrowseRestaurant';
import LoginSignup from './pages/LoginSignup/LoginSignup';
import Profile from './pages/Profile/Profile';
import RestaurantSignup from './pages/RestaurantSignup/RestaurantSignup';
import Process from './pages/RestaurantSignup/Process';
import Contact from './pages/Contact/Contact';
import TabsPage from './pages/RestaurantSearching/TabsPage';
import Cart from './pages/RestaurantSearching/Cart';
import RecoverPassword from './pages/LoginSignup/RecoverPassword';
import NoData from './pages/NoData/NoData';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/take-away" component={Home} />
      <Route exact path="/browse-restaurant" component={BrowseRestaurant} />
      <Route exact path="/signup" component={LoginSignup} />
      <Route exact path="/recover" component={RecoverPassword} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/restaurant-signup" component={RestaurantSignup} />
      <Route exact path="/restaurant-signup/:type" component={Process} />
      <Route exact path="/pick-restaurant" component={TabsPage} />
      <Route exact path="/menu/:id" component={TabsPage} />
      <Route exact path="/payment" component={TabsPage} />
      <Route exact path="/confirm-order" component={TabsPage} />
      <Route exact path="/receipt" component={TabsPage} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/error" component={NoData} />
      <Redirect to='/error' />
    </Switch>
  );
};

const mapStateToProps = state => ({
  isAuthenticated : state.AuthenticationReducer.isAuthenticated
})
export default connect(mapStateToProps,null)(Routes);
