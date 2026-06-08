import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaClock, FaCalendarDay, FaUserMd, FaInfoCircle, FaSpinner } from 'react-icons/fa';
import LoadingSpinner from '../../components/LoadingSpinner';

const Schedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://app-b4a68046-cc76-405f-b0be-527f1eae5608.cleverapps.io/api/doctor-schedule', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSchedules(response.data.data);
      } catch (error) {
        console.error("خطأ في جلب الجدول:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, []);

  if (loading) return (
   <LoadingSpinner/>
  );

  return (
    <div className="p-6 bg-authBg min-h-screen" style={{ direction: 'rtl' }}>
      <h2 className="text-2xl font-bold mb-6 text-textDark flex items-center gap-2">
        <FaUserMd className="text-primary" /> جدول الدوام الأسبوعي
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedules.map((sch) => (
          <div 
            key={sch.id} 
            className={`bg-cardBg p-5 rounded-card border transition-all ${sch.is_off ? 'border-dangerRed' : 'border-cardBorder'} shadow-sm`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold capitalize flex items-center gap-2 text-textDark">
                <FaCalendarDay className="text-skyPrimary" /> {sch.day_of_week}
              </h3>
              {/* هنا نستخدم الألوان المعرفة في ملفك */}
              <span className={`px-3 py-1 text-xs font-bold rounded-full border ${sch.is_off ? 'bg-dangerRedBg text-dangerRed border-dangerRed' : 'bg-successGreenBg text-successGreen border-successGreen'}`}>
                {sch.is_off ? 'عطلة' : 'دوام'}
              </span>
            </div>

            {!sch.is_off ? (
              <div className="space-y-2 text-sm text-textMuted">
                <p className="flex items-center gap-2">
                  <FaClock className="text-primary" /> الوقت: {sch.start_time.substring(0, 5)} - {sch.end_time.substring(0, 5)}
                </p>
                <p className="flex items-center gap-2">
                  <FaInfoCircle className="text-primary" /> متوسط مدة الكشف: {sch.avg_consultation_time} دقيقة
                </p>
              </div>
            ) : (
              <p className="text-sm text-textMuted italic">لا يوجد دوام في هذا اليوم.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedules;