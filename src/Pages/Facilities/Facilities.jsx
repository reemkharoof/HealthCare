import React, { useState, useEffect } from 'react';
import axios from 'axios';
// استيراد الأيقونات الاحترافية الكاملة للعمليات الأربعة ولحالات التحميل والأخطاء
import { 
  FaHospital, 
  FaClinicMedical, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaBuilding, 
  FaPlus, 
  FaTrashAlt, 
  FaEdit, 
  FaSave, 
  FaTimes, 
  FaSpinner, 
  FaExclamationTriangle, 
  FaCheckCircle 
} from 'react-icons/fa';

const FacilitiesPage = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States الخاصة بالفورم
  const [name, setName] = useState('');
  const [facilityType, setFacilityType] = useState('hospital');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  
  // States الخاصة بالتعديل
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editType, setEditType] = useState('hospital');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');

  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState('');

  // دالة جلب التوكن
  const getAuthToken = () => {
    let token = localStorage.getItem('access_token');
    if (!token) {
      token = "2|7Gv2YjC9svZTZpuFiLYzpCWKDimnk0fu5pMkmRMd67707522";
    }
    return token;
  };

  // 1️⃣ [GET] جلب كل المنشآت الطبية
  const getFacilitiesData = async () => {
    try {
      const response = await axios.get('https://app-b4a68046-cc76-405f-b0be-527f1eae5608.cleverapps.io/api/facilities', {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Accept': 'application/json'
        }
      });
      if (response.data && response.data.success) {
        setFacilities(response.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('حدث خطأ في جلب البيانات، تأكد من تسجيل الدخول!');
      setLoading(false);
    }
  };

  useEffect(() => {
    getFacilitiesData();
  }, []);

  // 2️⃣ [POST] إضافة منشأة جديدة
  const handleAddFacility = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormSuccess('');

    try {
      const newFacilityData = {
        name,
        facility_type: facilityType,
        phone_number: phoneNumber,
        address,
        parent_id: null
      };

      await axios.post('https://app-b4a68046-cc76-405f-b0be-527f1eae5608.cleverapps.io/api/facilities', newFacilityData, {
        headers: {
          'Authorization':` Bearer ${getAuthToken()}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      setFormSuccess('تمت إضافة المنشأة بنجاح');
      setName(''); setPhoneNumber(''); setAddress('');
      getFacilitiesData();
    } catch (err) {
      console.error(err);
      alert('فشلت عملية الإضافة، تأكد من إدخال البيانات بالشكل الصحيح!');
    } finally {
      setFormLoading(false);
    }
  };

  // 3️⃣ [DELETE] حذف منشأة
  const handleDeleteFacility = async (id) => {
    if (window.confirm('هل أنتِ متأكدة من حذف هذه المنشأة الطبية نهائياً؟')) {
      try {
        await axios.delete(`https://app-b4a68046-cc76-405f-b0be-527f1eae5608.cleverapps.io/api/facilities/${id}`, {
          headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
            'Accept': 'application/json'
          }
        });
        getFacilitiesData();
      } catch (err) {
        console.error(err);
        alert('فشل الحذف، قد لا تملكين الصلاحية.');
      }
    }
  };

  // تفعيل وضع التعديل
  const startEdit = (facility) => {
    setEditingId(facility.id);
    setEditName(facility.name);
    setEditType(facility.facility_type);
    setEditPhone(facility.phone_number);
    setEditAddress(facility.address);
  };
 // 4️⃣ [PUT] حفظ التعديلات وإرسالها للباك إند
  const handleUpdateFacility = async (id) => {
    try {
      const updatedData = {
        name: editName,
        facility_type: editType,
        phone_number: editPhone,
        address: editAddress,
        parent_id: null
      };

      await axios.put(`https://app-b4a68046-cc76-405f-b0be-527f1eae5608.cleverapps.io/api/facilities/${id}`, updatedData, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      setEditingId(null);
      getFacilitiesData();
    } catch (err) {
      console.error(err);
      alert('فشل تحديث البيانات على السيرفر.');
    }
  };

  if (loading) return (
    <div style={styles.center}>
      <FaSpinner className="spinner" style={{ marginLeft: '10px' }} /> جاري تحميل لوحة التحكم...
    </div>
  );
  
  if (error) return (
    <div style={{ ...styles.center, color: '#dc2626' }}>
      <FaExclamationTriangle style={{ marginLeft: '10px' }} /> {error}
    </div>
  );

  return (
    <div style={styles.container}>
      
      {/* قسم الإضافة */}
      <div style={styles.formCard}>
        <h3 style={styles.formTitle}>
          <FaPlus style={{ marginLeft: '8px', color: '#007bff' }} /> إضافة منشأة طبية جديدة
        </h3>
        {formSuccess && (
          <div style={styles.successAlert}>
            <FaCheckCircle style={{ marginLeft: '8px' }} /> {formSuccess}
          </div>
        )}
        
        <form onSubmit={handleAddFacility} style={styles.formGrid}>
          <input type="text" placeholder="اسم المنشأة" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} />
          <input type="text" placeholder="العنوان" value={address} onChange={(e) => setAddress(e.target.value)} required style={styles.input} />
          <input type="text" placeholder="رقم الهاتف" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required style={styles.input} />
          <select value={facilityType} onChange={(e) => setFacilityType(e.target.value)} style={styles.select}>
            <option value="hospital">مشفى (Hospital)</option>
            <option value="clinic">عيادة (Clinic)</option>
            <option value="laboratory">مختبر (Laboratory)</option>
          </select>
          <button type="submit" disabled={formLoading} style={styles.submitBtn}>
            {formLoading ? <FaSpinner className="spinner" /> : 'حفظ المنشأة الجديدة'}
          </button>
        </form>
      </div>

      <hr style={{ margin: '40px 0', border: '1px solid #e2e8f0' }} />

      {/* قسم عرض وإدارة البطاقات */}
      <h2 style={styles.title}>
        <FaHospital style={{ marginLeft: '10px', color: '#007bff' }} /> لوحة إدارة المنشآت الحالية
      </h2>
      
      <div style={styles.grid}>
        {facilities.map((facility) => (
          <div key={facility.id} style={styles.card}>
            
            {editingId === facility.id ? (
              /* واجهة التعديل المباشر جوات الكارد */
              <div style={styles.editForm}>
                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} style={styles.inputSmall} />
                <input type="text" value={editAddress} onChange={(e) => setEditAddress(e.target.value)} style={styles.inputSmall} />
                <input type="text" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} style={styles.inputSmall} />
                <select value={editType} onChange={(e) => setEditType(e.target.value)} style={styles.selectSmall}>
                  <option value="hospital">مشفى</option>
                  <option value="clinic">عيادة</option>
                  <option value="laboratory">مختبر</option>
                </select>
              <div style={styles.actionButtons}>
                  <button onClick={() => handleUpdateFacility(facility.id)} style={styles.saveBtn}>
                    <FaSave style={{ marginLeft: '5px' }} /> حفظ
                  </button>
                  <button onClick={() => setEditingId(null)} style={styles.cancelBtn}>
                    <FaTimes style={{ marginLeft: '5px' }} /> إلغاء
                  </button>
                </div>
              </div>
            ) : (
              /* واجهة العرض العادية والمعتمدة سابقاً */
              <>
                <span style={{ ...styles.badge, backgroundColor: facility.facility_type === 'hospital' ? '#28a745' : '#17a2b8' }}>
                  {facility.facility_type === 'hospital' ? (
                    <><FaHospital style={{ marginLeft: '5px' }} /> مشفى رئيسي</>
                  ) : (
                    <><FaClinicMedical style={{ marginLeft: '5px' }} /> {facility.facility_type}</>
                  )}
                </span>

                <h3 style={styles.facilityName}>{facility.name}</h3>
                <p style={styles.text}><FaMapMarkerAlt style={styles.icon} /> <strong>العنوان:</strong> {facility.address}</p>
                <p style={styles.text}><FaPhoneAlt style={styles.icon} /> <strong>الهاتف:</strong> {facility.phone_number}</p>

                {facility.parent && (
                  <div style={styles.parentBox}>
                    <FaBuilding style={{ marginLeft: '8px', color: '#007bff' }} />
                    <small>تابعة لـ: <strong>{facility.parent.name}</strong></small>
                  </div>
                )}

                {/* أزرار التحكم بالسيرفر */}
                <div style={styles.controlPanel}>
                  <button onClick={() => startEdit(facility)} style={styles.editBtnIcon}>
                    <FaEdit style={{ marginLeft: '5px' }} /> تعديل
                  </button>
                  <button onClick={() => handleDeleteFacility(facility.id)} style={styles.deleteBtnIcon}>
                    <FaTrashAlt style={{ marginLeft: '5px' }} /> حذف
                  </button>
                </div>
              </>
            )}

          </div>
        ))}
      </div>
      
      {/* كود CSS بسيط للأنيميشن الخاص بأيقونة التحميل */}
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .spinner { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
};

