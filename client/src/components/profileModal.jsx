// import React from "react";
// import { Edit2, Save, X } from "lucide-react";

// export default function ProfileModal({
//   show,
//   onClose,
//   profileData = null,
//   form = { personal: {}, farm: {}, insurance: {}, preferences: {} },
//   editing = false,
//   setEditing = () => {},
//   saving = false,
//   saveProfile = async () => {},
//   handleFormChange = () => {},
// }) {
//   if (!show) return null;

//   const role = profileData?.user?.role;

//   const initials = profileData?.user?.name
//     ? profileData.user.name
//         .split(" ")
//         .map((n) => n[0])
//         .join("")
//     : "?";

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-auto max-h-[90vh]">
//         {/* HEADER */}
//         <div className="flex items-center justify-between px-5 py-4 border-b">
//           <div className="flex items-center gap-3">
//             <div className="h-12 w-12 rounded-full bg-emerald-200 flex items-center justify-center font-semibold text-lg">
//               {initials}
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold text-slate-900">
//                 {profileData?.user?.name || "Unknown"}
//               </h3>
//               <p className="text-sm text-slate-600">
//                 {profileData?.user?.email || ""}
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             {!editing ? (
//               <>
//                 <button
//                   onClick={() => setEditing(true)}
//                   className="flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-50 text-emerald-700"
//                 >
//                   <Edit2 className="h-4 w-4" /> Edit
//                 </button>
//                 <button
//                   onClick={onClose}
//                   className="p-2 rounded-md hover:bg-slate-100"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               </>
//             ) : (
//               <>
//                 <button
//                   onClick={saveProfile}
//                   disabled={saving}
//                   className="flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 text-white"
//                 >
//                   <Save className="h-4 w-4" />
//                   {saving ? "Saving..." : "Save"}
//                 </button>
//                 <button
//                   onClick={() => setEditing(false)}
//                   className="p-2 rounded-md hover:bg-slate-100"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               </>
//             )}
//           </div>
//         </div>

//         <div className="p-6 space-y-6">
//           {/* PERSONAL */}
//           <div>
//             <h4 className="text-sm font-semibold text-slate-800 mb-3">
//               Personal Details
//             </h4>

//             {!editing ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 <Item
//                   label="Full name"
//                   value={
//                     profileData?.profile?.personal?.fullName ||
//                     profileData?.user?.name ||
//                     "-"
//                   }
//                 />
//                 <Item
//                   label="Phone"
//                   value={profileData?.profile?.personal?.phone || "-"}
//                 />
//                 <Item
//                   label="Email"
//                   value={
//                     profileData?.profile?.personal?.email ||
//                     profileData?.user?.email ||
//                     "-"
//                   }
//                 />
//                 <Item
//                   label="Address"
//                   value={profileData?.profile?.personal?.address || "-"}
//                   full
//                 />
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 <input
//                   placeholder="Full Name"
//                   value={form.personal.fullName || ""}
//                   onChange={(e) =>
//                     handleFormChange("personal", "fullName", e.target.value)
//                   }
//                   className="border px-3 py-2 rounded"
//                 />
//                 <input
//                   placeholder="Phone"
//                   value={form.personal.phone || ""}
//                   onChange={(e) =>
//                     handleFormChange("personal", "phone", e.target.value)
//                   }
//                   className="border px-3 py-2 rounded"
//                 />
//                 <input
//                   placeholder="Email"
//                   value={form.personal.email || ""}
//                   onChange={(e) =>
//                     handleFormChange("personal", "email", e.target.value)
//                   }
//                   className="border px-3 py-2 rounded"
//                 />
//                 <input
//                   placeholder="Address"
//                   value={form.personal.address || ""}
//                   onChange={(e) =>
//                     handleFormChange("personal", "address", e.target.value)
//                   }
//                   className="border px-3 py-2 rounded md:col-span-2"
//                 />
//               </div>
//             )}
//           </div>

//           {/* FARM (FARMER ONLY) */}
//           {role === "farmer" && (
//             <div>
//               <h4 className="text-sm font-semibold text-slate-800 mb-3">
//                 Farm Details
//               </h4>

//               {!editing ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   <Item
//                     label="Farm location"
//                     value={profileData?.profile?.farm?.farmLocation || "-"}
//                   />
//                   <Item
//                     label="Farm size"
//                     value={profileData?.profile?.farm?.farmSize || "-"}
//                   />
//                   <Item
//                     label="Crop types"
//                     value={
//                       (profileData?.profile?.farm?.cropTypes || []).join(
//                         ", ",
//                       ) || "-"
//                     }
//                     full
//                   />
//                   <Item
//                     label="Irrigation"
//                     value={profileData?.profile?.farm?.irrigation || "-"}
//                   />
//                   <Item
//                     label="Machinery"
//                     value={profileData?.profile?.farm?.machinery || "-"}
//                   />
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   <input
//                     placeholder="Farm Location"
//                     value={form.farm.farmLocation || ""}
//                     onChange={(e) =>
//                       handleFormChange("farm", "farmLocation", e.target.value)
//                     }
//                     className="border px-3 py-2 rounded"
//                   />
//                   <input
//                     placeholder="Farm Size"
//                     value={form.farm.farmSize || ""}
//                     onChange={(e) =>
//                       handleFormChange("farm", "farmSize", e.target.value)
//                     }
//                     className="border px-3 py-2 rounded"
//                   />
//                   <input
//                     placeholder="Crop Types"
//                     value={(form.farm.cropTypes || []).join(", ")}
//                     onChange={(e) =>
//                       handleFormChange(
//                         "farm",
//                         "cropTypes",
//                         e.target.value.split(",").map((s) => s.trim()),
//                       )
//                     }
//                     className="border px-3 py-2 rounded md:col-span-2"
//                   />
//                   <input
//                     placeholder="Irrigation"
//                     value={form.farm.irrigation || ""}
//                     onChange={(e) =>
//                       handleFormChange("farm", "irrigation", e.target.value)
//                     }
//                     className="border px-3 py-2 rounded"
//                   />
//                   <input
//                     placeholder="Machinery"
//                     value={form.farm.machinery || ""}
//                     onChange={(e) =>
//                       handleFormChange("farm", "machinery", e.target.value)
//                     }
//                     className="border px-3 py-2 rounded"
//                   />
//                 </div>
//               )}
//             </div>
//           )}

//           {/* BUYER (BUYER ONLY) */}
//           {role === "buyer" && (
//             <div>
//               <h4 className="text-sm font-semibold text-slate-800 mb-3">
//                 Buyer Details
//               </h4>

//               {!editing ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   <Item
//                     label="Buyer Type"
//                     value={profileData?.profile?.buyer?.buyerType || "-"}
//                   />
//                   <Item
//                     label="Company"
//                     value={profileData?.profile?.buyer?.companyName || "-"}
//                   />
//                   <Item
//                     label="Phone"
//                     value={profileData?.profile?.buyer?.phone || "-"}
//                   />
//                   <Item
//                     label="Address"
//                     value={profileData?.profile?.buyer?.address || "-"}
//                     full
//                   />
//                   <Item
//                     label="Contract Details"
//                     value={profileData?.profile?.buyer?.contractDetails || "-"}
//                     full
//                   />
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   <input
//                     placeholder="Buyer Type"
//                     value={form.buyer.buyerType}
//                     onChange={(e) =>
//                       handleFormChange("buyer", "buyerType", e.target.value)
//                     }
//                     className="border px-3 py-2 rounded"
//                   />
//                   <input
//                     placeholder="Company Name"
//                     value={form.buyer.companyName || ""}
//                     onChange={(e) =>
//                       handleFormChange("buyer", "companyName", e.target.value)
//                     }
//                     className="border px-3 py-2 rounded"
//                   />
//                   <input
//                     placeholder="Phone"
//                     value={form.buyer.phone || ""}
//                     onChange={(e) =>
//                       handleFormChange("buyer", "phone", e.target.value)
//                     }
//                     className="border px-3 py-2 rounded"
//                   />
//                   <input
//                     placeholder="Address"
//                     value={form.buyer.address || ""}
//                     onChange={(e) =>
//                       handleFormChange("buyer", "address", e.target.value)
//                     }
//                     className="border px-3 py-2 rounded"
//                   />
//                   <input
//                     placeholder="Contract Details"
//                     value={form.buyer.contractDetails || ""}
//                     onChange={(e) =>
//                       handleFormChange(
//                         "buyer",
//                         "contractDetails",
//                         e.target.value,
//                       )
//                     }
//                     className="border px-3 py-2 rounded md:col-span-2"
//                   />
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function Item({ label, value, editing, onChange, full = false }) {
//   return (
//     <div className={`${full ? "md:col-span-2" : ""}`}>
//       <span className="text-xs text-slate-500">{label}</span>

//       {editing ? (
//         <input
//           value={value || ""}
//           onChange={onChange}
//           className="mt-1 w-full border px-3 py-2 rounded-md text-sm"
//         />
//       ) : (
//         <div className="text-sm text-slate-800">{value || "-"}</div>
//       )}
//     </div>
//   );
// }
import React from "react";
import { Edit2, Save, X } from "lucide-react";

export default function ProfileModal({
  show,
  onClose,
  profileData = null,
  form = { personal: {}, farm: {}, buyer: {} },
  editing = false,
  setEditing = () => {},
  saving = false,
  saveProfile = async () => {},
  handleFormChange = () => {},
}) {
  if (!show) return null;

  const role = profileData?.user?.role;

  const initials = profileData?.user?.name
    ? profileData.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "?";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-auto max-h-[90vh]">
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-emerald-200 flex items-center justify-center font-semibold text-lg">
              {initials}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {profileData?.user?.name || "Unknown"}
              </h3>
              <p className="text-sm text-slate-600">
                {profileData?.user?.email || ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!editing ? (
              <>
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-50 text-emerald-700"
                >
                  <Edit2 className="h-4 w-4" /> Edit
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-md hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={saveProfile}
                  disabled={saving}
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 text-white"
                >
                  <Save className="h-4 w-4" />
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="p-2 rounded-md hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* PERSONAL */}
          <Section title="Personal Details">
            <Item
              label="Full name"
              value={
                editing
                  ? form.personal.fullName
                  : profileData?.profile?.personal?.fullName
              }
              editing={editing}
              onChange={(e) =>
                handleFormChange("personal", "fullName", e.target.value)
              }
            />
            <Item
              label="Phone"
              value={
                editing
                  ? form.personal.phone
                  : profileData?.profile?.personal?.phone
              }
              editing={editing}
              onChange={(e) =>
                handleFormChange("personal", "phone", e.target.value)
              }
            />
            <Item
              label="Email"
              value={
                editing
                  ? form.personal.email
                  : profileData?.profile?.personal?.email
              }
              editing={editing}
              onChange={(e) =>
                handleFormChange("personal", "email", e.target.value)
              }
            />
            <Item
              label="Address"
              value={
                editing
                  ? form.personal.address
                  : profileData?.profile?.personal?.address
              }
              editing={editing}
              onChange={(e) =>
                handleFormChange("personal", "address", e.target.value)
              }
              full
            />
          </Section>

          {/* FARM */}
          {role === "farmer" && (
            <Section title="Farm Details">
              <Item
                label="Farm location"
                value={
                  editing
                    ? form.farm.farmLocation
                    : profileData?.profile?.farm?.farmLocation
                }
                editing={editing}
                onChange={(e) =>
                  handleFormChange("farm", "farmLocation", e.target.value)
                }
              />
              <Item
                label="Farm size"
                value={
                  editing
                    ? form.farm.farmSize
                    : profileData?.profile?.farm?.farmSize
                }
                editing={editing}
                onChange={(e) =>
                  handleFormChange("farm", "farmSize", e.target.value)
                }
              />
              <Item
                label="Crop types"
                value={
                  editing
                    ? (form.farm.cropTypes || []).join(", ")
                    : (profileData?.profile?.farm?.cropTypes || []).join(", ")
                }
                editing={editing}
                onChange={(e) =>
                  handleFormChange(
                    "farm",
                    "cropTypes",
                    e.target.value.split(",").map((s) => s.trim()),
                  )
                }
                full
              />
            </Section>
          )}

          {/* BUYER */}
          {role === "buyer" && (
            <Section title="Buyer Details">
              <Item
                label="Buyer Type"
                value={
                  editing
                    ? form.buyer.buyerType
                    : profileData?.profile?.buyer?.buyerType
                }
                editing={editing}
                onChange={(e) =>
                  handleFormChange("buyer", "buyerType", e.target.value)
                }
              />
              <Item
                label="Company"
                value={
                  editing
                    ? form.buyer.companyName
                    : profileData?.profile?.buyer?.companyName
                }
                editing={editing}
                onChange={(e) =>
                  handleFormChange("buyer", "companyName", e.target.value)
                }
              />
              <Item
                label="Phone"
                value={
                  editing
                    ? form.buyer.phone
                    : profileData?.profile?.buyer?.phone
                }
                editing={editing}
                onChange={(e) =>
                  handleFormChange("buyer", "phone", e.target.value)
                }
              />
              <Item
                label="Address"
                value={
                  editing
                    ? form.buyer.address
                    : profileData?.profile?.buyer?.address
                }
                editing={editing}
                onChange={(e) =>
                  handleFormChange("buyer", "address", e.target.value)
                }
                full
              />
              <Item
                label="Contract Details"
                value={
                  editing
                    ? form.buyer.contractDetails
                    : profileData?.profile?.buyer?.contractDetails
                }
                editing={editing}
                onChange={(e) =>
                  handleFormChange("buyer", "contractDetails", e.target.value)
                }
                full
              />
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- SECTION WRAPPER ---------- */
function Section({ title, children }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-slate-800 mb-3">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>
    </div>
  );
}

/* ---------- ITEM ---------- */
function Item({ label, value, editing, onChange, full = false }) {
  return (
    <div className={`${full ? "md:col-span-2" : ""}`}>
      <span className="text-xs text-slate-500">{label}</span>

      {editing ? (
        <input
          value={value || ""}
          onChange={onChange}
          className="mt-1 w-full border px-3 py-2 rounded-md text-sm"
        />
      ) : (
        <div className="text-sm text-slate-800">{value || "-"}</div>
      )}
    </div>
  );
}
