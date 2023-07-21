import { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface BackButtonProps {
  onPress: () => void;
}


const BackButton: FC<BackButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.backButton} onPress={onPress}>
      <Text style={styles.backButtonText}>Back</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 20, // Adjust the position as needed
    left: 20, // Adjust the position as needed
  },
  backButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default BackButton
