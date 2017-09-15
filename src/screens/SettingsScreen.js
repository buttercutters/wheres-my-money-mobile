import React from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Switch
} from 'native-base';


export default class SettingsScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      test: false,
      test1: false,
      test2: false
    };
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem icon>
              <Body>
                <Text>American Express</Text>
              </Body>
              <Right>
                <Switch value={this.state.test = !(!true)}/>
              </Right>
            </ListItem>
            <ListItem icon>
              <Body>
                <Text>Chase</Text>
              </Body>
              <Right>
                <Switch value={this.state.test1}/>
              </Right>
            </ListItem>
            <ListItem icon>
              <Body>
                <Text>Capital One</Text>
              </Body>
              <Right>
                <Switch value={this.state.test2}/>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
