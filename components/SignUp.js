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
      <View style={styles.page}>
          <View>
            <Text style={styles.title}>Enter account info here:</Text>
            <Text>User Name</Text>
            <TextInput name='user-name' value={this.state.userName} onChangeText={(text) => this.setState({ userName: text })} style={styles.textInput} />
            <Text>Email</Text>
            <TextInput name='email' value={this.state.email} onChangeText={(text) => this.setState({ email: text })} style={styles.textInput} />
            <Text>Password</Text>
            <TextInput name='password' value={this.state.password} onChangeText={(text) => this.setState({ password: text })} style={styles.textInput} />
            <View style={styles.submit}>
              <Button title="sign up" onPress={() => {
                this.handleSignUp();
                this.props.navigation.navigate('Home');
              }} />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  page: {
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    width: 200
  },
  textInput: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    width: 200
  },
  submit: {
    justifyContent: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    height: 30,
    borderRadius: 5,
    margin: 10
  }
})

export default SignUp;