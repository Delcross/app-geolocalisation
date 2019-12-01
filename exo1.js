import React, { useState, useEffect } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';

const FadeInView = (props) => {
  const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0
  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 10000,
      }
    ).start();
  }, [])

  return (
    <Animated.View
      style={{
        ...props.style,
        flex: fadeAnim,         
      }}
    >
      {props.children}
    </Animated.View>
  );
}

// You can then use your `FadeInView` in place of a `View` in your components:
export default () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <FadeInView style={{...styles.allBlock, ...styles.SecondBlock}}>
        <Text style={styles.allText}>Bloc 1</Text>
      </FadeInView>
      <View style={styles.FirstBlock}>
        <Text style={styles.allText}>Test</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  firstBlock: {
    flex: 1,
    backgroundColor: 'blue',
    width: '100%'
  },
  allText: {
    color: 'white',
    textAlign: 'center',
    margin: 10
  },
  allBlock: {
    width: '100%',
    height: '50%'
  },
  SecondBlock: {
    backgroundColor: 'purple'
  }
})