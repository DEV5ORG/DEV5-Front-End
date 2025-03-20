import { Colors } from "@/constants/Colors";
import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

interface IToggleButtonGroupProps {
  options: { label: string; value: string }[];
  selectedValue: string;
  containerStyles?: StyleProp<ViewStyle>;
  onSelect: (value: string) => void;
}

const ToggleButtonGroup = ({
  options,
  selectedValue,
  containerStyles,
  onSelect,
}: IToggleButtonGroupProps) => {
  return (
    <View style={[styles.toggleContainer, containerStyles]}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.toggleButton,
            selectedValue === option.value && styles.selectedButton,
          ]}
          onPress={() => onSelect(option.value)}
        >
          <Text
            style={[
              styles.buttonText,
              selectedValue === option.value && styles.selectedText,
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: "row",
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 13,
    paddingHorizontal: 18,
    backgroundColor: "#f0f0f0",
  },
  selectedButton: {
    backgroundColor: Colors.blueButton,
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  selectedText: {
    color: "#fff",
  },
});

export default ToggleButtonGroup;
