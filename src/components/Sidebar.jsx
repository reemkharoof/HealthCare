// // import { NavLink } from "react-router-dom";
// // import {
// //   FaTachometerAlt,
// //   FaUserInjured,
// //   FaCalendarAlt,
// //   FaUserMd,
// //   FaCog,
// //   FaSyringe,
// //   FaPlus,
// //   FaClinicMedical,
// //   FaChartBar,
// //   FaFlask,
// //   FaFileInvoice,
// // } from "react-icons/fa";

// // function Sidebar({ isOpen }) {
// //   return (
// //     <div
// //       className={`
// //         bg-[#0f172a] text-white flex flex-col p-5
// //         transition-all duration-300 ease-in-out
// //         min-h-screen
// //         ${isOpen ? "w-[250px] min-w-[250px]" : "w-0 min-w-0 p-0 opacity-0 overflow-hidden"}`
// //       }
// //     >
// //       {/* LOGO */}
// //       <div className="flex items-center gap-3 mt-5 mb-8">
// //         <div className="w-[35px] h-[35px] rounded-xl bg-[#2563eb] flex items-center justify-center">
// //           <FaPlus className="text-white text-[22px]" />
// //         </div>

// //         <div className="flex flex-col items-start">
// //           <h2 className="text-white text-[22px] leading-none m-0">CarePlus</h2>
// //           <p className="text-[#9fb4e8] text-[15px] mt-1">Hospital System</p>
// //         </div>
// //       </div>

// //       {/* MENU */}
// //       <nav className="flex flex-col gap-1">

// //         <NavLink to="/" className={({ isActive }) =>`
// //           flex items-center gap-3 px-4 py-3 rounded-xl text-[16px] transition-all
// //           ${isActive ? "bg-[#2563eb] text-white" : "text-[#cbd5e1] hover:bg-[#1e293b] hover:text-white hover:translate-x-1"}`
// //         }>
// //           <FaTachometerAlt /> Dashboard
// //         </NavLink>

// //         <NavLink to="/patients" className={({ isActive }) =>`
// //           flex items-center gap-3 px-4 py-3 rounded-xl text-[16px] transition-all
// //           ${isActive ? "bg-[#2563eb] text-white" : "text-[#cbd5e1] hover:bg-[#1e293b] hover:text-white hover:translate-x-1"}`
// //         }>
// //           <FaUserInjured /> Patients
// //         </NavLink>

// //         <NavLink to="/appointments" className={({ isActive }) =>`
// //           flex items-center gap-3 px-4 py-3 rounded-xl text-[16px] transition-all
// //           ${isActive ? "bg-[#2563eb] text-white" : "text-[#cbd5e1] hover:bg-[#1e293b] hover:text-white hover:translate-x-1"}`
// //         }>
// //           <FaCalendarAlt /> Appointments
// //         </NavLink>

// //         <NavLink to="/doctors" className={({ isActive }) =>`
// //           flex items-center gap-3 px-4 py-3 rounded-xl text-[16px] transition-all
// //           ${isActive ? "bg-[#2563eb] text-white" : "text-[#cbd5e1] hover:bg-[#1e293b] hover:text-white hover:translate-x-1"}`
// //         }>
// //           <FaUserMd /> Doctors
// //         </NavLink>

// //         <NavLink to="/clinics" className={({ isActive }) =>`
// //           flex items-center gap-3 px-4 py-3 rounded-xl text-[16px] transition-all
// //           ${isActive ? "bg-[#2563eb] text-white" : "text-[#cbd5e1] hover:bg-[#1e293b] hover:text-white hover:translate-x-1"}`
// //         }>
// //           <FaClinicMedical /> Clinics
// //         </NavLink>

// //         <NavLink to="/invoices" className={({ isActive }) => `
// //           flex items-center gap-3 px-4 py-3 rounded-xl text-[16px] transition-all
// //           ${isActive ? "bg-[#2563eb] text-white" : "text-[#cbd5e1] hover:bg-[#1e293b] hover:text-white hover:translate-x-1"}`
// //         }>
// //           <FaFileInvoice /> Invoices
// //         </NavLink>

