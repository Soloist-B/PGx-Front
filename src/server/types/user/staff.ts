export interface Staff {
  Staff_Id: number;
  Fname: string;
  Lname: string;
  Role: string;
  email: string;
  password: string;      // เก็บแบบ hash ใน DB
  Hospital_Name: string; // 👈 เพิ่ม
}

// ใช้เวลา insert (ไม่ต้องมี Staff_Id)
export type NewStaff = Omit<Staff, "Staff_Id">;

// ใช้เวลา update (partial)
export type UpdateStaff = Partial<NewStaff>;

// ใช้เวลา “ส่งกลับ” ออก API (ไม่รวม password)
export type StaffPublic = Omit<Staff, "password">;
