import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MapView } from 'expo';
import PriceMarker from '../components/PriceMarker';
import store from '../store/userStore';

let styles;

export default class MapScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      transactions: [
        { title: 'KFC', date: 'September 14', amount: 22.14, latitude: 37.782999, longitude: -122.418953 },
        { title: 'Boba Guys', date: 'September 18', amount: 9.00, latitude: 37.783668, longitude: -122.432573 },
      ],
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
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.initialRegion}
        >
          
          {this.state.transactions.map((transaction) => {
            return (
              <MapView.Marker
                coordinate={{
                  latitude: transaction.latitude,
                  longitude: transaction.longitude,
                }}
                title={transaction.title}
                description={transaction.date}
              >
                <PriceMarker amount={transaction.amount} />
              </MapView.Marker>
            );
          })}
        </MapView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => console.log('previous')}
            style={[styles.bubble, styles.button]}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => () => console.log('next')}
            style={[styles.bubble, styles.button]}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 100,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  buttonText: {
    textAlign: 'center',
  },
});

// co-ordinates for ez copy pasta

// dhaka
// 23.777176
// 90.399452

// SF
// 37.78825
// -122.4324

{/* <MapView.Marker
coordinate={{
  latitude: 37.783668,
  longitude: -122.432573,
}}
title={'Boba Guys'}
description={'September 3'}
>
<PriceMarker amount={9.00} />
</MapView.Marker> */}

// <MapView.Marker
// coordinate={{
//   latitude: 37.782999,
//   longitude: -122.418953,
// }}
// title={'KFC'}
// description={'September 14'}
// >
// <PriceMarker amount={22.14} />
// </MapView.Marker>

