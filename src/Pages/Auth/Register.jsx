import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaShieldAlt,
  FaChartBar,
  FaUsers,
  FaEye,
  FaEyeSlash,
  FaPlus,
} from "react-icons/fa";
import hospitalImg from "../../assets/photo_2026-05-16_22-39-56.jpg";

export default function Register() {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    national_number: "",
    password: "",
    password_confirmation: "",
    gender: "",
    address: "",
    date_of_birth: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
    if (target.name === "password") setPasswordError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.phone || !form.national_number) {
      return setError("All fields with (*) are required.");
    }

    if (!passwordRegex.test(form.password)) {
      setPasswordError(
        "Password must contain uppercase, lowercase, numbers, special characters (min 8 chars).",
      );
      return;
    }

    if (form.password !== form.password_confirmation) {
      return setError("Passwords do not match.");
    }

    try {
      setLoading(true);
      const payload = {
        ...form,
        gender: form.gender.trim() !== "" ? form.gender : null,
        address: form.address.trim() !== "" ? form.address : null,
        date_of_birth:
          form.date_of_birth.trim() !== "" ? form.date_of_birth : null,
      };

      const { data } = await axios.post(
        "https://app-b4a68046-cc76-405f-b0be-527f1eae5608.cleverapps.io/api/register",
        payload,
      );

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("token_type", data.token_type || "Bearer");
      localStorage.setItem("user", JSON.stringify(data.user));

      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          Object.values(err.response?.data?.errors || {})[0]?.[0] ||
          "Registration failed, please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Fully Secure",
      desc: "Patient data protection",
    },
    {
      icon: <FaChartBar />,
      title: "Smart Control",
      desc: "Precise dynamic reports",
    },
    { icon: <FaUsers />, title: "Easy to Use", desc: "Comfortable modern UI" },
  ];

  return (
    <div className="min-h-screen lg:flex bg-slate-50 text-slate-800" dir="ltr">
      {/* LEFT PANEL - Clean Hospital Branding */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src={hospitalImg}
          alt="Hospital"
          className="w-full h-screen object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent flex flex-col justify-between p-12">
          <div className="flex items-center gap-3">
            <div className="w-[42px] h-[42px] rounded-xl bg-white flex items-center justify-center shadow-md">
              <FaPlus className="text-blue-600 text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-wide text-white">
                CarePlus
              </h1>
              <p className="text-blue-200 text-xs uppercase tracking-wider font-medium">
                Hospital Management System
              </p>
            </div>
          </div>

          <div className="bg-white/95 border border-slate-200 rounded-2xl p-6 grid grid-cols-3 gap-4 shadow-xl backdrop-blur-sm">
            {features.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-blue-600 text-2xl flex justify-center mb-2">
                  {item.icon}
                </div>
                <h3 className="font-bold text-sm text-slate-800">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - Bright White & Light Blue Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              Create Account
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Sign up to access the medical panel system
            </p>
          </div>

          {/* Alerts */}
          {success && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm font-medium">
              {success}
            </div>
          )}
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}
          {passwordError && (
            <div className="p-4 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl text-sm font-medium">
              {passwordError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              ["text", "name", "Full Name *"],
              ["email", "email", "Email Address *"],
              ["tel", "phone", "Phone Number *"],
              ["text", "national_number", "National ID *"],
            ].map(([type, name, placeholder]) => (
              <div key={name}>
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={form[name]}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 transition-all placeholder:text-slate-400 text-left text-sm"
                />
              </div>
            ))}

            {/* Passwords */}
            {[
              ["password", showPass, setShowPass, "Password *"],
              [
                "password_confirmation",
                showConfirmPass,
                setShowConfirmPass,
                "Confirm Password *",
              ],
            ].map(([name, show, setShow, placeholder]) => (
              <div key={name} className="relative">
                <input
                  type={show ? "text" : "password"}
                  name={name}
                  placeholder={placeholder}
                  value={form[name]}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 transition-all placeholder:text-slate-400 text-left text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {show ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            ))}

            {/* Gender & Date */}
            <div className="grid grid-cols-2 gap-4">
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 transition-all text-left text-sm"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <input
                type="date"
                name="date_of_birth"
                value={form.date_of_birth}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-600 transition-all text-left text-sm"
              />
            </div>

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 transition-all placeholder:text-slate-400 text-left text-sm"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white p-3 rounded-xl font-bold transition duration-200 shadow-md shadow-blue-500/10 mt-2 text-sm"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            <p className="text-center text-sm text-slate-500 pt-2">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 font-bold ml-1 hover:underline"
              >
                Sign In
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
