export interface Pharmacist {
  Phar_id: number;  // PK (int8)
  Staff_Id: number; // FK -> Staff.Staff_Id
}

export type NewPharmacist = Omit<Pharmacist, "Phar_id">;
export type UpdatePharmacist = Partial<NewPharmacist>;

// ใช้เวลา response รวม Staff
export interface StaffPublic {
  Staff_Id: number;
  Fname: string;
  Lname: string;
  email: string;
  Role: string;
}
export interface PharmacistWithStaff {
  Phar_id: number;
  Staff_Id: number;
  Staff: StaffPublic | null;
}
