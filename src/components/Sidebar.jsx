import { useState } from "react"; 
import { NavLink, useLocation } from "react-router-dom"; 
import {
  FaTachometerAlt,
  FaUserInjured,
  FaCalendarAlt,
  FaUserMd,
  FaCog,
  FaSyringe,
  FaPlus,
  FaClinicMedical,
  FaUsersCog,
  FaChevronDown, 
  FaSitemap,     
  FaGraduationCap,
  FaUserCircle // الأيقونة الصحيحة للملف الشخصي لمنع الصفحة البيضاء
} from "react-icons/fa";

function Sidebar({ isOpen }) {
  // حالات التحكم بالقوائم المنسدلة المفتوحة
  const [showMedical, setShowMedical] = useState(false);
  const [showUsers, setShowUsers] = useState(false); 
  const location = useLocation();

  // تنسيق الروابط المشترك مع تأثير الحركة الخفيفة عند المرور بالماوس
  const linkClass = ({ isActive }) => `
    flex items-center gap-3 px-4 py-3 rounded-xl text-[16px] transition-all duration-200
    ${isActive 
      ? "bg-primary text-white shadow-md font-medium" 
      : "text-textLight hover:bg-darkHover hover:text-white hover:translate-x-1"
    }`
  ;

  // فحص روابط القوائم المنسدلة لإضاءة الزر الرئيسي عند تفعيل أي رابط فرعي
  const isMedicalActive = location.pathname === "/departments" || location.pathname === "/specialization";
  const isUsersActive = location.pathname === "/doctors" || location.pathname === "/patients" || location.pathname === "/profile";

  return (
    <div
      className={`
        bg-darkBg text-white flex flex-col p-5 h-screen sticky top-0
        transition-all duration-300 ease-in-out z-50
        ${isOpen ? "w-[260px] min-w-[260px]" : "w-0 min-w-0 p-0 opacity-0 overflow-hidden"}
      `}
    >
      {/* الشعار (LOGO) */}
      <div className="flex items-center gap-3 mt-3 mb-8">
        <div className="w-[38px] h-[38px] rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-blue-500/30">
          <FaPlus className="text-white text-[20px]" />
        </div>

        <div className="flex flex-col items-start">
          <h2 className="text-white text-[20px] font-bold leading-none m-0 tracking-wide">CarePlus</h2>
          <p className="text-[#9fb4e8] text-[13px] mt-1 font-light">Hospital Management System</p>
        </div>
      </div>

      {/* القائمة والروابط */}
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

        {/* 1. قائمة: Medical Structure المنسدلة */}
        <div className="flex flex-col gap-1">
          <button 
            onClick={() => setShowMedical(!showMedical)}
            className={`
              flex items-center justify-between px-4 py-3 rounded-xl text-[16px] transition-all duration-200 w-full cursor-pointer
              ${isMedicalActive 
                ? "bg-darkHover text-white font-medium border-l-4 border-primary" 
                : "text-textLight hover:bg-darkHover hover:text-white"
              }
            `}
          >
            <div className="flex items-center gap-3">
              <FaSitemap className="text-[18px] text-[#9fb4e8]" />
              <span>Medical Structure</span>
            </div>
            <FaChevronDown className={`text-[12px] transition-transform duration-300 ${showMedical ? "rotate-180" : ""}`} />
          </button>

          <div className={`
            flex flex-col gap-1 pl-6 overflow-hidden transition-all duration-300 ease-in-out
            ${showMedical ? "max-h-[110px] opacity-100 mt-1" : "max-h-0 opacity-0"}
          `}>
            <NavLink to="/departments" className={linkClass}>
              <FaSitemap className="text-[14px]" />
              <span className="text-[15px]">Departments</span>
            </NavLink>
            <NavLink to="/specialization" className={linkClass}>
              <FaGraduationCap className="text-[16px]" />
              <span className="text-[15px]">Specialization</span>
            </NavLink>
          </div>
        </div>

        {/* 2. قائمة: Users Management المنسدلة والمصححة مفرودة بسطر واحد */}
        <div className="flex flex-col gap-1">
          <button 
            onClick={() => setShowUsers(!showUsers)}
            className={
             ` flex items-center justify-between px-4 py-3 rounded-xl text-[16px] transition-all duration-200 w-full cursor-pointer whitespace-nowrap
              ${isUsersActive 
                ? "bg-darkHover text-white font-medium border-l-4 border-primary" 
                : "text-textLight hover:bg-darkHover hover:text-white"
              }`
            }
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <FaUsersCog className="text-[18px] text-[#9fb4e8] shrink-0" />
              <span className="truncate">Users Management</span>
            </div>
            <FaChevronDown className={`text-[12px] transition-transform duration-300 shrink-0 mr-1 ${showUsers ? "rotate-180" : ""}`} />
          </button>

          {/* الروابط الفرعية الخاصة بمجلد الـ Users المتاح بدون Staff */}
          <div className={
           ` flex flex-col gap-1 pl-6 overflow-hidden transition-all duration-300 ease-in-out
            ${showUsers ? "max-h-[160px] opacity-100 mt-1" : "max-h-0 opacity-0"}`
          }>
            {/* رابط الأطباء */}
            <NavLink to="/doctors" className={linkClass}>
              <FaUserMd className="text-[15px]" />
              <span className="text-[15px]">Doctors</span>
            </NavLink>
            
            {/* رابط المرضى */}
            <NavLink to="/patients" className={linkClass}>
              <FaUserInjured className="text-[15px]" />
              <span className="text-[15px]">Patients</span>
            </NavLink>

            {/* رابط إعدادات الحساب الشخصي */}
            <NavLink to="/profile" className={linkClass}>
              <FaUserCircle className="text-[15px]" />
              <span className="text-[15px]">Profile Setting</span>
            </NavLink>
          </div>
        </div>

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