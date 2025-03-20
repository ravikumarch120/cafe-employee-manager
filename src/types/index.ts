// src/types/index.ts
export type  Cafe ={
  id: string;
  name: string;
  description: string;
  logo: string;
  location: string;
  employeeCount: number;
}
export interface Employee {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender: "male" | "female";
  cafeId: string;
  startDate: string;
  cafeName?: string;
  daysWorked?: number;
}

export interface CafeFormData {
  name: string;
  description: string;
  location: string;
  logo?: File;
}

export interface EmployeeFormData {
  name: string;
  email: string;
  phoneNumber: string;
  gender: "male" | "female";
  cafeId: string;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface UpdateCafeCommand {
  id?: string; // Optional since it's set by backend
  name: string;
  description: string;
  location: string;
  logo: string;
}
