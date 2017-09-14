import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import PlaidScreen from './screens/PlaidScreen';
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export class App extends React.Component {
  // set options for stack navigation
  static navigationOptions = {
    title: 'Welcome',
  };
  constructor() {
    super();
    this.state = {
      loggedIn: false,
    };
  }

  componentWillMount() {
    this.state.loggedIn ? this.navigateToDashboard() : this.navigateToSignIn();
  }

  navigateToDashboard = () => {
    this.props.navigation.navigate('Home');
  }

  navigateToSignIn = () => {
    this.props.navigation.navigate('SignIn');
  }

  render() {
    return (
      <View style={styles.container}>
        {/* TODO: Display a loading icon/splash screen */}
      </View>
    );
  }
}

// set up navigation
// by default, the first Screen will load when App.js loads
// in this case, it is app
export default StackNavigator({
  App: {
    screen: App,
  },
  SignIn: {
    screen: SignInScreen,
  },
  Plaid: {
    screen: PlaidScreen,
  },
  Home: {
    screen: HomeScreen,
  },
}, App);

// the 2nd parameter App on above is to export this component
