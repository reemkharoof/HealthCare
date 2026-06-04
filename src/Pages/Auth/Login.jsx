import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.email || !form.password) {
      return setError("Please enter your email and password.");
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        "https://app-b4a68046-cc76-405f-b0be-527f1eae5608.cleverapps.io/api/login",
        form
      );

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("token_type", data.token_type || "Bearer");
      localStorage.setItem("user", JSON.stringify(data.user));

      setSuccess("Logged in successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 
        err.response?.data?.error || 
        "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 text-slate-800" dir="ltr">
      
      <div className="w-full max-w-md bg-white border border-slate-200 p-8 rounded-2xl shadow-sm space-y-6">
        
        <div>
          <h2 className="text-2xl font-bold text-slate-900 text-left">Sign In</h2>
          <p className="text-slate-400 text-sm mt-1 text-left">Enter your credentials to access the system</p>
        </div>

        {success && <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl text-sm">{success}</div>}
        {error && <div className="p-3 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email */}
          <div>
            <input 
              type="email" 
              name="email" 
              placeholder="mustafa.nouh@example.com" 
              value={form.email} 
              onChange={handleChange} 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-blue-500 text-slate-800 text-left text-sm" 
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input 
              type={showPass ? "text" : "password"} 
              name="password" 
              placeholder="Password" 
              value={form.password} 
              onChange={handleChange} 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 pr-12 focus:outline-none focus:border-blue-500 text-slate-800 text-left text-sm" 
            />
            <button 
              type="button" 
              onClick={() => setShowPass(!showPass)} 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex justify-end">
            <a href="/forgetpassword" className="text-xs text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white p-3 rounded-xl font-semibold transition duration-200 text-sm"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
       <p className="text-center text-sm text-slate-400 pt-2">
            Don't have an account? <a href="/register" className="text-blue-600 font-semibold hover:underline">Sign Up</a>
          </p>

        </form>
      </div>
    </div>
  );
}