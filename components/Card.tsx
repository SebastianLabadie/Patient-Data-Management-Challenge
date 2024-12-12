import Colors from "@/constants/Colors";
import { EnrichedPatient } from "@/services/types";
import { StyleSheet, View, TouchableOpacity, Image, Pressable } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "./CustomText";

interface CardProps {
  patient: EnrichedPatient;
  onEdit?: (patient: EnrichedPatient) => void;
}

export function Card({ patient, onEdit }: CardProps) {
  const [expanded, setExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.card} onPress={() => onEdit && onEdit(patient)}>
        <View style={styles.mainContent}>
          <Image
            source={{
              uri:
                imageError || !patient.avatar
                  ? "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png"
                  : patient.avatar,
            }}
            onError={() => setImageError(true)}
            style={styles.avatar}
          />
          <View style={styles.info}>
            <CustomText style={styles.name}>{patient.name}</CustomText>
            <CustomText style={styles.details}>{patient.age} years</CustomText>
          </View>
          {onEdit && (
            <TouchableOpacity onPress={() => onEdit(patient)} style={styles.editButton}>
              <Ionicons name="pencil" size={20} color={Colors.gray} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={toggleExpand} style={styles.expandButton}>
            <Ionicons
              name={expanded ? "chevron-up" : "chevron-down"}
              size={24}
              color={Colors.gray}
            />
          </TouchableOpacity>
        </View>
      </Pressable>
      {expanded && (
        <View style={styles.expandedCard}>
          <View style={styles.detailRow}>
            <Ionicons name="mail-outline" size={16} color={Colors.gray} style={styles.detailIcon} />
            <CustomText style={styles.details}>{patient.email}</CustomText>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="call-outline" size={16} color={Colors.gray} style={styles.detailIcon} />
            <CustomText style={styles.details}>{patient.phone}</CustomText>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name="location-outline"
              size={16}
              color={Colors.gray}
              style={styles.detailIcon}
            />
            <CustomText style={styles.details}>{patient.address}</CustomText>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name="globe-outline"
              size={16}
              color={Colors.gray}
              style={styles.detailIcon}
            />
            <CustomText style={styles.details}>{patient.website}</CustomText>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name="person-outline"
              size={16}
              color={Colors.gray}
              style={styles.detailIcon}
            />
            <CustomText style={styles.details}>{patient.gender}</CustomText>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 2,
    marginVertical: 8,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  expandedCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    marginTop: 8,
  },
  mainContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 2,
  },
  expandButton: {
    padding: 4,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  detailIcon: {
    marginRight: 8,
  },
  editButton: {
    padding: 4,
    marginRight: 8,
  },
});
