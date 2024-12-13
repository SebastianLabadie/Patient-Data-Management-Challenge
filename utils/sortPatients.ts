import { EnrichedPatient } from "@/services/types";

export const sortPatientsByDate = (patients: EnrichedPatient[]): EnrichedPatient[] => {
  return [...patients].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};
