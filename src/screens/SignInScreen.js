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
    this.login = this.login.bind(this);
  }

  login = () => {
    this.setState({ loading: true });
    // authenticate with Google using expo API
    Google.logInAsync({
      iosClientId: Config.REACT_APP_IOS_CLIENT_ID,
      scopes: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
    })
      .then((result) => {
        if (result.type === 'success') {
          // authenticate locally with firebase
          const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken);
          firebase.auth().signInWithCredential(credential);
        }
        return result.accessToken;
      })
      .then((accessToken) => {
        auth.currentUser.getIdToken()
          .then((idToken) => {
            const config = {
              url: 'http://localhost:5000/testproject-6177f/us-central1/addUser',
              payload: qs.stringify({ idToken, OAuthToken: accessToken }),
            };
            // send idToken and accessToken for server-side authentication and Google calendar creation
            axios.post(config.url, config.payload)
              .then((response) => {
                if (response.data.uniqueUserId) {
                  console.log('signin screen line 71: ', response.data.uniqueUserId);
                  store.dispatch({
                    type: 'LOG_IN',
                    uniqueUserId: response.data.uniqueUserId,
                  });
                  this.navigateToHome();
                } else {
                  const uid = auth.currentUser.uid;
                  store.dispatch({
                    type: 'LOG_IN',
                    uniqueUserId: uid,
                    firstTimeUser: true,
                  });
                  this.navigateToPlaid();
                }
              })
              .catch(error => console.log(error));
          });
      });
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
        <Icon.Button name="google" backgroundColor="#DD4B39" onPress={this.login}>
          <Text style={{ fontFamily: 'Arial', fontSize: 15, color: 'white' }}>Login with Google</Text>
        </Icon.Button>
      </View>
    );
  }
}
