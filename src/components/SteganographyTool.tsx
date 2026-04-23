import { useState, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Upload, FileUp, Download, Eye, Layers } from 'lucide-react';

export default function SteganographyTool() {
  const [activeTab, setActiveTab] = useState<'embed' | 'extract'>('embed');
  const [image, setImage] = useState<string | null>(null);
  const [textToEmbed, setTextToEmbed] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcess = () => {
    if (activeTab === 'embed') {
      // Mock for video logic
      alert('Secret text embedded successfully! Click Download to save.');
    } else {
      setExtractedText(textToEmbed || 'My doodle art 2026');
    }
  };

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-slate-950 rounded-[2rem] shadow-2xl border border-slate-800 overflow-hidden">
          <div className="p-8 border-b border-slate-800 bg-slate-950/50 flex items-center gap-4">
             <div className="bg-cyan-600 p-2.5 rounded-xl shadow-lg shadow-cyan-900/40">
                <Layers className="w-6 h-6 text-white" />
             </div>
             <div>
                <h3 className="text-2xl font-bold text-white">Image Steganography</h3>
                <p className="text-sm text-slate-400">Hide and extract secret text within images</p>
             </div>
          </div>

          <div className="flex bg-slate-900 p-2">
            <button
              onClick={() => setActiveTab('embed')}
              className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'embed' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <FileUp className="w-4 h-4" />
              Embed Text
            </button>
            <button
              onClick={() => setActiveTab('extract')}
              className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'extract' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4" />
              Extract Text
            </button>
          </div>

          <div className="p-8 space-y-8">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="relative aspect-video rounded-3xl border-4 border-dashed border-slate-800 bg-slate-900/50 hover:bg-slate-900 transition-all cursor-pointer flex flex-col items-center justify-center group overflow-hidden"
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden" 
                accept="image/*"
              />
              {image ? (
                <>
                  <img src={image} className="absolute inset-0 w-full h-full object-contain p-4" alt="Upload" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white font-bold flex items-center gap-2">
                      <Upload className="w-5 h-5" /> Change Image
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center p-8">
                  <div className="bg-slate-900 w-16 h-16 rounded-2xl shadow-xl mx-auto mb-4 flex items-center justify-center border border-slate-800">
                    <ImageIcon className="w-8 h-8 text-slate-500" />
                  </div>
                  <p className="text-slate-300 font-bold mb-1">Click to upload an image</p>
                  <p className="text-slate-500 text-xs">JPG or PNG (max 10MB)</p>
                </div>
              )}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'embed' ? (
                <motion.div
                  key="embed"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Text to Embed</label>
                    <textarea
                      value={textToEmbed}
                      onChange={(e) => setTextToEmbed(e.target.value)}
                      placeholder="Enter the secret text you want to hide in the image..."
                      className="w-full bg-slate-900 border-2 border-slate-800 rounded-2xl p-4 min-h-[100px] focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all text-white placeholder:text-slate-600"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={handleProcess}
                      className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-4 rounded-2xl font-bold transition-all shadow-xl shadow-cyan-900/40 flex items-center justify-center gap-2"
                    >
                      <Layers className="w-5 h-5" /> Embed Text in Image
                    </button>
                    {image && (
                      <button className="bg-slate-800 hover:bg-black text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 border border-slate-700">
                        <Download className="w-5 h-5" /> Download
                      </button>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="extract"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <button
                    onClick={handleProcess}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-4 rounded-2xl font-bold transition-all shadow-xl shadow-cyan-900/40 flex items-center justify-center gap-2"
                  >
                    <Eye className="w-5 h-5" /> Extract Hidden Text
                  </button>
                  
                  {extractedText && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 bg-green-950/20 border-2 border-green-900/30 rounded-2xl text-green-400 font-bold"
                    >
                      <p className="text-xs uppercase opacity-70 mb-2 tracking-widest">Extracted Secret:</p>
                      <p className="text-lg">{extractedText}</p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
               <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">How Steganography Works:</h4>
               <ul className="space-y-2 text-xs text-slate-500 leading-relaxed italic">
                 <li>• Text is hidden in the least significant bits of image pixels</li>
                 <li>• Changes are imperceptible to the human eye</li>
                 <li>• Original image quality is preserved</li>
                 <li>• Only works with lossless PNG format for extraction</li>
               </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
