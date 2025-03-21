import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
// import * as yup from "yup";
import { Box, Button, TextField, Typography, Paper, Alert } from "@mui/material";
import { employeeService } from "../../services/employeeService";
import { EmployeeFormData } from "../../types";

// const validationSchema = yup.object({
//   name: yup.string().required("Name is required"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   phoneNumber: yup.string().required("Phone number is required"),
//   cafeId: yup.string().required("Cafe is required"),
//   // Removed validation for gender and cafeName
// });

const EditEmployeePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState<EmployeeFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching employee with ID:", id);

        const response = await employeeService.getById(id!);
        console.log("API Response:", response);

        if (response && typeof response === "object") {
          setInitialValues({
            name: response.name || "",
            emailAddress: response.emailAddress || "",
            phoneNumber: response.phoneNumber || "",
            gender: response.gender || "",
            cafeId: response.cafeName || "",
          });
        } else {
          console.error("Unexpected response format:", response);
          setError("Failed to fetch employee details");
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
        setError("Failed to fetch employee details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const formik = useFormik({
    initialValues: initialValues || {
      name: "",
      emailAddress: "",
      phoneNumber: "",
      gender: "",
      cafeId: "",
      cafeName: "",
    },
   // validationSchema,
    enableReinitialize: true,
    validateOnBlur: false, // Disable validation on blur
    validateOnChange: false, // Disable validation on change
    onSubmit: async (values) => {
      console.log("Form submitted with values:", values);
      try {
        await employeeService.update(id!, {
            ...values,
            gender: values.gender.toLowerCase() as "male" | "female",
            emailAddress: ""
        });
        navigate("/employees");
      } catch (error) {
        console.error("Error updating employee:", error);
        setError("Failed to update employee");
      }
    },
  });

  if (isLoading) {
    return <Box sx={{ p: 3 }}>Loading...</Box>;
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Edit Employee
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            margin="normal"
          />

          <TextField
            fullWidth
            id="emailAddress"
            name="email"
            label="Email"
            value={formik.values.emailAddress}
            onChange={formik.handleChange}
            error={formik.touched.emailAddress && Boolean(formik.errors.emailAddress)}
            helperText={formik.touched.emailAddress && formik.errors.emailAddress}
            margin="normal"
          />

          <TextField
            fullWidth
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            margin="normal"
          />

          <TextField
            fullWidth
            id="gender"
            name="gender"
            label="Gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            id="cafeName"
            name="cafeName"
            label="Cafe Name"
            value={formik.values.cafeId}
            onChange={formik.handleChange}
            margin="normal"
          />

          <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button onClick={() => navigate("/employees")} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Update Employee
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default EditEmployeePage;