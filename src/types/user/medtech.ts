export interface MedTech {
  MedTech_Id: number; // PK (int8)
  Staff_Id: number;   // FK -> Staff.Staff_Id
}

export type NewMedTech = Omit<MedTech, "MedTech_Id">;
export type UpdateMedTech = Partial<NewMedTech>;

// สำหรับ response ที่ embed Staff มาด้วย
export interface StaffPublic {
  Staff_Id: number;
  Fname: string;
  Lname: string;
  email: string;
  Role: string;
}

export interface MedTechWithStaff {
  MedTech_Id: number;
  Staff_Id: number;
  Staff: StaffPublic | null;
}
