export type Patient = {
  createdAt: string;
  name: string;
  avatar: string;
  description: string;
  website: string;
  id: string;
};

export interface EnrichedPatient extends Patient {
  gender: string;
  age: number;
  address: string;
  phone: string;
  email: string;
  photo?: string;
}
