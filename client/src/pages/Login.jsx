import React, { useState } from "react";
import {
  FaGlobe,
  FaArrowRight,
  FaLeaf,
  FaBuilding,
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next";
import farmlinkLogo from "../assets/Farmlink_Logo-bg.png";

const LoginPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state for eye toggle

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("userId", response.data.user.id);
      navigate(response.data.redirectTo);
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || t("loginFailed") });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    if (!selectedRole) {
      setErrors({ submit: "Please select a role (Farmer or Buyer) first." });
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/googlelogin",
        {
          tokenId: credentialResponse.credential,
          role: selectedRole,
        },
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("userId", response.data.user.id);
      navigate(response.data.redirectTo);
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || t("googleLoginFailed"),
      });
    }
  };

  const handleGoogleFailure = () => {
    setErrors({ submit: t("googleLoginFailed") });
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    // Main Container: Centers the card vertically and horizontally
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f1] p-4 lg:p-8 font-sans">
      {/* The Focused Card Container */}
      <div className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-900/10 flex flex-col lg:flex-row overflow-hidden border border-white">
        {/* --- LEFT SIDE: Visual Brand Panel (Reduced width/height) --- */}
        <div className="hidden lg:flex w-5/12 bg-gradient-to-br from-[#004B23] to-[#003117] p-12 text-white flex-col justify-between relative">
          {/* Decorative element */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#70B62D] rounded-full blur-[80px] opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-8">
              <img
                src={farmlinkLogo}
                alt="Farmlink Logo"
                className="w-12 h-12 object-contain"
              />
              <span className="text-xl font-extrabold tracking-tight">
                {t("appName")}
              </span>
            </div>
            <h2 className="text-4xl font-black leading-tight mb-4">
              {t("directTrade")}. <br />
              <span className="text-[#70B62D]">{t("betterPrices")}.</span>
            </h2>
            <p className="text-emerald-100/70 text-sm leading-relaxed">
              {/* Join the ecosystem designed for transparency and growth in
              agriculture. */}
              {t("taglineDesc")}
            </p>
          </div>

          <div className="relative z-10 space-y-3">
            <div className="flex items-center space-x-3 text-xs font-medium bg-white/5 p-3 rounded-xl border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#70B62D]"></div>
              <span>{t("mlAnalytics")}</span>
            </div>
            <p className="text-[11px] text-emerald-100/40 italic">
              © 2026 FarmL Global Platforms
            </p>
          </div>
        </div>

        {/* --- RIGHT SIDE: The Form Panel --- */}
        <div className="w-full lg:w-7/12 p-8 lg:p-14 bg-white">
          {/* Compact Top Header */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                {t("welcomeBack")}
              </h1>
              <p className="text-slate-400 text-sm font-medium">
                {/* Log in to your account */}
                {t("loginDesc")}
              </p>
            </div>
            {/* Minimal Language Switcher */}
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => changeLanguage("en")}
                className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${i18n.language === "en" ? "bg-white text-emerald-800 shadow-sm" : "text-slate-400"}`}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage("hi")}
                className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${i18n.language === "hi" ? "bg-white text-emerald-800 shadow-sm" : "text-slate-400"}`}
              >
                हिंदी
              </button>
              <button
                onClick={() => changeLanguage("mr")}
                className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${i18n.language === "mr" ? "bg-white text-emerald-800 shadow-sm" : "text-slate-400"}`}
              >
                मराठी
              </button>
            </div>
          </div>

          {errors.submit && (
            <div className="mb-6 p-3 bg-rose-50 border-l-4 border-rose-500 text-rose-700 text-xs font-bold rounded-md flex items-center">
              <span className="mr-2">⚠️</span> {errors.submit}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                {t("email")}
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={t("emailPlaceholder")}
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {t("password")}
                </label>
                <a
                  href="#"
                  className="text-[10px] text-emerald-700 font-bold hover:underline"
                >
                  {t("forgot")}
                </a>
              </div>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition-all text-sm"
                />
                {/* Password Eye Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 py-3.5 bg-[#004B23] hover:bg-black text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/10 active:scale-[0.98] disabled:opacity-50"
            >
              <span className="text-sm">
                {isLoading ? t("signingIn") : t("signIn")}
              </span>
              {!isLoading && <FaArrowRight className="text-xs opacity-50" />}
            </button>
          </form>

          {/* Role Selection (Horizontal layout for space) */}
          <div className="mt-8">
            <div className="relative flex items-center mb-6">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="mx-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                {t("identifyAs")}
              </span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => setSelectedRole("farmer")}
                className={`flex items-center justify-center space-x-2 py-3 rounded-xl border-2 transition-all ${
                  selectedRole === "farmer"
                    ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                    : "border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-100"
                }`}
              >
                <FaLeaf className="text-sm" />
                <span className="text-[11px] font-bold uppercase tracking-tight">
                  {t("farmer")}
                </span>
              </button>
              <button
                onClick={() => setSelectedRole("buyer")}
                className={`flex items-center justify-center space-x-2 py-3 rounded-xl border-2 transition-all ${
                  selectedRole === "buyer"
                    ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                    : "border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-100"
                }`}
              >
                <FaBuilding className="text-sm" />
                <span className="text-[11px] font-bold uppercase tracking-tight">
                  {t("buyer")}
                </span>
              </button>
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              useOneTap
              theme="outline"
              shape="rectangular"
              width="100%"
            />
          </div>

          <p className="text-center text-xs text-slate-400 font-medium">
            {t("noAccount")}{" "}
            <a
              href="/register"
              className="text-emerald-700 font-bold hover:underline"
            >
              {t("createAccount")}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
