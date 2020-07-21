import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface ICalcButtonProps {
  onPress?: () => void;
  title?: string;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
}

export const CalcButton:React.FC<ICalcButtonProps> = props => {
  return (
    <TouchableOpacity 
      onPress={props.onPress} 
      style={[styles.container, {backgroundColor: props.backgroundColor}, { ...props.style }]}>
      <Text style={[styles.text, {color: props.color}]}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { 
    alignItems: "center", 
    justifyContent: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 5,
  },
  text: { 
    fontSize: 30, 
    fontWeight: "bold" 
  },
});