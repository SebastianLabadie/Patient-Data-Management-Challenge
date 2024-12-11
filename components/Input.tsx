import Colors from "@/constants/Colors";
import React from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  KeyboardTypeOptions,
  View,
  TextInput,
  Platform,
} from "react-native";
import CustomText from "./CustomText";
type InputType = "text" | "password" | "number";

interface InputProps {
  label?: string;
  type?: InputType;
  placeholder?: string;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
  dateValue?: Date;
  keyboardType?: KeyboardTypeOptions | undefined;
  value?: any;
  defaultValue?: any;
  onChangeText?: (text: string) => void;
  onBlur?: (text: string) => void;
  error?: string;
}
export default function Input({
  style,
  iconRight,
  iconLeft,
  type,
  placeholder,
  label,
  placeholderStyle,
  keyboardType = "default",
  value,
  defaultValue,
  onChangeText,
  onBlur,
  error,
}: InputProps) {
  return (
    <View>
      {label && <CustomText style={styles.label}>{label}</CustomText>}
      {error && <CustomText style={styles.errorText}>{error}</CustomText>}
      <View style={[styles.inputContainer, style]}>
        {iconLeft && <View style={styles.iconContainer}>{iconLeft}</View>}
        <TextInput
          value={value}
          defaultValue={defaultValue}
          onChangeText={onChangeText}
          secureTextEntry={type === "password"}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={Colors.gray}
          cursorColor={Colors.primary}
          onEndEditing={event => {
            if (onBlur) {
              onBlur(event.nativeEvent.text);
            }
          }}
          style={[styles.inputField, placeholderStyle, error && styles.inputError]}
        />
        {iconRight && <View style={styles.iconContainer}>{iconRight}</View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    height: 48,
    paddingHorizontal: 16,
    width: "100%",
    borderRadius: 12,
  },
  inputField: {
    fontFamily: "Inter",
    fontSize: 16,
    lineHeight: Platform.OS === "ios" ? 24 : 20,
    flex: 1,
    height: "100%",
    padding: 0,
    borderWidth: 0,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 4,
    lineHeight: Platform.OS === "ios" ? 24 : 20,
  },
  inputError: {
    borderColor: Colors.error,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
  },
});
