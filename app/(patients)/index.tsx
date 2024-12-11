import { Card } from "@/components/Card";
import CustomText from "@/components/CustomText";
import { Header } from "@/components/Header";
import Colors from "@/constants/Colors";
import { getPatientsApi } from "@/services/PatientsApi";
import { usePatientsStore } from "@/store/usePatientsStore";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { enrichPatientData, sortPatientsByDate } from "@/utils/utils";
import { EnrichedPatient } from "@/services/types";
import { FAB } from "@/components/FAB";
import { PatientModal } from "@/components/PatientModal";
import Toast from "react-native-toast-message";

export default function PatientsScreen() {
  const { patients, setPatients, createPatient, updatePatient } = usePatientsStore();
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<EnrichedPatient | undefined>();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    getPatients({ signal });
    return () => abortController.abort();
  }, []);

  const getPatients = async ({ signal }: { signal: AbortSignal }) => {
    try {
      setIsLoading(true);
      const fetchedPatients = await getPatientsApi({ signal });
      const enrichedPatients = enrichPatientData(fetchedPatients);
      const sortedPatients = sortPatientsByDate(enrichedPatients);
      setPatients(sortedPatients);
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch patients",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePatient = (patient: EnrichedPatient) => {
    if (selectedPatient) {
      updatePatient(patient, selectedPatient.id);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Patient updated successfully",
      });
    } else {
      createPatient(patient);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Patient created successfully",
      });
    }
    setModalVisible(false);
    setSelectedPatient(undefined);
  };

  const handleEditPatient = (patient: EnrichedPatient) => {
    setSelectedPatient(patient);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Header title="Patients" search={true} searchPlaceholder="Search patients" />
      <View style={styles.resultsContainer}>
        <CustomText style={styles.resultsTitle}>Results</CustomText>
        {isLoading && patients.length === 0 && <Text>Loading...</Text>}
        {!isLoading && patients.length > 0 && (
          <FlatList
            data={patients}
            renderItem={({ item }) => <Card patient={item} onEdit={handleEditPatient} />}
            contentContainerStyle={{ gap: 10 }}
          />
        )}
      </View>

      <FAB
        onPress={() => {
          setSelectedPatient(undefined);
          setModalVisible(true);
        }}
      />

      <PatientModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedPatient(undefined);
        }}
        onSave={handleSavePatient}
        patient={selectedPatient}
      />

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  resultsContainer: {
    padding: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: Colors.white,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
