import { Pressable, StyleSheet } from "react-native";
import CustomText from "./CustomText";
import Colors from "@/constants/Colors";

interface FABProps {
  onPress: () => void;
  label?: string;
}

export function FAB({ onPress, label = "+" }: FABProps) {
  return (
    <Pressable style={styles.fab} onPress={onPress}>
      <CustomText style={styles.fabText}>{label}</CustomText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 24,
    color: Colors.white,
    fontWeight: "bold",
  },
});
