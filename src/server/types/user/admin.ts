export interface Admin {
  Admin_Id: number;  // PK (int8)
  Staff_Id: number;  // FK -> Staff.Staff_Id
}

export type NewAdmin = Omit<Admin, "Admin_Id">;
export type UpdateAdmin = Partial<NewAdmin>;

// สำหรับ response ที่ embed Staff มาด้วย
export interface StaffPublic {
  Staff_Id: number;
  Fname: string;
  Lname: string;
  email: string;
  Role: string;
}

export interface AdminWithStaff {
  Admin_Id: number;
  Staff_Id: number;
  Staff: StaffPublic | null;
}
