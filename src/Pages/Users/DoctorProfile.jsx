import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserMd, FaArrowLeft, FaEdit } from 'react-icons/fa';
import LoadingSpinner from '../../components/LoadingSpinner';

const DoctorProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(location.state?.doctor || null);
  const [loading, setLoading] = useState(!doctor);

  useEffect(() => {
    if (!doctor) {
      const fetchDoctor = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(`https://app-b4a68046-cc76-405f-b0be-527f1eae5608.cleverapps.io/api/doctors/${id}`, {
            headers: { Authorization: token ? `Bearer ${token}` : "" }
          });
          setDoctor(response.data.data);
        } catch (err) {
          console.error("خطأ في جلب البيانات:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchDoctor();
    }
  }, [id, doctor]);

  if (loading) return <LoadingSpinner />;
  if (!doctor) return <div className="text-center mt-10 text-textDark">لم يتم العثور على الطبيب.</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen bg-authBg">
      <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 text-textDark font-medium text-sm">
        <FaArrowLeft /> العودة لقائمة الأطباء
      </button>

      {/* الكرت الرئيسي */}
      <div className="bg-cardBg rounded-3xl shadow-sm border border-cardBorder overflow-hidden mt-16">
        {/* الشريط العلوي */}
        <div className="bg-primary h-20 relative flex items-center justify-end px-6">
           {/* ربط زر التعديل بمسار صفحة التعديل */}
           <button 
             onClick={() => navigate(`/doctors/${id}/edit`, { state: { doctor } })}
             className="bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs flex items-center gap-2"
           >
            <FaEdit /> تعديل الملف
          </button>
        </div>

        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="mt-4 text-center md:w-1/4">
              <div className="w-32 h-32 mx-auto rounded-full border-4 border-cardBg bg-badgeBlue flex items-center justify-center shadow-sm">
                <FaUserMd className="text-5xl text-primary" />
              </div>
              <h2 className="text-lg font-bold mt-3 text-textDark">{doctor.profile?.full_name}</h2>
              {/* زر إضافي اختياري */}
              <button 
                onClick={() => navigate(`/doctors/${id}`, { state: { doctor } })}
                className="mt-3 bg-primary text-white w-full py-2 rounded-xl text-xs"
              >
                تعديل البيانات
              </button>
            </div>

            <div className="flex-1 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { label: "التخصص", val: doctor.work_configuration?.specialization?.name },
                  { label: "القسم", val: doctor.work_configuration?.facility_department?.department?.name },
                  { label: "الخبرة", val: `${doctor.years_of_experience} سنوات` },
                  { label: "الهاتف", val: doctor.profile?.phone },
                ].map((item, idx) => (
                  <div key={idx} className="bg-authBg p-3 rounded-xl border border-cardBorder">
                    <p className="text-textMuted text-[10px] uppercase">{item.label}</p>
                    <p className="font-bold text-textDark text-sm">{item.val}</p>
                  </div>
                ))}
              </div>
                <div className="mt-3 bg-authBg p-3 rounded-xl border border-cardBorder">
                <p className="text-textMuted text-[10px] uppercase">المؤهلات</p>
                <p className="font-bold text-textDark text-sm">{doctor.qualification}</p>
              </div>
              
              <div className="mt-3 bg-authBg p-3 rounded-xl border border-cardBorder">
                <p className="text-textMuted text-[10px] uppercase">النبذة</p>
                <p className="text-textDark leading-relaxed text-xs">{doctor.biography}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;