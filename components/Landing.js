import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Image } from 'react-native';
import { auth, firebase } from '../firebase';
import CompaniesContainer from './CompaniesContainer';
import { PermissionsAndroid } from 'react-native';
import PropTypes from 'prop-types';

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      email: '',
      user_id: null,
      isLoading: false,
      loggedIn: false,
      pressStatus: false,
      companies: []
    };
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

  fetchUserPoints = (user_id) => {
    fetch('https://pass-go.herokuapp.com/api/v1/users')
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log(error.message));
  }

  handleSignIn = () => {
    const { email, password } = this.state;
    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(user => {
        this.grabPosition(user.user.uid);
        return user;
      })
      .then(user => {
        this.setState({
          loggedIn: true,
          displayName: user.user.displayName,
          password: '',
          email: ''
        });
      })
      .then(() => console.log('Welcome Back!'))
      .catch(error => {
        console.log(error.message);
      });
  }

  sendPositionToBackend = (coords, user_id) => {
    return fetch(`https://pass-go.herokuapp.com/api/v1/users/${user_id}/locations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(coords)
    })
      .then(response => response.json())
      .then(result => {
        this.setState({ companies: result.companies });
      })
      .catch(error => console.log(error.message));
  }

  grabPosition = (user_id) => {
    navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.sendPositionToBackend({ location: { lat: latitude, lng: longitude } }, user_id);
      },
      (error) => {
        console.log(error.message);
      },
      { enableHighAccuracy: true, distanceFilter: 10, maximumAge: 5000 }
    );
  }

  async requestFineLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'gps',
          'message': 'please tell us where you are all the time'
        }
      );
    } catch(err) {
      console.log(err.message);
    }
  }

  async requestCoarseLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          'title': 'gps',
          'message': 'please tell us where you are all the time'
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidMount() {
    firebase.auth
      .onAuthStateChanged(user => {
        if (user) {
          this.requestFineLocationPermission();
          this.requestCoarseLocationPermission();
          this.setState({
            loggedIn: true,
            userName: user.displayName
          });
          
          this.grabPosition(user.uid);
        }
      });
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
              <Button title='submit' color='#3383bb' disabled={false} onPress={this.handleSignIn} />
            </View>
            <View style={styles.signUp}>
              <Button title="sign up" color='#3383bb' disabled={false} onPress={() => {
                navigate('SignUp');
              }} />
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.page}>
          <Text style={styles.welcome}>{`Welcome ${this.state.userName || ''}!`}</Text>
          <View>
            <CompaniesContainer companies={this.state.companies} navigate={navigate}/>
          </View>
          <View style={styles.signOut}>
            <Button title="Sign Out" disabled={false} color='#3383bb' onPress={() => {
              auth.doSignOut()
                .then(() => this.setState({ loggedIn: false }))
                .catch(error => console.log(error.message));
            }} />
          </View>
        </View>
      );
    }
  }
}

export const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    backgroundColor: '#3383bb',
    height: '100%'
  },
  welcome: {
    color: '#f3f3f3',
    fontSize: 25
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
    shadowRadius: 2
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
});

export default Landing;

Landing.propTypes = {
  navigation: PropTypes.object
};