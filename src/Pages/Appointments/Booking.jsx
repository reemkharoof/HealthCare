import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaCalendarCheck, FaUser, FaClock, FaStethoscope, 
  FaChevronDown, FaChevronUp, FaAllergies, FaHeartbeat, 
  FaPhoneAlt, FaSpinner 
} from 'react-icons/fa';
import LoadingSpinner from '../../components/LoadingSpinner';

const Booking = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get('https://app-b4a68046-cc76-405f-b0be-527f1eae5608.cleverapps.io/api/appointments', config);
        setAppointments(response.data.data);
      } catch (error) {
        console.error("خطأ في جلب المواعيد:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  // دالة تُرجع الكلاسات الموحدة من الـ Config مباشرة
  const getStatusClasses = (status) => {
    switch (status) {
      case 'pending': return 'bg-pendingBg text-pending border-pending';
      case 'confirmed': return 'bg-confirmedBg text-confirmed border-confirmed';
      case 'completed': return 'bg-completedBg text-completed border-completed';
      case 'cancelled': return 'bg-cancelledBg text-cancelled border-cancelled';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading) return (
    <LoadingSpinner/>
  );

  return (
    <div className="p-6 bg-authBg min-h-screen" style={{ direction: 'rtl' }}>
      <h2 className="text-2xl font-bold mb-6 text-textDark">إدارة المواعيد المحجوزة</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((app) => (
          <div key={app.id} className="bg-cardBg p-5 rounded-card border border-cardBorder shadow-sm transition-all hover:shadow-md">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-skyLightBg p-2 rounded-full">
                  <FaUser className="text-skyPrimary" />
                </div>
                <span className="font-bold text-textDark">{app.patient?.full_name || 'مريض رقم ' + app.patient_id}</span>
              </div>
              {/* هنا الاعتماد الكامل على الـ Config */}
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusClasses(app.status)}`}>
                {app.status}
              </span>
            </div>
            
            {/* Body */}
            <div className="space-y-2 text-sm text-textMuted mb-4">
              <p className="flex items-center gap-2"><FaStethoscope className="text-textMuted" /> السبب: {app.reason}</p>
              <p className="flex items-center gap-2"><FaCalendarCheck className="text-textMuted" /> التاريخ: {app.scheduled_date.split(' ')[0]}</p>
              <p className="flex items-center gap-2"><FaClock className="text-textMuted" /> الوقت: {app.start_time.split(' ')[1].substring(0, 5)}</p>
            </div>

            {/* Expandable Details */}
            {expandedId === app.id && (
              <div className="mt-4 pt-4 border-t border-cardBorder text-xs text-textMuted space-y-2">
                <p><FaAllergies className="inline ml-1 text-dangerRed" /> الحساسية: {app.patient?.allergies || 'لا يوجد'}</p>
                <p><FaHeartbeat className="inline ml-1 text-dangerRed" /> الأمراض المزمنة: {app.patient?.chronic_diseases || 'لا يوجد'}</p>
        <p><FaPhoneAlt className="inline ml-1 text-skyPrimary" /> طوارئ: {app.patient?.emergency_contact_name || 'غير متوفر'}</p>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
              <button 
                onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
                className="flex-1 py-2 border border-inputBorder rounded-lg text-textMuted hover:bg-authBg transition text-sm flex items-center justify-center gap-2"
              >
                {expandedId === app.id ? <><FaChevronUp /> إخفاء</> : <><FaChevronDown /> تفاصيل</>}
              </button>
              <button className="flex-[2] py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                بدء الكشف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booking;