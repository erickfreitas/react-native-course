import { View, Text, StyleSheet } from 'react-native';

function Subtitle({ subtitle }) {
  return (
    <View style={styles.subtitleContainer}>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

export default Subtitle;

const styles = StyleSheet.create({
  subtitle: {
    color: '#e2b497',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 16,
  },
  subtitleContainer: {
    borderBottomColor: '#e2b497',
    borderBottomWidth: 2,
    margin: 4,
    marginHorizontal: 12,
    marginVertical: 4,
    padding: 6,
  },
});
