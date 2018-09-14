import React from 'react';
import { Text, View, Button, Image, StyleSheet } from 'react-native';

const Coupon = (props) => {
  return (
    <View>
      <Text>One free slice</Text>
      <Image source={require("../pizza-slice.jpg")} style={styles.image}/>
    </View>
  )
}

export default Coupon;

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30
  }
})