import "./App.css";
import { Container, CssBaseline } from "@mui/material";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CafesPage from "./pages/CafesPage";
import AddCafePage from "./pages/AddCafePage";
import EditCafePage from "./pages/EditCafePage";
import EmployeesPage from "./pages/employee/EmployeesPage";
import AddNewEmployeePage from "./pages/employee/AddNewEmployeePage";
import EditEmployeePage from "./pages/employee/EditEmployeePage";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      {/* <Navbar /> */}
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Routes>
          <Route path="/" element={<CafesPage />} />
          <Route path="/cafes" element={<CafesPage />} />
          <Route path="/cafes/add" element={<AddCafePage />} />
          <Route path="/cafes/edit/:id" element={<EditCafePage />} />
          <Route path="/employees" element={<EmployeesPage />} /> {/* Add this route */}
          <Route path="/employees/add" element={<AddNewEmployeePage />} />
          <Route path="/employees/edit/:id" element={<EditEmployeePage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
