import './index.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layouts/Layout";

import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import ForgetPassword from './Pages/Auth/ForgetPassword';

import MedicalRecord from "./Pages/Clinical/MedicalRecord";
import Visit from "./Pages/Clinical/Visit";

import LabRequests from "./Pages/Laboratory/LabRequests";

import AuditLogs from "./Pages/Management/AuditLogs";

import Dispensing from "./Pages/Pharmacy/Dispensing";
import Prescriptions from "./Pages/Pharmacy/Prescriptions";

import Doctors from "./Pages/Users/Doctors";
import Patients from "./Pages/Users/Patients";
import Staff from "./Pages/Users/Staff";
import Facilities from './Pages/Facilities/Facilities';

const DashboardPlaceholder = () => <div className="text-xl font-bold">Welcome to CarePlus Dashboard</div>;
const AppointmentsPlaceholder = () => <div className="text-xl font-bold">Appointments Screen</div>;
const SettingsPlaceholder = () => <div className="text-xl font-bold">Settings Screen</div>;

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPlaceholder />} />

        <Route path="facilities" element={ <Facilities/>} />
        <Route path="users" element={<Staff />} />
        <Route path="patients" element={<Patients />} />
        
        <Route path="appointments" element={<AppointmentsPlaceholder />} />
        
        <Route path="clinical" element={<Visit />} />
        <Route path="medical-record" element={<MedicalRecord />} />
        <Route path="pharmacy" element={<Prescriptions />} />
        <Route path="dispensing" element={<Dispensing />} />

        <Route path="laboratory" element={<LabRequests />} />

        <Route path="management" element={<AuditLogs />} />

        <Route path="settings" element={<SettingsPlaceholder />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;