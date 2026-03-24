// // pages/farmer/ProfilePage.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   FaUserCircle,
//   FaSignOutAlt,
//   FaChartLine,
//   FaHandshake,
//   FaFileContract,
//   FaComments,
//   FaLifeRing,
// } from "react-icons/fa";

// const ProfilePage = () => {
//   const { id } = useParams();
//   const [profile, setProfile] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     axios
//       .get(`http://localhost:5000/api/profile`, {
//         withCredentials: true,
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         setProfile(res.data);
//         setFormData(res.data);
//       })
//       .catch((err) => console.error(err));
//   }, [id]);

//   const handleChange = (section, field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [field]: value,
//       },
//     }));
//   };

//   const handleSave = () => {
//     const token = localStorage.getItem("token");
//     axios
//       .post(`http://localhost:5000/api/profile`, formData, {
//         withCredentials: true,
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then(() => {
//         setProfile(formData);
//         setEditMode(false);
//       })
//       .catch((err) => console.error(err));
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   if (!profile) return <p>Loading...</p>;

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-green-700 text-white flex flex-col">
//         <div className="p-4 text-2xl font-bold border-b border-green-600">
//           FarmLink
//         </div>
//         <nav className="flex-1 p-4 space-y-4">
//           <a
//             href={`/farmer/dashboard`}
//             className="flex items-center space-x-2 hover:bg-green-600 p-2 rounded"
//           >
//             <FaChartLine /> <span>Dashboard</span>
//           </a>
//           <a
//             href={`/farmer/${id}/profile`}
//             className="flex items-center space-x-2 bg-green-600 p-2 rounded"
//           >
//             <FaUserCircle /> <span>Profile</span>
//           </a>
//           <a
//             href="/contracts"
//             className="flex items-center space-x-2 hover:bg-green-600 p-2 rounded"
//           >
//             <FaFileContract /> <span>My Contracts</span>
//           </a>
//           <a
//             href="/negotiations"
//             className="flex items-center space-x-2 hover:bg-green-600 p-2 rounded"
//           >
//             <FaComments /> <span>Negotiations</span>
//           </a>
//           <a
//             href="/accepted-deals"
//             className="flex items-center space-x-2 hover:bg-green-600 p-2 rounded"
//           >
//             <FaHandshake /> <span>Accepted Deals</span>
//           </a>
//           <a
//             href="/support"
//             className="flex items-center space-x-2 hover:bg-green-600 p-2 rounded"
//           >
//             <FaLifeRing /> <span>Support</span>
//           </a>
//         </nav>
//         <button
//           onClick={logout}
//           className="flex items-center space-x-2 p-4 border-t border-green-600 hover:bg-green-600 w-full"
//         >
//           <FaSignOutAlt /> <span>Logout</span>
//         </button>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1">
//         {/* Top Bar */}
//         <header className="flex justify-between items-center bg-white p-4 shadow">
//           <h1 className="text-xl font-semibold">My Profile</h1>
//           <div className="relative">
//             <button
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//               className="flex items-center space-x-2 focus:outline-none"
//             >
//               <FaUserCircle size={30} className="text-gray-700" />
//               <span>{profile.personal.fullName}</span>
//             </button>
//             {dropdownOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded border">
//                 <a
//                   href={`/farmer/${id}/profile`}
//                   className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                 >
//                   Profile
//                 </a>
//                 <button
//                   onClick={logout}
//                   className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </header>

//         {/* Profile Form */}
//         <main className="p-6 space-y-6">
//           {/* PERSONAL DETAILS */}
//           <section className="bg-white shadow rounded-lg p-4">
//             <h2 className="text-lg font-semibold mb-2">Personal Details</h2>
//             {Object.entries(profile.personal || {}).map(([key, value]) => (
//               <div key={key} className="mb-2">
//                 <label className="font-medium capitalize">{key}:</label>
//                 {editMode ? (
//                   <input
//                     type="text"
//                     value={formData.personal[key] || ""}
//                     onChange={(e) =>
//                       handleChange("personal", key, e.target.value)
//                     }
//                     className="border p-1 ml-2"
//                   />
//                 ) : (
//                   <span className="ml-2">{value}</span>
//                 )}
//               </div>
//             ))}
//           </section>

//           {/* FARM DETAILS */}
//           <section className="bg-white shadow rounded-lg p-4">
//             <h2 className="text-lg font-semibold mb-2">Farm Details</h2>
//             {Object.entries(profile.farm || {}).map(([key, value]) => (
//               <div key={key} className="mb-2">
//                 <label className="font-medium capitalize">{key}:</label>
//                 {editMode ? (
//                   <input
//                     type="text"
//                     value={formData.farm[key] || ""}
//                     onChange={(e) => handleChange("farm", key, e.target.value)}
//                     className="border p-1 ml-2"
//                   />
//                 ) : (
//                   <span className="ml-2">
//                     {Array.isArray(value) ? value.join(", ") : value}
//                   </span>
//                 )}
//               </div>
//             ))}
//           </section>

//           {/* PREFERENCES */}
//           <section className="bg-white shadow rounded-lg p-4">
//             <h2 className="text-lg font-semibold mb-2">Preferences</h2>
//             {Object.entries(profile.preferences || {}).map(([key, value]) => (
//               <div key={key} className="mb-2">
//                 <label className="font-medium capitalize">{key}:</label>
//                 {editMode ? (
//                   <input
//                     type="text"
//                     value={formData.preferences[key] || ""}
//                     onChange={(e) =>
//                       handleChange("preferences", key, e.target.value)
//                     }
//                     className="border p-1 ml-2"
//                   />
//                 ) : (
//                   <span className="ml-2">
//                     {Array.isArray(value) ? value.join(", ") : value}
//                   </span>
//                 )}
//               </div>
//             ))}
//           </section>

//           {/* ACTION BUTTONS */}
//           <div className="flex gap-3">
//             {editMode ? (
//               <>
//                 <button
//                   onClick={handleSave}
//                   className="bg-green-500 text-white px-4 py-2 rounded"
//                 >
//                   Save
//                 </button>
//                 <button
//                   onClick={() => {
//                     setEditMode(false);
//                     setFormData(profile);
//                   }}
//                   className="bg-gray-400 text-white px-4 py-2 rounded"
//                 >
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={() => setEditMode(true)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 Edit
//               </button>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
// pages/farmer/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaChartLine,
  FaHandshake,
  FaFileContract,
  FaComments,
  FaLifeRing,
} from "react-icons/fa";

const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:5000/api/profile`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
        setFormData(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    const token = localStorage.getItem("token");
    axios
      .post(`http://localhost:5000/api/profile`, formData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setProfile(formData);
        setEditMode(false);
      })
      .catch((err) => console.error(err));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-green-600">
          FarmLink
        </div>
        <nav className="flex-1 p-4 space-y-4">
          <a
            href={`/farmer/dashboard`}
            className="flex items-center space-x-2 hover:bg-green-600 p-2 rounded"
          >
            <FaChartLine /> <span>Dashboard</span>
          </a>
          <a
            href={`/farmer/${id}/profile`}
            className="flex items-center space-x-2 bg-green-600 p-2 rounded"
          >
            <FaUserCircle /> <span>Profile</span>
          </a>
          <a
            href="/contracts"
            className="flex items-center space-x-2 hover:bg-green-600 p-2 rounded"
          >
            <FaFileContract /> <span>My Contracts</span>
          </a>
          <a
            href="/negotiations"
            className="flex items-center space-x-2 hover:bg-green-600 p-2 rounded"
          >
            <FaComments /> <span>Negotiations</span>
          </a>
          <a
            href="/accepted-deals"
            className="flex items-center space-x-2 hover:bg-green-600 p-2 rounded"
          >
            <FaHandshake /> <span>Accepted Deals</span>
          </a>
          <a
            href="/support"
            className="flex items-center space-x-2 hover:bg-green-600 p-2 rounded"
          >
            <FaLifeRing /> <span>Support</span>
          </a>
        </nav>
        <button
          onClick={logout}
          className="flex items-center space-x-2 p-4 border-t border-green-600 hover:bg-green-600 w-full"
        >
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <header className="flex justify-between items-center bg-white p-4 shadow">
          <h1 className="text-xl font-semibold">My Profile</h1>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <FaUserCircle size={30} className="text-gray-700" />
              <span>{profile.personal.fullName}</span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded border">
                <a
                  href={`/farmer/${id}/profile`}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </a>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Profile Form */}
        <main className="p-6 space-y-6">
          {/* PERSONAL DETAILS */}
          <section className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Personal Details</h2>
            {Object.entries(profile.personal || {}).map(([key, value]) => (
              <div key={key} className="mb-2">
                <label className="font-medium capitalize">{key}:</label>
                {editMode ? (
                  <input
                    type="text"
                    value={formData.personal[key] || ""}
                    onChange={(e) =>
                      handleChange("personal", key, e.target.value)
                    }
                    className="border p-1 ml-2"
                  />
                ) : (
                  <span className="ml-2">{value}</span>
                )}
              </div>
            ))}
          </section>

          {/* FARM DETAILS */}
          <section className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Farm Details</h2>
            {Object.entries(profile.farm || {}).map(([key, value]) => (
              <div key={key} className="mb-2">
                <label className="font-medium capitalize">{key}:</label>
                {editMode ? (
                  <input
                    type="text"
                    value={formData.farm[key] || ""}
                    onChange={(e) => handleChange("farm", key, e.target.value)}
                    className="border p-1 ml-2"
                  />
                ) : (
                  <span className="ml-2">
                    {Array.isArray(value) ? value.join(", ") : value}
                  </span>
                )}
              </div>
            ))}
          </section>

          {/* PREFERENCES */}
          <section className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Preferences</h2>
            {Object.entries(profile.preferences || {}).map(([key, value]) => (
              <div key={key} className="mb-2">
                <label className="font-medium capitalize">{key}:</label>
                {editMode ? (
                  <input
                    type="text"
                    value={formData.preferences[key] || ""}
                    onChange={(e) =>
                      handleChange("preferences", key, e.target.value)
                    }
                    className="border p-1 ml-2"
                  />
                ) : (
                  <span className="ml-2">
                    {Array.isArray(value) ? value.join(", ") : value}
                  </span>
                )}
              </div>
            ))}
          </section>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3">
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditMode(false);
                    setFormData(profile);
                  }}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
