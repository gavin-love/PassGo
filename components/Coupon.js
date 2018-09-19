import React from 'react';
import { Text, View, Button, Image, StyleSheet } from 'react-native';

const Coupon = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>One free slice</Text>
      <Image source={require('../whole-pizza.png')} style={styles.icon}/>
      <Image source={require("../Qr-4.png")} style={styles.image}/>
    </View>
  );
};

export default Coupon;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#3383bb',
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginTop: 40
  },
  icon: {
    width: 200,
    height: 200,
    alignSelf: 'center'
  },
  title: {
    color: '#f3f3f3',
    textAlign: 'center',
    margin: 15,
    fontSize: 30
  }
});