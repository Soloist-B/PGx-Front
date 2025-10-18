"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type Patient = {
  idCard: string;
  firstName: string;
  lastName: string;
  sex: string; // ✅ เพิ่ม
  dob: string;
  phone: string; // ✅ เพิ่ม
  ethnicity: string; // ✅ เพิ่ม
  otherEthnicity?: string; // ✅ optional
  gene: string;
  markerValues: Record<string, string>; // ✅ เพิ่ม
  genotype: string;
  phenotype: string;
};

type PatientContextType = {
  patients: Patient[];
  addPatient: (p: Patient) => void;
};

const PatientContext = createContext<PatientContextType | null>(null);

export function PatientProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>([]);

  const addPatient = (p: Patient) => {
    setPatients((prev) => [...prev, p]);
  };

  return (
    <PatientContext.Provider value={{ patients, addPatient }}>
      {children}
    </PatientContext.Provider>
  );
}

export const usePatients = () => {
  const ctx = useContext(PatientContext);
  if (!ctx) throw new Error("usePatients must be used inside PatientProvider");
  return ctx;
};
