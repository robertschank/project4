import React, { Component } from 'react'
import { FlatList, Text, StyleSheet, View } from 'react-native'

const rows = [
  { text: 'View'},
  { text: 'Text'},
  { text: 'Image'},
  { text: 'ScrollView'},
  { text: 'ListView'},
]

const extractKey = ({id}) => id

export default class DashList extends Component {
  
  renderItem = ({item}) => {
    return (
      <Text style={styles.row}>
        {item.text}
      </Text>
    )
  }
  
  render() {
    return (
      <View style={{height: 200}}>
        <FlatList
          style={styles.container}
          data={rows}
          renderItem={this.renderItem}
          keyExtractor={extractKey}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'skyblue',
  },
})