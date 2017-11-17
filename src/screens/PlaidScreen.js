import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
// import PlaidAuthenticator from 'react-native-plaid-link';
import axios from 'axios';
import qs from 'qs';
import Config from '../../config.json';
import store from '../store/userStore';
import PlaidAuthenticator from '../components/PlaidLink';
import Spinner from '../components/Spinner';

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
      data: {},
      linkButtonPressed: false,
      loading: false,
      userIdToken: store.getState().userIdToken,
    };
    this.onMessage = this.onMessage.bind(this);
    this.exchangePublicToken = this.exchangePublicToken.bind(this);
  }

  onMessage(data) {
    if (data.action === 'plaid_link-undefined::connected') {
      this.setState(
        { linkButtonPressed: false },
        () => this.exchangePublicToken(data.metadata.public_token, data.metadata.institution),
      );
      store.dispatch({
        type: 'LINK_BANK',
        institution: data.metadata.institution.name,
      });
    }
  }

  exchangePublicToken(publicToken, institution) {
    const config = {
      url: `${Config.REACT_APP_CURRENT_HOST}exchangePublicToken`,
      payload: qs.stringify({
        publicToken,
        institution,
        idToken: this.state.userIdToken,
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
    if (this.state.loading) {
      return (
        <Spinner message="Linking your bank account" />
      );
    }
    return (
      <View style={styles.container}>
        <Button title={'Link Your Bank Account'} onPress={() => this.setState({ linkButtonPressed: true, loading: true })} />
      </View>
    );
  }

  renderPlaidLink() {
    return (
      <PlaidAuthenticator
        onMessage={this.onMessage}
        publicKey={Config.REACT_APP_PLAID_PUBLIC_KEY}
        webhook={`${Config.REACT_APP_WEBHOOK_HOST}plaidWebHook`}
        env={Config.REACT_APP_PLAID_ENVIRONMENT}
        product="transactions"
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
