export interface Doctor {
  Doctor_id: number; // PK (int8)
  Staff_Id: number;  // FK -> Staff.Staff_Id
}

export type NewDoctor = Omit<Doctor, "Doctor_id">;
export type UpdateDoctor = Partial<NewDoctor>;

// ใช้สำหรับ response ที่ embed Staff มาด้วย
export interface StaffPublic {
  Staff_Id: number;
  Fname: string;
  Lname: string;
  email: string;
  Role: string;
}

export interface DoctorWithStaff {
  Doctor_id: number;
  Staff_Id: number;
  Staff: StaffPublic | null;
}
