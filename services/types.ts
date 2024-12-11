interface BasePatient {
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
}

export interface Patient {
  name: string;
  id: string;
  website: string;
  createdAt: string;
  description: string;
  avatar: string;
}

export interface EnrichedPatient extends BasePatient, ContactInfo, MediaContent, Patient {}

export interface DropdownItem {
  label: string;
  value: string;
}
