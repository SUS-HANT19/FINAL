/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from './components/Hero';
import Features from './components/Features';
import EncryptionTool from './components/EncryptionTool';
import SteganographyTool from './components/SteganographyTool';
import Footer from './components/Footer';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    setIsStarted(true);
  };

  // Effect to scroll once the tools are rendered
  useEffect(() => {
    if (isStarted && toolsRef.current) {
      toolsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isStarted]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Hero onGetStarted={handleStart} />
      
      <AnimatePresence>
        {!isStarted && (
          <motion.div
            key="initial-features"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Features />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        <AnimatePresence>
          {isStarted && (
            <motion.div
              key="tools-section"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div ref={toolsRef} className="scroll-mt-20">
                <EncryptionTool />
                <SteganographyTool />
              </div>
              
              {/* Optional: Add a back button or just keep them visible */}
              <div className="pb-20 text-center">
                 <button 
                  onClick={() => {
                    setIsStarted(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-slate-500 hover:text-white text-sm font-medium transition-colors underline underline-offset-4"
                 >
                   Back to Features
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
