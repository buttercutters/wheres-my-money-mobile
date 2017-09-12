import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import PlaidAuthenticator from 'react-native-plaid-link';
import axios from 'axios';
import qs from 'qs';
import Config from '../../config.json';
import { auth } from '../../firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class PlaidScreen extends React.Component {
  // eslint-disable-next-line
  static navigationOptions = {
    title: 'Link Account',
  };
  constructor() {
    super();
    this.state = {
      linkButtonPressed: false,
    };
    this.onMessage = this.onMessage.bind(this);
    this.exchangePublicToken = this.exchangePublicToken.bind(this);
  }

  onMessage(data) {
    if (data.action === 'plaid_link-undefined::connected') {
      console.log(data);
      this.setState(
        { linkButtonPressed: false },
        () => this.exchangePublicToken(data.metadata.public_token),
      );
    }
  }

  exchangePublicToken(publicToken) {
    const config = {
      url: 'http://localhost:5000/testproject-6177f/us-central1/exchangePublicToken',
      payload: qs.stringify({
        publicToken,
        uniqueUserId: auth.currentUser.uid,
      }),
    };
    axios.post(config.url, config.payload)
    .then(() => this.navigateToDashboard())
    .catch((error) => { console.log(error); });
  }

  navigateToDashboard = () => {
    this.props.navigation.navigate('Dashboard');
  }

  renderLinkButton() {
    return (
      <View style={styles.container}>
        <Button title={'Link Your Bank Account'} onPress={() => this.setState({ linkButtonPressed: true })} />
      </View>
    );
  }

  renderPlaidLink() {
    return (
      <PlaidAuthenticator
        onMessage={this.onMessage}
        publicKey={Config.REACT_APP_PLAID_PUBLIC_KEY}
        env="sandbox"
        product="auth,transactions"
        clientName="Wheres My Money"
      />
    );
  }

  render() {
    return (
      this.state.linkButtonPressed ? this.renderPlaidLink() : this.renderLinkButton()
    );
  }
}
