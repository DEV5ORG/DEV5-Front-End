import { Image, ImageStyle, StyleSheet } from "react-native";

interface ILogoProps {
  size?: number;
  style?: ImageStyle;
}
const Logo = ({ size, style }: ILogoProps) => {
  return (
    <Image
      source={require("@/assets/images/linko-typography-logo.png")}
      style={[styles.logo, { width: size, height: size }, style]}
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    resizeMode: "contain",
  } as ImageStyle,
});

export default Logo;
