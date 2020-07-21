import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface ICalcDisplayProps {
  display: string;
}

export const CalcDisplay:React.FC<ICalcDisplayProps> = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.display}>{props.display}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { 
      padding: 20
    },
    display: { 
       fontSize: 70,
       color: "white",
       textAlign: "right"
    },
  });