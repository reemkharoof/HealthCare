import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaUserMd, 
  FaUser, 
  FaSpinner, 
  FaExclamationTriangle, 
  FaGraduationCap, 
  FaBriefcase, 
  FaLanguage, 
  FaAward, 
  FaHospital, 
  FaBuilding, 
  FaMapMarkerAlt,
  FaPhone
} from 'react-icons/fa';
import { BsJournalX } from 'react-icons/bs';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب التوكن الشغال تلقائياً من الـ Local Storage
  const getAuthToken = () => {
    let token = localStorage.getItem('token');
    if (!token) {
      token = "2|7Gv2YjC9svZTZpuFiLYzpCWKDimnk0fu5pMkmRMd67707522"; 
    }
    return token;
  };

  // رابط الـ API الخاص بالأطباء
  const API_URL = 'https://app-b4a68046-cc76-405f-b0be-527f1eae5608.cleverapps.io/api/doctors';

  const getDoctorsData = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Accept': 'application/json'
        }
      });
      
      if (response.data && response.data.success) {
        setDoctors(response.data.data);
      } else {
        setDoctors(response.data || []);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('حدث خطأ في جلب بيانات الأطباء، تأكد من الاتصال بالسيرفر!');
      setLoading(false);
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-[60vh] text-[16px] gap-2.5">
      <FaSpinner className="spinner text-primary text-[24px] ml-3" /> 
      <span className="text-textMuted font-medium">جاري تحميل لوحة بيانات الأطباء...</span>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center h-[60vh] text-[16px] gap-2.5">
      <div className="flex items-center px-6 py-4 bg-dangerRedBg text-dangerRed rounded-xl border border-red-200">
        <FaExclamationTriangle className="ml-2.5 text-[22px]" /> {error}
      </div>
    </div>
  );

  return (
    <div className="p-[30px] max-w-[1280px] my-0 mx-auto" style={{ direction: 'rtl' }}>
      
      {/* هيدر الصفحة الفخم */}
      <div className="flex items-center gap-[15px] mb-[35px] border-b border-cardBorder pb-5">
        <div className="w-[56px] h-[56px] bg-badgeBlue rounded-[14px] flex justify-center items-center">
          <FaUserMd className="text-primary text-[28px]" />
        </div>
        <div>
          <h2 className="text-[24px] font-bold text-darkBg m-0">دليل الأطباء والكادر الطبي</h2>
          <p className="text-[14px] text-textMuted mt-1 mx-0 mb-0">إدارة الملفات المهنية للأطباء، المؤهلات العلمية، وتوزيعهم على الأقسام والمنشآت.</p>
        </div>
      </div>

      {/* قائمة عرض كروت الأطباء */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-6">
        {doctors.map((doctor) => {
          const profile = doctor.profile || {};
          const workConfig = doctor.work_configuration || {};
          const specialization = workConfig.specialization || {};
          const facilityDept = workConfig.facility_department || {};
          const facility = facilityDept.facility || {};
          const department = facilityDept.department || {};

          return (
            <div key={doctor.id} className="doctor-card border border-inputBorder rounded-[16px] p-6 shadow-sm bg-cardBg flex flex-col justify-between min-h-[350px]">
              <div>
                {/* الجزء العلوي: الاسم والتخصص الأساسي */}
                <div className="flex justify-between items-start mb-4 pb-4 border-b border-cardBorder">
                  <div className="flex gap-3 items-center">
                    {/* تم استبدال السلايدات بأيقونة مستخدم احترافية وموحدة */}
                  <div className="w-[50px] h-[50px] bg-skyLightBg text-skyPrimary rounded-full flex justify-center items-center text-[20px]">
                      <FaUser />
                    </div>
                    <div>
                      <h3 className="text-[18px] text-darkBg font-bold m-0 leading-tight">
                        {profile.full_name || 'طبيب غير مسمى'}
                      </h3>
                      <span className="text-[13px] text-skyPrimary font-semibold mt-1 inline-block">
                        {specialization.name || 'عام'}
                      </span>
                    </div>
                  </div>
                  <span className="bg-authBg text-textMuted px-2 py-1 rounded-[6px] text-[11px] font-semibold shrink-0">ID: {doctor.id}</span>
                </div>

                {/* تفاصيل العمل والمنشأة الحالية */}
                <div className="grid grid-cols-2 gap-3 mb-4 bg-authBg p-3 rounded-[12px] border border-cardBorder">
                  <div className="flex items-center gap-2 text-[13px] text-textDark">
                    <FaHospital className="text-textMuted shrink-0" />
                    <span className="truncate" title={facility.name}>{facility.name || 'غير محدد'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-textDark">
                    <FaBuilding className="text-textMuted shrink-0" />
                    <span className="truncate" title={department.name}>{department.name || 'غير محدد'}</span>
                  </div>
                </div>

                {/* المعلومات المهنية والعلمية */}
                <div className="flex flex-col gap-2.5 mb-2">
                  <div className="flex items-start gap-2 text-[13px] text-textDark">
                    <FaGraduationCap className="text-primary mt-0.5 shrink-0 text-[15px]" />
                    <p className="m-0 leading-relaxed"><strong className="text-textMuted">المؤهل:</strong> {doctor.qualification}</p>
                  </div>

                  <div className="flex items-center gap-2 text-[13px] text-textDark">
                    <FaBriefcase className="text-primary shrink-0 text-[14px]" />
                    <p className="m-0"><strong className="text-textMuted">سنوات الخبرة:</strong> {doctor.years_of_experience} سنوات</p>
                  </div>

                  <div className="flex items-start gap-2 text-[13px] text-textDark">
                    <FaAward className="text-successGreen mt-0.5 shrink-0 text-[14px]" />
                    <p className="m-0 leading-relaxed"><strong className="text-textMuted">الإنجازات:</strong> {doctor.achievements || 'لا توجد إنجازات مسجلة.'}</p>
                  </div>

                  <div className="flex items-center gap-2 text-[13px] text-textDark">
                    <FaLanguage className="text-warningAmber shrink-0 text-[15px]" />
                    <p className="m-0"><strong className="text-textMuted">اللغات:</strong> {doctor.languages}</p>
                  </div>
                </div>
              </div>

              {/* الجزء السفلي: السيرة الذاتية المختصرة وبيانات الاتصال */}
              <div className="mt-4 pt-4 border-t border-cardBorder">
                <p className="text-textMuted text-[12.5px] italic leading-relaxed mb-3 bg-authBg p-2.5 rounded-[8px]">
                  "{doctor.biography}"
                </p>
                <div className="flex justify-between items-center text-[12px] text-textMuted">
                  <span className="flex items-center gap-1"><FaMapMarkerAlt /> {profile.address || 'سوريا'}</span>
                  <span className="flex items-center gap-1" style={{ direction: 'ltr' }}><FaPhone /> {profile.phone || '-'}</span>
                </div>
              </div>
        </div>
          );
        })}
      </div>
      
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .spinner { animation: spin 1s linear infinite; }
        .doctor-card { transition: all 0.3s ease-in-out; }
        .doctor-card:hover { transform: translateY(-5px); box-shadow: 0 12px 20px rgba(0,0,0,0.06); border-color: #2563eb !important; }
      `}</style>
    </div>
  );
};

export default Doctors;



