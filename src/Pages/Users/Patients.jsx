import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserInjured, FaTint, FaRulerVertical, FaWeight, FaAllergies, FaHeartbeat, FaPhoneAlt, FaIdCard, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: token ? `Bearer ${token}` : '' } };
        const response = await axios.get('https://app-b4a68046-cc76-405f-b0be-527f1eae5608.cleverapps.io/api/patients', config);
        setPatients(response.data.data?.data || []);
      } catch (err) {
        setError('تعذر جلب بيانات سجل الحالات المرضية الموحد.');
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  if (loading) return <div className="text-center p-20 text-primary font-bold">جاري جلب سجل الحالات الطبية...</div>;
  
  // 🟢 تم إزالة أيقونة التحذير التعبيرية من هنا بناءً على طلبك
  if (error) return <div className="text-center p-4 text-dangerRed font-bold">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6" style={{ direction: 'rtl' }}>
      <div className="mb-8 border-r-4 border-primary pr-4">
        <h2 className="text-2xl font-bold text-textDark">سجلات المراجعين والمرضى</h2>
        <p className="text-sm text-textMuted mt-1">إدارة السجلات الطبية ومعلومات الطوارئ الحيوية.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <div key={patient.id} className="bg-cardBg border border-cardBorder rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            
            <div className="p-5 bg-gradient-to-br from-badgeBlue to-authBg border-b border-cardBorder">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 bg-badgeBlue text-primary rounded-xl flex items-center justify-center text-xl shrink-0 shadow-inner">
                  <FaUserInjured />
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-sm font-bold text-textDark truncate">{patient.profile?.full_name}</h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-textMuted font-mono">
                    <FaIdCard className="text-inputBorder" />
                    <span>الرقم الوطني: {patient.profile?.national_number || 'غير متاح'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-4 flex-grow text-xs">
              {/* شبكة قياسات الطول والوزن وزمرة الدم */}
              <div className="grid grid-cols-3 gap-2 bg-authBg p-2.5 rounded-xl border border-cardBorder text-center font-medium">
                <div>
                  <span className="text-[10px] text-textMuted block mb-0.5"><FaTint className="text-dangerRed inline" /> زمرة الدم</span>
                  <span className="text-xs font-bold text-textDark font-mono">{patient.blood_type || '—'}</span>
                </div>
                <div className="border-r border-cardBorder">
                  <span className="text-[10px] text-textMuted block mb-0.5"><FaRulerVertical className="text-primary inline" /> الطول</span>
                  <span className="text-xs font-bold text-textDark font-mono">{patient.height ? `${Math.round(patient.height)} سم` : '—'}</span>
                </div>
                <div className="border-r border-cardBorder">
                  <span className="text-[10px] text-textMuted block mb-0.5"><FaWeight className="text-successGreen inline" /> الوزن</span>
                     <span className="text-xs font-bold text-textDark font-mono">{patient.weight ? `${Math.round(patient.weight)} كغ `: '—'}</span>
                </div>
              </div>

              {/* تفاصيل الحساسية والأمراض */}
              <div className="space-y-2 bg-authBg p-3 rounded-xl border border-cardBorder">
                <div className="flex items-start gap-2">
                  <FaAllergies className="text-warningAmber text-sm mt-0.5 shrink-0" />
                  <div><span className="text-textMuted font-medium">الحساسية: </span><span className="font-bold text-textDark">{patient.allergies || 'لا يوجد'}</span></div>
                </div>
                <div className="flex items-start gap-2">
                  <FaHeartbeat className="text-dangerRed text-sm mt-0.5 shrink-0" />
                  <div><span className="text-textMuted font-medium">الأمراض المزمنة: </span><span className="font-bold text-textDark">{patient.chronic_diseases === 'None' ? 'سليم' : patient.chronic_diseases || 'سليم'}</span></div>
                </div>
              </div>

              <div className="border-t border-dashed border-cardBorder my-2"></div>

              <div className="space-y-2 text-textDark">
                <div className="flex items-center gap-2"><FaPhoneAlt className="text-textMuted" /><span className="font-mono">{patient.profile?.phone}</span></div>
                <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-textMuted" /><span className="truncate">{patient.profile?.address}</span></div>
              </div>
            </div>

            {/* جهة اتصال الطوارئ */}
            <div className="px-5 py-3.5 bg-authBg border-t border-cardBorder text-[11px] flex items-center justify-between text-textMuted font-medium">
              <div className="flex items-center gap-1.5 truncate"><FaUsers className="text-textMuted text-xs" /><span>طوارئ: {patient.emergency_contact_name || 'غير مضاف'}</span></div>
              {patient.emergency_contact_phone && <span className="font-mono bg-white px-2 py-0.5 rounded border border-cardBorder text-textDark shadow-2xs">{patient.emergency_contact_phone}</span>}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Patients;