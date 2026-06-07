import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { 
  FaStethoscope, 
  FaPlus, 
  FaTrashAlt, 
  FaEdit, 
  FaSave, 
  FaTimes, 
  FaSpinner, 
  FaExclamationTriangle, 
  FaCheckCircle,
  FaHeading,
  FaFileAlt
} from 'react-icons/fa';

const Specialization = () => {
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States الإضافة
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  // States التعديل
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState('');

  // جلب التوكن الشغال تلقائياً من الـ Local Storage
  const getAuthToken = () => {
    let token = localStorage.getItem('token');
    if (!token) {
      token = "4|fK03g8O6JNX5PVnKvP20NTPGHfYDVyogg8bp0bjK013990c9"; 
    }
    return token;
  };

  // الرابط الأساسي الصافي
  const API_URL = 'https://app-b4a68046-cc76-405f-b0be-527f1eae5608.cleverapps.io/api/specialization';

  // 1️⃣ [GET] جلب البيانات (تم تصليح الـ Template Literal)
  const getSpecializationsData = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Accept': 'application/json'
        }
      });
      
      if (response.data && response.data.success) {
        setSpecializations(response.data.data);
      } else {
        setSpecializations(response.data || []);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('حدث خطأ في جلب التخصصات الطبية، تأكد من الاتصال بالسيرفر!');
      setLoading(false);
    }
  };

  useEffect(() => {
    getSpecializationsData();
  }, []);

  // 2️⃣ [POST] إضافة تخصص جديد
  const handleAddSpecialization = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormSuccess('');

    try {
      const newSpecData = { name, description };
      await axios.post(API_URL, newSpecData, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      setFormSuccess('تمت إضافة التخصص الطبي بنجاح واعتمد في السيستم ✨');
      setName('');
      setDescription('');
      getSpecializationsData(); 
    } catch (err) {
      console.error(err);
      alert('فشلت عملية الإضافة، تأكد من البيانات المرسلة لمصطفى!');
    } finally {
      setFormLoading(false);
    }
  };

  // 3️⃣ [DELETE] حذف تخصص
  const handleDeleteSpecialization = async (id) => {
    if (window.confirm('هل أنتِ متأكدة من حذف هذا التخصص الطبي نهائياً؟')) {
      try {
        await axios.delete(`${API_URL}/${id}`, {
          headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
            'Accept': 'application/json'
          }
        });
        getSpecializationsData();
      } catch (err) {
        console.error(err);
        alert('فشلت عملية الحذف من السيرفر.');
      }
    }
  };

  // تفعيل وضع التعديل
  const startEdit = (spec) => {
    setEditingId(spec.id);
    setEditName(spec.name);
    setEditDescription(spec.description || '');
  };

  // 4️⃣ [PUT] حفظ التعديل (تم تصليح الـ Template Literal والـ Backticks)
  const handleUpdateSpecialization = async (id) => {
    try {
      const updatedData = { name: editName, description: editDescription };
      await axios.put(`${API_URL}/${id}`, updatedData, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      setEditingId(null);
      getSpecializationsData();
    } catch (err) {
      console.error(err);
      alert('فشل تحديث التخصص الطبي على السيرفر.');
    }
  };
 if (loading) return (
    <div className="flex justify-center items-center h-[60vh] text-[16px] gap-2.5">
      <FaSpinner className="spinner text-primary text-[24px] ml-3" /> 
      <span className="text-textDark font-medium">جاري تحميل لوحة التخصصات الطبية...</span>
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
      
      {/* هيدر الصفحة الفخم المشترك */}
      <div className="flex items-center gap-[15px] mb-[35px] border-b border-cardBorder pb-5">
        <div className="w-[56px] h-[56px] bg-badgeBlue rounded-[14px] flex justify-center items-center">
          <FaStethoscope className="text-primary text-[28px]" />
        </div>
        <div>
          <h2 className="text-[24px] font-bold text-textDark m-0">لوحة إدارة التخصصات الطبية</h2>
          <p className="text-[14px] text-textMuted mt-1 mx-0 mb-0">تصفح، أضف، وعدل التخصصات المتاحة بأقسام المستشفى بكل سهولة.</p>
        </div>
      </div>

      {/* فورم الإضافة المودرن */}
      <div className="bg-cardBg border border-inputBorder rounded-[16px] p-6 shadow-sm mb-10">
        <h3 className="text-textDark mb-5 font-semibold text-[16px] flex items-center">
          <FaPlus className="ml-2 text-primary" /> إضافة تخصص جديد للنظام
        </h3>
        
        {formSuccess && (
          <div className="p-[12px_16px] bg-emerald-50 text-successGreen rounded-[10px] mb-5 text-[14px] flex items-center border border-emerald-200">
            <FaCheckCircle className="ml-2 text-[16px]" /> {formSuccess}
          </div>
        )}
        
        <form onSubmit={handleAddSpecialization} className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))_160px] gap-[15px] items-center">
          <div className="relative flex items-center">
            <FaHeading className="absolute right-3 text-textMuted text-[14px]" />
            <input type="text" placeholder="اسم التخصص (مثال: Cardiology)" value={name} onChange={(e) => setName(e.target.value)} required className="w-full pr-[38px] pl-3 py-3 rounded-[10px] border border-inputBorder text-[14px] outline-none bg-authBg" />
          </div>
          
          <div className="relative flex items-center">
            <FaFileAlt className="absolute right-3 text-textMuted text-[14px]" />
            <input type="text" placeholder="وصف تفصيلي عن التخصص..." value={description} onChange={(e) => setDescription(e.target.value)} className="w-full pr-[38px] pl-3 py-3 rounded-[10px] border border-inputBorder text-[14px] outline-none bg-authBg" />
          </div>
          
          <button type="submit" disabled={formLoading} className="h-[46px] w-full rounded-[10px] border-none bg-primary text-white text-[14px] font-semibold cursor-pointer flex justify-center items-center">
            {formLoading ? <FaSpinner className="spinner" /> : <>حفظ التخصص <FaPlus className="mr-2" /></>}
          </button>
        </form>
      </div>

      {/* قائمة عرض التخصصات */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
        {specializations.map((spec) => (
          <div key={spec.id} className="spec-card border border-inputBorder rounded-[16px] p-6 shadow-sm bg-cardBg flex flex-col justify-between min-h-[200px]">
            
            {editingId === spec.id ? (
              <div className="flex flex-col gap-2.5">
                <h4 className="text-textDark mb-2.5 font-semibold">تعديل البيانات:</h4>
                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="p-2.5 rounded-[8px] border border-inputBorder text-[13px] outline-none" placeholder="اسم التخصص" />
 <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="p-2.5 rounded-[8px] border border-inputBorder text-[13px] outline-none resize-y" placeholder="الوصف..." rows="3" style={{ fontFamily: 'inherit' }} />
                <div className="flex gap-2 justify-end mt-1">
                  <button onClick={() => handleUpdateSpecialization(spec.id)} className="border-none bg-successGreen text-white px-3.5 py-1.5 rounded-[8px] cursor-pointer text-[13px] font-semibold flex items-center">
                    <FaSave className="ml-1" /> حفظ التغيير
                  </button>
                  <button onClick={() => setEditingId(null)} className="border-none bg-textMuted text-white px-3.5 py-1.5 rounded-[8px] cursor-pointer text-[13px] font-semibold flex items-center">
                    <FaTimes className="ml-1" /> إلغاء
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <div className="flex justify-between items-start mb-3 gap-2.5">
                    <h3 className="text-[18px] text-darkBg font-bold m-0">
                      {spec.name}
                    </h3>
                    <span className="bg-authBg text-textMuted px-2 py-1 rounded-[6px] text-[11px] font-semibold">ID: {spec.id}</span>
                  </div>
                  <p className="text-textMuted text-[14px] leading-relaxed m-0">
                    {spec.description || 'لا يوجد وصف تفصيلي متاح لهذا التخصص حالياً.'}
                  </p>
                </div>
                <div className="flex gap-2.5 mt-5 pt-3.5 border-t border-cardBorder justify-end">
                  <button onClick={() => startEdit(spec)} className="border-none bg-warningAmberBg text-warningAmber px-3.5 py-1.5 rounded-[8px] cursor-pointer flex items-center text-[13px]">
                    <FaEdit className="ml-1" /> تعديل
                  </button>
                  <button onClick={() => handleDeleteSpecialization(spec.id)} className="border-none bg-dangerRedBg text-dangerRed px-3.5 py-1.5 rounded-[8px] cursor-pointer flex items-center text-[13px]">
                    <FaTrashAlt className="ml-1" /> حذف
                  </button>
                </div>
              </>
            )}

          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .spinner { animation: spin 1s linear infinite; }
        .spec-card { transition: all 0.3s ease-in-out; }
        .spec-card:hover { transform: translateY(-5px); box-shadow: 0 12px 20px rgba(0,0,0,0.06); border-color: #2563eb !important; }
      `}</style>
    </div>
  );
};

export default Specialization;








