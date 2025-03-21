import { Employee, EmployeeFormData, ApiResponse } from "../types";
import api from "./api";

export const employeeService = {
  getAll: async (): Promise<Employee[]> => {
    try {
      const { data } = await api.get<Employee[]>("/employees/all");
      console.log("API Response in employeeService.getAll:", data); // Debugging
      return data;
    } catch (error) {
      console.error("Error in employeeService.getAll:", error);
      throw error;
    }
  },

  getByCafe: async (cafeId: string): Promise<Employee[]> => {
    const { data } = await api.get<ApiResponse<Employee[]>>(
      `/employees?cafeId=${cafeId}`
    );
    return data.data;
  },
 
  getById: async (id: string): Promise<Employee> => {
    try {
      const { data } = await api.get<ApiResponse<Employee>>(`/employees/${id}`);
      console.log("getById API Response:-->", data);

      // Check if the response has the expected structure
      if (data && data.data) {
        return data.data; // Return the employee object
      } else if (data && typeof data === "object") {
        return data as unknown as Employee; // Handle cases where the API directly returns the employee object
      } else {
        throw new Error("Unexpected API response format");
      }
    } catch (error) {
      console.error("Error in employeeService.getById:", error);
      throw error; // Propagate the error to the caller
    }
  },
 
  
  create: async (employeeData: EmployeeFormData): Promise<Employee> => {
    const { data } = await api.post<ApiResponse<Employee>>(
      "/employees",
      employeeData
    );
    return data.data;
  },

  update: async (
    id: string,
    employeeData: EmployeeFormData
  ): Promise<EmployeeFormData> => {
    console.log("employeeData in update:----->", employeeData);
    const { data } = await api.put<ApiResponse<EmployeeFormData>>(
      `/employees/${id}`,
      employeeData
    );
    return data.data;
  },

  
     
  delete: async (id: string): Promise<void> => {
    console.log("id in delete:----->", id);
    await api.delete(`/employees/${id}`);
  },
};
