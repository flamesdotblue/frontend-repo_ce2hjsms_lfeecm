import { useState } from 'react';
import { Upload } from 'lucide-react';

const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function ReportUploader({ token }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus('Please choose a PDF report to upload.');
      return;
    }
    setLoading(true);
    setStatus('');
    setLink('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`${baseURL}/uploads/report`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Upload failed');
      setStatus('Report uploaded successfully.');
      if (data.filename) {
        setLink(`${baseURL}/uploads/report/${encodeURIComponent(data.filename)}`);
      }
    } catch (err) {
      setStatus(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="upload" className="relative">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-fuchsia-500 grid place-items-center">
            <Upload className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-white">Upload Medical Report (PDF)</h3>
        </div>
        {!token && (
          <p className="mb-4 text-sm text-fuchsia-300/80">Log in to attach uploads to your account.</p>
        )}
        <form onSubmit={handleUpload} className="flex flex-col md:flex-row items-start md:items-center gap-3">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="file:mr-4 file:rounded-md file:border-0 file:bg-cyan-600 file:px-4 file:py-2 file:text-white file:hover:bg-cyan-500 file:cursor-pointer rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-fuchsia-500 to-cyan-500 px-4 py-2 font-medium text-white hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Uploading…' : 'Upload'}
          </button>
        </form>
        {status && <p className="mt-3 text-sm text-cyan-200/90">{status}</p>}
        {link && (
          <p className="mt-2 text-sm">
            <a href={link} target="_blank" rel="noreferrer" className="text-cyan-300 underline">View uploaded file</a>
          </p>
        )}
      </div>
    </section>
  );
}
