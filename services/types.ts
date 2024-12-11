interface BasePatient {
  name: string;
  age: number;
  gender: string;
}

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

interface MediaContent {
  photo?: string;
  avatar: string;
}

export interface EnrichedPatient extends BasePatient, ContactInfo, MediaContent {
  id: string;
  website: string;
  createdAt: string;
  description: string;
}
