import React, { Component } from 'react'
import { TextInput, StyleSheet } from 'react-native'

class Sinput extends Component {

  state = {
    text: '',
  }

  onChangeText = (text) => this.setState({text: text})

  onSubmit = () => {
    const {onSubmitEditing} = this.props
    const {text} = this.state

    if (!text) return // Don't submit if empty

    onSubmitEditing(text)
    this.setState({text: ''})
  }

  render() {
    const {placeholder} = this.props
    const {text} = this.state

    return (
      <TextInput
        style={styles.input}
        value={text}
        placeholder={placeholder}
        onChangeText={this.onChangeText}
        onSubmitEditing={this.onSubmit}
      />
    )
  }
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    height: 50,
  },
})

export {Sinput};