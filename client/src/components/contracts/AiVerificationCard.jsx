import React, { useState } from 'react';
import { analyzeGrainImage } from '../../api/aiApi';
import axios from '../../api/axios';
import { toast } from 'react-hot-toast';
import { Search, CheckCircle, AlertCircle, UploadCloud } from 'lucide-react';

const AiVerificationCard = ({ contractId, onVerified }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null); // Reset result if a new image is picked
    }
  };

  const handleAnalysis = async () => {
    if (!file) return toast.error("Please select a harvest image");

    setLoading(true);
    try {
      // 1. Get prediction from Python AI Service
      const aiResult = await analyzeGrainImage(file);
      setResult(aiResult);

      // 2. Save result to MongoDB via your Node.js backend
      // Note: Removed /api from URL if your axios instance already includes it
      const response = await axios.patch(`/contracts/${contractId}/ai-quality`, {
        label: aiResult.label,
        confidence: aiResult.confidence,
        breakdown: aiResult.breakdown
      });

      if (response.data) {
        toast.success(`Verified: ${aiResult.label} Quality`);
        
        // Wait 2 seconds so the farmer can see the result, then refresh
        setTimeout(() => {
          onVerified(); 
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "AI Analysis failed. Is the AI Service running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 p-6 border-2 border-dashed border-emerald-300 rounded-2xl bg-white shadow-sm overflow-hidden relative">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Search size={80} className="text-emerald-600" />
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-emerald-600 rounded-xl text-white shadow-lg">
          <Search size={24} />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-lg">AI Quality Analysis</h3>
          <p className="text-sm text-gray-500 font-medium">Step 7: Final Harvest Grading</p>
        </div>
      </div>

      {/* Image Preview / Upload Area */}
      <div className="mb-6">
        {preview ? (
          <div className="relative group rounded-xl overflow-hidden border-2 border-emerald-100 h-48 bg-gray-50">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            
            {loading && (
              <div className="absolute inset-0 bg-emerald-900/40 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                <div className="w-full h-1 bg-emerald-400 absolute top-0 animate-scan shadow-[0_0_15px_rgba(52,211,153,1)]"></div>
                <p className="font-bold animate-pulse">Scanning Grains...</p>
              </div>
            )}

            {!loading && !result && (
              <button 
                onClick={() => {setFile(null); setPreview(null);}}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <AlertCircle size={16} />
              </button>
            )}
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-emerald-50 hover:border-emerald-300 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud className="w-10 h-10 text-emerald-500 mb-3" />
              <p className="text-sm text-gray-600 font-semibold">Click to upload harvest photo</p>
              <p className="text-xs text-gray-400">PNG, JPG or JPEG (Max 5MB)</p>
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          </label>
        )}
      </div>

      {/* Result Display */}
      {result && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl animate-in zoom-in-95">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-emerald-800">Analysis Result:</span>
            <div className="flex items-center gap-1 text-emerald-600">
              <CheckCircle size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Verified</span>
            </div>
          </div>
          <div className="flex items-end gap-2">
            <h4 className="text-2xl font-black text-emerald-900 uppercase leading-none">{result.label}</h4>
            <span className="text-sm text-emerald-600 font-bold mb-0.5">({result.confidence?.toFixed(1)}% Confidence)</span>
          </div>
        </div>
      )}

      {/* Action Button */}
      {!result && (
        <button
          onClick={handleAnalysis}
          disabled={loading || !file}
          className={`w-full py-3.5 rounded-xl font-black text-white shadow-lg transition-all transform active:scale-95 ${
            loading || !file 
              ? "bg-gray-300 cursor-not-allowed" 
              : "bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-200 shadow-emerald-100"
          }`}
        >
          {loading ? "PROCESSING..." : "VERIFY QUALITY & START DELIVERY"}
        </button>
      )}

      {result && (
        <div className="text-center py-2 text-emerald-600 font-bold text-sm animate-pulse">
          Unlocking Logistics... 🚛
        </div>
      )}
    </div>
  );
};

export default AiVerificationCard;