import { EnrichedPatient } from "@/services/types";
import { useEffect, useState } from "react";
import { Modal, View, StyleSheet, TextInput, Pressable, Image } from "react-native";
import CustomText from "./CustomText";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Dropdown } from "react-native-element-dropdown";
import { GENDERS } from "@/utils/utils";

interface PatientModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (patient: EnrichedPatient) => void;
  patient?: EnrichedPatient;
}

export function PatientModal({ visible, onClose, onSave, patient }: PatientModalProps) {
  const [formData, setFormData] = useState<Partial<EnrichedPatient>>(
    patient || {
      name: "",
      age: 0,
      email: "",
      phone: "",
      address: "",
      photo: "",
      website: "",
      gender: "",
    }
  );

  useEffect(() => {
    console.log("patient", patient);
    if (patient) {
      setFormData(patient);
    } else {
      setFormData({
        name: "",
        age: 0,
        email: "",
        phone: "",
        address: "",
        photo: "",
        website: "",
        gender: "",
      });
    }
  }, [patient]);

  const handleSave = () => {
    onSave(formData as EnrichedPatient);
    onClose();
  };

  const handleSelectPhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({ ...formData, photo: result.assets[0].uri, avatar: result.assets[0].uri });
    }
  };

  function getImageUrl() {
    if (formData.photo) {
      return formData.photo;
    }

    return formData.avatar;
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <CustomText style={styles.modalTitle}>
            {patient ? "Edit Patient" : "Add Patient"}
          </CustomText>

          <View style={styles.photoContainer}>
            <Pressable onPress={handleSelectPhoto}>
              {formData.photo || formData.avatar ? (
                <Image source={{ uri: getImageUrl() }} style={styles.photo} />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <CustomText>Tap to add photo</CustomText>
                </View>
              )}
            </Pressable>
          </View>

          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={text => setFormData({ ...formData, name: text })}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            value={formData.age?.toString()}
            onChangeText={text => setFormData({ ...formData, age: Number(text) })}
            placeholder="Age"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={text => setFormData({ ...formData, email: text })}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            value={formData.phone}
            onChangeText={text => setFormData({ ...formData, phone: text })}
            placeholder="Phone"
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            value={formData.address}
            onChangeText={text => setFormData({ ...formData, address: text })}
            placeholder="Address"
          />
          <TextInput
            style={styles.input}
            value={formData.website}
            onChangeText={text => setFormData({ ...formData, website: text })}
            placeholder="Website"
            keyboardType="url"
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={GENDERS}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Gender"
            value={formData.gender}
            onChange={item => {
              setFormData({ ...formData, gender: item.value });
            }}
          />

          <View style={styles.buttonContainer}>
            <Pressable style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <CustomText style={styles.buttonText}>Cancel</CustomText>
            </Pressable>
            <Pressable style={[styles.button, styles.saveButton]} onPress={handleSave}>
              <CustomText style={styles.buttonText}>Save</CustomText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: Colors.gray,
  },
  saveButton: {
    backgroundColor: Colors.primary,
  },
  buttonText: {
    color: Colors.white,
    textAlign: "center",
  },
  photoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    height: 40,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  placeholderStyle: {
    color: Colors.gray,
    fontSize: 14,
  },
  selectedTextStyle: {
    color: Colors.black,
  },
});
