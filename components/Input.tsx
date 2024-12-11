import Colors from "@/constants/Colors";
import React from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  KeyboardTypeOptions,
  View,
  Text,
  TextInput,
  Platform,
} from "react-native";
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
  onDateChange?: (date: Date) => void;
  value?: any;
  defaultValue?: any;
  onChangeText?: (text: string) => void;
  onBlur?: (text: string) => void;
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
}: InputProps) {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
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
          style={[styles.inputField, placeholderStyle]}
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
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontFamily: "Inter",
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 4,
    lineHeight: Platform.OS === "ios" ? 24 : 20,
  },
});
