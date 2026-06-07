import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaHospitalUser, 
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

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States الإضافة
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true); 
  
  // States التعديل
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editIsActive, setEditIsActive] = useState(true);

  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState('');

  // جلب التوكن تلقائياً
  const getAuthToken = () => {
    return "2|7Gv2YjC9svZTZpuFiLYzpCWKDimnk0fu5pMkmRMd67707522";
  };

  // الرابط بالجمع المعتمد بالأقسام
  const API_URL = 'https://app-b4a68046-cc76-405f-b0be-527f1eae5608.cleverapps.io/api/departments';

  // 1️⃣ [GET] جلب الأقسام
  const getDepartmentsData = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Accept': 'application/json'
        }
      });
      
      if (response.data && response.data.success) {
        setDepartments(response.data.data);
      } else {
        setDepartments(response.data || []);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('حدث خطأ في جلب الأقسام الطبية، تأكد من الاتصال بالسيرفر!');
      setLoading(false);
    }
  };

  useEffect(() => {
    getDepartmentsData();
  }, []);

  // 2️⃣ [POST] إضافة قسم جديد
  const handleAddDepartment = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormSuccess('');

    try {
      const newDeptData = { 
        name, 
        description,
        is_active: isActive ? 1 : 0 
      };
      
      await axios.post(API_URL, newDeptData, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      setFormSuccess('تمت إضافة القسم الطبي بنجاح واعتمد في السيستم ✨');
      setName('');
      setDescription('');
      setIsActive(true);
      getDepartmentsData(); 
    } catch (err) {
      console.error(err);
      alert('فشلت عملية إضافة القسم، تأكد من البيانات المرسلة!');
    } finally {
      setFormLoading(false);
    }
  };

  // 3️⃣ [DELETE] حذف قسم
  const handleDeleteDepartment = async (id) => {
    if (window.confirm('هل أنتِ متأكدة من حذف هذا القسم الطبي نهائياً؟')) {
      try {
        await axios.delete(`${API_URL}/${id}`, {
          headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
            'Accept': 'application/json'
          }
        });
        getDepartmentsData();
      } catch (err) {
        console.error(err);
        alert('فشلت عملية الحذف من السيرفر.');
      }
    }
  };

  // تفعيل وضع التعديل
  const startEdit = (dept) => {
    setEditingId(dept.id);
    setEditName(dept.name);
    setEditDescription(dept.description || '');
    setEditIsActive(dept.is_active === 1 || dept.is_active === true);
  };

  // 4️⃣ [PUT] حفظ تعديل القسم
  const handleUpdateDepartment = async (id) => {
    try {
      const updatedData = { 
        name: editName, 
        description: editDescription,
        is_active: editIsActive ? 1 : 0
      };
      
      await axios.put(`${API_URL}/${id}`, updatedData, {
        headers: {
             'Authorization':`Bearer ${getAuthToken()}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      setEditingId(null);
      getDepartmentsData();
    } catch (err) {
      console.error(err);
      alert('فشل تحديث بيانات القسم على السيرفر.');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-[60vh] text-[16px] gap-2.5">
      <FaSpinner className="spinner text-skyPrimary text-[24px] ml-3" /> 
      <span className="text-textMuted font-medium">جاري تحميل لوحة الأقسام الطبية...</span>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center h-[60vh] text-[16px] gap-2.5">
      <div className="flex items-center px-6 py-4 bg-dangerRedBg text-dangerRed rounded-xl border border-red-300">
        <FaExclamationTriangle className="ml-2.5 text-[22px]" /> {error}
      </div>
    </div>
  );

  return (
    <div className="p-[30px] max-w-[1280px] my-0 mx-auto" style={{ direction: 'rtl' }}>
      
      {/* هيدر الصفحة الفخم */}
      <div className="flex items-center gap-[15px] mb-[35px] border-b border-cardBorder pb-5">
        <div className="w-[56px] h-[56px] bg-skyLightBg rounded-[14px] flex justify-center items-center">
          <FaHospitalUser className="text-skyPrimary text-[28px]" />
        </div>
        <div>
          <h2 className="text-[24px] font-bold text-darkBg m-0">لوحة إدارة أقسام المستشفى</h2>
          <p className="text-[14px] text-textMuted mt-1 mx-0 mb-0">تصفح الأقسام الطبية الحالية، أضف أقساماً جديدة، أو عدل البيانات المتاحة الحز.</p>
        </div>
      </div>

      {/* فورم الإضافة المودرن */}
      <div className="bg-cardBg border border-inputBorder rounded-[16px] p-6 shadow-sm mb-10">
        <h3 className="text-textDark mb-5 font-semibold text-[16px] flex items-center">
          <FaPlus className="ml-2 text-skyPrimary" /> إضافة قسم طبي جديد للسيستم
        </h3>
        
        {formSuccess && (
          <div className="p-[12px_16px] bg-emerald-50 text-successGreen rounded-[10px] mb-5 text-[14px] flex items-center border border-emerald-200">
            <FaCheckCircle className="ml-2 text-[16px]" /> {formSuccess}
          </div>
        )}
        
        <form onSubmit={handleAddDepartment} className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))_130px_140px] gap-[15px] items-center">
          <div className="relative flex items-center">
            <FaHeading className="absolute right-3 text-textMuted text-[14px]" />
            <input type="text" placeholder="اسم القسم (مثال: Emergency Department)" value={name} onChange={(e) => setName(e.target.value)} required className="w-full pr-[38px] pl-3 py-3 rounded-[10px] border border-inputBorder text-[14px] outline-none bg-authBg" />
          </div>
          
          <div className="relative flex items-center">
            <FaFileAlt className="absolute right-3 text-textMuted text-[14px]" />
            <input type="text" placeholder="وصف وتفاصيل القسم..." value={description} onChange={(e) => setDescription(e.target.value)} className="w-full pr-[38px] pl-3 py-3 rounded-[10px] border border-inputBorder text-[14px] outline-none bg-authBg" />
          </div>

          <div className="flex items-center gap-2 pr-2">
            <label className="text-[13px] text-textDark font-medium cursor-pointer flex items-center gap-1.5">
              <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="ml-1 scale-110 cursor-pointer" />
              القسم نشط حالياً
            </label>
          </div>
          
          <button type="submit" disabled={formLoading} className="h-[46px] w-full rounded-[10px] border-none bg-skyPrimary text-white text-[14px] font-semibold cursor-pointer flex justify-center items-center">
            {formLoading ? <FaSpinner className="spinner" /> : <>حفظ القسم <FaPlus className="mr-2" /></>}
          </button>
        </form>
      </div>
     {/* قائمة عرض كروت الأقسام */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
        {departments.map((dept) => (
          <div key={dept.id} className="dept-card border border-inputBorder rounded-[16px] p-6 shadow-sm bg-cardBg flex flex-col justify-between min-h-[220px]">
            
            {editingId === dept.id ? (
              /* واجهة التعديل جوات الكارد */
              <div className="flex flex-col gap-2.5">
                <h4 className="text-textDark mb-2.5 font-semibold">تعديل القسم:</h4>
                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="p-2.5 rounded-[8px] border border-inputBorder text-[13px] outline-none" placeholder="اسم القسم" />
                <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="p-2.5 rounded-[8px] border border-inputBorder text-[13px] outline-none resize-y" placeholder="الوصف..." rows="3" style={{ fontFamily: 'inherit' }} />
                
                <label className="text-[13px] text-textDark my-1 flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={editIsActive} onChange={(e) => setEditIsActive(e.target.checked)} className="ml-1" />
                  نشط ومتاح
                </label>

                <div className="flex gap-2 justify-end mt-1">
                  <button onClick={() => handleUpdateDepartment(dept.id)} className="border-none bg-successGreen text-white px-3.5 py-1.5 rounded-[8px] cursor-pointer text-[13px] font-semibold flex items-center">
                    <FaSave className="ml-1" /> حفظ
                  </button>
                  <button onClick={() => setEditingId(null)} className="border-none bg-textMuted text-white px-3.5 py-1.5 rounded-[8px] cursor-pointer text-[13px] font-semibold flex items-center">
                    <FaTimes className="ml-1" /> إلغاء
                  </button>
                </div>
              </div>
            ) : (
              /* واجهة العرض الفخمة */
              <>
                <div>
                  <div className="flex justify-between items-start mb-3 gap-2.5">
                    <h3 className="text-[17px] text-darkBg font-bold m-0 leading-snug">
                      {dept.name}
                    </h3>
                    <div className="flex gap-1.5 items-center shrink-0">
                      <span className={`px-2 py-1 rounded-[6px] text-[11px] font-semibold ${dept.is_active ? 'bg-successGreenBg text-successGreen' : 'bg-dangerRedBg text-dangerRed'}`}>
                        {dept.is_active ? 'نشط' : 'موقف'}
                      </span>
                      <span className="bg-authBg text-textMuted px-2 py-1 rounded-[6px] text-[11px] font-semibold">ID: {dept.id}</span>
                    </div>
                  </div>
                  <p className="text-textMuted text-[13.5px] leading-relaxed m-0">
                    {dept.description || 'لا يوجد وصف متاح لهذا القسم الطبي حالياً.'}
                  </p>
                </div>

                <div className="flex gap-2.5 mt-5 pt-3.5 border-t border-cardBorder justify-end">
                  <button onClick={() => startEdit(dept)} className="border-none bg-warningAmberBg text-warningAmber px-3.5 py-1.5 rounded-[8px] cursor-pointer flex items-center text-[13px]">
                    <FaEdit className="ml-1" /> تعديل
                  </button>
                  <button onClick={() => handleDeleteDepartment(dept.id)} className="border-none bg-dangerRedBg text-dangerRed px-3.5 py-1.5 rounded-[8px] cursor-pointer flex items-center text-[13px]">
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
        .dept-card { transition: all 0.3s ease-in-out; }
        .dept-card:hover { transform: translateY(-5px); box-shadow: 0 12px 20px rgba(0,0,0,0.06); border-color: #0284c7 !important; }
      `}</style>
    </div>
  );
};

export default Departments;



