const React = require('react-native')
const {StyleSheet} = React
const constants = {
  actionColor: '#24CE84'
};

var styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    backgroundColor: 'skyblue',
  },
  camera: {
    flex: 1,
  },
  cameraContainer: {
    alignItems: 'stretch',
    flex: 1,
  },
  boardContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  headerView: {
    backgroundColor: '#817ecc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 30,
    padding: 4,
    color: 'white'
  },
  boardView: {
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    margin: 0,
    padding: 0,
  },
  ListView: {
    flexGrow:1, // Not sure if this is doing anything
  },  
  messageInput: {
    backgroundColor: 'skyblue',
  },
})

module.exports = styles
module.exports.constants = constants;