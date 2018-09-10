import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { auth, firebase } from '../firebase';
// import PropTypes from 'prop-types';


class Landing extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      isLoading: false,
      loggedIn: false
    }
  }

  fetchUserPoints = () => {
    return fetch('http://localhost:3000/api/v1/users')
  }

  handleSignIn = () => {
    const { email, password } = this.state;
      auth()
      .doSignInWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response)
      })
      .then(() => console.log('Welcome Back!'))
      .catch(error => {
        console.log(error.message)
      })
  }

  componentDidMount() {
    firebase.auth
      .onAuthStateChanged(user => {
        if (user) {
          this.setState({
            loggedIn: true,
            userName: user._user.displayName
          })
        }
      })
  }

  render() {
    const { navigate } = this.props.navigation;
    if (!this.state.loggedIn) {
      return (
        <View>
          <Text>Email</Text>
          <TextInput style={styles.textInput} value={this.state.name} onChangeText={(name) => this.setState({ name })} />
          <Text>Password</Text>
          <TextInput style={styles.textInput} value={this.state.email} onChangeText={(email) => this.setState({ email })} />
          <View style={styles.submit}>
            <Button title='submit' onPress={this.handleSignIn} />
          </View>
          <View style={styles.submit}>
            <Button title="sign up" onPress={() => {
              navigate('SignUp');
            }} />
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.page}>
          <Text>{`Welcome ${this.state.userName}!`}</Text>
          <View style={styles.signOut}>
            <Button title="Sign Out" onPress={() => {
              auth().doSignOut()
                .then(() => console.log('You were signed out'))
                .catch(error => console.log(error.message))
            }} />
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  page: {
    alignItems: 'center'
  },
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
  },
  signOut: {
    borderColor: 'blue',
    borderWidth: 1,
    width: 100
  }
})

export default Landing;