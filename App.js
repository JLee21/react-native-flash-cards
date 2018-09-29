import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'
import middleware from './middleware'
import { fetchDecks } from './utils/api'
import { receiveDecks } from './actions'
import DeckList from './components/DeckList'
import DeckView from './components/DeckView'
import DeckNew from './components/DeckNew'

const store = createStore(reducer, composeWithDevTools(middleware))

const Home = ({ navigation }) => (
  <View>
    <Text>This is the Home view</Text>
    <TouchableOpacity onPress={() => navigation.navigate('DeckList')}>
      <Text>Press here for the Dashboard</Text>
    </TouchableOpacity>
  </View>
);

const Dashboard = () => (
  <View style={styles.container}>
    <Text>This is the !!!!!!</Text>
  </View>
);

const Tabs = createBottomTabNavigator({
  Home: {
    screen: DeckList
  },
  DeckNew: {
    screen: DeckNew,
    tabBarOptions: {
      activeTintColor: '#e91e63',
      labelStyle: {
        fontSize: 12,
      }
    },
    navigationOptions: {
      tabBarLabel: 'Create Deck',
    },
  }
})


const MainStack = createStackNavigator(
  {
    Home: {
      screen: Tabs
    },
    DeckList: {
      screen: DeckList
    },
    DeckView: {
      screen: DeckView
    },
})

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainStack />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
});
