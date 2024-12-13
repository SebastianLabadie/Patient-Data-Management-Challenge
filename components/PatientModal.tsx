import { EnrichedPatient } from "@/services/types";
import {
  Modal,
  View,
  StyleSheet,
  Pressable,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import CustomText from "./CustomText";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { GENDERS } from "@/constants/patientConstants";
import Input from "./Input";
import { usePatientForm } from "@/hooks/usePatientForm";
import { CustomDropdown } from "./CustomDropdown";

interface PatientModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (patient: EnrichedPatient) => void;
  patient?: EnrichedPatient;
}

export function PatientModal({ visible, onClose, onSave, patient }: PatientModalProps) {
  const initialData = {
    name: "",
    age: 0,
    email: "",
    phone: "",
    address: "",
    website: "",
    gender: "",
    avatar: "",
  };

  const { formData, errors, validateForm, updateField } = usePatientForm(patient || initialData);

  const handleSave = () => {
    const { isValid, data } = validateForm();
    if (isValid && data) {
      onSave(data);
      onClose();
    }
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
      updateField("avatar", result.assets[0].uri);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <CustomText style={styles.modalTitle}>
              {patient ? "Edit Patient" : "Add Patient"}
            </CustomText>

            <View style={styles.photoContainer}>
              <Pressable onPress={handleSelectPhoto}>
                {formData.avatar ? (
                  <Image source={{ uri: formData.avatar }} style={styles.photo} />
                ) : (
                  <View style={styles.photoPlaceholder}>
                    <CustomText>Tap to add photo</CustomText>
                  </View>
                )}
              </Pressable>
            </View>

            <Input
              style={[styles.input]}
              value={formData.name}
              onChangeText={text => updateField("name", text)}
              placeholder="Name"
              error={errors.name}
            />

            <Input
              style={[styles.input]}
              value={formData.age?.toString()}
              onChangeText={text => updateField("age", Number(text))}
              placeholder="Age"
              keyboardType="numeric"
              error={errors.age}
            />
            <Input
              style={styles.input}
              value={formData.email}
              onChangeText={text => updateField("email", text)}
              placeholder="Email"
              keyboardType="email-address"
              error={errors.email}
            />
            <Input
              style={styles.input}
              value={formData.phone}
              onChangeText={text => updateField("phone", text)}
              placeholder="Phone"
              keyboardType="phone-pad"
              error={errors.phone}
            />
            <Input
              style={styles.input}
              value={formData.address}
              onChangeText={text => updateField("address", text)}
              placeholder="Address"
              error={errors.address}
            />
            <Input
              style={styles.input}
              value={formData.website}
              onChangeText={text => updateField("website", text)}
              placeholder="Website"
              keyboardType="url"
              error={errors.website}
            />
            <CustomDropdown
              data={GENDERS}
              value={formData.gender || ""}
              onChange={item => {
                updateField("gender", item.value);
              }}
              placeholder="Select Gender"
              error={errors.gender}
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
      </TouchableWithoutFeedback>
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
});
