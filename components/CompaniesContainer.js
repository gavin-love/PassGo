import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Company from './Company';

const CompaniesContainer = ({ companies }) => {
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Your Companies:</Text>
    {
      companies.map((company, index) => {
      return <Company name={company.name} key={index} points={company.points} />
     })
    }
    </View>
  )
}

export default CompaniesContainer;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    width: '90%'
  },
  title: {
    color: '#f3f3f3',
    marginBottom: 10,
  }
})