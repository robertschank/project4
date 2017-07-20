var React = require('react-native');
var { StyleSheet } = React;
module.exports = StyleSheet.create({
    "container": {
        "alignItems": "stretch",
        "flex": 1,
        "backgroundColor": "skyblue"
    },
    "camera": {
        "flex": 1
    },
    "cameraContainer": {
        "alignItems": "stretch",
        "flex": 1
    },
    "boardContainer": {
        "flexDirection": "column",
        "justifyContent": "space-between",
        "flex": 1
    },
    "headerView": {
        "backgroundColor": "#817ecc",
        "flexDirection": "row",
        "justifyContent": "space-between"
    },
    "header": {
        "fontSize": 30,
        "paddingTop": 4,
        "paddingBottom": 4,
        "paddingRight": 4,
        "paddingLeft": 4,
        "color": "white"
    },
    "boardView": {
        "backgroundColor": "white"
    },
    "row": {
        "flexDirection": "row",
        "marginTop": 0,
        "marginBottom": 0,
        "marginRight": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingBottom": 0,
        "paddingRight": 0,
        "paddingLeft": 0
    },
    "ListView": {
        "flexGrow": 1
    },
    "messageInput": {
        "backgroundColor": "#e2def4"
    },
    "errorTextStyle": {
        "fontSize": 20,
        "alignSelf": "center",
        "color": "red"
    }
});