import React, { Component } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import { auth } from '../firebase';

class SignUp extends Component {
  constructor() {
    super()
    this.unsubscriber = null;
    this.state = {
      isAuthenticated: false,
      email: '',
      password: '',
      userName: ''
    }
  }

  postNewUser = (user) => {
    return fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user._user.email })
    })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log(error.message))
  }

  handleSignUp = () => {
    auth
      .doCreateUserWithEmailAndPassword(
        this.state.email,
        this.state.password
      )
      .then(user => {
        if (user) {
          user.user.updateProfile({
            displayName: this.state.userName
          })
          .then(user => {
            return user
          })
        }
      })
      .then(user => this.postNewUser(user))
      .then(() => {
        this.setState({
          email: '',
          password: '',
          userName: ''
        })
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  render() {
    return (
      <View>
        <Text>Sign up for an account here</Text>
        <Text>User Name</Text>
        <TextInput name='user-name' value={this.state.userName} onChangeText={(text) => this.setState({ userName: text })} style={styles.textInput} />
        <Text>Email</Text>
        <TextInput name='email' value={this.state.email} onChangeText={(text) => this.setState({ email: text })} style={styles.textInput} />
        <Text>Password</Text>
        <TextInput name='password' value={this.state.password} onChangeText={(text) => this.setState({ password: text })} style={styles.textInput} />
        <Button title="sign up" onPress={() => {
          this.handleSignUp();
          this.props.navigation.navigate('Home');
        }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    width: 200
  },
  submit: {
    borderColor: 'grey',
    borderWidth: 1,
    height: 30,
    width: 100,
    borderRadius: 5
  }
})

export default SignUp;