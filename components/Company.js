import React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';

const Company = ({name, points}) => {
  return (
    <View style={styles.card}>
      <View style={styles.boxes}>
        <View style={styles.nameView}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.points}>Points: {points}</Text>
          </View>
          <View style={styles.redeem}>
            <Button color="#f3f3f3" title="REDEEM" onPress={() => {}}/>
          </View>
          <View>
            <Text>Address:123 fakestreet</Text>
            <Text>Denver, CO 80202</Text>
          </View>
        </View>
        <Image source={require('../sliceworks.png')} style={styles.image}/>
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
  nameView: {
    justifyContent: 'space-between',
    margin: 10
  },
  name: {
    fontSize: 30
  },
  points: {
    fontSize: 20
  },
  redeem: {
    borderColor: '#24445b',
    borderWidth: 1
  },
  boxes: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  image: {
    width: 150,
    height: 150,
    margin: 10
  }
})