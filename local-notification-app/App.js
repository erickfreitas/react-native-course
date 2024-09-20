import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Alert, Linking } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
  handleError: (erro) => {
    console.log(erro);
  },
});

export default function App() {
  useEffect(() => {
    //Executa quando uma notificação é recebida
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('Notification received');
        const data = notification.request.content.data;
        console.log(data);
      }
    );

    //Executa quando uma notificação é respondida (clickada pelo usuário)
    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log('Notification response received');

        const data = response.notification.request.content.data;
        console.log(data);
      }
    );

    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  const permissionsHandler = async () => {
    const settings = await Notifications.getPermissionsAsync();

    const isGranted = settings.granted;
    if (isGranted) {
      Alert.alert(
        'Permission has already been granted!',
        'You can receive notifications'
      );
    } else if (!settings.canAskAgain) {
      Alert.alert(
        'Permissions denied',
        'Please enable notifications in your device settings.',
        [
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(),
          },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    } else {
      const request = await Notifications.requestPermissionsAsync();

      if (request.granted) {
        Alert.alert(
          'You have granted permissions',
          'You can now receive notifications'
        );
      } else {
        Alert.alert(
          'You did not grant permissions',
          'You will be unable to receive notifications'
        );
      }
    }
  };

  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Hello, World!',
        body: 'This is a test notification.',
        data: {
          userName: 'Erick',
        },
      },
      trigger: {
        seconds: 1,
      },
    });
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title='Permissions' onPress={permissionsHandler} />
      <Button
        onPress={scheduleNotificationHandler}
        title='Schedule Notification'
      />
      <StatusBar style='auto' />
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
});
