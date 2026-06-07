 import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaClock, FaUserMd, FaStethoscope, FaSpinner, FaInfoCircle, FaHospital } from 'react-icons/fa';

const Schedules = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // جلب المواعيد من السيرفر الطبي المركزي
    axios.get('https://app-b4a68046-cc76-405f-b0be-527f1eae5608.cleverapps.io/api/appointments')
      .then(response => {
        if (response.data && response.data.success) {
          setAppointments(response.data.data || []);
        } else {
          setAppointments([]);
        }
      })
      .catch(err => {
        console.error("Error fetching appointments:", err);
        setError('فشل في تحميل السجل الموحد للمواعيد من السيرفر الطبي.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // دحقي هون: قراءة الألوان الموحدة المستوردة من ثيم التيلويند (tailwind.config.js)
  const getStatusClasses = (status) => {
    switch (status) {
      case 'pending': 
        return { text: 'قيد الانتظار', bgClass: 'bg-appointment-pendingBg text-appointment-pending' };
      case 'confirmed': 
        return { text: 'مؤكد', bgClass: 'bg-appointment-confirmedBg text-appointment-confirmed' };
      case 'completed': 
        return { text: 'مكتمل المعاينة', bgClass: 'bg-appointment-completedBg text-appointment-completed' };
      case 'cancelled': 
        return { text: 'ملغي', bgClass: 'bg-appointment-cancelledBg text-appointment-cancelled' };
      default: 
        return { text: status, bgClass: 'bg-gray-100 text-gray-700' };
    }
  };

  if (loading) {
    return (
      <div className="text-center p-20 text-gray-500">
        <FaSpinner className="text-3xl animate-spin text-blue-600 mx-auto mb-2"/> 
        جاري تحميل جدول المواعيد الطبية...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl max-w-md mx-auto text-center text-sm font-medium">
        <FaInfoCircle className="inline ml-1"/>{error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4" style={{ direction: 'rtl' }}>
      <h3 className="text-gray-800 text-lg font-bold mb-6">جدول مواعيدي الطبية المشتركة</h3>
      
      {appointments.length === 0 ? (
        <div className="text-center text-gray-400 p-10 bg-white border border-gray-200 rounded-2xl">
          لا يوجد مواعيد محجوزة حالياً في النظام.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((app) => {
            const statusInfo = getStatusClasses(app.status);
            
            // معالجة النصوص والتواريخ بأمان لمنع الـ Crash
            const displayDate = app.scheduled_date ? app.scheduled_date.split(' ')[0] : 'غير محدد';
            const displayTime = app.start_time ? app.start_time.split(' ')[1] : 'غير محدد';
            const doctorName = app.doctor?.qualification ? app.doctor.qualification.split(',')[0] : 'طبيب تخصصي';

            return (
              <div key={app.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200">
                <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                  {/* الألوان المستوردة من التيلويند ثيم */}
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${statusInfo.bgClass}`}>
                    {statusInfo.text}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">ID: #{app.id}</span>
                </div>
                   <div className="p-5 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                    <FaStethoscope className="text-gray-400"/> 
                    {app.reason || 'معاينة عامة'}
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <FaHospital className="text-blue-500"/> 
                    <span>المنشأة الطبية: مستشفى الأمل المركزي</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <FaUserMd className="text-green-600"/> 
                    <span>الطبيب: {doctorName}</span>
                  </div>
                  
                  <hr className="border-t border-dashed border-gray-100" />
                  
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-500 bg-gray-50 p-2.5 rounded-xl">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt/> {displayDate}
                    </div>
                    <div className="flex items-center gap-1" style={{ direction: 'ltr', textAlign: 'right' }}>
                      <FaClock/> {displayTime}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Schedules;