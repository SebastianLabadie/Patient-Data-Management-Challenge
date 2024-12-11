import axios from "axios";
import { Patient } from "./types";

export async function getPatientsApi({ signal }: { signal: AbortSignal }): Promise<Patient[]> {
  try {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}users`, { signal });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
