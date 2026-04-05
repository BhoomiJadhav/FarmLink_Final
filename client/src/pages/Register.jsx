import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next";
import {
  FaLeaf,
  FaBuilding,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaInfoCircle,
} from "react-icons/fa";
import farmlinkLogo from "../assets/Farmlink_Logo-bg.png";

const RegisterPage = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "farmer",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { t, i18n } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        },
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("userId", response.data.user.id);
      navigate(response.data.redirectTo);
    } catch (error) {
      setErrors({
        submit:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    if (!selectedRole) {
      setErrors({
        submit:
          "Please select your identity (Farmer or Buyer) for Google Signup.",
      });
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
      setErrors({ submit: "Google authentication failed. Please try again." });
    }
  };

  const handleGoogleFailure = () => {
    setErrors({ submit: "Google authentication failed. Please try again." });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f1] p-4 lg:p-6 font-sans antialiased">
      {/* Centered Focused Card */}
      <div className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-900/10 flex flex-col lg:flex-row overflow-hidden border border-white">
        {/* --- LEFT SIDE: Brand Visual (Consistency with Login) --- */}
        <div className="hidden lg:flex w-5/12 bg-gradient-to-br from-[#004B23] to-[#003117] p-12 text-white flex-col justify-between relative">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#70B62D] rounded-full blur-[80px] opacity-20"></div>

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
              {t("startJourney")} <br />
              <span className="text-[#70B62D]">{t("digitalHarvest")}</span>
            </h2>
            <p className="text-emerald-100/70 text-sm leading-relaxed max-w-xs">
              {t("registerDesc")}
            </p>
          </div>

          <div className="relative z-10">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-xs font-medium italic opacity-60">
                {/* "The best way to predict the future of farming is to create it." */}
                {t("quote")}
              </p>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: Registration Form --- */}

        <div className="w-full lg:w-7/12 p-8 lg:p-12 overflow-y-auto max-h-[90vh]">
          <div className="flex justify-end mb-4">
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => i18n.changeLanguage("en")}
                className={`px-3 py-1 text-[10px] font-bold rounded-lg ${
                  i18n.language === "en"
                    ? "bg-white text-emerald-800"
                    : "text-slate-400"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => i18n.changeLanguage("hi")}
                className={`px-3 py-1 text-[10px] font-bold rounded-lg ${
                  i18n.language === "hi"
                    ? "bg-white text-emerald-800"
                    : "text-slate-400"
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => i18n.changeLanguage("mar")}
                className={`px-3 py-1 text-[10px] font-bold rounded-lg ${
                  i18n.language === "mr"
                    ? "bg-white text-emerald-800"
                    : "text-slate-400"
                }`}
              >
                मराठी
              </button>
            </div>
          </div>
          <div className="mb-8">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
              {t("createAccount")}
            </h1>
            <p className="text-slate-400 text-sm font-medium tracking-tight">
              {t("joinCommunity")}
            </p>
          </div>

          {errors.submit && (
            <div className="mb-6 p-3 bg-rose-50 border-l-4 border-rose-500 text-rose-700 text-xs font-bold rounded flex items-center">
              <span className="mr-2">⚠️</span> {errors.submit}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                {t("fullName")}
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input
                  name="fullName"
                  type="text"
                  placeholder={t("fullNamePlaceholder")}
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-2.5 bg-slate-50 border ${errors.fullName ? "border-rose-300" : "border-slate-200"} rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition-all text-sm`}
                />
              </div>
              {errors.fullName && (
                <p className="text-[10px] text-rose-500 font-bold ml-1">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                {t("email")}
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input
                  name="email"
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-2.5 bg-slate-50 border ${errors.email ? "border-rose-300" : "border-slate-200"} rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition-all text-sm`}
                />
              </div>
              {errors.email && (
                <p className="text-[10px] text-rose-500 font-bold ml-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  {t("password")}
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-11 pr-11 py-2.5 bg-slate-50 border ${errors.password ? "border-rose-300" : "border-slate-200"} rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition-all text-sm`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[10px] text-rose-500 font-bold ml-1">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  {t("confirmPassword")}
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-11 pr-11 py-2.5 bg-slate-50 border ${errors.confirmPassword ? "border-rose-300" : "border-slate-200"} rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition-all text-sm`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-[10px] text-rose-500 font-bold ml-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Role Selection */}
            <div className="py-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">
                {t("registerAs")}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.role === "farmer" ? "border-emerald-600 bg-emerald-50 text-emerald-700" : "border-slate-100 bg-slate-50 text-slate-400"}`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="farmer"
                    checked={formData.role === "farmer"}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <FaLeaf className="mr-2 text-xs" />{" "}
                  <span className="text-[10px] font-bold uppercase">
                    {t("farmer")}
                  </span>
                </label>
                <label
                  className={`flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.role === "buyer" ? "border-emerald-600 bg-emerald-50 text-emerald-700" : "border-slate-100 bg-slate-50 text-slate-400"}`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="buyer"
                    checked={formData.role === "buyer"}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <FaBuilding className="mr-2 text-xs" />{" "}
                  <span className="text-[10px] font-bold uppercase">
                    {t("buyer")}
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 py-3.5 bg-[#004B23] hover:bg-black text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/10 active:scale-[0.98] disabled:opacity-50 mt-4"
            >
              <span className="text-sm">
                {isLoading ? t("creatingAccount") : t("signUp")}
              </span>
              {!isLoading && <FaArrowRight className="text-xs opacity-50" />}
            </button>
          </form>

          {/* Social Signup */}
          <div className="mt-8">
            <div className="relative flex items-center mb-6">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="mx-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                {t("orSignupWith")}
              </span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>

            {/* Quick Role Select for Google */}
            <div className="flex justify-center gap-2 mb-4">
              {["farmer", "buyer"].map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all ${selectedRole === role ? "bg-emerald-800 text-white shadow-md" : "bg-slate-100 text-slate-400"}`}
                >
                  {role}
                </button>
              ))}
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
                useOneTap
                theme="outline"
                shape="rectangular"
                width="340px"
              />
            </div>
          </div>

          <p className="mt-8 text-center text-[10px] text-slate-400 font-medium">
            {t("agreeTerms")}{" "}
            <a href="/termsofservice" className="text-emerald-700 underline">
              {t("terms")}
            </a>{" "}
            &{" "}
            <a href="/privacypolicy" className="text-emerald-700 underline">
              {t("privacy")}
            </a>
          </p>

          <p className="mt-4 text-center text-xs text-slate-400 font-medium">
            {t("alreadyAccount")}{" "}
            <a
              href="/login"
              className="text-emerald-700 font-bold hover:underline ml-1"
            >
              {t("signIn")}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
