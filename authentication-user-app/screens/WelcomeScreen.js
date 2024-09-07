import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

import { AuthContext } from '../store/auth-context';

function WelcomeScreen() {
  const authCtx = useContext(AuthContext);
  const [message, setMessage] = useState();

  useEffect(() => {
    axios
      .get(
        `https://react-native-course-af1d3-default-rtdb.firebaseio.com/message.json?auth=${authCtx.token}`
      )
      .then((response) => {
        setMessage(response.data);
      });
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{message}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
