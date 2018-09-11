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
      isLoading: false,
      loggedIn: false,
      pressStatus: false
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

  sendPositionToBackend = (coords) => {
    return fetch('http://localhost:3000/users/:user_id/locations', {
      method: 'PUT',
      header: { 'Content-Type': 'application/json' },
      body: JSON.stringify(coords)
    })
    .then(response => response.json())
    .then(result => console.log(result))
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
    // Geolocation.watchPosition(
    //   (position) => {
    //     this.sendPositionToBackend(position);
    //   },
    //   (error) => {
    //     console.log(error.message)
    //   },
    //   { enableHighAccuracy: true, distanceFilter: 10, maximumAge: 0 }
    // )
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
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput style={styles.textInput} value={this.state.password} onChangeText={(password) => this.setState({ password })} />
            <View style={styles.submit}>
              <Button title='submit' color="#f3f3f3" onPress={this.handleSignIn} />
            </View>
            <View style={styles.submit}>
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
          <Text>{`Welcome ${this.state.userName}!`}</Text>
          <View>
            <CompaniesContainer companies={[{ name: 'SliceWorks', points: 40 }]}/>
          </View>
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
    alignItems: 'center',
    backgroundColor: '#3383bb',
    height: 600
  },
  inputTitle: {
    color: '#f3f3f3'
  },
  textInput: {
    height: 40,
    borderColor: '#24445b',
    borderWidth: 1,
    width: 200
  },
  submit: {
    borderColor: '#24445b',
    borderWidth: 1,
    height: 30,
    borderRadius: 5,
    margin: 5,
    lineHeight: 13
  },
  signOut: {
    borderColor: '#24445b',
    borderWidth: 1,
    width: 100
  },
  logo: {
    width: 300,
    height: 300
  }
})

export default Landing;