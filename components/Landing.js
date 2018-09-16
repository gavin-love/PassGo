import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Image } from 'react-native';
import { auth, firebase } from '../firebase';
import Geolocation from 'react-native-geolocation-service';
import CompaniesContainer from './CompaniesContainer';
// import PropTypes from 'prop-types';


class Landing extends Component {
  constructor() {
    super()
    this.state = {
      password: '',
      email: '',
      user_id: null,
      isLoading: false,
      loggedIn: false,
      pressStatus: false,
      companies: []
    }
  }

  _onHideUnderlay() {
    this.setState({ pressStatus: false });
  }

  _onShowUnderlay() {
    this.setState({ pressStatus: true });
  }

  static navigationOptions = {
    title: 'Pass Go!'
  }

  fetchUserPoints = () => {
    return fetch('http://localhost:3000/api/v1/users')
  }

  handleSignIn = () => {
    console.log('hello')
    const { email, password } = this.state;
    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(user => this.grabPosition(user.user.uid))
      // .then(user => {
      //   this.setState({
      //     loggedIn: true,
      //     // displayName: user.user.displayName
      //   })
      // })
      .then(() => console.log('Welcome Back!'))
      .catch(error => {
        console.log(error.message)
      })
  }

  sendPositionToBackend = (coords, user_id) => {
    console.log('sent')
    return fetch(`http://localhost:3000/api/v1/users/${user_id}/locations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(coords)
    })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(err => console.log(err.message))
  }

  grabPosition = (user_id) => {
    console.log('here')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log('go fuck yourself ray ray')
        console.log(position)
        this.sendPositionToBackend({ location: { lat: latitude, lng: longitude } }, user_id)
      },
      (error) => {
        console.log(error.message)
      },
      { enableHighAccuracy: true, distanceFilter: 10, maximumAge: 0 }
    )
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/users')
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(err => console.log(err.message))
    firebase.auth
      .onAuthStateChanged(user => {
        if (user) {
          this.setState({
            loggedIn: true,
            userName: user.displayName
          })
          this.grabPosition(user.uid)
        }
      })
  }

  render() {
    const { navigate } = this.props.navigation;
    if (!this.state.loggedIn) {
      return (
        <View style={styles.page}>
          <Image source={require('./passgo1.png')} style={styles.logo}/>
          <View>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput style={styles.textInput} value={this.state.email} onChangeText={(email) => this.setState({ email })} />
            <Text style={styles.inputPassword}>Password</Text>
            <TextInput style={styles.textInput} value={this.state.password} onChangeText={(password) => this.setState({ password })} />
            <View style={styles.submit}>
              <Button title='submit' color="#f3f3f3" onPress={this.handleSignIn} />
            </View>
            <View style={styles.signUp}>
              <Button title="sign up" color="#f3f3f3" onPress={() => {
                navigate('SignUp');
              }} />
            </View>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.page}>
          <Text style={styles.welcome}>{`Welcome ${this.state.userName || ''}!`}</Text>
          <View>
            <CompaniesContainer companies={[{ name: 'SliceWorks', points: 40 }]} navigate={navigate}/>
          </View>
          <View style={styles.signOut}>
            <Button title="Sign Out" color="#f3f3f3" onPress={() => {
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
    alignItems: 'center',
    backgroundColor: '#3383bb',
    height: '100%'
  },
  welcome: {
    color: '#f3f3f3'
  },
  inputTitle: {
    color: '#f3f3f3',
    fontSize: 15,
    marginBottom: 5
  },
  inputPassword: {
    color: '#f3f3f3',
    marginTop: 15,
    fontSize: 15,
    marginBottom: 5
  },
  textInput: {
    height: 40,
    borderColor: '#24445b',
    borderWidth: 1,
    width: 200,
    shadowColor: '#f3f3f3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  submit: {
    borderColor: '#24445b',
    borderWidth: 1,
    height: 40,
    width: 200,
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: 15,
    shadowColor: '#f3f3f3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  signUp: {
    borderColor: '#24445b',
    borderWidth: 1,
    height: 40,
    width: 80,
    borderRadius: 5,
    margin: 5,
    lineHeight: 13,
    marginTop: 60,
    alignSelf: 'center',
    shadowColor: '#f3f3f3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },

  signOut: {
    borderColor: '#24445b',
    borderWidth: 1,
    width: 100,
    marginTop: 10,
    shadowColor: '#f3f3f3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  logo: {
    width: 300,
    height: 300
  }
})

export default Landing;