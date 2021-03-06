import React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';
import PropTypes from 'prop-types';

const Company = ({name, points, street, state, zipcode, navigate}) => {
  return (
    <View style={styles.card}>
      <View style={styles.boxes}>
        <View style={styles.nameView}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.points}>Points: {points}</Text>
          </View>
          <View style={styles.redeem}>
            <Button color='#3383bb' title="REDEEM" onPress={() => {
              navigate('Coupon');
            }}/>
          </View>
          <View>
            <Text style={styles.address}>{street}</Text>
            <Text style={styles.address}>{state + ', ' + zipcode}</Text>
          </View>
        </View>
        <Image source={require('../sliceworks.png')} style={styles.image}/>
      </View>
    </View>
  );
};

export default Company;

const styles = StyleSheet.create({
  card: {
    borderColor: '#24445b',
    borderWidth: 1,
    maxWidth: '95%'
  },
  nameView: {
    justifyContent: 'space-between',
    margin: 10
  },
  name: {
    fontSize: 20,
    color: '#f3f3f3'
  },
  points: {
    fontSize: 20,
    color: '#f3f3f3'
  },
  address: {
    color: '#f3f3f3',
    fontSize: 15
  },
  redeem: {
    borderColor: '#24445b',
    borderWidth: 1,
    shadowColor: '#f3f3f3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    maxWidth: 400
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
});

Company.propTypes = {
  name: PropTypes.string,
  points: PropTypes.number,
  street: PropTypes.string,
  state: PropTypes.string,
  zipcode: PropTypes.number,
  navigate: PropTypes.func
};