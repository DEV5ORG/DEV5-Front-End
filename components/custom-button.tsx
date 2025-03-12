import React from "react";
import { Colors } from "@/constants/Colors";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
  View,
} from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor: string;
  hasBorder?: boolean;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  loadingText?: string;
}

const CustomButton = ({
  title,
  onPress,
  backgroundColor,
  hasBorder = true,
  style: externalStyles,
  loading = false,
  loadingText = "Cargando..",
}: CustomButtonProps) => (
  <TouchableOpacity
    style={[
      styles.button,
      externalStyles,
      { backgroundColor },
      hasBorder && styles.buttonWithBorder,
    ]}
    onPress={onPress}
    disabled={loading}
  >
    {loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={Colors.white} />
        <Text style={styles.buttonText}>{loadingText}</Text>
      </View>
    ) : (
      <Text style={styles.buttonText}>{title}</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.white,
  },
  buttonWithBorder: {
    borderWidth: 1,
    borderColor: Colors.gray,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -12,
    gap: 10,
  },
});

export default CustomButton;
