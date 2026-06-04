import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="w-screen h-screen flex">

      {/* RIGHT SIDE */}
      <div className="w-[100%] flex items-center justify-center bg-slate-100">

        <div className="w-[380px] bg-white p-8 rounded-2xl shadow-xl">

          <h2 className="text-2xl font-bold mb-2 text-center">
            Forgot Password
          </h2>

          <p className="text-gray-500 mb-6 text-center">
            Enter your email address below
          </p>

          {/* EMAIL */}
          <div className="bg-gray-100 rounded-lg flex items-center px-3 py-3 mb-6">
            <input
              type="email"
              placeholder="Email Address"
              className="bg-transparent outline-none ml-2 w-full"
            />
          </div>

          {/* BUTTON */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-medium">
            Send Reset Link
          </button>

          {/* BACK */}
          <div className="text-center mt-5">
            <Link
              to="/login"
              className="text-sm text-blue-600 hover:underline"
            >
              Back to Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}