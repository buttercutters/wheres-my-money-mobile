import React from 'react';
import { AlertIOS } from 'react-native';
import {
  Button,
  Container,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Separator,
  Switch,
} from 'native-base';
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

  deleteProfile() {
    const uniqueUserId = this.state.uniqueUserId;
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
            <Text>Delete your WWM Profile</Text>
          </Separator>
          <ListItem last>
            <Text style={{ color: 'red' }} onPress={() => this.deleteProfile()}>Delete Your Where's My Money Profile</Text>
          </ListItem>          
        </Content>
      </Container>
    );
  }
}
