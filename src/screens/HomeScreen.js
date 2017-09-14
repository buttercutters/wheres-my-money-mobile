import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

import { TabNavigator, TabBarBottom } from 'react-navigation';
import MapScreen from './MapScreen';
import SettingsScreen from './SettingsScreen';
import DashboardScreen from './DashboardScreen';

export default TabNavigator(
  {
    Map: { screen: MapScreen },
    Dashboard: { screen: DashboardScreen },
    Settings: { screen: SettingsScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Map':
            iconName = Platform.OS === 'ios'
              ? `ios-map${focused ? '' : '-outline'}`
              : 'google-maps';
            break;
          case 'Dashboard':
            iconName = Platform.OS === 'ios'
              ? `ios-apps${focused ? '' : '-outline'}`
              : 'view-dashboard';
            break;
          case 'Settings':
            iconName = Platform.OS === 'ios'
              ? `ios-options${focused ? '' : '-outline'}`
              : 'md-options';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  },
);
