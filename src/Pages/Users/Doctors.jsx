// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaUserMd, FaStethoscope, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

// // مكون دائرة التحميل
// const LoadingSpinner = () => (
//   <div className="flex justify-center items-center py-20">
//     <div className="w-12 h-12 border-4 border-gray-200 border-top-primary rounded-full animate-span"></div>
//   </div>
// );

// const API_BASE_URL = "https://app-b4a68046-cc76-405f-b0be-527f1eae5608.cleverapps.io/api";

// function Doctors() {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const config = {
//           headers: { Authorization: token ? `Bearer ${token}` : "" }
//         };
        
//         const response = await axios.get(`${API_BASE_URL}/doctors`, config);
        
//         if (response.data && response.data.success) {
//           setDoctors(response.data.data);
//         } else {
//           setDoctors(response.data);
//         }
//       } catch (err) {
//         console.error("Error fetching doctors:", err);
//         setError("تعذر تحميل قائمة الأطباء حالياً.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDoctors();
//   }, []);

//   if (loading) return <LoadingSpinner />;

//   if (error) {
//     return <div className="text-center mt-10 text-red-500 font-bold">{error}</div>;
//   }

//   return (
//     <div className="p-6 max-w-7xl mx-auto min-h-screen bg-authBg">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-textDark flex items-center gap-2">
//           <FaUserMd className="text-primary text-3xl" /> الكادر الطبي المتاح
//         </h1>
//       </div>

//       {doctors.length === 0 ? (
//         <div className="text-center py-12 text-textMuted bg-cardBg rounded-2xl border border-cardBorder">
//           لا يوجد أطباء مضافين في النظام حالياً.
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {doctors.map((doctor) => (
//             <div 
//               key={doctor.id} 
//               className="bg-cardBg rounded-2xl border border-cardBorder p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col group"
//             >
//               <div className="flex justify-center my-4">
//                 <div className="w-20 h-20 rounded-full bg-badgeBlue flex items-center justify-center border-2 border-blue-100">
//                   <FaUserMd className="text-primary text-4xl" />
//                 </div>
//               </div>

//               <div className="text-center mb-4 flex-1">
//                 <h3 className="text-lg font-bold text-textDark mb-1">
//                   د. {doctor.profile?.full_name || "طبيب غير معرف"}
//                 </h3>
                
//                 <p className="text-sm font-medium text-blue-600 bg-badgeBlue px-3 py-1 rounded-full inline-flex items-center gap-1.5 mt-1">
//                   <FaStethoscope className="text-xs" />
//                   {doctor.work_configuration?.specialization?.name || "طبيب عام"}
//                 </p>
                
//                 <p className="text-xs text-textMuted mt-2">
//                   القسم: <span className="text-textDark font-medium">{doctor.work_configuration?.facility_department?.department?.name || "العيادات العامة"}</span>
//                 </p>
//               </div>

//               <button 
//                 onClick={() => navigate(`/doctors/${doctor.id}`, { state: { doctor } })}
//                 className="w-full bg-primary hover:bg-blue-700 text-white text-sm py-2.5 rounded-xl font-medium transition-colors duration-150 shadow-sm cursor-pointer"
//               >
//                 عرض الملف الطبي
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Doctors;




import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaStethoscope, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { ClipLoader } from "react-spinners"; // تم إضافة المكتبة هنا
import LoadingSpinner from "../../components/LoadingSpinner";

const API_BASE_URL = "https://app-b4a68046-cc76-405f-b0be-527f1eae5608.cleverapps.io/api";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: token ? `Bearer ${token}` : "" }
        };
        
        const response = await axios.get(`${API_BASE_URL}/doctors`, config);
        
        if (response.data && response.data.success) {
          setDoctors(response.data.data);
        } else {
          setDoctors(response.data);
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("تعذر تحميل قائمة الأطباء حالياً، تأكدي من الاتصال بالباك إند.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) return <LoadingSpinner/>;

  if (error) {
    return (
      <div className="bg-dangerRedBg border border-dangerRed text-dangerRed px-4 py-3 rounded-xl max-w-2xl mx-auto mt-10 text-center font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-authBg">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-textDark flex items-center gap-2">
            <FaUserMd className="text-primary text-3xl" />
            الكادر الطبي المتاح
          </h1>
          <p className="text-textMuted text-sm mt-1">استعراض قائمة الأطباء وتخصصاتهم الطبية داخل المستشفى</p>
        </div>
      </div>

      {doctors.length === 0 ? (
        <div className="text-center py-12 text-textMuted bg-cardBg rounded-2xl shadow-sm border border-cardBorder">
          لا يوجد أطباء مضافين في النظام حالياً.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <div 
              key={doctor.id} 
              className="bg-cardBg rounded-2xl border border-cardBorder p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-100 group-hover:bg-primary transition-colors duration-200"></div>
              
              <div className="flex justify-center my-4">
                <div className="w-20 h-20 rounded-full bg-badgeBlue flex items-center justify-center border-2 border-blue-100">
                  <FaUserMd className="text-primary text-4xl" />
                </div>
              </div>

              <div className="text-center mb-4 flex-1">
                <h3 className="text-lg font-bold text-textDark mb-1">
                  د. {doctor.profile?.full_name || "طبيب غير معرف"}
                </h3>
                
                <p className="text-sm font-medium text-blue-600 bg-badgeBlue px-3 py-1 rounded-full inline-flex items-center gap-1.5 mt-1">
                  <FaStethoscope className="text-xs" />
              {doctor.work_configuration?.specialization?.name || "طبيب عام"}
                </p>
                
                <p className="text-xs text-textMuted mt-2">
                  القسم: <span className="text-textDark font-medium">{doctor.work_configuration?.facility_department?.department?.name || "العيادات العامة"}</span>
                </p>
              </div>

              <hr className="border-cardBorder my-3" />

              <div className="flex flex-col gap-2 text-xs text-textMuted px-1 mb-4">
                <div className="flex items-center gap-2">
                  <FaPhoneAlt className="text-gray-400 shrink-0" />
                  <span className="truncate">{doctor.profile?.phone || "لا يوجد رقم متاح"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-gray-400 shrink-0" />
                  <span className="truncate">
                    {doctor.profile?.address ?` السكن: ${doctor.profile.address}` : "العنوان غير محدد"}
                  </span>
                </div>
              </div>

              <button 
                onClick={() => navigate(`/doctors/${doctor.id}`, { state: { doctor } })}
                className="w-full bg-primary hover:bg-blue-700 text-white text-sm py-2.5 rounded-xl font-medium transition-colors duration-150 shadow-sm cursor-pointer"
              >
                عرض الملف الطبي
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Doctors;