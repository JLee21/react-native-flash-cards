import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import reducer from './reducers'
import middleware from './middleware'
import { fetchDecks } from './utils/api'
import { receiveDecks } from './actions'
import DeckList from './components/DeckList'

const store = createStore(reducer, middleware)

const Dashboard = () => (
  <View style={styles.container}>
    <Text>This is the Dasasdfhboard</Text>
  </View>
);

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: Dashboard,
    tabBarOptions: {
      activeTintColor: '#e91e63',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: 'blue',
      },
    },
    navigationOptions: {
      tabBarLabel: 'Add Entry',
    },
  }
})

const MainStack = createStackNavigator({
  Home: {
    screen: DeckList,
  }
})

export default class App extends React.Component {

  // componentDidMount () {
  //   const { dispatch } = this.props
  //
  //   fetchDecks()
  //     .then((decks) => dispatch(receiveDecks(decks)))
  // }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <DeckList />
          <MainStack />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
