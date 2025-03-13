import { Colors } from "@/constants/Colors";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  StyleProp,
  ViewStyle,
} from "react-native";

interface CustomTextInputProps {
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  containerStyle: StyleProp<ViewStyle>;
  error?: string;
}

const CustomTextInput = ({
  label,
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
  containerStyle,
  error,
}: CustomTextInputProps) => {
  const borderColor = useState(new Animated.Value(1))[0];

  const handleFocus = () => {
    Animated.timing(borderColor, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    Animated.timing(borderColor, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <Animated.View
        style={[
          styles.shadowWrapper,
          {
            borderColor: borderColor.interpolate({
              inputRange: [0, 1],
              outputRange: [
                error ? Colors.borderError : Colors.borderFocus,
                error ? Colors.borderError : Colors.borderDefault,
              ],
            }),
          },
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.placeholderText}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Animated.View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.labelText,
    marginBottom: 5,
  },
  shadowWrapper: {
    borderRadius: 8,
    backgroundColor: Colors.inputBackground,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
  },
  input: {
    width: "100%",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: Colors.inputBackground,
    color: Colors.inputText,
    textAlignVertical: "center",
  },
  errorText: {
    fontSize: 12,
    color: Colors.error,
    marginTop: 5,
  },
});

export default CustomTextInput;
