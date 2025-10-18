// src/types/patient.ts
export interface Patient {
  Patient_Id: number;   // int8 (PK)
  Fname: string;        // varchar
  Lname: string;        // varchar
  Age: number;          // int8
  Gender: string;       // varchar
  Phone: string;        // varchar
  Id_Card: string;      // varchar
  Ethnicity: string;    // varchar
}

// ใช้ตอนสร้าง: ไม่ต้องส่ง PK
export type NewPatient = Omit<Patient, "Patient_Id">;

// ใช้ตอนแก้ไข: ทุกฟิลด์ (ยกเว้น PK) เป็น optional
export type UpdatePatient = Partial<NewPatient>;
