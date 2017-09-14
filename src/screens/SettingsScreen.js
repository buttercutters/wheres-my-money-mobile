import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default class SettingsScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            { key: 'Chase' },
          ]}
          renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
        />
      </View>
    );
  }
}
