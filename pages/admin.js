import { useState } from 'react';
import { motion } from 'framer-motion';
import Disclaimer from '../components/Disclaimer';

export default function AdminDashboard() {
  const [msg, setMsg] = useState('');

  const saveAnnouncement = async () => {
    await fetch('/api/admin/set-announcement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg, staffRole: 'ADMIN' })
    });
    alert("Banner Updated!");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black italic tracking-tighter mb-10 border-b border-zinc-900 pb-5">COURT ADMINISTRATION</h1>
        
        <div className="grid gap-10">
          <div className="p-8 border border-zinc-800 bg-zinc-900/20">
            <h2 className="text-[10px] font-bold text-red-600 uppercase tracking-[0.3em] mb-4">Set Site Announcement</h2>
            <textarea 
              className="w-full bg-black border border-zinc-800 p-4 text-sm outline-none focus:ring-1 ring-red-600 mb-4 h-24"
              placeholder="Type announcement here..."
              onChange={(e) => setMsg(e.target.value)}
            />
            <button 
              onClick={saveAnnouncement}
              className="w-full bg-white text-black py-4 font-black text-[10px] uppercase tracking-widest"
            >
              Broadcast to Site
            </button>
          </div>
        </div>
      </div>
      <Disclaimer />
    </div>
  );
}
