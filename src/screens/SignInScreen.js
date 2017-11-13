import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Google } from 'expo';
import firebase from 'firebase';
import axios from 'axios';
import qs from 'qs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth } from '../../firebase';
import Config from '../../config.json';
import store from '../store/userStore';
import Spinner from '../components/Spinner';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    top: 150,
    position: 'absolute',
    fontSize: 24,
  },
  button: {
    bottom: 400,
    position: 'absolute',
  },
});

export default class App extends React.Component {
  static navigationOptions = {
    title: 'Login',
    headerLeft: null,
  };
  constructor() {
    super();
    this.state = {
      user: null,
      loading: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin = () => {
    this.setState({ loading: true });

    // authenticate using expo Google API
    Google.logInAsync({
      behavior: 'web',
      iosClientId: Config.REACT_APP_IOS_CLIENT_ID,
      iosStandaloneAppClientId: Config.REACT_APP_IOS_STANDALONE_APP_CLIENT_ID,
      scopes: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
    })
      .then((result) => {
        if (result.type === 'success') {
          // authenticate locally with firebase
          const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken);
          firebase.auth().signInWithCredential(credential)
            .then(() => this.addUser(result.accessToken))
            .catch(err => console.log(err));
        }
      })
      .catch((err) => {
        console.log(err);
        // Assuming user cancelled login
        this.setState({ loading: false });
      });
  }

  addUser = (accessToken) => {
    auth.currentUser.getIdToken()
    .then((idToken) => {
      const config = {
        url: Config.REACT_APP_DEV_ADDUSER,
        payload: qs.stringify({ idToken, OAuthToken: accessToken }),
      };

      // send idToken and accessToken for server-side authentication and Google calendar creation
      axios.post(config.url, config.payload)
        .then((response) => {
          if (response.data.uniqueUserId) {
            this.loginReturningUser(idToken, response.data.uniqueUserId);
          } else {
            const uid = auth.currentUser.uid;
            this.linkBank(idToken, uid);
          }
        })
        .catch(error => console.log(error));
    })
    .catch(err => console.log(89, err));
  }

  loginReturningUser = (userIdToken, uniqueUserId) => {
    store.dispatch({
      type: 'LOG_IN',
      uniqueUserId,
      userIdToken,
    });

    this.navigateToHome();
  }

  linkBank = (userIdToken, uniqueUserId) => {
    store.dispatch({
      type: 'LOG_IN',
      uniqueUserId,
      firstTimeUser: true,
      userIdToken,
    });

    this.navigateToPlaid();
  }

  navigateToHome = () => {
    this.props.navigation.navigate('Home');
  }

  navigateToPlaid = () => {
    this.props.navigation.navigate('Plaid');
  }

  render() {
    if (this.state.loading) {
      return (
        <Spinner message="Signing in with Google" />
      );
    }
    
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{'Where\'s My Money?'}</Text>
        <Icon.Button name="google" backgroundColor="#DD4B39" onPress={this.handleLogin}>
          <Text style={{ fontFamily: 'Arial', fontSize: 15, color: 'white' }}>Login with Google</Text>
        </Icon.Button>
      </View>
    );
  }
}
