import React from 'react';
import { AlertIOS } from 'react-native';
import {
  Container,
  Content,
  ListItem,
  Text,
  Body,
  Right,
  Separator,
  Switch,
  Icon
} from 'native-base';
import { StackNavigator } from 'react-navigation';
import axios from 'axios';
import qs from 'qs';
import store from '../store/userStore';

export default class SettingsScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      test: false,
      uniqueUserId: store.getState().uniqueUserId,
    };
    this.deleteProfile = this.deleteProfile.bind(this);
  }

  
  logout() {
    
  }

  deleteProfileConfirm(){
    AlertIOS.alert(
      'Delete profile',
      'Do you wish to delete the profile?',
      [
        { text: 'Okay', onPress: () => this.deleteProfile(), style: 'cancel' },
        { text: 'Cancel', style: 'cancel' }
      ],
    );
  }

  deleteProfile() {
    const uniqueUserId = this.state.uniqueUserId;
    console.log(uniqueUserId);
    const config = {
      url: 'http://localhost:5000/testproject-6177f/us-central1/deleteUserProfile',
      payload: qs.stringify({ uniqueUserId }),
    };
    axios.post(config.url, config.payload)
      .then(() => {
        AlertIOS.alert(
          'Profile Deleted',
          'Your Where\'s my Money Google Calender and events have been deleted',
          [
            { text: 'Okay', onPress: () => this.navigateToApp(), style: 'cancel' },
          ],
        );
      })
      .catch(error => console.log(error));
  }

  navigateToPlaid() {
    this.props.navigation.navigate('Plaid');
  }

  navigateToApp = () => {
    this.props.navigation.navigate('App');
  }

  render() {
    return (
      <Container>
        <Content>
          <Separator bordered>
            <Text>Linked Accounts</Text>
          </Separator>
          <ListItem last>
            <Body>
              <Text>Chase</Text>
            </Body>
            <Right>
              <Switch value={this.state.test = !(!true)} />
            </Right>
          </ListItem>

          <Separator bordered>
          </Separator>

          <ListItem last>
            <Body>
              <Text>Link new account</Text>
            </Body>
            <Right>
              <Icon onPress={this.navigateToPlaid.bind(this)} name="add" />
            </Right>
          </ListItem>
          
          <Separator bordered>
            <Text>WWM Profile Management.</Text>
          </Separator>

          <ListItem onPress={() => this.deleteProfileConfirm()} last>
            <Body>
              <Text style={{ color: 'red', textAlign: 'center' }}>Delete Your Where's My Money Profile</Text>
            </Body>
          </ListItem>

          <ListItem onPress={() => this.logout()} last>
            <Body>
              <Text style={{ color: 'red', textAlign: 'center' }}>Logout</Text>
            </Body>
          </ListItem>

        </Content>
      </Container>
    );
  }
}
