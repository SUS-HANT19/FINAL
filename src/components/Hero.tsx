import { motion } from 'motion/react';
import { Shield, Sparkles, Send } from 'lucide-react';

export default function Hero({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="relative pt-20 pb-20 overflow-hidden bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 text-white">
      {/* Wave Background Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="mb-8 inline-block"
        >
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-3xl border border-white/30 shadow-2xl">
             <div className="bg-white p-3 rounded-2xl">
                <Shield className="w-12 h-12 text-blue-600" />
             </div>
          </div>
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-6xl md:text-7xl font-bold mb-2 tracking-tight"
        >
          SecureOX
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl font-medium mb-8 opacity-90"
        >
          Lock it. Hide it. Protect it.
        </motion.p>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg mb-12 opacity-80 leading-relaxed font-light"
        >
          Enterprise-grade cybersecurity solutions with military-level encryption, 
          intelligent threat detection, and unbreakable defense systems.
        </motion.p>

        <motion.button
          onClick={onGetStarted}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-blue-900/20 flex items-center gap-2 mx-auto"
        >
          Get Started
          <Sparkles className="w-5 h-5 text-yellow-500" />
        </motion.button>
      </div>
    </section>
  );
}
