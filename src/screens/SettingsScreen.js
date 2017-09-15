import React from 'react';
import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';

export default class SettingsScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  render() {
    return (
      <Container>
      <Header />
      <Content>
        <List>
          <ListItem icon>
            <Left>
              <Icon name="plane" />
            </Left>
            <Body>
              <Text>Airplane Mode</Text>
            </Body>
            <Right>
              <Switch value={false} />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Icon name="wifi" />
            </Left>
            <Body>
              <Text>Wi-Fi</Text>
            </Body>
            <Right>
              <Text>GeekyAnts</Text>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Icon name="bluetooth" />
            </Left>
            <Body>
              <Text>Bluetooth</Text>
            </Body>
            <Right>
              <Text>On</Text>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        </List>
      </Content>
      </Container>
    );
  }
}
