import React from 'react';
import {  Map, TileLayer, Marker, Popup } from 'react-leaflet'
import './LeafLetMap.css';

class LeafLetMap extends React.Component {
  constructor() {
    super()
    this.state = {
      lat: 46.8182,
      lng: 8.2275,
      zoom: 13
    }
  }

  render() {
    const position = [
        this.props.latitude ? this.props.latitude : this.state.lat ,
        this.props.longitude ? this.props.longitude : this.state.lng,
    ];
    

    return (
      <Map center={[
        parseFloat(this.props.latitude) ? parseFloat(this.props.latitude) : this.state.lat ,
        parseFloat(this.props.longitude) ? parseFloat(this.props.longitude) : this.state.lng
    ]} zoom={this.state.zoom}  >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={[
            parseFloat(this.props.latitude) ? parseFloat(this.props.latitude) : this.state.lat ,
            parseFloat(this.props.longitude) ? parseFloat(this.props.longitude) : this.state.lng
        ]} riseOnHover>
          <Popup>
            {this.props.name}
          </Popup>
        </Marker>
        {/* <Marker position={[31.5496,74.3807]} riseOnHover>
          <Popup>
            {this.props.name}
          </Popup>
        </Marker> */}
      </Map>
    );
  }
}

export default LeafLetMap;
