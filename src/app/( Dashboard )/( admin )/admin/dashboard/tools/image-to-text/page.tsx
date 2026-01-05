"use client";

import React, { useState } from "react";
import Tesseract from "tesseract.js";
import { FiUpload, FiCopy, FiDownload, FiLoader } from "react-icons/fi";
import ABackButton from "@/components/admin/Tools/ABackButton";

const ImageToTextPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setText("");
      setError("");
    }
  };

  const handleExtractText = async () => {
    if (!image) return;
    setLoading(true);
    setText("");
    setError("");

    try {
      const { data } = await Tesseract.recognize(image, "eng", {
        logger: (m) => console.log(m),
      });
      setText(data.text);
    } catch (err) {
      console.error(err);
      setError("Failed to extract text. Please try a clearer image.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "extracted-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen w-full md:max-w-2xl mx-auto
     text-white py-8">
      <div className="">
        <ABackButton />
        <div className="mb-8">
          <h1 className="text-2xl font-medium mb-2">Image to Text Converter</h1>
          <p className="text-gray-400 text-sm">
            Extract text from images using OCR technology
          </p>
        </div>

        {/* Upload Section */}
        <div className="mb-6">
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 hover:border-sky-500/30 rounded-xl p-8 cursor-pointer transition-all">
            <FiUpload className="text-sky-500 text-2xl mb-3" />
            <p className="text-gray-300 mb-1 font-medium">
              {image ? image.name : "Upload an image"}
            </p>
            <p className="text-gray-500 text-sm">
              {image ? "Click to change" : "Supports JPG, PNG, BMP"}
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>
        </div>

        {/* Image Preview */}
        {image && (
          <div className="mb-6 bg-gray-900/50 rounded-lg overflow-hidden border border-gray-800">
            <div className="p-4 border-b border-gray-800">
              <p className="text-sm text-gray-400">Image Preview</p>
            </div>
            <div className="p-4 flex justify-center">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="max-h-64 object-contain rounded"
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mb-6">
          <button
            onClick={handleExtractText}
            disabled={!image || loading}
            className={`cursor-pointer w-full py-3 rounded-lg font-medium transition-all ${
              !image || loading
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-sky-600 hover:bg-sky-500 text-white"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <FiLoader className="animate-spin" />
                Processing...
              </span>
            ) : (
              "Extract Text"
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Results Section */}
        {text && (
          <div className="bg-gray-900/50 rounded-lg border border-gray-800 overflow-hidden">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h2 className="font-medium">Extracted Text</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="cursor-pointer text-sm flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded transition-all border border-gray-700"
                >
                  <FiCopy size={14} />
                  Copy
                </button>
                <button
                  onClick={handleDownload}
                  className="cursor-pointer text-sm flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded transition-all border border-gray-700"
                >
                  <FiDownload size={14} />
                  Download
                </button>
              </div>
            </div>
            <div className="p-4">
              <textarea
                value={text}
                readOnly
                rows={10}
                className="w-full bg-black/50 text-white font-mono text-sm p-3 rounded border border-gray-800 focus:outline-none focus:ring-1 focus:ring-sky-500/50 resize-none"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageToTextPage;