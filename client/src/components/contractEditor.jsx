import React from "react";
import {
  FileText,
  User,
  Wheat,
  IndianRupee,
  Truck,
  Shield,
  Scale,
  ChevronRight,
  Save,
} from "lucide-react";
import { getCropGuidance } from "../utils/cropIntelligence";

/* ---------- Utilities ---------- */
const clone = (obj) => JSON.parse(JSON.stringify(obj || {}));
const setByPath = (obj, path, value) => {
  const keys = path.split(".");
  const out = clone(obj);
  let cur = out;
  for (let i = 0; i < keys.length - 1; i++) {
    cur[keys[i]] = cur[keys[i]] || {};
    cur = cur[keys[i]];
  }
  cur[keys[keys.length - 1]] = value;
  return out;
};

const Input = ({ label, disabled, ...props }) => (
  <div>
    <label className="text-sm font-medium block mb-1">{label}</label>
    <input
      disabled={disabled}
      className={`w-full px-3 py-2 border rounded ${
        disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
      }`}
      {...props}
    />
  </div>
);

const Textarea = ({ label, disabled, ...props }) => (
  <div>
    <label className="text-sm font-medium block mb-1">{label}</label>
    <textarea
      disabled={disabled}
      className={`w-full px-3 py-2 border rounded ${
        disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
      }`}
      {...props}
    />
  </div>
);

const Select = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium block mb-1">{label}</label>
    <select className="w-full px-3 py-2 border rounded" {...props} />
  </div>
);

/* ---------- Tabs ---------- */
const tabs = [
  { id: "basic", title: "Basic", icon: FileText },
  { id: "farmer", title: "Farmer", icon: User },
  { id: "crop", title: "Crop", icon: Wheat },
  { id: "payment", title: "Payment", icon: IndianRupee },
  { id: "delivery", title: "Delivery", icon: Truck },
  { id: "insurance", title: "Insurance", icon: Shield },
  { id: "legal", title: "Legal", icon: Scale },
];
/* ---------- Suggested Clauses & Guidelines ---------- */

const CULTIVATION_GUIDELINES_SUGGESTIONS = [
  "Farmer shall use certified seeds as recommended for the crop.",
  "Proper irrigation must be maintained throughout the crop cycle.",
  "Use of banned pesticides or chemicals is strictly prohibited.",
  "Crop must be grown following standard agricultural practices.",
  "Buyer or authorized agent may inspect the field with prior notice.",
];

const FINAL_PAYMENT_TERMS_SUGGESTIONS = [
  "Final payment shall be made within 7 days of crop delivery.",
  "Payment shall be released after quality inspection at delivery point.",
  "Any deductions must be mutually agreed and documented.",
  "All payments shall be made via bank transfer or UPI.",
];

