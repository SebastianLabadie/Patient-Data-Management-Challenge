import { EnrichedPatient } from "@/services/types";
import { useEffect, useState } from "react";
import { Modal, View, StyleSheet, Pressable, Image } from "react-native";
import CustomText from "./CustomText";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Dropdown } from "react-native-element-dropdown";
import { GENDERS } from "@/utils/utils";
import { z } from "zod";
import Input from "./Input";

interface PatientModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (patient: EnrichedPatient) => void;
  patient?: EnrichedPatient;
}

const patientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(1, "Age must be positive").max(150, "Invalid age"),
  email: z.string().email("Invalid email address"),
  phone: z.string().refine(value => /^[+]{1}(?:[0-9-()/.]\s?){6,15}[0-9]{1}$/.test(value), {
    message: "Invalid phone number",
  }),
  address: z.string().min(1, "Address is required"),
  photo: z.string().optional(),
  avatar: z.string().optional(),
  website: z.string().url("Invalid website URL").optional(),
  gender: z.string().min(1, "Gender is required"),
});

type ValidationErrors = {
  [K in keyof EnrichedPatient]?: string;
};

export function PatientModal({ visible, onClose, onSave, patient }: PatientModalProps) {
  const [formData, setFormData] = useState<Partial<EnrichedPatient>>({
    name: "",
    age: 0,
    email: "",
    phone: "",
    address: "",
    photo: "",
    website: "",
    gender: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

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
  }, []);

  const handleSave = () => {
    try {
      const validatedData = patientSchema.parse(formData);
      onSave(validatedData as EnrichedPatient);
      onClose();
    } catch (error) {
      console.log("formData", formData);
      console.log("error", error);
      if (error instanceof z.ZodError) {
        const newErrors: ValidationErrors = {};
        error.errors.forEach(err => {
          const path = err.path[0] as keyof EnrichedPatient;
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
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

          <Input
            style={[styles.input]}
            value={formData.name}
            onChangeText={text => {
              setFormData({ ...formData, name: text });
              setErrors({ ...errors, name: undefined });
            }}
            placeholder="Name"
            error={errors.name}
          />

          <Input
            style={[styles.input]}
            value={formData.age?.toString()}
            onChangeText={text => setFormData({ ...formData, age: Number(text) })}
            placeholder="Age"
            keyboardType="numeric"
            error={errors.age}
          />
          <Input
            style={styles.input}
            value={formData.email}
            onChangeText={text => setFormData({ ...formData, email: text })}
            placeholder="Email"
            keyboardType="email-address"
            error={errors.email}
          />
          <Input
            style={styles.input}
            value={formData.phone}
            onChangeText={text => setFormData({ ...formData, phone: text })}
            placeholder="Phone"
            keyboardType="phone-pad"
            error={errors.phone}
          />
          <Input
            style={styles.input}
            value={formData.address}
            onChangeText={text => setFormData({ ...formData, address: text })}
            placeholder="Address"
            error={errors.address}
          />
          <Input
            style={styles.input}
            value={formData.website}
            onChangeText={text => setFormData({ ...formData, website: text })}
            placeholder="Website"
            keyboardType="url"
            error={errors.website}
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
    paddingHorizontal: 14,
    marginBottom: 10,
    backgroundColor: Colors.white,
    color: Colors.error,
  },
  placeholderStyle: {
    color: Colors.gray,
    fontSize: 15,
    backgroundColor: Colors.white,
  },
  selectedTextStyle: {
    color: Colors.black,
  },
});
