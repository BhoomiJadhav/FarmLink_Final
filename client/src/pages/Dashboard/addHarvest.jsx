import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/topNav.jsx";
import ProfileModal from "../../components/profileModal.jsx";
import api from "../../api/axios";

const API_BASE = "http://localhost:5000/api";

const AddHarvestListing = () => {
  // Functional Navbar States
  const [profileData, setProfileData] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Form States
  const [form, setForm] = useState({
    cropName: "",
    variety: "",
    quantityAvailable: "",
    harvestedMonth: "",
    harvestedYear: "",
    cropCondition: "",
    sortingStatus: "",
    moistureLevel: "NOT_TESTED",
    minPrice: "",
    maxPrice: "",
    addressLine: "",
    villageOrCity: "",
    district: "",
    state: "",
    pincode: "",
    declarationAccepted: false,
  });

  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Fetch Profile Data for Topbar Functionality
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await api.get("/profile/me");
        setProfileData(res.data);
      } catch (err) {
        console.error("Failed to load profile for Topbar:", err);
      }
    }
    loadProfile();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) return alert("Max 5 images");
    setImages(files);
  };

  const isFormFilled =
    form.cropName.trim() !== "" &&
    form.quantityAvailable !== "" &&
    form.harvestedMonth !== "" &&
    form.harvestedYear !== "" &&
    form.cropCondition !== "" &&
    form.sortingStatus !== "" &&
    form.minPrice !== "" &&
    form.maxPrice !== "" &&
    form.addressLine.trim() !== "" &&
    form.villageOrCity.trim() !== "" &&
    form.district.trim() !== "" &&
    form.state.trim() !== "" &&
    form.pincode.trim() !== "";

  const isFormValid = isFormFilled && form.declarationAccepted;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid)
      return alert("Please fill all fields and accept the declaration.");

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append(
        "harvest",
        JSON.stringify({
          cropName: form.cropName,
          variety: form.variety,
          quantityAvailable: Number(form.quantityAvailable),
          harvestedMonth: form.harvestedMonth,
          harvestedYear: Number(form.harvestedYear),
        }),
      );
      formData.append(
        "qualityDetails",
        JSON.stringify({
          cropCondition: form.cropCondition,
          sortingStatus: form.sortingStatus,
          moistureLevel: form.moistureLevel,
        }),
      );
      formData.append(
        "expectedPrice",
        JSON.stringify({
          minPricePerUnit: Number(form.minPrice),
          maxPricePerUnit: Number(form.maxPrice),
        }),
      );
      formData.append(
        "delivery",
        JSON.stringify({
          pickupLocation: {
            addressLine: form.addressLine,
            villageOrCity: form.villageOrCity,
            district: form.district,
            state: form.state,
            pincode: form.pincode,
          },
        }),
      );
      images.forEach((img) => formData.append("images", img));

      const res = await fetch(`${API_BASE}/harvest-listings/create`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        alert("Harvest Listed Successfully ✅");

        navigate("/farmer/harvest-listings"); // 🔥 redirect
      } else {
        alert(data.message || "Server Error (500)");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Error submitting listing.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle =
    "w-full bg-[#f0f4f1] border border-[#d1dcd3] rounded-lg px-4 py-3 text-[14px] text-[#1a2e1f] placeholder-[#8ca391] focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981] transition-all shadow-sm";
  const navigate = useNavigate();
  return (
    <div className="flex bg-[#f4f6f8] h-screen overflow-hidden font-sans text-slate-800">
      <div className="h-full flex-shrink-0 z-30 shadow-2xl bg-white">
        <Sidebar onLogout={logout} />
      </div>

      <main className="flex-1 h-full overflow-y-auto relative scroll-smooth flex flex-col">
        {/* COMPACT TOPBAR - NO MARGIN, FULLY FUNCTIONAL */}
        <div className="flex-shrink-0 z-50">
          <Topbar
            profileData={profileData}
            onOpenProfile={() => setShowProfileModal(true)}
            onLogout={logout}
          />
        </div>

        {/* HERO SECTION */}
        <div className="w-full bg-gradient-to-r from-[#064e3b] via-[#065f46] to-[#064e3b] animate-bg-pan pt-16 pb-32 px-4 text-center relative shadow-inner">
          <div className="relative z-10 flex flex-col items-center justify-center">
            <h1 className="text-3xl md:text-[40px] font-bold text-white tracking-tight font-serif mb-2">
              Add Harvest Listing
            </h1>
            <p className="text-[15px] text-[#d1fae5] font-light max-w-xl mx-auto">
              List your harvested crops and connect with buyers faster.
            </p>
          </div>
        </div>

        {/* FORM CONTAINER */}
        <div className="max-w-[850px] w-full mx-auto px-6 pb-24 -mt-16 relative z-20">
          <form onSubmit={handleSubmit} className="space-y-8">
            <Section
              title="Crop Details"
              step="1"
              icon={
                <svg
                  className="w-5 h-5 text-[#059669]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 22v-9m0 0c-2.5 0-5 2-5 6h10c0-4-2.5-6-5-6zm0 0c2.5 0 5-2 5-6H7c0 4 2.5 6 5 6z"
                  />
                </svg>
              }
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#344d3a]">
                    Crop Name <span className="text-[#ef4444]">*</span>
                  </label>
                  <input
                    name="cropName"
                    value={form.cropName}
                    placeholder="e.g. Wheat, Rice"
                    className={inputStyle}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#344d3a]">
                    Variety
                  </label>
                  <input
                    name="variety"
                    value={form.variety}
                    placeholder="e.g. Basmati, Sharbati"
                    className={inputStyle}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#344d3a]">
                    Quantity (kg) <span className="text-[#ef4444]">*</span>
                  </label>
                  <input
                    name="quantityAvailable"
                    value={form.quantityAvailable}
                    type="number"
                    placeholder="500"
                    className={inputStyle}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#344d3a]">
                    Harvest Month <span className="text-[#ef4444]">*</span>
                  </label>
                  <select
                    name="harvestedMonth"
                    value={form.harvestedMonth}
                    className={inputStyle}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Month
                    </option>
                    {[
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ].map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#344d3a]">
                    Harvest Year <span className="text-[#ef4444]">*</span>
                  </label>
                  <input
                    name="harvestedYear"
                    value={form.harvestedYear}
                    placeholder="e.g. 2024"
                    type="number"
                    className={inputStyle}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </Section>

            <Section
              title="Quality Details"
              step="2"
              icon={
                <svg
                  className="w-5 h-5 text-[#059669]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              }
            >
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#344d3a]">
                    Condition <span className="text-[#ef4444]">*</span>
                  </label>
                  <select
                    name="cropCondition"
                    value={form.cropCondition}
                    className={inputStyle}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="FRESH">Fresh</option>
                    <option value="STORED">Stored</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#344d3a]">
                    Sorting <span className="text-[#ef4444]">*</span>
                  </label>
                  <select
                    name="sortingStatus"
                    value={form.sortingStatus}
                    className={inputStyle}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="SORTED">Sorted</option>
                    <option value="PARTIAL">Partial</option>
                    <option value="NOT_SORTED">Not Sorted</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#344d3a]">
                    Moisture
                  </label>
                  <select
                    name="moistureLevel"
                    value={form.moistureLevel}
                    className={inputStyle}
                    onChange={handleChange}
                  >
                    <option value="NOT_TESTED">Not Tested</option>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
              </div>
            </Section>

            <Section
              title="Expected Pricing"
              step="3"
              icon={
                <svg
                  className="w-5 h-5 text-[#059669]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#344d3a]">
                    Min Price (₹) <span className="text-[#ef4444]">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8ca391] font-medium">
                      ₹
                    </span>
                    <input
                      name="minPrice"
                      value={form.minPrice}
                      type="number"
                      className={`${inputStyle} pl-8`}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#344d3a]">
                    Max Price (₹) <span className="text-[#ef4444]">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8ca391] font-medium">
                      ₹
                    </span>
                    <input
                      name="maxPrice"
                      value={form.maxPrice}
                      type="number"
                      className={`${inputStyle} pl-8`}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </Section>

            <Section
              title="Pickup Location"
              step="4"
              icon={
                <svg
                  className="w-5 h-5 text-[#059669]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
              }
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[13px] font-semibold text-[#344d3a]">
                    Address Line <span className="text-[#ef4444]">*</span>
                  </label>
                  <input
                    name="addressLine"
                    value={form.addressLine}
                    className={inputStyle}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#344d3a]">
                    Village / City <span className="text-[#ef4444]">*</span>
                  </label>
                  <input
                    name="villageOrCity"
                    value={form.villageOrCity}
                    className={inputStyle}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#344d3a]">
                    District <span className="text-[#ef4444]">*</span>
                  </label>
                  <input
                    name="district"
                    value={form.district}
                    className={inputStyle}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#344d3a]">
                    State <span className="text-[#ef4444]">*</span>
                  </label>
                  <input
                    name="state"
                    value={form.state}
                    className={inputStyle}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#344d3a]">
                    Pincode <span className="text-[#ef4444]">*</span>
                  </label>
                  <input
                    name="pincode"
                    value={form.pincode}
                    className={inputStyle}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </Section>

            <Section
              title="Crop Images"
              step="5"
              icon={
                <svg
                  className="w-5 h-5 text-[#059669]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16"
                  />
                </svg>
              }
            >
              <div className="border-2 border-dashed border-[#10b981]/30 rounded-xl p-8 text-center bg-[#f0fdf4] hover:bg-[#dcfce7] transition-colors cursor-pointer relative mt-2">
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#10b981] mb-2 shadow-sm">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-[#1a2e1f]">
                    {images.length > 0
                      ? `${images.length} images selected`
                      : "Click or drag images to upload"}
                  </p>
                </div>
              </div>
            </Section>

            <div className="pt-4 flex flex-col gap-6">
              <label
                className={`flex items-start gap-4 p-5 rounded-xl cursor-pointer transition-all border ${form.declarationAccepted ? "bg-[#f0fdf4] border-[#10b981]" : "bg-[#fffcf0] border-[#fef3c7] shadow-sm"}`}
              >
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    type="checkbox"
                    name="declarationAccepted"
                    checked={form.declarationAccepted}
                    onChange={handleChange}
                    className="w-5 h-5 text-[#10b981] bg-white border-[#d1dcd3] rounded cursor-pointer"
                  />
                </div>
                <div className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-[#d97706] flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944"
                    />
                  </svg>
                  <span className="text-[14px] leading-relaxed text-[#5e4a2d] font-medium">
                    I declare that the information provided is accurate.
                  </span>
                </div>
              </label>
              <button
                type="submit"
                disabled={!isFormValid || submitting}
                className={`w-full py-4 rounded-xl font-bold shadow-lg transition-all duration-300 text-lg ${isFormValid ? "bg-[#10b981] hover:bg-[#059669] text-white hover:-translate-y-1" : "bg-[#cbd5e1] text-[#64748b] cursor-not-allowed shadow-none"}`}
              >
                {submitting ? "Publishing..." : "Publish Harvest Listing"}
              </button>
            </div>
          </form>
        </div>
      </main>

      <ProfileModal
        show={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        profileData={profileData}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes slow-pan { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-bg-pan { background-size: 200% 200%; animation: slow-pan 12s ease infinite; }
      `,
        }}
      />
    </div>
  );
};

function Section({ title, step, children, icon }) {
  return (
    <div className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#e2e8f0] relative">
      <div className="absolute -top-[1px] -left-[1px] w-12 h-12 rounded-tl-2xl rounded-br-2xl bg-[#064e3b] text-white flex items-center justify-center font-bold text-lg z-10">
        {step}
      </div>
      <div className="flex items-center gap-3 mb-8 pb-5 border-b border-[#f1f5f9] ml-14 mt-1">
        <div className="p-2 bg-[#ecfdf5] rounded-lg">{icon && icon}</div>
        <h2 className="text-[22px] font-bold text-[#1a2e1f] tracking-tight">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

export default AddHarvestListing;
