import { useState } from "react";
import { X, Upload, Trash2 } from "lucide-react";

const MAX_IMAGES = 5;

export default function UploadProofModal({ open, onClose, stage, onSubmit }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!open || !stage) return null;

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > MAX_IMAGES) {
      alert(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (images.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    try {
      setLoading(true);
      await onSubmit(stage._id, images);
      setImages([]);
      onClose();
    } catch (err) {
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Upload Proof – {stage.name}</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Upload Area */}
        <label className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
          <Upload className="mb-2" />
          Click to upload images (max {MAX_IMAGES})
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* Preview */}
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-4">
            {images.map((file, i) => (
              <div key={i} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="h-24 w-full object-cover rounded-md border"
                />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-md"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 text-sm bg-green-600 text-white rounded-md"
          >
            {loading ? "Uploading..." : "Submit Proof"}
          </button>
        </div>
      </div>
    </div>
  );
}
