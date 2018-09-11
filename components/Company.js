import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Company = ({name, points}) => {
  return (
    <View style={styles.card}>
      <View style={styles.name}>
        <Text>{name}</Text>
        <Text>Points: {points}</Text>
      </View>
      <View style={styles.address}>
        <Text>Address:123 fakestreet, Denver, CO 80202</Text>
      </View>
    </View>
  )
}

export default Company;

const styles = StyleSheet.create({
  card: {
    borderColor: 'grey',
    borderWidth: 1
  },
  name: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10
  },
  address: {
    margin: 10
  }
})