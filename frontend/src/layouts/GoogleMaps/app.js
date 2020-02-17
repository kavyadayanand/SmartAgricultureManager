import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const style = {
  width: '75%',
  height: '60%', 
  position: 'relative',
  top: '0%',
  left: '20%',
  border: 'solid black 2px' 
}

export class App1 extends Component {
 state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };
 

  render() {
    
    
    return (
      <Map google={this.props.google} zoom={10} style = {style} className={'map'} onClick={this.onMapClicked}  
      initialCenter={{
            lat: 37.38433270000001,
            lng: -121.92664809999997
          }}
      >
      
        <Marker onClick={this.onMarkerClick}
                name={"North 1st Street, San Jose, CA, USA"}
                position={{lat: 37.38433270000001, lng: -121.92664809999997}}  
                 />

        <Marker onClick={this.onMarkerClick}
                name={'North 2nd Street, San Jose, CA, USA'}
                position={{lat: 37.3474486, lng: -121.89754319999997}}  
                 />         

        <Marker onClick={this.onMarkerClick}
                name={'North 6th Street, San Jose, CA, USA'}
                position={{lat: 37.349486, lng: -121.8933078}}  
                 /> 

        <Marker onClick={this.onMarkerClick}
                name={'North 8th Street, San Jose, CA, USA'}
                position={{lat: 37.34906489999999, lng: -121.89011349999998}}  
                 />  
        
        <Marker onClick={this.onMarkerClick}
                name={'North 5th Street, San Jose, CA, USA'}
                position={{lat: 37.3495538, lng: -121.89479470000003}}  
                 /> 

                 <Marker onClick={this.onMarkerClick}
                name={'1st Street, San Francisco, CA, USA'}
                position={{lat: 37.7881209, lng: -122.39549579999999}}  
                 /> 

                 <Marker onClick={this.onMarkerClick}
                name={'Downtown, San Francisco, CA, USA'}
                position={{lat: 37.7945742, lng: -122.3999445}}  
                 />

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDjK-kzNgV0iSnXHL8RmgRd3l04SCo6l5M'
})(App1)
