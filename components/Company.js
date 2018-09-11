import React from 'react';
import { Text, View } from 'react-native';

const Company = ({name, points}) => {
  return (
    <View>
      <Text>{name}</Text>
      <Text>{points}</Text>
    </View>
  )
}

export default Company;