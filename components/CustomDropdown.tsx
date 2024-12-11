import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Colors from "@/constants/Colors";
import CustomText from "./CustomText";
import { DropdownItem } from "@/services/types";

interface CustomDropdownProps {
  data: DropdownItem[];
  value: string;
  onChange: (item: DropdownItem) => void;
  placeholder?: string;
  error?: string;
  style?: object;
}

export function CustomDropdown({
  data,
  value,
  onChange,
  placeholder = "Select an option",
  error,
  style,
}: CustomDropdownProps) {
  return (
    <View>
      {error && <CustomText style={styles.errorText}>{error}</CustomText>}
      <Dropdown
        style={[styles.dropdown, error && styles.errorBorder, style]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 4,
    backgroundColor: Colors.white,
  },
  placeholderStyle: {
    color: Colors.gray,
    fontSize: 15,
  },
  selectedTextStyle: {
    color: Colors.black,
  },
  errorBorder: {
    borderColor: Colors.error,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginBottom: 6,
  },
});
