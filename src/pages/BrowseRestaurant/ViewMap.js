import { Avatar } from 'antd';
import React from 'react';
import {  Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ForkOutlined } from "@ant-design/icons";
import { NavLink } from 'react-router-dom';

class ViewMap extends React.Component {
  constructor() {
    super()
    this.state = {
      lat: 46.8182,
      lng: 8.2275,
      zoom: 10,
      markers: [[51.505, -0.08], [51.504, -0.05], [51.501, -0.03]]
    }
  }

  render() {
    // const position = [
    //     this.props.latitude ? this.props.latitude : this.state.lat ,
    //     this.props.longitude ? this.props.longitude : this.state.lng,
    // ];
    
    const restaurantsList = this.props.restaurantList.map(item=> [
        item.latitude ? parseFloat(item.latitude) : 46.8182,
        item.longitude ? parseFloat(item.longitude) : 8.2275]);
    return (
      <Map center={[46.8182,8.2275]} zoom={this.state.zoom} scrollWheelZoom={false} >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {
            this.props.restaurantList.map(item =>
        <Marker  position={[
            parseFloat(item.latitude) ? parseFloat(item.latitude) : this.state.lat ,
            parseFloat(item.longitude) ? parseFloat(item.longitude) : this.state.lng
        ]} riseOnHover>
          <Popup>
              <Avatar src={item.logo} icon={<ForkOutlined />} />
            <NavLink to={`menu/${item.id}`}>{item.restaurant_name}</NavLink>
          </Popup>
        </Marker>)}
      </Map>
    );
  }
}

const mapStateToProps = (state) => ({
    restaurantList: state.RestaurantReducer.restaurantsList,
    isLoading: state.RestaurantReducer.isLoading,
  });
  export default connect(
    mapStateToProps,
    null
  )(withRouter(ViewMap));

