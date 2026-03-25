import { useState } from 'react';
import { motion } from 'framer-motion';

export default function StaffForm({ staffName }) {
  const [defendant, setDefendant] = useState('');
  const [details, setDetails] = useState('');
  const [status, setStatus] = useState('');

  const submitCase = async () => {
    setStatus('VERIFYING JURISDICTION...');
    const res = await fetch('/api/tickets/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ defendantId: defendant, details, staffName })
    });
    const data = await res.json();
    setStatus(data.success ? `CASE ${data.caseId} FILED.` : `ERROR: ${data.error}`);
  };

  return (
    <motion.div className="p-6 bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-[10px] font-black uppercase text-red-600 mb-4">New Case Filing</h3>
      <input 
        placeholder="USER ID / NICKNAME" 
        className="w-full bg-zinc-50 dark:bg-zinc-900 p-3 mb-3 border border-zinc-200 dark:border-zinc-800 text-sm outline-none uppercase text-white"
        onChange={(e) => setDefendant(e.target.value)}
      />
      <textarea 
        placeholder="VIOLATION DETAILS..." 
        className="w-full bg-zinc-50 dark:bg-zinc-900 p-3 mb-3 border border-zinc-200 dark:border-zinc-800 text-sm h-32 outline-none text-white"
        onChange={(e) => setDetails(e.target.value)}
      />
      <button 
        onClick={submitCase}
        className="w-full bg-black dark:bg-white text-white dark:text-black py-4 font-bold text-[10px] uppercase tracking-tighter hover:bg-red-600 transition-colors"
      >
        Authorize Charge
      </button>
      {status && <p className="mt-4 text-[9px] font-bold text-center uppercase tracking-widest text-white">{status}</p>}
    </motion.div>
  );
          }
