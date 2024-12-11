import { EnrichedPatient } from "@/services/types";
import { create } from "zustand";

interface PatientsState {
  patients: EnrichedPatient[];
  setPatients: (patients: EnrichedPatient[]) => void;
  createPatient: (patient: EnrichedPatient) => void;
  updatePatient: (patient: EnrichedPatient, patientId: string) => void;
}

export const usePatientsStore = create<PatientsState>(set => ({
  patients: [],
  setPatients: (patients: EnrichedPatient[]) => set({ patients }),
  createPatient: (patient: EnrichedPatient) =>
    set(state => ({
      patients: [
        {
          ...patient,
          id: String(Date.now()),
          createdAt: new Date().toISOString(),
        },
        ...state.patients,
      ],
    })),
  updatePatient: (patient: EnrichedPatient, patientId: string) =>
    set(state => ({
      patients: state.patients.map(p => (p.id === patientId ? { ...patient, id: patientId } : p)),
    })),
}));
