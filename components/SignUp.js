import React, { Component } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import { auth } from '../firebase';

class SignUp extends Component {
  constructor() {
    super();
    this.unsubscriber = null;
    this.state = {
      isAuthenticated: false,
      email: '',
      password: '',
      userName: ''
    };
  }

  postNewUser = (user) => {
    return fetch('https://pass-go.herokuapp.com/api/v1/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: { email: user.user.email, name: user.user.displayName } })
    })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log(error.message));
  }

  handleSignUp = () => {
    return auth
      .doCreateUserWithEmailAndPassword(
        this.state.email,
        this.state.password
      )
      .then(user => {
        if (user) {
          return user.user.updateProfile({
            displayName: this.state.userName
          }).then(() => this.postNewUser(user))
        }
      })
      .then(() => {
        this.setState({
          email: '',
          password: '',
          userName: ''
        })
      })
      .catch(error => {
        console.log(error.message)
      });
  }

  render() {
    return (
      <View style={styles.page}>
        <View>
          <Text style={styles.title}>Enter account info here:</Text>
          <Text style={styles.name}>User Name</Text>
          <TextInput name='user-name' value={this.state.userName} onChangeText={(text) => this.setState({ userName: text })} style={styles.textInput} />
          <Text style={styles.email}>Email</Text>
          <TextInput name='email' value={this.state.email} onChangeText={(text) => this.setState({ email: text })} style={styles.textInput} />
          <Text style={styles.password}>Password</Text>
          <TextInput name='password' value={this.state.password} onChangeText={(text) => this.setState({ password: text })} style={styles.textInput} />
          <View style={styles.submit}>
            <Button title="sign up" color="#f3f3f3" onPress={() => {
              this.handleSignUp()
                .then(() => this.props.navigation.navigate('Home'));
            }} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    backgroundColor: '#3383bb',
    height: '100%'
  },
  title: {
    fontSize: 30,
    width: 200,
    color: '#f3f3f3'
  },
  name: {
    color: '#f3f3f3',
    marginTop: 10,
    marginBottom: 5
  },
  email: {
    color: '#f3f3f3',
    marginTop: 10,
    marginBottom: 5
  },
  password: {
    color: '#f3f3f3',
    marginTop: 10,
    marginBottom: 5
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
    height: 40,
    width: 200,
    borderRadius: 5,
    marginTop: 10,
    shadowColor: '#f3f3f3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  }
});

export default SignUp;