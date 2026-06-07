import { useState } from "react"; // ضفنا الـ useState عشان القائمة المنسدلة
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

  // كلاس تنسيق الروابط المشترك بالإنكليزي (الحركة لليمين عند الـ Hover) باستخدام ألوان التيلويند الموحدة 🎨
  const linkClass = ({ isActive }) => `
    flex items-center gap-3 px-4 py-3 rounded-xl text-[16px] transition-all duration-200
    ${isActive 
      ? "bg-primary text-white shadow-md font-medium" 
      : "text-textLight hover:bg-darkHover hover:text-white hover:translate-x-1"
    }`
  ;

  // فحص إذا كان الرابط الحالي هو الأقسام أو التخصصات عشان نضوي الزر الرئيسي بالـ s الصح مية مية
  const isMedicalActive = location.pathname === "/departments" || location.pathname === "/specialization";

  return (
    <div
      className={ `
        bg-darkBg text-white flex flex-col p-5 h-screen sticky top-0
        transition-all duration-300 ease-in-out z-50
        ${isOpen ? "w-[260px] min-w-[260px]" : "w-0 min-w-0 p-0 opacity-0 overflow-hidden"}
      `}
    >
      {/* LOGO */}
      <div className="flex items-center gap-3 mt-3 mb-8">
        <div className="w-[38px] h-[38px] rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-blue-500/30">
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
                ? "bg-darkHover text-white font-medium border-l-4 border-primary" 
                : "text-textLight hover:bg-darkHover hover:text-white"
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
            {/* رابط الأقسام */}
            <NavLink to="/departments" className={linkClass}>
              <FaSitemap className="text-[14px]" />
              <span className="text-[15px]">Departments</span>
            </NavLink>
           {/* رابط التخصصات المعدل لـ /specialization */}
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