// //         <NavLink to="/pharmacy" className={({ isActive }) =>`
// //           flex items-center gap-3 px-4 py-3 rounded-xl text-[16px] transition-all
// //           ${isActive ? "bg-[#2563eb] text-white" : "text-[#cbd5e1] hover:bg-[#1e293b] hover:text-white hover:translate-x-1"}`
// //         }>
// //           <FaSyringe /> Pharmacy
// //         </NavLink>

// //         <NavLink to="/laboratory" className={({ isActive }) =>`
// //           flex items-center gap-3 px-4 py-3 rounded-xl text-[16px] transition-all
// //           ${isActive ? "bg-[#2563eb] text-white" : "text-[#cbd5e1] hover:bg-[#1e293b] hover:text-white hover:translate-x-1"}`
// //         }>
// //           <FaFlask /> Laboratory
// //         </NavLink>

// //         <NavLink to="/reports" className={({ isActive }) =>`flex items-center gap-3 px-4 py-3 rounded-xl text-[16px] transition-all
// //           ${isActive ? "bg-[#2563eb] text-white" : "text-[#cbd5e1] hover:bg-[#1e293b] hover:text-white hover:translate-x-1"}`
// //         }>
// //           <FaChartBar /> Reports
// //         </NavLink>

// //         <NavLink to="/settings" className={({ isActive }) =>`
// //           flex items-center gap-3 px-4 py-3 rounded-xl text-[16px] transition-all
// //           ${isActive ? "bg-[#2563eb] text-white" : "text-[#cbd5e1] hover:bg-[#1e293b] hover:text-white hover:translate-x-1"}`
// //         }>
// //           <FaCog /> Settings
// //         </NavLink>

// //       </nav>
// //     </div>
// //   );
// // }

// // export default Sidebar;



// import { NavLink } from "react-router-dom";
// import {
//   FaTachometerAlt,
//   FaUserInjured,
//   FaCalendarAlt,
//   FaUserMd,
//   FaCog,
//   FaSyringe,
//   FaPlus,
//   FaClinicMedical,
//   FaFlask,
//   FaHistory,
//   FaUsersCog,
// } from "react-icons/fa";

// function Sidebar({ isOpen }) {
//   // كلاس تنسيق الروابط المشترك بالإنكليزي (الحركة لليمين عند الـ Hover)
//   const linkClass = ({ isActive }) => `
//     flex items-center gap-3 px-4 py-3 rounded-xl text-[16px] transition-all duration-200
//     ${isActive 
//       ? "bg-[#2563eb] text-white shadow-md font-medium" 
//       : "text-[#cbd5e1] hover:bg-[#1e293b] hover:text-white hover:translate-x-1"
//     }`
//   ;

//   return (
//     <div
//       className={ `
//         bg-[#0f172a] text-white flex flex-col p-5 h-screen sticky top-0
//         transition-all duration-300 ease-in-out z-50
//         ${isOpen ? "w-[260px] min-w-[260px]" : "w-0 min-w-0 p-0 opacity-0 overflow-hidden"}
//       `}
//     >
//       {/* LOGO */}
//       <div className="flex items-center gap-3 mt-3 mb-8">
//         <div className="w-[38px] h-[38px] rounded-xl bg-[#2563eb] flex items-center justify-center shadow-lg shadow-blue-500/30">
//           <FaPlus className="text-white text-[20px]" />
//         </div>

//         <div className="flex flex-col items-start">
//           <h2 className="text-white text-[20px] font-bold leading-none m-0 tracking-wide">CarePlus</h2>
//           <p className="text-[#9fb4e8] text-[13px] mt-1 font-light">Hospital Management System</p>
//         </div>
//       </div>

//       {/* MENU - Matching Your New Folders Exactly */}
//       <nav className="flex flex-col gap-1.5 overflow-y-auto pl-1">
        
//         {/* Dashboard */}
//         <NavLink to="/dashboard" className={linkClass}>
//           <FaTachometerAlt className="text-[18px]" />
//           <span>Dashboard</span>
//         </NavLink>

