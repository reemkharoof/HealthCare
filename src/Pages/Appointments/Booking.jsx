import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHospital, FaThLarge, FaUserMd, FaCalendarAlt, FaClock, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const Booking = () => {
  const [formData, setFormData] = useState({
    facility_id: '',
    department_id: '',
    doctor_id: '',
    scheduled_date: '',
    start_time: '',
    reason: 'General Checkup',
    status: 'pending' 
  });

  // مصفوفات تخزين البيانات القادمة من الـ API
  const [facilities, setFacilities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  // حالات التحميل لكل جزء
  const [loadingFacilities, setLoadingFacilities] = useState(false);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const API_BASE_URL = 'https://app-b4a68046-cc76-405f-b0be-527f1eae5608.cleverapps.io/api';

  // دالة مساعدة لتجهيز الـ Headers والتوكن بأمان بدون ما تكسر الكود
  const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    // إذا التوكن مش موجود أو مكتوب ككلمة undefined نتيجة خطأ الـ login
    if (!token || token === 'undefined') {
      return null;
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  // 1️⃣ جلب المنشآت الطبية أول ما تفتح الصفحة
  useEffect(() => {
    const config = getAuthConfig();
    if (!config) {
      setErrorMessage("لم يتم العثور على صلاحيات تسجيل دخول صالحة (Token is undefined). يرجى إعادة تسجيل الدخول.");
      return;
    }

    setLoadingFacilities(true);
    axios.get(`${API_BASE_URL}/facilities`, config)
      .then(res => {
        const facilitiesData = res.data.data||  res.data || [];
        setFacilities(facilitiesData);
      })
      .catch(err => {
        console.error("Error fetching facilities:", err);
        if (err.response?.status === 401) {
          setErrorMessage("انتهت صلاحية الجلسة أو أن الحساب غير مصرح له (401).");
        } else {
          setErrorMessage("حدث خطأ أثناء جلب المنشآت الطبية.");
        }
      })
      .finally(() => setLoadingFacilities(false));
  }, []);

  // 2️⃣ جلب الأقسام الطبية فور اختيار المنشأة
  useEffect(() => {
    if (!formData.facility_id) {
      setDepartments([]);
      return;
    }

    const config = getAuthConfig();
    if (!config) return;

    setLoadingDepartments(true);
    axios.get(`${API_BASE_URL}/departments?facility_id=${formData.facility_id}`, config)
      .then(res => {
        setDepartments(res.data.data || res.data || []);
      })
      .catch(err => console.error("Error fetching departments:", err))
      .finally(() => setLoadingDepartments(false));
  }, [formData.facility_id]);

  // 3️⃣ جلب الأطباء فور اختيار القسم
  useEffect(() => {
    if (!formData.department_id) {
      setDoctors([]);
      return;
    }

    const config = getAuthConfig();
    if (!config) return;

    setLoadingDoctors(true);
    axios.get(`${API_BASE_URL}/doctors?department_id=${formData.department_id}`, config)
      .then(res => {
        setDoctors(res.data.data || res.data || []);
      })
      .catch(err => console.error("Error fetching doctors:", err))
      .finally(() => setLoadingDoctors(false));
  }, [formData.department_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'facility_id') {
      setFormData(prev => ({ ...prev, facility_id: value, department_id: '', doctor_id: '' }));
    } else if (name === 'department_id') {
      setFormData(prev => ({ ...prev, department_id: value, doctor_id: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSuccessMessage('');
    setErrorMessage(''); 
    const config = getAuthConfig();
    if (!config) {
      setErrorMessage("لا يمكن إرسال الطلب بدون تسجيل الدخول.");
      setSubmitLoading(false);
      return;
    }

    // قراءة الـ id الخاص بالمريض الحقيقي من كائن الـ user المخزن بالـ LocalStorage
    let currentPatientId = 1;
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.id) {
          currentPatientId = parsedUser.id; // هنا سيقرأ رقم 7 تلقائياً بناءً على الصورة
        }
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
      }
    }

    const dataToSend = {
      patient_id: Number(currentPatientId),
      doctor_id: Number(formData.doctor_id),
      scheduled_date: formData.scheduled_date + " 00:00:00", 
      start_time: formData.scheduled_date + " " + formData.start_time + ":00", 
      reason: formData.reason,
      status: formData.status
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/appointments`, dataToSend, config);
      if (response.data && response.data.success) {
        setSuccessMessage('تم إرسال طلب حجز الموعد بنجاح إلى المنشأة الطبية! ✨');
        setFormData({ facility_id: '', department_id: '', doctor_id: '', scheduled_date: '', start_time: '', reason: 'General Checkup', status: 'pending' });
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'حدث خطأ أثناء إرسال طلب الحجز.');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 shadow-sm" style={{ direction: 'rtl' }}>
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">طلب حجز موعد جديد</h2>
        <p className="text-xs text-gray-500 mt-1">البيانات تُجلب تلقائياً بالتوافق مع صلاحيات النظام.</p>
      </div>

      {successMessage && <div className="p-3 mb-4 bg-appointment-pendingBg text-appointment-pending border border-amber-200 rounded-xl text-xs font-medium flex items-center gap-2"><FaCheckCircle/> {successMessage}</div>}
      {errorMessage && <div className="p-3 mb-4 bg-appointment-cancelledBg text-appointment-cancelled border border-red-200 rounded-xl text-xs font-medium flex items-center gap-2"><FaExclamationTriangle/> {errorMessage}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* المنشأة الطبية */}
        <div>
          <label className="text-xs font-bold text-gray-700 mb-1.5 block">المنشأة الطبية</label>
          <div className="relative flex items-center">
            <FaHospital className="absolute right-3.5 text-gray-400 text-sm" />
            <select name="facility_id" value={formData.facility_id} onChange={handleChange} required className="w-full pr-10 pl-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all appearance-none cursor-pointer">
              <option value="">{loadingFacilities ? 'جاري تحميل المنشآت...' : 'اختر المنشأة...'}</option>
              {facilities.map(fac => (
                <option key={fac.id} value={fac.id}>{fac.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* القسم الطبي العام */}
        <div>
          <label className="text-xs font-bold text-gray-700 mb-1.5 block">القسم الطبي العام</label>
          <div className="relative flex items-center">
            <FaThLarge className="absolute right-3.5 text-gray-400 text-sm" />
            <select name="department_id" value={formData.department_id} onChange={handleChange} required disabled={!formData.facility_id} className="w-full pr-10 pl-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all appearance-none cursor-pointer disabled:opacity-50">
             <option value="">{loadingDepartments ? 'جاري تحميل الأقسام...' : 'اختر القسم الطبي...'}</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* الطبيب المتوفر */}
        <div>
          <label className="text-xs font-bold text-gray-700 mb-1.5 block">الطبيب / الأخصائي المتوفر</label>
          <div className="relative flex items-center">
            <FaUserMd className="absolute right-3.5 text-gray-400 text-sm" />
            <select name="doctor_id" value={formData.doctor_id} onChange={handleChange} required disabled={!formData.department_id} className="w-full pr-10 pl-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all appearance-none cursor-pointer disabled:opacity-50">
              <option value="">{loadingDoctors ? 'جاري تحميل الأطباء...' : 'اختر الطبيب المتخصص...'}</option>
              {doctors.map(doc => (
                <option key={doc.id} value={doc.id}>{doc.qualification?.split(',')[0] ||` دكتور رقم #${doc.id}`}</option>
              ))}
            </select>
          </div>
        </div>

        {/* التاريخ والتوقيت */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-700 mb-1.5 block">التاريخ المفضل</label>
            <div className="relative flex items-center">
              <FaCalendarAlt className="absolute right-3.5 text-gray-400 text-sm" />
              <input type="date" name="scheduled_date" value={formData.scheduled_date} onChange={handleChange} required className="w-full pr-10 pl-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-700 mb-1.5 block">التوقيت المطلوب</label>
            <div className="relative flex items-center">
              <FaClock className="absolute right-3.5 text-gray-400 text-sm" />
              <input type="time" name="start_time" value={formData.start_time} onChange={handleChange} required className="w-full pr-10 pl-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all" />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button type="submit" disabled={submitLoading} className="w-full h-11 bg-blue-600 text-white rounded-xl text-sm font-bold flex justify-center items-center shadow-sm hover:bg-blue-700 disabled:opacity-60 transition-all">
            {submitLoading ? <FaSpinner className="text-lg animate-spin" /> : 'إرسال طلب الحجز'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Booking;