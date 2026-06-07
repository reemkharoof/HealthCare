import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard, FaVenusMars, FaShieldAlt, FaLock } from 'react-icons/fa';

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }
  }, []);

  if (!userData) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 bg-dangerRedBg border border-dangerRed/20 rounded-2xl flex flex-col items-center text-center shadow-sm" style={{ direction: 'rtl' }}>
        <div className="w-12 h-12 bg-dangerRedBg text-dangerRed rounded-xl flex items-center justify-center text-xl mb-3 shadow-inner">
          <FaLock />
        </div>
        <h3 className="text-sm font-bold text-textDark mb-1">وصول غير مصرح به</h3>
        <p className="text-xs text-textMuted leading-relaxed">يرجى تسجيل الدخول أولاً لتتمكني من استعراض البيانات الشخصية للملف.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6" style={{ direction: 'rtl' }}>
      
      {/* الرأس الهيدر */}
      <div className="mb-8 border-r-4 border-primary pr-4">
        <h2 className="text-2xl font-bold text-textDark">الملف الشخصي للمريض</h2>
        <p className="text-sm text-textMuted mt-1">استعراض بيانات حسابك المسجلة برقم السجل الموحد.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* الكرت الجانبي */}
        <div className="bg-cardBg border border-cardBorder rounded-2xl p-6 shadow-sm flex flex-col items-center text-center group">
          <div className="w-16 h-16 bg-badgeBlue text-primary border border-primary/10 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-xs mb-4 transition-transform duration-300 group-hover:scale-105">
            {userData.name ? userData.name.charAt(0).toUpperCase() : <FaUser />}
          </div>
          <h3 className="text-sm font-bold text-textDark truncate w-full">{userData.name}</h3>
          <span className="mt-1.5 px-2.5 py-0.5 bg-successGreenBg text-successGreen text-[11px] font-bold rounded-full">حساب نشط</span>
          
          <div className="w-full border-t border-cardBorder my-4"></div>
          
          <div className="flex items-center justify-center gap-1.5 text-xs text-primary bg-authBg px-3 py-2 rounded-xl w-full font-mono border border-cardBorder">
            <FaIdCard className="text-primary/70" /> 
            <span>رقم الملف: #{userData.id}</span>
          </div>
        </div>

        {/* كرت تفاصيل البيانات الأساسية */}
        <div className="md:col-span-2 bg-cardBg border border-cardBorder rounded-2xl p-6 shadow-sm space-y-6">
          <h4 className="text-sm font-bold text-textDark border-b border-cardBorder pb-3 flex items-center gap-2">
            <FaUser className="text-primary" /> البيانات الشخصية الموثقة
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-right">
            <div className="space-y-1.5">
              <span className="text-xs text-textMuted font-medium flex items-center gap-1.5"><FaEnvelope className="text-primary" /> البريد الإلكتروني</span>
              <span className="text-sm font-bold text-textDark block font-mono bg-authBg p-3 rounded-xl border border-cardBorder">{userData.email}</span>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs text-textMuted font-medium flex items-center gap-1.5"><FaPhone className="text-primary" /> رقم التواصل</span>
              <span className="text-sm font-bold text-textDark block font-mono bg-authBg p-3 rounded-xl border border-cardBorder" style={{ direction: 'ltr', textAlign: 'right' }}>{userData.phone || 'غير مضاف'}</span>
            </div>
                  <div className="space-y-1.5">
              <span className="text-xs text-textMuted font-medium flex items-center gap-1.5"><FaVenusMars className="text-primary" /> الجنس</span>
              <span className="text-sm font-bold text-textDark block bg-authBg p-3 rounded-xl border border-cardBorder">{userData.gender === 'female' ? 'أنثى' : 'ذكر'}</span>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs text-textMuted font-medium flex items-center gap-1.5"><FaMapMarkerAlt className="text-primary" /> مكان الإقامة</span>
              <span className="text-sm font-bold text-textDark block bg-authBg p-3 rounded-xl border border-cardBorder">{userData.address || 'غير محدد'}</span>
            </div>
          </div>

          <div className="border-t border-dashed border-cardBorder pt-2"></div>
          <div className="bg-badgeBlue border border-primary/10 rounded-xl p-3.5 text-[11px] text-primary leading-relaxed flex items-start gap-2">
            <FaShieldAlt className="text-primary text-sm mt-0.5 shrink-0" />
            <span>بيانات الجلسة الحالية مؤمنة ومحفوظة بالكامل محلياً داخل المتصفح.</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;