//         {/* Facilities Module (facility, department, specialization) */}
//         <NavLink to="/facilities" className={linkClass}>
//           <FaClinicMedical className="text-[18px]" />
//           <span>Facilities</span>
//         </NavLink>

//         {/* Users Module (doctor, pharmacist, lab_staff) */}
//         <NavLink to="/users" className={linkClass}>
//           <FaUsersCog className="text-[18px]" />
//           <span>Users Management</span>
//         </NavLink>

//         {/* Patients Module (patient, chronic diseases, allergies) */}
//         <NavLink to="/patients" className={linkClass}>
//           <FaUserInjured className="text-[18px]" />
//           <span>Patients Records</span>
//         </NavLink>

//         {/* Appointments Module (appointment, doctor_schedule) */}
//         <NavLink to="/appointments" className={linkClass}>
//           <FaCalendarAlt className="text-[18px]" />
//           <span>Appointments</span>
//         </NavLink>

//         {/* Clinical Module (visit, diagnosis) */}
//         <NavLink to="/clinical" className={linkClass}>
//           <FaUserMd className="text-[18px]" />
//           <span>Clinical & Visits</span>
//         </NavLink>

//         {/* Pharmacy Module (prescription, prescription_item, dispensing) */}
//         <NavLink to="/pharmacy" className={linkClass}>
//           <FaSyringe className="text-[18px]" />
//           <span>Pharmacy & Rx</span>
//         </NavLink>

//         {/* Laboratory Module (lab_test, lab_request_item) */}
//         <NavLink to="/laboratory" className={linkClass}>
//           <FaFlask className="text-[18px]" />
//           <span>Laboratory</span>
//         </NavLink>

//         {/* Management Module (audit_log) */}
//         <NavLink to="/management" className={linkClass}>
//           <FaHistory className="text-[18px]" />
//           <span>Audit Logs</span>
//         </NavLink>

//         {/* Divider line before settings */}
//         <hr className="border-gray-800 my-2" />

//         {/* Settings */}
//         <NavLink to="/settings" className={linkClass}>
//           <FaCog className="text-[18px]" />
//           <span>Settings</span>
//         </NavLink>

//       </nav>
//     </div>
//   );
// }

// export default Sidebar;


import { useState } from "react"; // ضفنا الـ useState عشان القائمة المنسدلة
import { NavLink, useLocation } from "react-router-dom"; // ضفنا useLocation عشان نحافظ على إضاءة القائمة إذا كنا جواتها
import {
  FaTachometerAlt,
  FaUserInjured,
  FaCalendarAlt,
  FaUserMd,
  FaCog,
  FaSyringe,
  FaPlus,
  FaClinicMedical,
  FaFlask,
  FaHistory,
  FaUsersCog,
  FaChevronDown, // أيقونة السهم الصغير للقائمة
  FaSitemap,     // أيقونة فخمة للأقسام
  FaGraduationCap // أيقونة للتخصصات
} from "react-icons/fa";