// التنسيقات الكاملة
const styles = {
  container: { padding: '20px', maxWidth: '1200px', margin: '0 auto', direction: 'rtl', fontFamily: 'sans-serif' },
  title: { display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#007bff', marginBottom: '40px', fontWeight: 'bold' },
  formCard: { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '25px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' },
  formTitle: { color: '#334155', marginBottom: '20px', fontWeight: 'bold', fontSize: '18px', display: 'flex', alignItems: 'center' },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', alignItems: 'center' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' },
  select: { padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', backgroundColor: '#fff', outline: 'none' },
  submitBtn: { padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#007bff', color: '#fff', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  successAlert: { padding: '12px', backgroundColor: '#d1e7dd', color: '#0f5132', borderRadius: '8px', marginBottom: '15px', fontSize: '14px', display: 'flex', alignItems: 'center' },
grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' },
  card: { border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', position: 'relative', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  badge: { position: 'absolute', top: '15px', left: '15px', color: '#fff', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', display: 'flex', alignItems: 'center' },
  facilityName: { fontSize: '20px', color: '#1a202c', marginTop: '25px', marginBottom: '15px', fontWeight: 'bold' },
  text: { display: 'flex', alignItems: 'center', margin: '6px 0', color: '#4a5568', fontSize: '14px' },
  icon: { marginLeft: '8px', color: '#718096', fontSize: '16px' },
  parentBox: { display: 'flex', alignItems: 'center', marginTop: '15px', padding: '10px', backgroundColor: '#f7fafc', borderRadius: '8px' },
  controlPanel: { display: 'flex', gap: '10px', marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #f1f5f9', justifyContent: 'flex-end' },
  editBtnIcon: { border: 'none', backgroundColor: '#fef3c7', color: '#d97706', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: '13px' },
  deleteBtnIcon: { border: 'none', backgroundColor: '#fee2e2', color: '#dc2626', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: '13px' },
  editForm: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' },
  inputSmall: { padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' },
  selectSmall: { padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' },
  actionButtons: { display: 'flex', gap: '8px', marginTop: '5px' },
  saveBtn: { border: 'none', backgroundColor: '#10b981', color: '#fff', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center' },
  cancelBtn: { border: 'none', backgroundColor: '#6b7280', color: '#fff', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center' },
  center: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', fontSize: '18px', fontWeight: 'bold' }
};

export default FacilitiesPage;