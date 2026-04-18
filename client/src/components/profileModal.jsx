// src/components/ProfileModal.jsx
import React from "react";
import { Edit2, Save, X } from "lucide-react";

/**
 * Reusable Profile Modal
 *
 * Props:
 *  - show (bool)
 *  - onClose (fn)
 *  - profileData (object)
 *  - form (object)
 *  - editing (bool)
 *  - setEditing (fn)
 *  - saving (bool)
 *  - saveProfile (async fn)
 *  - handleFormChange (fn(section, key, value))
 */
export default function ProfileModal({
  show,
  onClose,
  profileData = null,
  form = { personal: {}, farm: {}, insurance: {}, preferences: {} },
  editing = false,
  setEditing = () => {},
  saving = false,
  saveProfile = async () => {},
  handleFormChange = () => {},
}) {
  if (!show) return null;

  const initials = profileData?.user?.name
    ? profileData.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "?";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-auto max-h-[90vh]">
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
          {/* Personal */}
          <div>
            <h4 className="text-sm font-semibold text-slate-800 mb-3">
              Personal Details
            </h4>
            {!editing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Item
                  label="Full name"
                  value={
                    profileData?.profile?.personal?.fullName ||
                    profileData?.user?.name ||
                    "-"
                  }
                />
                <Item
                  label="Phone"
                  value={profileData?.profile?.personal?.phone || "-"}
                />
                <Item
                  label="Email"
                  value={
                    profileData?.profile?.personal?.email ||
                    profileData?.user?.email ||
                    "-"
                  }
                />
                <Item
                  label="Government ID"
                  value={profileData?.profile?.personal?.governmentId || "-"}
                />
                <Item
                  label="Address"
                  value={profileData?.profile?.personal?.address || "-"}
                  full
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs text-slate-500">Full name</span>
                  <input
                    value={form.personal.fullName}
                    onChange={(e) =>
                      handleFormChange("personal", "fullName", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                  />
                </label>

                <label className="block">
                  <span className="text-xs text-slate-500">Phone</span>
                  <input
                    value={form.personal.phone}
                    onChange={(e) =>
                      handleFormChange("personal", "phone", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                  />
                </label>

                <label className="block">
                  <span className="text-xs text-slate-500">Email</span>
                  <input
                    value={form.personal.email}
                    onChange={(e) =>
                      handleFormChange("personal", "email", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                  />
                </label>

                <label className="block">
                  <span className="text-xs text-slate-500">Government ID</span>
                  <input
                    value={form.personal.governmentId}
                    onChange={(e) =>
                      handleFormChange(
                        "personal",
                        "governmentId",
                        e.target.value,
                      )
                    }
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                  />
                </label>

                <label className="block md:col-span-2">
                  <span className="text-xs text-slate-500">Address</span>
                  <input
                    value={form.personal.address}
                    onChange={(e) =>
                      handleFormChange("personal", "address", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                  />
                </label>
              </div>
            )}
          </div>

          {/* Farm */}
          <div>
            <h4 className="text-sm font-semibold text-slate-800 mb-3">
              Farm Details
            </h4>
            {!editing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Item
                  label="Farm location"
                  value={profileData?.profile?.farm?.farmLocation || "-"}
                />
                <Item
                  label="Farm size"
                  value={profileData?.profile?.farm?.farmSize || "-"}
                />
                <Item
                  label="Crop types"
                  value={
                    (profileData?.profile?.farm?.cropTypes || []).join(", ") ||
                    "-"
                  }
                  full
                />
                <Item
                  label="Irrigation"
                  value={profileData?.profile?.farm?.irrigation || "-"}
                />
                <Item
                  label="Machinery"
                  value={profileData?.profile?.farm?.machinery || "-"}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs text-slate-500">Farm location</span>
                  <input
                    value={form.farm.farmLocation}
                    onChange={(e) =>
                      handleFormChange("farm", "farmLocation", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                  />
                </label>

                <label className="block">
                  <span className="text-xs text-slate-500">Farm size</span>
                  <input
                    value={form.farm.farmSize}
                    onChange={(e) =>
                      handleFormChange("farm", "farmSize", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                  />
                </label>

                <label className="block md:col-span-2">
                  <span className="text-xs text-slate-500">
                    Crop types (comma separated)
                  </span>
                  <input
                    value={(form.farm.cropTypes || []).join(", ")}
                    onChange={(e) =>
                      handleFormChange(
                        "farm",
                        "cropTypes",
                        e.target.value.split(",").map((s) => s.trim()),
                      )
                    }
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                  />
                </label>

                <label className="block">
                  <span className="text-xs text-slate-500">Irrigation</span>
                  <input
                    value={form.farm.irrigation}
                    onChange={(e) =>
                      handleFormChange("farm", "irrigation", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                  />
                </label>

                <label className="block">
                  <span className="text-xs text-slate-500">Machinery</span>
                  <input
                    value={form.farm.machinery}
                    onChange={(e) =>
                      handleFormChange("farm", "machinery", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                  />
                </label>
              </div>
            )}
          </div>

          {/* Insurance */}
          <div>
            <h4 className="text-sm font-semibold text-slate-800 mb-3">
              Insurance & Preferences
            </h4>
            {!editing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Item
                  label="Insurance Provider"
                  value={
                    profileData?.profile?.insurance?.provider ||
                    profileData?.profile?.farm?.insurance?.provider ||
                    "-"
                  }
                />
                <Item
                  label="Policy Number"
                  value={
                    profileData?.profile?.insurance?.policyNumber ||
                    profileData?.profile?.farm?.insurance?.policyNumber ||
                    "-"
                  }
                />
                <Item
                  label="Notes"
                  value={
                    profileData?.profile?.preferences?.additionalInfo || "-"
                  }
                  full
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs text-slate-500">
                    Insurance Provider
                  </span>
                  <input
                    value={form.insurance.provider}
                    onChange={(e) =>
                      handleFormChange("insurance", "provider", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                  />
                </label>

                <label className="block">
                  <span className="text-xs text-slate-500">Policy Number</span>
                  <input
                    value={form.insurance.policyNumber}
                    onChange={(e) =>
                      handleFormChange(
                        "insurance",
                        "policyNumber",
                        e.target.value,
                      )
                    }
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                  />
                </label>

                <label className="block md:col-span-2">
                  <span className="text-xs text-slate-500">Notes</span>
                  <input
                    value={form.preferences.additionalInfo}
                    onChange={(e) =>
                      handleFormChange(
                        "preferences",
                        "additionalInfo",
                        e.target.value,
                      )
                    }
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Item({ label, value, full = false }) {
  return (
    <div className={`${full ? "md:col-span-2" : ""}`}>
      <span className="text-xs text-slate-500">{label}</span>
      <div className="text-sm text-slate-800">{value}</div>
    </div>
  );
}
