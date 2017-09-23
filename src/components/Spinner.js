import React, { PropTypes } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const propTypes = {
  message: PropTypes.string,
};

const defaultProps = {
  message: '...loading',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function Spinner(props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={{ color: '#007AFF' }}>{props.message}</Text>
    </View>
  );
}

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

module.exports = Spinner;
