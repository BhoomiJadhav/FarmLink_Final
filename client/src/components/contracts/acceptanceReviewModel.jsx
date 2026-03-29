import React, { useState } from "react";
import api from "../../api/axios";

export default function AcceptanceReviewModal({
  contract,
  onClose,
  onSuccess,
}) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [insurance, setInsurance] = useState({
    provider: "",
    policyNumber: "",
    validTill: "",
  });
  const [file, setFile] = useState(null);
  const [consent, setConsent] = useState({
    read: false,
    agree: false,
    dispute: false,
  });

  const [signature, setSignature] = useState("");

  const allConsentsChecked = consent.read && consent.agree && consent.dispute;

  // async function submitAcceptance() {
  //   if (!allConsentsChecked || !signature) return;

  //   try {
  //     setLoading(true);

  //     await api.post(`/contracts/sign/farmer/${contract._id}`, {
  //       insuranceProvider: insurance.provider,
  //       policyNumber: insurance.policyNumber,
  //       policyValidTill: insurance.validTill,
  //       signatureType: "TYPED",
  //       signatureValue: signature,
  //       consent: true,
  //     });

  //     onSuccess();
  //     onClose();
  //   } catch (err) {
  //     alert("Failed to sign contract. Please try again.");
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  async function submitAcceptance() {
    if (!allConsentsChecked || !signature) return;

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("insuranceProvider", insurance.provider);
      formData.append("policyNumber", insurance.policyNumber);
      formData.append("policyValidTill", insurance.validTill);
      formData.append("signatureType", "TYPED");
      formData.append("signatureValue", signature);
      formData.append("consent", true);

      if (file) {
        formData.append("document", file);
      }

      await api.post(`/contracts/sign/farmer/${contract._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onSuccess();
      onClose();
    } catch (err) {
      alert("Failed to sign contract. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">Review & Sign Contract</h2>
            <p className="text-sm text-gray-500">
              Please review carefully before signing
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 text-xl">
            ×
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded-full ${
                step >= s ? "bg-emerald-600" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* STEP 1 — Contract Summary */}
        {step === 1 && (
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            <Section title="Buyer">{contract.buyer?.name}</Section>

            <Section title="Crop Details">
              {contract.cropDetails?.cropName} | Area:{" "}
              {contract.cropDetails?.contractedArea} | Season:{" "}
              {contract.cropDetails?.season}
            </Section>

            <Section title="Pricing">
              ₹{contract.payment?.agreedPricePerUnit} per unit
            </Section>

            <Section title="Delivery">
              {contract.delivery?.deliveryLocation}
            </Section>

            <Section title="Penalties & Disputes">
              As per agreed contract terms.
            </Section>
          </div>
        )}

        {/* STEP 2 — Insurance */}
        {step === 2 && (
          <div className="space-y-4">
            <Input
              label="Insurance Provider"
              value={insurance.provider}
              onChange={(e) =>
                setInsurance({ ...insurance, provider: e.target.value })
              }
            />
            <Input
              label="Policy Number"
              value={insurance.policyNumber}
              onChange={(e) =>
                setInsurance({ ...insurance, policyNumber: e.target.value })
              }
            />
            <Input
              label="Policy Valid Till"
              type="date"
              value={insurance.validTill}
              onChange={(e) =>
                setInsurance({ ...insurance, validTill: e.target.value })
              }
            />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>
        )}

        {/* STEP 3 — Consent & Signature */}
        {step === 3 && (
          <div className="space-y-4">
            <Checkbox
              label="I have read and understood the contract completely"
              checked={consent.read}
              onChange={() => setConsent({ ...consent, read: !consent.read })}
            />
            <Checkbox
              label="I agree to pricing, delivery, and penalty terms"
              checked={consent.agree}
              onChange={() => setConsent({ ...consent, agree: !consent.agree })}
            />
            <Checkbox
              label="I understand dispute resolution rules"
              checked={consent.dispute}
              onChange={() =>
                setConsent({ ...consent, dispute: !consent.dispute })
              }
            />

            <Input
              label="Type your full name as signature"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
            />
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between mt-6">
          <button
            onClick={step === 1 ? onClose : () => setStep(step - 1)}
            className="px-4 py-2 border rounded-lg"
          >
            {step === 1 ? "Cancel" : "Back"}
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
            >
              Next
            </button>
          ) : (
            <button
              disabled={!allConsentsChecked || !signature || loading}
              onClick={submitAcceptance}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Sign & Submit Contract"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ===== Helper Components ===== */

function Section({ title, children }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-600 mb-1">{title}</h4>
      <div className="text-sm text-gray-800">{children}</div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <input {...props} className="mt-1 w-full border rounded-lg px-3 py-2" />
    </div>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex gap-2 items-start text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-1"
      />
      {label}
    </label>
  );
}
