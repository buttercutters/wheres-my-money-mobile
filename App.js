import React from 'react';
import { StackNavigator } from 'react-navigation';
import PlaidScreen from './src/screens/PlaidScreen';
import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';

export class App extends React.Component {

  // set options for stack navigation
  static navigationOptions = {
    title: 'Log In',
  };

  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  render() {
    return (
      <SignInScreen />
    );
  }
}

// set up navigation
// by default, the first Screen will load when App.js loads
// in this case, it is app
export default StackNavigator({
  SignIn: {
    screen: SignInScreen,
    navigationOptions: {
      headerTintColor: '#007AFF',
    },
  },
  Plaid: {
    screen: PlaidScreen,
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerLeft: null,
      headerTitle: 'Where\'s My Money',
    },
  },
}, App);

// the 2nd parameter App on above is to export this component
