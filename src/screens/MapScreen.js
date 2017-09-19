import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MapView } from 'expo';
import PriceMarker from '../components/PriceMarker';

let styles;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;


export default class MapScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      current: 0,
      transactions: [
        { title: 'KFC', date: 'September 14', amount: 22.14, latitude: 37.782999, longitude: -122.418953, key: 0 },
        { title: 'Burger King', date: 'September 16', amount: 12.00, latitude: 23.764687, longitude: 90.389686, key: 1 },
        { title: 'Boba Guys', date: 'September 18', amount: 9.00, latitude: 37.783668, longitude: -122.432573, key: 2 },
      ],
    };
    this.animateNext = this.animateNext.bind(this);
  }

  componentDidMount() {
    this.setState({
      region: {
        latitude: this.state.transactions[this.state.current].latitude,
        longitude: this.state.transactions[this.state.current].longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    });
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  animateNext() {
    let nextCurrent;
    if (this.state.current === this.state.transactions.length - 1) {
      nextCurrent = 0;
    } else {
      nextCurrent = this.state.current + 1;
    }
    this.setState({ current: nextCurrent });
    this.map.animateToCoordinate({
      latitude: this.state.transactions[this.state.current].latitude,
      longitude: this.state.transactions[this.state.current].longitude,
    });
  }

  animatePrevious() {
    let previousCurrent;
    if (this.state.current === 0) {
      previousCurrent = this.state.transactions.length - 1;
    } else {
      previousCurrent = this.state.current - 1;
    }
    this.setState({ current: previousCurrent });
    this.map.animateToCoordinate({
      latitude: this.state.transactions[this.state.current].latitude,
      longitude: this.state.transactions[this.state.current].longitude,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={(ref) => { this.map = ref; }}
          style={styles.map}
          initialRegion={this.state.region}
          onRegionChange={region => this.onRegionChange(region)}
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
                key={transaction.key}
              >
                <PriceMarker amount={transaction.amount} key={transaction.key} />
              </MapView.Marker>
            );
          })}
        </MapView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.animatePrevious()}
            style={[styles.bubble, styles.button]}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.animateNext()}
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

