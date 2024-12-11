import { useState } from "react";
import { z } from "zod";
import { EnrichedPatient } from "@/services/types";

type ValidationErrors = {
  [K in keyof EnrichedPatient]?: string;
};

const patientSchema = z.object({
  name: z.string().min(10, "Name is required"),
  age: z.number().min(1, "Age must be positive").max(150, "Invalid age"),
  email: z.string().email("Invalid email address"),
  phone: z.string().refine(value => /^0\d{9}$/.test(value), {
    message: "Invalid phone number format. Must be 10 digits starting with 0",
  }),
  address: z.string().min(10, "Address is required"),
  photo: z.string().optional(),
  avatar: z.string().optional(),
  website: z.string().url("Invalid website URL").optional(),
  gender: z.string().min(1, "Gender is required"),
});

export const usePatientForm = (initialData: Partial<EnrichedPatient>) => {
  const [formData, setFormData] = useState<Partial<EnrichedPatient>>(initialData);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = () => {
    try {
      const validatedData = patientSchema.parse(formData);
      return { isValid: true, data: validatedData as EnrichedPatient };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: ValidationErrors = {};
        error.errors.forEach(err => {
          const path = err.path[0] as keyof EnrichedPatient;
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return { isValid: false, data: null };
    }
  };

  const updateField = (field: keyof EnrichedPatient, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const resetForm = () => {
    setFormData(initialData);
    setErrors({});
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    validateForm,
    updateField,
    resetForm,
  };
};
