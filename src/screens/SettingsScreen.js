import React from 'react';
import { AlertIOS } from 'react-native';
import {
  Body,
  Container,
  Content,
  Icon,
  List,
  ListItem,
  Right,
  Separator,
  Switch,
  Text,
} from 'native-base';
import axios from 'axios';
import qs from 'qs';
import store from '../store/userStore';
import Config from '../../config.json';

export default class SettingsScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      switchState: true,
      linkedAccounts: store.getState().institutions,
      userIdToken: store.getState().userIdToken,
    };

    this.deleteProfile = this.deleteProfile.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleSwitchValueChange(index) {
    const linkedAccountsCopy = this.state.linkedAccounts.slice();
    linkedAccountsCopy.splice(index, 1);
    this.setState({ linkedAccounts: linkedAccountsCopy });
  }

  logout() {
    this.clearStore();
    this.navigateToSignIn();
  }

  deleteProfileConfirm() {
    AlertIOS.alert('Delete Profile', 'Do you wish to delete the profile?', [
      {
        text: 'Yes',
        onPress: () => this.deleteProfile(),
        style: 'cancel',
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ],
   );
  }

  deleteProfile() {
    const idToken = this.state.userIdToken;
    const config = {
      url: Config.REACT_APP_LOCAL_DELETEUSERPROFILE,
      payload: qs.stringify({ idToken }),
    };
    axios
      .post(config.url, config.payload)
      .then(() => {
        AlertIOS.alert('Profile Deleted', 'Your Where\'s my Money Google Calender and events have been deleted', [
          {
            text: 'Okay',
            onPress: () => this.navigateToSignIn(),
            style: 'cancel',
          },
        ]);
      })
      .catch(error => console.log(error));

    this.clearStore();
  }

  clearStore = () => {
    store.dispatch({
      type: 'LOG_OUT',
    });
  }

  // Navigation =========
  navigateToPlaid() {
    this
      .props.navigation.navigate('Plaid');
  }

  navigateToSignIn = () => {
    this
      .props
      .navigation
      .navigate('SignIn');
  }
  // Navigation =========

  render() {
    return (
      <Container>
        <Content>
          <Separator bordered>
            <Text>Your Linked Bank</Text>
          </Separator>

          <List>

          {/* -======= Bank List =======- */}
          {this.state.linkedAccounts.map((account, index) => {
            return (
              <ListItem last key={index}>
                <Body>
                  <Text>{account.name}</Text>
                </Body>
                <Right>
                  <Switch
                    value={this.state.linkedAccounts[index].active}
                    onValueChange={() => console.log('switch flicked')}
                  />
                </Right>
              </ListItem>
            );
          })}

          </List>

          <Separator bordered>
            <Text>Options</Text>
          </Separator>

          <ListItem onPress={() => this.logout()} last>
            <Body>
              <Text
                style={{
                  color: 'royalblue',
                  textAlign: 'center',
                }}
              >
                Logout
              </Text>
            </Body>
          </ListItem>

          <Separator bordered>
            <Text>Delete Profile</Text>
          </Separator>


          <ListItem onPress={() => this.deleteProfileConfirm()} last>
            <Body>
              <Text
                style={{
                  color: 'red',
                  textAlign: 'center',
                }}
              >
                Delete Your Where's My Money Profile
              </Text>
            </Body>
          </ListItem>

        </Content>
      </Container>
    );
  }
}
