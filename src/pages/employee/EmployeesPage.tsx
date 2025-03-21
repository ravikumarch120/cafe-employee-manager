import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { Button, TextField, Box, Typography, IconButton } from "@mui/material";
import { ColDef } from "ag-grid-community";
import { Employee } from "../../types";
import { employeeService } from "../../services/employeeService";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Delete, Edit } from "@mui/icons-material";

const EmployeesPage: React.FC = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [nameFilter, setNameFilter] = useState("");

  // Define column structure
  const columnDefs: ColDef<Employee>[] = [
    { field: "name", headerName: "Name", flex: 1, sortable: true, filter: true },
    { field: "email", headerName: "Email", flex: 1, sortable: true, filter: true },
    { field: "phoneNumber", headerName: "Phone", flex: 1, sortable: true, filter: true },
    { field: "gender", headerName: "Gender", flex: 0.5, sortable: true, filter: true },
    { field: "cafeName", headerName: "Cafe", flex: 1, sortable: true, filter: true },
    { field: "startDate", headerName: "Start Date", flex: 1, sortable: true, filter: true },
   {
         headerName: "Actions",
         width: 160, // Increased width
         pinned: "right", // Pin to right side
         suppressMovable: true, // Prevent column from being moved
         cellRenderer: (params: any) => (
           <Box
             sx={{
               display: "flex",
               gap: 1,
               justifyContent: "center", // Center the buttons
               width: "100%", // Take full width of cell
               padding: "0 8px", // Add some padding
             }}
           >
             <IconButton
               size="small"
               color="primary"
               onClick={() => navigate(`/Employees/edit/${params.data.id}`)}
             >
               <Edit fontSize="small" />
             </IconButton>
             <IconButton
               size="small"
               color="error"
               onClick={() => handleDelete(params.data.id)}
             >
               <Delete fontSize="small" />
             </IconButton>
           </Box>
         ),
         suppressSizeToFit: true,
       },
];

  const defaultColDef = {
    resizable: true,
  };

  useEffect(() => {
    fetchEmployees();
  }, []);


  
  // Fetch and map employees
  const fetchEmployees = async () => {
    try {
      const response = await employeeService.getAll();
      console.log("Response from employeeService.getAll:", response); // Debugging
  
      if (Array.isArray(response)) {
        const mappedEmployees: Employee[] = response.map((emp) => ({
          id: emp.id,
          name: emp.name,
          email: emp.emailAddress, // Mapping emailAddress -> email
          emailAddress: emp.emailAddress, // Include emailAddress
          phoneNumber: emp.phoneNumber,
          gender: emp.gender?.toLowerCase() as "male" | "female" ?? "N/A",
          cafeName: emp.cafeName,
          cafeId: emp.cafeId, // Include cafeId
          startDate: emp.startDate
            ? new Date(emp.startDate).toISOString().split("T")[0]
            : "N/A",
          daysWorked: emp.daysWorked ?? 0,
        }));
  
        console.log("Mapped employees:", mappedEmployees);
        setEmployees(mappedEmployees);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Apply filter by name
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await employeeService.delete(id);
        fetchEmployees(); // Refresh the employee list
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header Section */}
      <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5">Employees</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/employees/add")}>
          Add New Employee
        </Button>
      </Box>

      {/* Filter Input */}
      <Box sx={{ p: 2 }}>
        <TextField
          label="Filter by Name"
          variant="outlined"
          size="small"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          fullWidth
        />
      </Box>

      {/* AG Grid */}
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <div className="ag-theme-material" style={{ height: "100%", width: "100%" }}>
          <AgGridReact
            key={employees.length} // Forces re-render when employees update
            rowData={filteredEmployees}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={10}
            animateRows={true}
            rowSelection="single"
            suppressRowClickSelection={true}
            suppressCellFocus={true}
          />
        </div>
      </Box>
    </Box>
  );
};

export default EmployeesPage;
