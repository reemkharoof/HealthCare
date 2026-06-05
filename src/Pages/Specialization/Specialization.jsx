 import React, { useState, useEffect } from 'react';
import axios from 'axios'; // استخدام الأكسيوس المباشر والمضمون
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

  // جلب التوكن الشغال تلقائياً من الـ Local Storage تبع مصطفى
  const getAuthToken = () => {
    let token = localStorage.getItem('token');
    if (!token) {
      token = "4|fK03g8O6JNX5PVnKvP20NTPGHfYDVyogg8bp0bjK013990c9"; // التوكن الشغال من البوستمان
    }
    return token;
  };

  // الرابط الأساسي الصافي والمفرد متل ما ضبط بالبوستمان
  const API_URL = 'https://app-b4a68046-cc76-405f-b0be-527f1eae5608.cleverapps.io/api/specialization';

  // 1️⃣ [GET] جلب البيانات
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
          'Authorization':` Bearer ${getAuthToken()}`,
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

  // 4️⃣ [PUT] حفظ التعديل
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
    <div style={styles.center}>
      <FaSpinner className="spinner" style={{ marginLeft: '12px', color: '#2563eb', fontSize: '24px' }} /> 
      <span style={{ color: '#475569', fontWeight: '500' }}>جاري تحميل لوحة التخصصات الطبية...</span>
    </div>
  );
  
  if (error) return (
    <div style={styles.center}>
      <div style={styles.errorCard}>
        <FaExclamationTriangle style={{ marginLeft: '10px', fontSize: '22px' }} /> {error}
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      
      {/* هيدر الصفحة الفخم */}
      <div style={styles.headerSection}>
        <div style={styles.iconBackground}>
          <FaStethoscope style={{ color: '#2563eb', fontSize: '28px' }} />
        </div>
        <div>
          <h2 style={styles.mainTitle}>لوحة إدارة التخصصات الطبية</h2>
          <p style={styles.subTitle}>تصفح، أضف، وعدل التخصصات المتاحة بأقسام المستشفى بكل سهولة.</p>
        </div>
      </div>

      {/* فورم الإضافة المودرن */}
      <div style={styles.formCard}>
        <h3 style={styles.formTitle}>
          <FaPlus style={{ marginLeft: '8px', color: '#2563eb' }} /> إضافة تخصص جديد للنظام
        </h3>
        
        {formSuccess && (
          <div style={styles.successAlert}>
            <FaCheckCircle style={{ marginLeft: '8px', fontSize: '16px' }} /> {formSuccess}
          </div>
        )}
        
        <form onSubmit={handleAddSpecialization} style={styles.formGrid}>
          <div style={styles.inputWrapper}>
            <FaHeading style={styles.inputIcon} />
            <input type="text" placeholder="اسم التخصص (مثال: Cardiology)" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} />
          </div>
          
          <div style={styles.inputWrapper}>
            <FaFileAlt style={styles.inputIcon} />
            <input type="text" placeholder="وصف تفصيلي عن التخصص..." value={description} onChange={(e) => setDescription(e.target.value)} style={styles.input} />
          </div>
          
          <button type="submit" disabled={formLoading} style={styles.submitBtn}>
            {formLoading ? <FaSpinner className="spinner" /> : <>حفظ التخصص <FaPlus style={{ marginRight: '8px' }} /></>}
          </button>
        </form>
      </div>

      {/* قائمة عرض التخصصات */}
      <div style={styles.grid}>
        {specializations.map((spec) => (
          <div key={spec.id} className="spec-card" style={styles.card}>
            
            {editingId === spec.id ? (
              <div style={styles.editForm}>
                <h4 style={{ color: '#1e293b', marginBottom: '10px', fontWeight: '600' }}>تعديل البيانات:</h4>
                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} style={styles.inputSmall} placeholder="اسم التخصص" />
                <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} style={styles.textareaSmall} placeholder="الوصف..." rows="3" />
                <div style={styles.actionButtons}>
                  <button onClick={() => handleUpdateSpecialization(spec.id)} style={styles.saveBtn}>
                    <FaSave style={{ marginLeft: '5px' }} /> حفظ التغيير
                  </button>
                  <button onClick={() => setEditingId(null)} style={styles.cancelBtn}>
                    <FaTimes style={{ marginLeft: '5px' }} /> إلغاء
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <div style={styles.cardHeader}>
                    <h3 style={styles.specName}>
                      {spec.name}
                    </h3>
                    <span style={styles.badge}>ID: {spec.id}</span>
                  </div>
                  <p style={styles.text}>
                    {spec.description || 'لا يوجد وصف تفصيلي متاح لهذا التخصص حالياً.'}
                  </p>
                </div>
                 <div style={styles.controlPanel}>
                  <button onClick={() => startEdit(spec)} style={styles.editBtnIcon}>
                    <FaEdit style={{ marginLeft: '5px' }} /> تعديل
                  </button>
                  <button onClick={() => handleDeleteSpecialization(spec.id)} style={styles.deleteBtnIcon}>
                    <FaTrashAlt style={{ marginLeft: '5px' }} /> حذف
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
        .spec-card:hover { transform: translateY(-5px); box-shadow: 0 12px 20px rgba(0,0,0,0.08) !important; border-color: #2563eb !important; }
      `}</style>
    </div>
  );
};

// التنسيقات الفخمة والثابتة
const styles = {
  container: { padding: '30px', maxWidth: '1280px', margin: '0 auto', direction: 'rtl', fontFamily: '"Segoe UI", Roboto, sans-serif' },
  headerSection: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '35px', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px' },
  iconBackground: { width: '56px', height: '56px', backgroundColor: '#eff6ff', borderRadius: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  mainTitle: { fontSize: '24px', fontWeight: '700', color: '#1e293b', margin: 0 },
  subTitle: { fontSize: '14px', color: '#64748b', margin: '5px 0 0 0' },
  formCard: { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '25px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)', marginBottom: '40px' },
  formTitle: { color: '#334155', marginBottom: '20px', fontWeight: '600', fontSize: '16px', display: 'flex', alignItems: 'center' },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr)) 160px', gap: '15px', alignItems: 'center' },
  inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  inputIcon: { position: 'absolute', right: '12px', color: '#94a3b8', fontSize: '14px' },
  input: { width: '100%', padding: '12px 38px 12px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', backgroundColor: '#f8fafc' },
  submitBtn: { height: '46px', width: '100%', borderRadius: '10px', border: 'none', backgroundColor: '#2563eb', color: '#fff', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  successAlert: { padding: '12px 16px', backgroundColor: '#ecfdf5', color: '#065f46', borderRadius: '10px', marginBottom: '20px', fontSize: '14px', display: 'flex', alignItems: 'center', border: '1px solid #a7f3d0' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' },
  card: { border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '200px' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', gap: '10px' },
  specName: { fontSize: '18px', color: '#0f172a', fontWeight: '700', margin: 0 },
  badge: { backgroundColor: '#f1f5f9', color: '#475569', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '600' },
  text: { color: '#475569', fontSize: '14px', lineHeight: '1.6', margin: 0 },
  controlPanel: { display: 'flex', gap: '10px', marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #f1f5f9', justifyContent: 'flex-end' },
 editBtnIcon: { border: 'none', backgroundColor: '#fffbeb', color: '#b45309', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: '13px' },
  deleteBtnIcon: { border: 'none', backgroundColor: '#fef2f2', color: '#b91c1c', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: '13px' },
  editForm: { display: 'flex', flexDirection: 'column', gap: '10px' },
  inputSmall: { padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' },
  textareaSmall: { padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' },
  actionButtons: { display: 'flex', gap: '8px', marginTop: '5px', justifyContent: 'flex-end' },
  saveBtn: { border: 'none', backgroundColor: '#10b981', color: '#fff', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center' },
  cancelBtn: { border: 'none', backgroundColor: '#64748b', color: '#fff', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center' },
  center: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', fontSize: '16px', gap: '10px' },
  errorCard: { display: 'flex', alignItems: 'center', padding: '16px 24px', backgroundColor: '#fef2f2', color: '#991b1b', borderRadius: '12px', border: '1px solid #fca5a5' }
};

export default Specialization;