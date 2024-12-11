import { EnrichedPatient, Patient } from "@/services/types";

export const GENDERS = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

export const enrichPatientData = (patients: Patient[]): EnrichedPatient[] => {
  return patients.map(patient => ({
    ...patient,
    gender: GENDERS[Math.floor(Math.random() * GENDERS.length)].value,
    age: Math.floor(Math.random() * (90 - 18) + 18),
    address: `${Math.floor(Math.random() * 9999)} ${["Main", "Oak", "Maple", "Cedar", "Pine"][Math.floor(Math.random() * 5)]} St`,
    phone: `(${Math.floor(Math.random() * 900) + 100})-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    email: `patient${Math.floor(Math.random() * 10000)}@example.com`,
  }));
};

export const sortPatientsByDate = (patients: EnrichedPatient[]): EnrichedPatient[] => {
  return [...patients].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};
