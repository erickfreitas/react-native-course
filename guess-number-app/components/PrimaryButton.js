import { View, Text, Pressable, StyleSheet } from 'react-native';

function PrimaryButton({ children }) {
  return (
    <Pressable onPress={() => {}} style={styles.button}>
      <View>
        <Text>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#72063c',
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default PrimaryButton;
