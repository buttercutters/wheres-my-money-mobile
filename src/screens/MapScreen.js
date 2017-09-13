import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView } from 'expo';
import PriceMarker from '../components/PriceMarker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class MapScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      user: null,
      initialRegion: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }
  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={this.state.initialRegion}
      >
        <MapView.Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title={'KFC'}
          description={'September 14'}
        >
          <PriceMarker amount={22.14} />
        </MapView.Marker>

      </MapView>
    );
  }
}

// dhaka
// 23.777176
// 90.399452

// SF
// 37.78825
// -122.4324

