import { EnrichedPatient, Patient } from "@/services/types";
import { GENDERS } from "@/constants/patientConstants";

export const enrichPatientData = (patients: Patient[]): EnrichedPatient[] => {
  return patients.map(patient => ({
    ...patient,
    gender: GENDERS[Math.floor(Math.random() * GENDERS.length)].value,
    age: Math.floor(Math.random() * (90 - 18) + 18),
    address: `${Math.floor(Math.random() * 9999)} ${["Main", "Oak", "Maple", "Cedar", "Pine"][Math.floor(Math.random() * 5)]} St`,
    phone: `0${String(Math.floor(Math.random() * 900000000) + 100000000)}`,
    email: `patient${Math.floor(Math.random() * 10000)}@example.com`,
  }));
};
