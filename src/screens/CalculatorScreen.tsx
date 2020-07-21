import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CalcButton } from './../components/CalcButton';
import { CalcDisplay } from './../components/CalcDisplay';
import { DARK_GRAY, LIGHT_GRAY, ORANGE } from "./../constants/colors"
import { TBinaryOperator, EBinaryOperator } from '../typings/signs';

export const CalculatorScreen = () => {
  const [display, setDisplay] = useState("0");
  const [prevOperator, setPrevOperator] = useState<TBinaryOperator>();
  const [prevDisplay, setPrevDisplay] = useState<string>();
  const [isOperatorPressed, setIsOperatorPressed] = useState(false);
  const [isEqualPressed, setIsEqualPressed] = useState(false);
  const [memory, setMemory] = useState("0");

  const onDigitPress = (digit: string) => {
    setDisplay(prevState => {
      if (prevOperator && isOperatorPressed || isEqualPressed) {
        setIsOperatorPressed(false);
        setPrevDisplay(display);
        setIsEqualPressed(false);
        return digit;
      }

      if (prevState === "0" && digit !== ".") {
        return digit;
      }

      const isFloat = prevState.indexOf(".") !== -1;

      if (prevState.length >= 15 || (digit === "." && isFloat)) {
        return prevState;
      }
      return prevState + digit;
    })
  };

  const onAllClean = () => {
    setDisplay("0");
    setMemory("0");
    setPrevOperator(undefined);
    setPrevDisplay(undefined);
  };

  const onPlusMinusPress = () => {
    if (display[0] === EBinaryOperator.MINUS) {
      setDisplay(prevState => prevState.slice(1, prevState.length));
      return;
    }   
    if (display[0] !== EBinaryOperator.MINUS && display !== "0") {
      setDisplay(prevState => EBinaryOperator.MINUS + prevState);
    }
  };

  const onPercentPress = () => {
    setDisplay(prevState => String(Number(prevState) / 100));
  };

  const isResultFit = (result: number) => {
    if (String(result).length > 15) {
      return result.toExponential(5);
    }
    return String(result);
  }

  const doOperation = (firstOperand: string, secondOperand: string, operator: TBinaryOperator) => {
    switch (operator) {
      case EBinaryOperator.PLUS: {
        const result = Number(firstOperand) + Number(secondOperand);
        return isResultFit(result);
      }
      case EBinaryOperator.MINUS: {
        const result = Number(firstOperand) - Number(secondOperand);
        return isResultFit(result);
      }
      case EBinaryOperator.MULTIPLY: {
        const result = Number(firstOperand) * Number(secondOperand);
        return isResultFit(result);
      }
      case EBinaryOperator.DIVIDE: {
        const result = Number(firstOperand) / Number(secondOperand);
        return isResultFit(result);
      }
      default:
        return "0";
    }
  }

  const onBinaryOperatorPress = (operator: TBinaryOperator) => {
    setIsOperatorPressed(true);
    setPrevOperator(operator);
    if (!prevOperator || isOperatorPressed) {
      return;
    }
    if (!prevDisplay) {
      return;
    }
    const result = doOperation(prevDisplay, display, prevOperator);
    setDisplay(result);
  };

  const onEqualPress = () => {
    if (!prevOperator) {
      return;
    }
    if (!prevDisplay) {
      return;
    }
    setIsEqualPressed(true);
    const result = doOperation(prevDisplay, display, prevOperator);
    setDisplay(result);
    setPrevDisplay(undefined);
    setPrevOperator(undefined);
  };

  const onMemoryClearPress = () => {
    setMemory("0");
  }

  const onMemoryReadPress = () => {
    setDisplay(memory);
  }

  const onMemoryBinaryOperatorPress = (operator: TBinaryOperator) => {
    const result = doOperation(memory, display, operator);
    setMemory(result);
  }

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <CalcDisplay display={display} />
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.buttonRow}>
          <CalcButton onPress={onAllClean} title="AC" backgroundColor={LIGHT_GRAY} color="white" />
          <CalcButton onPress={onPlusMinusPress} title="+/-" backgroundColor={LIGHT_GRAY} color="white" />
          <CalcButton onPress={onPercentPress} title="%" backgroundColor={LIGHT_GRAY} color="white" />
          <CalcButton onPress={() => onBinaryOperatorPress(EBinaryOperator.DIVIDE)} title="/" backgroundColor={ORANGE} color="white" />
        </View>

        <View style={styles.buttonRow}>
          <CalcButton onPress={onMemoryClearPress} title="mc" backgroundColor={DARK_GRAY} color="white" />
          <CalcButton onPress={onMemoryReadPress} title="mr" backgroundColor={DARK_GRAY} color="white" />
          <CalcButton onPress={() => onMemoryBinaryOperatorPress(EBinaryOperator.MINUS)} title="m-" backgroundColor={DARK_GRAY} color="white" />
          <CalcButton onPress={() => onMemoryBinaryOperatorPress(EBinaryOperator.PLUS)} title="m+" backgroundColor={ORANGE} color="white" />
        </View>

        <View style={styles.buttonRow}>
          <CalcButton onPress={() => onDigitPress("7")} title="7" backgroundColor={DARK_GRAY} color="white" />
          <CalcButton onPress={() => onDigitPress("8")} title="8" backgroundColor={DARK_GRAY} color="white" />
          <CalcButton onPress={() => onDigitPress("9")} title="9" backgroundColor={DARK_GRAY} color="white" />
          <CalcButton onPress={() => onBinaryOperatorPress(EBinaryOperator.MULTIPLY)} title="x" backgroundColor={ORANGE} color="white" />
        </View>

        <View style={styles.buttonRow}>
          <CalcButton onPress={() => onDigitPress("4")} title="4" backgroundColor={DARK_GRAY} color="white" />
          <CalcButton onPress={() => onDigitPress("5")} title="5" backgroundColor={DARK_GRAY} color="white" />
          <CalcButton onPress={() => onDigitPress("6")} title="6" backgroundColor={DARK_GRAY} color="white" />
          <CalcButton onPress={() => onBinaryOperatorPress(EBinaryOperator.MINUS)} title="-" backgroundColor={ORANGE} color="white" />
        </View>

        <View style={styles.buttonRow}>
          <CalcButton onPress={() => onDigitPress("1")} title="1" backgroundColor={DARK_GRAY} color="white" />
          <CalcButton onPress={() => onDigitPress("2")} title="2" backgroundColor={DARK_GRAY} color="white" />
          <CalcButton onPress={() => onDigitPress("3")} title="3" backgroundColor={DARK_GRAY} color="white" />
          <CalcButton onPress={() => onBinaryOperatorPress(EBinaryOperator.PLUS)} title="+" backgroundColor={ORANGE} color="white" />
        </View>

        <View style={styles.buttonRow}>
          <CalcButton onPress={() => onDigitPress("0")} title="0" backgroundColor={DARK_GRAY} color="white" style={{ flex: 2 }} />
          <CalcButton onPress={() => onDigitPress(".")} title="." backgroundColor={DARK_GRAY} color="white" style={{ marginLeft: 15, marginRight: 15 }} />
          <CalcButton onPress={onEqualPress} title="=" backgroundColor={ORANGE} color="white" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  buttonsContainer: {
    paddingBottom: 20
  },
  displayContainer: {
    flex: 1,
    justifyContent: "flex-end"
  }
});