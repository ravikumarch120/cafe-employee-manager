import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { employeeService } from "../../services/employeeService";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  gender: yup.string().oneOf(["male", "female"]).required("Gender is required"),
  cafeId: yup.string().required("Cafe is required"),
});

const AddNewEmployeePage: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      gender: "",
      cafeId: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await employeeService.create({
          ...values,
          gender: values.gender.toLowerCase() as "male" | "female" | "Male" | "Female",
          emailAddress: values.email,
        });
        navigate("/employees");
      } catch (error) {
        console.error("Error adding employee:", error);
      }
    },
  });

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Add New Employee
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
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
          />

          <TextField
            fullWidth
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
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
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            helperText={formik.touched.gender && formik.errors.gender}
            margin="normal"
          />

          <TextField
            fullWidth
            id="cafeId"
            name="cafeId"
            label="Cafe ID"
            value={formik.values.cafeId}
            onChange={formik.handleChange}
            error={formik.touched.cafeId && Boolean(formik.errors.cafeId)}
            helperText={formik.touched.cafeId && formik.errors.cafeId}
            margin="normal"
          />

          <Box
            sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}
          >
            <Button onClick={() => navigate("/employees")} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Add Employee
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default AddNewEmployeePage;