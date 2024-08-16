import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.customText}>Another Text!</Text>
      <Text style={styles.customText}>Hello World!</Text>
      <Button title='Press me' onPress={() => alert('Button pressed')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customText: {
    fontSize: 30,
    color: 'orange',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'orange',
  },
});
