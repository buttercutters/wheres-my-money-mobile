import React from 'react';
import {AlertIOS} from 'react-native';
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
import {StackNavigator} from 'react-navigation';
import axios from 'axios';
import qs from 'qs';
import store from '../store/userStore';

export default class SettingsScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      test: false,
      uniqueUserId: store
        .getState()
        .uniqueUserId,

      randomGeneratorList: [
        'Chase',
        'Bank of America',
        'Wells Fargo',
        'Citi Bank',
        'U.S. Bank',
        'Capital One'
      ],

      linkedAccounts: [
        {
          name: 'Chase',
          tokenId: '31337'
        },
        {
          name: 'Bank of America',
          tokenId: '31337'
        }
      ]
    };
    this.deleteProfile = this
      .deleteProfile
      .bind(this);
    this.logout = this
      .logout
      .bind(this);
  }

  logout() {
    store.dispatch({type: 'LOG_OUT'});
    this.navigateToApp();
  }

  deleteProfileConfirm() {
    AlertIOS.alert('Delete profile', 'Do you wish to delete the profile?', [
      {
        text: 'Okay',
        onPress: () => this.deleteProfile(),
        style: 'cancel'
      }, {
        text: 'Cancel',
        style: 'cancel'
      }
    ],);
  }

  deleteProfile() {
    const uniqueUserId = this.state.uniqueUserId;
    console.log(uniqueUserId);
    const config = {
      url: 'http://localhost:5000/testproject-6177f/us-central1/deleteUserProfile',
      payload: qs.stringify({uniqueUserId})
    };
    axios
      .post(config.url, config.payload)
      .then(() => {
        AlertIOS.alert('Profile Deleted', 'Your Where\'s my Money Google Calender and events have been deleted', [
          {
            text: 'Okay',
            onPress: () => this.navigateToApp(),
            style: 'cancel'
          }
        ],);
      })
      .catch(error => console.log(error));
  }

  // Navigation =========
  navigateToPlaid() {
    this
      .props
      .navigation
      .navigate('Plaid');
  }

  navigateToApp = () => {
    this
      .props
      .navigation
      .navigate('App');
  }
  // Navigation =========

  render() {
    return (
      <Container>
        <Content>
          <Separator bordered>
            <Text>Linked Accounts</Text>
          </Separator>

          {/* -======= Bank List =======- */}
          {this
            .state
            .linkedAccounts
            .map((account) => {
              return (
                <ListItem last key={account.name}>
                  <Body>
                    <Text>{account.name}</Text>
                  </Body>
                  <Right>
                    <Switch />
                  </Right>
                </ListItem>
              );
            })}

          {/* =========================== */}

          <Separator bordered></Separator>

          <ListItem last>
            <Body>
              <Text>Link new account</Text>
            </Body>
            <Right>
              <Icon
                onPress={this
                .navigateToPlaid
                .bind(this)}
                name="add"/>
            </Right>
          </ListItem>

          <Separator bordered>
            <Text>WWM Profile Management.</Text>
          </Separator>

          <ListItem onPress={() => this.deleteProfileConfirm()} last>
            <Body>
              <Text
                style={{
                color: 'red',
                textAlign: 'center'
              }}>Delete Your Where's My Money Profile</Text>
            </Body>
          </ListItem>

          <ListItem onPress={() => this.logout()} last>
            <Body>
              <Text
                style={{
                color: 'red',
                textAlign: 'center'
              }}>Logout</Text>
            </Body>
          </ListItem>

        </Content>
      </Container>
    );
  }
}
