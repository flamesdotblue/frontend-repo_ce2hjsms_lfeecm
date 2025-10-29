import React, { useState } from 'react';
import { Upload, FileText } from 'lucide-react';

const ReportUploader = ({ baseUrl, token }) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [uploaded, setUploaded] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setStatus('');
    setUploaded(null);

    try {
      const form = new FormData();
      form.append('file', file);

      const res = await fetch(`${baseUrl}/uploads/report`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Upload failed');
      setUploaded(data);
      setStatus('Upload successful');
      setFile(null);
    } catch (err) {
      setStatus(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="upload" className="w-full">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
            <Upload className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Upload medical report</h3>
            <p className="text-white/60 text-sm">PDF files are supported</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="grid gap-4">
          <label className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/20 bg-black/30 p-6 text-center hover:bg-black/40 transition cursor-pointer">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />
            <FileText className="h-8 w-8 text-white/80" />
            <div className="text-white/80 text-sm">
              {file ? (
                <span className="text-white">{file.name}</span>
              ) : (
                <>
                  <span className="font-medium text-white">Choose PDF</span> or drag and drop
                </>
              )}
            </div>
          </label>

          <div className="flex items-center justify-between">
            <div className="text-sm text-white/70">
              {status && <span>{status}</span>}
            </div>
            <button
              type="submit"
              disabled={!file || loading}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-5 py-2.5 text-white font-medium hover:opacity-90 disabled:opacity-60"
            >
              <Upload className="h-4 w-4" /> {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>

        {uploaded && (
          <div className="mt-4 text-sm text-white/80">
            <div className="rounded-md border border-white/10 bg-black/40 p-3">
              <div>Report ID: <span className="text-white">{uploaded.id || uploaded._id || 'N/A'}</span></div>
              {uploaded.url && (
                <div>
                  File URL: <a href={uploaded.url} className="text-cyan-400 underline" target="_blank" rel="noreferrer">Open</a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReportUploader;
