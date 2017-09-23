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

export default class SettingsScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      switchState: true,
      uniqueUserId: store.getState().uniqueUserId,
      linkedAccounts: [
        { name: 'Chase', active: true },
      ],
    };

    this.deleteProfile = this.deleteProfile.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const config = {
      url: 'http://localhost:5000/testproject-6177f/us-central1/getAllUserInstitutions',
      payload: qs.stringify({
        uniqueUserId: this.state.uniqueUserId,
      }),
    };
    axios.post(config.url, config.payload)
    .then((response) => {
      let accounts;
      accounts = Object.keys(response.data);
      accounts = accounts.filter(bank => bank !== 'null');
      accounts = accounts.map((account) => {
        return { name: account, active: true };
      });
      console.log(50, accounts);
      this.setState({
        linkedAccounts: accounts,
      });
    })
    .catch(error => console.log(error));
  }

  handleSwitchValueChange(index) {
    const linkedAccountsCopy = this.state.linkedAccounts.slice();
    linkedAccountsCopy.splice(index, 1);
    this.setState({ linkedAccounts: linkedAccountsCopy });
  }

  logout() {
    store.dispatch({ type: 'LOG_OUT' });
    this.navigateToSignIn();
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
            onPress: () => this.navigateToSignIn(),
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
            <Text>Linked Banks</Text>
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
                    onValueChange={() => this.deleteInstitutionConfirmation(index)}
                  />
                </Right>
              </ListItem>
            );
          })}

          <ListItem last>
            <Body>
              <Text
                style={{
                  color: 'royalblue',
                }}
              >
                Link New Bank
              </Text>
            </Body>
            <Right>
              <Icon
                onPress={this.navigateToPlaid.bind(this)}
                name="add"
              />
            </Right>
          </ListItem>

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
