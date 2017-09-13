import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import qs from 'qs';
import store from '../store/userStore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class DashboardScreen extends React.Component {

  constructor() {
    super();
    this.state = store.getState();
  }

  componentWillMount() {
    // this.getDailySpending();
  }

  getDailySpending() {
    console.log('this.state.uniqueUserId', this.state.uniqueUserId);
    const config = {
      url: 'http://localhost:5000/testproject-6177f/us-central1/getDailySpending',
      payload: qs.stringify({ uniqueUserId: this.state.uniqueUserId }),
    };
    axios.post(config.url, config.payload)
      .then((response) => { // eslint-disable-line
        // response.data[Object.keys(response.data)[0]]
        this.setState({ dailySpending: response.data[Object.keys(response.data)[0]] });
      })
      .catch(console.error);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Your Daily Spending: { this.state.dailySpending ? this.state.dailySpending : 'N/A'}</Text>
      </View>
    );
  }
}
