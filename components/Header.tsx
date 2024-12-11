import Colors from "@/constants/Colors";
import { StyleSheet, View } from "react-native";
import CustomText from "./CustomText";
import Input from "./Input";
import { Feather } from "@expo/vector-icons";

type HeaderProps = {
  title: string;
  search?: boolean;
  searchPlaceholder?: string;
  rightComponent?: React.ReactNode;
};

export function Header({
  title,
  search = false,
  searchPlaceholder = "Search",
  rightComponent,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <CustomText style={styles.title}>{title}</CustomText>
        {rightComponent}
      </View>
      {search && (
        <Input
          style={styles.search}
          placeholder={searchPlaceholder}
          iconRight={<Feather name="search" size={24} color={Colors.gray2} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.primary,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  search: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
  },
});
