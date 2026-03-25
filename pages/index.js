import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ICJHome() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const searchCase = async () => {
    const res = await fetch(`/api/tickets/lookup?id=${query.toUpperCase()}`);
    const data = await res.json();
    setResult(data.success ? data.ticket : { error: "Case not found." });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      {/* ICJ Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-6xl font-black tracking-tighter text-zinc-900 dark:text-white mb-2 uppercase">ICJ</h1>
        <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-500 mb-12">International Court of Justice</p>
      </motion.div>

      {/* Search Bar */}
      <div className="w-full max-w-lg relative mb-12">
        <input 
          type="text"
          placeholder="ENTER CASE ID..."
          className="w-full bg-transparent border-b-2 border-zinc-200 dark:border-zinc-800 p-4 text-center text-xl outline-none focus:border-red-600 transition-all uppercase"
          onChange={(e) => setQuery(e.target.value)}
        />
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={searchCase}
          className="mt-6 bg-zinc-900 dark:bg-white text-white dark:text-black px-10 py-3 font-bold text-[10px] tracking-widest uppercase"
        >
          Query Archives
        </motion.button>
      </div>

      {/* Results Section */}
      <AnimatePresence>
        {result && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg p-6 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0a0a0a]"
          >
            {result.error ? (
              <p className="text-red-600 text-xs font-bold uppercase">{result.error}</p>
            ) : (
              <div className="text-left">
                <p className="text-red-600 font-bold mb-2">{result.id}</p>
                <p className="text-sm italic dark:text-zinc-300">"{result.details}"</p>
                <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-between text-[9px] uppercase text-zinc-500">
                  <span>Defendant: {result.defendant_id}</span>
                  <span>Status: {result.status}</span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Disclaimer - Hardcoded for now */}
      <footer className="mt-20 opacity-30 text-[9px] max-w-xs uppercase tracking-widest">
        MonkeyBytes ICJ is for entertainment only. Not a real legal entity.
      </footer>
    </div>
  );
}
