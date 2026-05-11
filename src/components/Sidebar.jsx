import { NavLink } from "react-router-dom";
import "./sidebar.css";

import {
  FaTachometerAlt,
  FaUserInjured,
  FaCalendarAlt,
  FaUserMd,
  FaCog,
  FaSyringe,
  FaPlus,
  FaClinicMedical,
  FaChartBar,
  FaFlask,
  FaFileInvoice,
} from "react-icons/fa";

function Sidebar({isOpen}) {
  return (
    <div className={isOpen?"sidebar":"sidebar close"}>
      <div className="logo-section">
        <div className="logo-circle">
          <FaPlus className="logo-icon" />
        </div>

        <div className="logo-text">
          <h2>CarePlus</h2>
          <p>Hospital System</p>
        </div>
      </div>

      <nav className="menu">
        <NavLink to="/" className={({ isActive }) => (isActive ? "item active" : "item")}>
          <FaTachometerAlt /> Dashboard
        </NavLink>
        <NavLink to="/patients" className={({ isActive }) => (isActive ? "item active" : "item")}>
          <FaUserInjured />
           Patients
        </NavLink>
        <NavLink to="/appointments" className={({ isActive }) => (isActive ? "item active" : "item")}>
          <FaCalendarAlt /> Appointments
        </NavLink>
        <NavLink to="/doctors" className={({ isActive }) => (isActive ? "item active" : "item")}>
          <FaUserMd /> Doctors
        </NavLink>
        <NavLink to="/clinics" className={({ isActive }) => (isActive ? "item active" : "item")}>
          <FaClinicMedical /> Clinics
        </NavLink>
        <NavLink to="/invoices" className={({ isActive }) => (isActive ? "item active" : "item")}>
          <FaFileInvoice /> Invoices
        </NavLink>
        <NavLink to="/pharmacy" className={({ isActive }) => (isActive ? "item active" : "item")}>
          <FaSyringe /> Pharmacy
        </NavLink>
        <NavLink to="/laboratory" className={({ isActive }) => (isActive ? "item active" : "item")}>
          <FaFlask /> Laboratory
        </NavLink>
        <NavLink to="/reports" className={({ isActive }) => (isActive ? "item active" : "item")}>
          <FaChartBar /> Reports
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => (isActive ? "item active" : "item")}>
          <FaCog /> Settings
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