function Sidebar({ isOpen }) {
  // متغير حالة لفتح وإغلاق قائمة الهيكل الطبي المنسدلة
  const [showMedical, setShowMedical] = useState(false);
  const location = useLocation();

  // كلاس تنسيق الروابط المشترك بالإنكليزي (الحركة لليمين عند الـ Hover)
  const linkClass = ({ isActive }) => `
    flex items-center gap-3 px-4 py-3 rounded-xl text-[16px] transition-all duration-200
    ${isActive 
      ? "bg-[#2563eb] text-white shadow-md font-medium" 
      : "text-[#cbd5e1] hover:bg-[#1e293b] hover:text-white hover:translate-x-1"
    }`
  ;

  // فحص إذا كان الرابط الحالي هو الأقسام أو التخصصات عشان نضوي الزر الرئيسي
  const isMedicalActive = location.pathname === "/departments" || location.pathname === "/specialties";

  return (
    <div
      className={ `
        bg-[#0f172a] text-white flex flex-col p-5 h-screen sticky top-0
        transition-all duration-300 ease-in-out z-50
        ${isOpen ? "w-[260px] min-w-[260px]" : "w-0 min-w-0 p-0 opacity-0 overflow-hidden"}
      `}
    >
      {/* LOGO */}
      <div className="flex items-center gap-3 mt-3 mb-8">
        <div className="w-[38px] h-[38px] rounded-xl bg-[#2563eb] flex items-center justify-center shadow-lg shadow-blue-500/30">
          <FaPlus className="text-white text-[20px]" />
        </div>

        <div className="flex flex-col items-start">
          <h2 className="text-white text-[20px] font-bold leading-none m-0 tracking-wide">CarePlus</h2>
          <p className="text-[#9fb4e8] text-[13px] mt-1 font-light">Hospital Management System</p>
        </div>
      </div>

      {/* MENU - Matching Your New Folders Exactly */}
      <nav className="flex flex-col gap-1.5 overflow-y-auto pl-1">
        
        {/* Dashboard */}
        <NavLink to="/dashboard" className={linkClass}>
          <FaTachometerAlt className="text-[18px]" />
          <span>Dashboard</span>
        </NavLink>

        {/* Facilities Module */}
        <NavLink to="/facilities" className={linkClass}>
          <FaClinicMedical className="text-[18px]" />
          <span>Facilities</span>
        </NavLink>

        {/* 👑 القائمة المنسدلة الجديدة: Medical Structure */}
        <div className="flex flex-col gap-1">
          <button 
            onClick={() => setShowMedical(!showMedical)}
            className={`
              flex items-center justify-between px-4 py-3 rounded-xl text-[16px] transition-all duration-200 w-100
              ${isMedicalActive 
                ? "bg-[#1e293b] text-white font-medium border-l-4 border-[#2563eb]" 
                : "text-[#cbd5e1] hover:bg-[#1e293b] hover:text-white"
              }
            `}
          >
            <div className="flex items-center gap-3">
              <FaSitemap className="text-[18px] text-[#9fb4e8]" />
              <span>Medical Structure</span>
            </div>
            {/* سهم يلتف بسلاسة عند الفتح والإغلاق */}
            <FaChevronDown className={`text-[12px] transition-transform duration-300 ${showMedical ? "rotate-180" : ""}`} />
          </button>

          {/* الروابط الفرعية تظهر هون بس لما نكبس على الزر */}
          <div className={`
            flex flex-col gap-1 pl-6 overflow-hidden transition-all duration-300 ease-in-out
            ${showMedical ? "max-h-[110px] opacity-100 mt-1" : "max-h-0 opacity-0"}
          `}>
            {/* رابط الأقسام بالـ s الصح مية مية */}
            <NavLink to="/departments" className={linkClass}>
              <FaSitemap className="text-[14px]" />
              <span className="text-[15px]">Departments</span>
            </NavLink>
           {/* رابط التخصصات */}
            <NavLink to="/specialization" className={linkClass}>
              <FaGraduationCap className="text-[16px]" />
              <span className="text-[15px]">Specialization</span>
            </NavLink>
          </div>
        </div>

        {/* Users Module */}
        <NavLink to="/users" className={linkClass}>
          <FaUsersCog className="text-[18px]" />
          <span>Users Management</span>
        </NavLink>

        {/* Patients Module */}
        <NavLink to="/patients" className={linkClass}>
          <FaUserInjured className="text-[18px]" />
          <span>Patients Records</span>
        </NavLink>

        {/* Appointments Module */}
        <NavLink to="/appointments" className={linkClass}>
          <FaCalendarAlt className="text-[18px]" />
          <span>Appointments</span>
        </NavLink>

        {/* Clinical Module */}
        <NavLink to="/clinical" className={linkClass}>
          <FaUserMd className="text-[18px]" />
          <span>Clinical & Visits</span>
        </NavLink>

        {/* Pharmacy Module */}
        <NavLink to="/pharmacy" className={linkClass}>
          <FaSyringe className="text-[18px]" />
          <span>Pharmacy & Rx</span>
        </NavLink>

      </nav>
    </div>
  );
}

export default Sidebar;






