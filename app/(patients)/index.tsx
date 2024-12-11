import { Card } from "@/components/Card";
import CustomText from "@/components/CustomText";
import { Header } from "@/components/Header";
import Colors from "@/constants/Colors";
import { getPatientsApi } from "@/services/PatientsApi";
import { usePatientsStore } from "@/store/usePatientsStore";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { enrichPatientData, sortPatientsByDate } from "@/utils/utils";
import { EnrichedPatient } from "@/services/types";
import { FAB } from "@/components/FAB";
import { PatientModal } from "@/components/PatientModal";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PatientsScreen() {
  const { patients, setPatients, createPatient, updatePatient } = usePatientsStore();
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<EnrichedPatient | undefined>();
  const [filteredPatients, setFilteredPatients] = useState<EnrichedPatient[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const getPatients = async () => {
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

    getPatients();
    return () => abortController.abort();
  }, [setPatients]);

  useEffect(() => {
    setFilteredPatients(patients);
  }, [patients]);

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

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredPatients(patients);
      return;
    }

    const searchTerm = query.toLowerCase();

    const searchResults = patients.filter(patient => {
      return patient.name.toLowerCase().includes(searchTerm);
    });
    setFilteredPatients(searchResults);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Patients"
        search={true}
        searchPlaceholder="Search patients"
        onSearch={handleSearch}
      />
      <View style={styles.resultsContainer}>
        <CustomText style={styles.resultsTitle}>Results</CustomText>
        {isLoading && patients.length === 0 && (
          <ActivityIndicator size="large" color={Colors.primary} />
        )}
        {!isLoading && patients.length > 0 && (
          <FlatList
            data={filteredPatients}
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

      {modalVisible && (
        <PatientModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
            setSelectedPatient(undefined);
          }}
          onSave={handleSavePatient}
          patient={selectedPatient}
        />
      )}

      <Toast />
    </SafeAreaView>
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
