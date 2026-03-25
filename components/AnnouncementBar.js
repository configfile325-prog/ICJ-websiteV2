import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AnnouncementBar() {
  const [msg, setMsg] = useState("ICJ SYSTEM INITIALIZING...");

  useEffect(() => {
    fetch('/api/admin/get-announcement')
      .then(res => res.json())
      .then(data => setMsg(data.message || "MONKEYBYTES JURISDICTION ACTIVE"));
  }, []);

  return (
    <div className="bg-red-600 text-white py-2 overflow-hidden whitespace-nowrap border-b border-black/20">
      <motion.div 
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="inline-block font-black text-[10px] uppercase tracking-[0.3em]"
      >
        âš–ï¸ ICJ ALERT: {msg} â€” SESSION ACTIVE â€” {msg} â€” SESSION ACTIVE
      </motion.div>
    </div>
  );
          }
