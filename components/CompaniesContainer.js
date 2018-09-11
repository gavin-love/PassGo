import React from 'react';
import { View, Text } from 'react-native';
import Company from './Company';

const CompaniesContainer = ({ companies }) => {
  return (
    <View>
    {companies.map(company => {
      return <Company name={company.name} points={company.points} />
   })}
    </View>
  )
}

export default CompaniesContainer;