export default function ContractEditor({
  contract,
  setContract,
  activeTab,
  setActiveTab,
  onSave,
}) {
  const change = (path, value) =>
    setContract((prev) => setByPath(prev, path, value));
  const safeContract = {
    ...contract,
    pricing: contract?.pricing || {},
  };

  /* ---------- Derived Crop Intelligence ---------- */
  const cropName = contract.cropDetails.cropName;
  const area = Number(contract.cropDetails.contractedArea || 0);
  const expectedYield = Number(contract.cropDetails.expectedYield || 0);

  const cropGuidance = getCropGuidance(cropName);

  const expectedYieldRange =
    cropGuidance && area
      ? [
          cropGuidance.yieldPerAcreQuintal[0] * area,
          cropGuidance.yieldPerAcreQuintal[1] * area,
        ]
      : null;

  const yieldTooHigh =
    expectedYieldRange && expectedYield > expectedYieldRange[1] * 1.3;

  const advanceTooHigh =
    Number(contract.pricing.advancePaymentPercent || 0) > 40;

  return (
    <div className="bg-white rounded-xl shadow p-5 h-full flex flex-col">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded ${
                activeTab === t.id ? "bg-emerald-600 text-white" : "bg-gray-100"
              }`}
            >
              <Icon size={16} />
              {t.title}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto space-y-6">
        {/* BASIC */}
        {activeTab === "basic" && (
          <>
            <Input
              label="Contract Name"
              value={contract.contractName}
              onChange={(e) => change("contractName", e.target.value)}
            />
            <Input
              label="Contract Date"
              value={new Date(contract.contractDate).toLocaleDateString(
                "en-IN",
              )}
              disabled
            />
            <Input
              label="Buyer Location"
              value={contract.buyerLocation}
              onChange={(e) => change("buyerLocation", e.target.value)}
            />

            <h4 className="font-semibold mt-4">Buyer Details</h4>
            <Input label="Buyer Name" value={contract.buyer.name} disabled />
            <Textarea
              label="Buyer Address"
              value={contract.buyer.address}
              disabled
            />
            <Input label="Buyer Email" value={contract.buyer.email} disabled />
            <Input
              label="Buyer Mobile"
              value={contract.buyer.mobile}
              disabled
            />
          </>
        )}

        {/* FARMER */}
        {activeTab === "farmer" && (
          <>
            <h4 className="font-semibold">Farmer Details</h4>
            <Input label="Farmer Name" value={contract.farmer.name} disabled />
            <Textarea
              label="Farmer Address"
              value={contract.farmer.address}
              disabled
            />
          </>
        )}

        {/* CROP */}
        {activeTab === "crop" && (
          <>
            <Input
              label="Crop Name"
              value={contract.cropDetails.cropName}
              onChange={(e) => change("cropDetails.cropName", e.target.value)}
            />

            <Input
              label="Variety"
              value={contract.cropDetails.variety}
              onChange={(e) => change("cropDetails.variety", e.target.value)}
            />

            <Input
              label="Season"
              value={contract.cropDetails.season}
              onChange={(e) => change("cropDetails.season", e.target.value)}
            />
            {cropGuidance && (
              <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm mt-2">
                <p className="font-semibold text-blue-900">
                  Crop Advisory (Indicative)
                </p>
                <ul className="mt-1 space-y-1 text-blue-800">
                  <li>• Typical Season: {cropGuidance.seasons.join(", ")}</li>
                  <li>
                    • Crop Duration: {cropGuidance.durationMonths.join("–")}{" "}
                    months
                  </li>
                  <li>
                    • Expected Harvest Window:{" "}
                    {cropGuidance.harvestMonths.join(", ")}
                  </li>
                </ul>
                <p className="text-xs text-blue-700 mt-1">
                  Advisory only. Actual outcomes depend on weather, soil, and
                  practices.
                </p>
              </div>
            )}

            <Input
              label="Contracted Area (Acres)"
              value={contract.cropDetails.contractedArea}
              onChange={(e) =>
                change("cropDetails.contractedArea", e.target.value)
              }
            />

            <Input
              label="Expected Yield (Quintals)"
              value={contract.cropDetails.expectedYield}
              onChange={(e) =>
                change("cropDetails.expectedYield", e.target.value)
              }
            />

            {yieldTooHigh && (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded text-sm">
                Expected yield seems high. Typical range for {area} acres of{" "}
                {cropName} is approximately {expectedYieldRange[0]}–
                {expectedYieldRange[1]} quintals.
              </div>
            )}

            {cropGuidance && area > 0 && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded text-sm">
                <p className="font-semibold text-blue-900">
                  Crop Advisory (Indicative)
                </p>
                <ul className="mt-2 space-y-1 text-blue-800">
                  <li>
                    • Typical Yield: {expectedYieldRange?.[0]}–
                    {expectedYieldRange?.[1]} quintals
                  </li>
                  <li>
                    • Harvest Window: {cropGuidance.harvestMonths.join(", ")}
                  </li>
                  <li>
                    • Crop Duration: {cropGuidance.durationMonths.join("–")}{" "}
                    months
                  </li>
                </ul>
              </div>
            )}

            <Textarea
              label="Cultivation Guidelines"
              value={contract.cropDetails.cultivationGuidelines}
              onChange={(e) =>
                change("cropDetails.cultivationGuidelines", e.target.value)
              }
            />

            <div className="mt-2 space-y-2">
              <p className="text-sm font-medium text-gray-700">
                Suggested Guidelines (click to add):
              </p>

              {CULTIVATION_GUIDELINES_SUGGESTIONS.map((g, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="block w-full text-left text-sm px-3 py-2 border rounded hover:bg-gray-50"
                  onClick={() =>
                    change(
                      "cropDetails.cultivationGuidelines",
                      contract.cropDetails.cultivationGuidelines
                        ? contract.cropDetails.cultivationGuidelines +
                            "\n• " +
                            g
                        : "• " + g,
                    )
                  }
                >
                  + {g}
                </button>
              ))}
            </div>
          </>
        )}

        {/* PAYMENT */}
        {activeTab === "payment" && (
          <>
            <Input
              label="Agreed Price (₹ per unit)"
              type="number"
              min="0"
              value={safeContract.pricing.agreedPricePerUnit || ""}
              onChange={(e) =>
                change(
                  "pricing.agreedPricePerUnit",
                  e.target.value.replace(/\D/g, ""),
                )
              }
            />

            <Input
              label="Advance Payment (%)"
              type="number"
              min="0"
              max="100"
              value={safeContract.pricing.advancePaymentPercent || ""}
              onChange={(e) =>
                change(
                  "pricing.advancePaymentPercent",
                  e.target.value.replace(/\D/g, ""),
                )
              }
            />

            {safeContract.pricing.agreedPricePerUnit &&
              contract.cropDetails.expectedYield &&
              safeContract.pricing.advancePaymentPercent !== undefined &&
              (() => {
                const total =
                  Number(safeContract.pricing.agreedPricePerUnit) *
                  Number(contract.cropDetails.expectedYield);

                const advance =
                  (total *
                    Number(safeContract.pricing.advancePaymentPercent || 0)) /
                  100;

                const remaining = total - advance;

                return (
                  <div className="bg-gray-50 border rounded p-3 text-sm space-y-1">
                    <p>
                      <b>Total Contract Value:</b> ₹{total.toFixed(2)}
                    </p>
                    <p className="text-emerald-700">
                      <b>Advance Payable:</b> ₹{advance.toFixed(2)}
                    </p>
                    <p className="text-blue-700">
                      <b>Remaining Payable:</b> ₹{remaining.toFixed(2)}
                    </p>
                  </div>
                );
              })()}

            {advanceTooHigh && (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded text-sm">
                Advance payment above 40% is uncommon in cultivation contracts
                and increases financial risk.
              </div>
            )}

            <Textarea
              value={contract.pricing.finalPaymentTerms}
              onChange={(e) =>
                change("pricing.finalPaymentTerms", e.target.value)
              }
            />

            <div className="mt-2 space-y-2">
              <p className="text-sm font-medium text-gray-700">
                Suggested Payment Clauses:
              </p>

              {FINAL_PAYMENT_TERMS_SUGGESTIONS.map((t, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="block w-full text-left text-sm px-3 py-2 border rounded hover:bg-gray-50"
                  onClick={() =>
                    change(
                      "pricing.finalPaymentTerms",
                      contract.pricing.finalPaymentTerms
                        ? contract.pricing.finalPaymentTerms + "\n• " + t
                        : "• " + t,
                    )
                  }
                >
                  + {t}
                </button>
              ))}
            </div>
          </>
        )}

        {/* DELIVERY */}
        {activeTab === "delivery" && (
          <>
            <Input
              label="Approximate Delivery Month"
              value={contract.delivery.approxDeliveryMonth}
              onChange={(e) =>
                change("delivery.approxDeliveryMonth", e.target.value)
              }
            />

            {cropGuidance && (
              <p className="text-sm text-gray-600">
                Suggested harvest months for {cropName}:{" "}
                {cropGuidance.harvestMonths.join(", ")}
              </p>
            )}

            <Input
              label="Delivery Location"
              value={contract.delivery.deliveryLocation}
              onChange={(e) =>
                change("delivery.deliveryLocation", e.target.value)
              }
            />

            <Select
              label="Delivery Managed By"
              value={contract.delivery.deliveryManagedBy}
              onChange={(e) =>
                change("delivery.deliveryManagedBy", e.target.value)
              }
            >
              <option value="BUYER">Buyer</option>
              <option value="FARMER">Farmer</option>
              <option value="THIRD_PARTY">Third Party</option>
            </Select>
          </>
        )}

        {/* INSURANCE */}
        {activeTab === "insurance" && (
          <>
            <Select
              label="Insurance Provided By Company"
              value={contract.insurance.providedByCompany}
              onChange={(e) =>
                change("insurance.providedByCompany", e.target.value === "true")
              }
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Select>

            {cropGuidance?.insuranceRecommended && (
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-sm">
                Crop insurance (PMFBY) is strongly recommended for this crop due
                to climatic risks.
              </div>
            )}

            <Input
              label="PMFBY Policy Number"
              value={contract.insurance.policyNumber}
              disabled
            />
            <div className="bg-amber-50 border border-amber-200 p-3 rounded text-sm">
              <p className="font-medium text-amber-800">
                Farmer Action Required
              </p>
              <p className="text-amber-700">
                PMFBY policy number must be provided by the farmer while
                accepting the contract. Contract execution will remain pending
                until this is completed.
              </p>
            </div>
          </>
        )}

        {/* LEGAL */}
        {activeTab === "legal" && (
          <>
            <Textarea
              label="Applicable Laws"
              value={contract.legal.applicableLaws}
              onChange={(e) => change("legal.applicableLaws", e.target.value)}
            />
            <Textarea
              label="Dispute Resolution & Jurisdiction"
              value={contract.legal.disputeResolutionMethod}
              onChange={(e) =>
                change("legal.disputeResolutionMethod", e.target.value)
              }
            />
          </>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between pt-4 border-t">
        <div className="flex gap-3">
          <button
            onClick={() => onSave("DRAFT")}
            className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-50"
          >
            <Save size={16} />
            Save Draft
          </button>

          <button
            onClick={() => onSave("SENT")}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
          >
            📤 Send to Farmer
          </button>
        </div>

        <button
          onClick={() => {
            const idx = tabs.findIndex((t) => t.id === activeTab);
            if (idx < tabs.length - 1) setActiveTab(tabs[idx + 1].id);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
