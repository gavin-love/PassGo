import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { auth, firebase } from '../firebase';
import Geolocation from 'react-native-geolocation-service';
// import PropTypes from 'prop-types';


class Landing extends Component {
  constructor() {
    super()
    this.state = {
      password: '',
      email: '',
      isLoading: false,
      loggedIn: false
    }
  }

  static navigationOptions = {
    title: 'Pass Go!'
  }

  fetchUserPoints = () => {
    return fetch('http://localhost:3000/api/v1/users')
  }

  handleSignIn = () => {
    const { email, password } = this.state;
    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({
          loggedIn: true,
          displayName: user.user.displayName
        })
      })
      .then(() => console.log('Welcome Back!'))
      .catch(error => {
        console.log(error.message)
      })
  }

  grabLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
      },
      (error) => {
        console.log(error.message)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 }
    );
  }

  componentDidMount() {
    firebase.auth
      .onAuthStateChanged(user => {
        if (user) {
          this.setState({
            loggedIn: true,
            userName: user.displayName
          })
        }
      })
  }

  render() {
    const { navigate } = this.props.navigation;
    if (!this.state.loggedIn) {
      return (
        <View style={styles.page}>
          <Text style={styles.title}>Log In:</Text>
          <View style={styles.form}>
            <Text>Email</Text>
            <TextInput style={styles.textInput} value={this.state.email} onChangeText={(email) => this.setState({ email })} />
            <Text>Password</Text>
            <TextInput style={styles.textInput} value={this.state.password} onChangeText={(password) => this.setState({ password })} />
            <View style={styles.submit}>
              <Button title='submit' onPress={this.handleSignIn} />
            </View>
            <View style={styles.submit}>
              <Button title="sign up" onPress={() => {
                navigate('SignUp');
              }} />
            </View>
          </View>
          <Button title="get position" onPress={this.grabLocation}/>
        </View>
      )
    } else {
      return (
        <View style={styles.page}>
          <Text>{`Welcome ${this.state.userName}!`}</Text>
          <View style={styles.signOut}>
            <Button title="Sign Out" onPress={() => {
              auth.doSignOut()
                .then(() => this.setState({ loggedIn: false }))
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
  title: {
    margin: 30,
    fontSize: 30
  },
  form: {
    marginTop: 30
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
    borderRadius: 5,
    margin: 5
  },
  signOut: {
    borderColor: 'blue',
    borderWidth: 1,
    width: 100
  }
})

export default Landing;