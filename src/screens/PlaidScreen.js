import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
// import PlaidAuthenticator from 'react-native-plaid-link';
import axios from 'axios';
import qs from 'qs';
import Config from '../../config.json';
import store from '../store/userStore';
import PlaidAuthenticator from '../components/PlaidLink';

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
    headerLeft: null,
  };
  constructor() {
    super();

    // retrieve unique user id from redux store and set to state
    this.state = {
      data: {},
      linkButtonPressed: false,
      uniqueUserId: store.getState().uniqueUserId,
    };
    this.onMessage = this.onMessage.bind(this);
    this.exchangePublicToken = this.exchangePublicToken.bind(this);
  }

  onMessage(data) {
    if (data.action === 'plaid_link-undefined::connected') {
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
        uniqueUserId: this.state.uniqueUserId,
      }),
    };
    axios.post(config.url, config.payload)
    .then(() => this.navigateToHome())
    .catch((error) => { console.log(error); });
  }

  navigateToHome = () => {
    this.props.navigation.navigate('Home');
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
        webhook="http://2c2e89b9.ngrok.io/testproject-6177f/us-central1/plaidWebHook"
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
