import { StyleSheet, TextProps } from "react-native";
import { Text } from "react-native";

export default function CustomText({ children, style }: TextProps) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Inter",
  },
});
