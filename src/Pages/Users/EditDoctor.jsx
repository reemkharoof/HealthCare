import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const EditDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // استقبال البيانات الممررة من صفحة البروفايل عبر الـ state
  const initialData = location.state?.doctor || {};
  
  const [formData, setFormData] = useState({
    full_name: initialData.profile?.full_name || "",
    phone: initialData.profile?.phone || "",
    biography: initialData.biography || "",
    qualification: initialData.qualification || ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // الحل الجذري: دمج البيانات القديمة بالكامل مع التعديلات الجديدة
    const payload = {
      ...initialData, // نرسل كل البيانات الأصلية كما هي
      biography: formData.biography,
      qualification: formData.qualification,
      profile: {
        ...initialData.profile, // نحتفظ بـ profile_id وغيرها من الحقول الخفية
        full_name: formData.full_name,
        phone: formData.phone
      }
    };

    try {
      const token = localStorage.getItem("token");
      
      await axios.put(
        `https://app-b4a68046-cc76-405f-b0be-527f1eae5608.cleverapps.io/api/doctors/${id}`,
        payload, 
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
          }
        }
      );
      
      alert("تم التعديل بنجاح!");
      navigate(`/doctors/${id}`);
    } catch (err) {
      console.error("خطأ السيرفر:", err.response?.data);
      alert("فشل الحفظ. تأكدي من الـ Console.");
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto bg-white min-h-screen rounded-3xl shadow-sm border border-cardBorder mt-10">
      <h2 className="text-2xl font-bold mb-6 text-textDark">تعديل ملف الطبيب</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-textMuted mb-1">الاسم الكامل</label>
          <input 
            className="w-full p-3 border border-cardBorder rounded-xl focus:ring-2 focus:ring-primary outline-none"
            value={formData.full_name}
            onChange={(e) => setFormData({...formData, full_name: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-sm text-textMuted mb-1">رقم الهاتف</label>
          <input 
            className="w-full p-3 border border-cardBorder rounded-xl focus:ring-2 focus:ring-primary outline-none"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm text-textMuted mb-1">النبذة</label>
          <textarea 
            className="w-full p-3 border border-cardBorder rounded-xl focus:ring-2 focus:ring-primary outline-none h-32"
            value={formData.biography}
            onChange={(e) => setFormData({...formData, biography: e.target.value})}
          />
        </div>

        <button 
          type="submit" 
          className="bg-primary text-white w-full py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
        >
          حفظ التعديلات
        </button>
      </form>
    </div>
  );
};

export default EditDoctor;