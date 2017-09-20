import React from 'react';
import { AlertIOS } from 'react-native';
import {
  Body,
  Container,
  Content,
  Icon,
  ListItem,
  Right,
  Separator,
  Switch,
  Text,
} from 'native-base';
import axios from 'axios';
import qs from 'qs';
import store from '../store/userStore';

export default class SettingsScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      switchState: true,
      uniqueUserId: store.getState().uniqueUserId,
      linkedAccounts: [
        { name: 'Chase', tokenId: '31337', active: true },
        { name: 'Bank of America', tokenId: '31337', active: true },
      ],
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
    store.dispatch({ type: 'LOG_OUT' });
    this.navigateToApp();
  }

  deleteInstitutionConfirmation(index) {
    AlertIOS.alert('Unlink Bank', 'Are you sure you want to unlink this bank?', [
      {
        text: 'Yes',
        onPress: () => this.handleSwitchValueChange(index),
        style: 'cancel',
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ],
   );
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
    const uniqueUserId = this.state.uniqueUserId;
    console.log(uniqueUserId);
    const config = {
      url: 'http://localhost:5000/testproject-6177f/us-central1/deleteUserProfile',
      payload: qs.stringify({ uniqueUserId }),
    };
    axios
      .post(config.url, config.payload)
      .then(() => {
        AlertIOS.alert('Profile Deleted', 'Your Where\'s my Money Google Calender and events have been deleted', [
          {
            text: 'Okay',
            onPress: () => this.navigateToApp(),
            style: 'cancel',
          },
        ]);
      })
      .catch(error => console.log(error));
  }

  // Navigation =========
  navigateToPlaid() {
    this
      .props.navigation.navigate('Plaid');
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
          {this.state.linkedAccounts.map((account, index) => {
            return (
              <ListItem last key={ index }>
                <Body>
                  <Text>{account.name}</Text>
                </Body>
                <Right>
                  <Switch 
                    value={this.state.linkedAccounts[index].active}
                    onValueChange={() => this.deleteInstitutionConfirmation(index)}
                  />
                </Right>
              </ListItem>
            );
          })}

          {/* =========================== */}

          <Separator bordered />

          <ListItem last>
            <Body>
              <Text>Link New Bank</Text>
            </Body>
            <Right>
              <Icon
                onPress={this.navigateToPlaid.bind(this)}
                name="add"
              />
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
                  textAlign: 'center',
                }}
              >
                Delete Your Where's My Money Profile
              </Text>
            </Body>
          </ListItem>

          <ListItem onPress={() => this.logout()} last>
            <Body>
              <Text
                style={{
                  color: 'red',
                  textAlign: 'center',
                }}
              >
                Logout
              </Text>
            </Body>
          </ListItem>

        </Content>
      </Container>
    );
  }
}
