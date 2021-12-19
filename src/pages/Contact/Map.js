import React, { Component } from "react";
import { withGoogleMap, GoogleMap } from "react-google-maps";
class Map extends Component {
  render() {
    const GoogleMapExample = withGoogleMap((props) => (
      <GoogleMap
        defaultCenter={{ 
          lat: props.latitude ? props.lattitude : 40.756795,
          lng: props.longitude ? props.longitude : -73.954298 
        }}
        defaultZoom={13}
      ></GoogleMap>
    ));
    return (
      <div>
        <GoogleMapExample
          containerElement={
          <div className="to-style-map" style={{ height: `500px`, width: "100%" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}
export default Map;
