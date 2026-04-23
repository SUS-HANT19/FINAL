import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, Copy, Check, Eye, EyeOff } from 'lucide-react';

export default function EncryptionTool({ id }: { id?: string }) {
  const [activeTab, setActiveTab] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [text, setText] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [showPassphrase, setShowPassphrase] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const handleProcess = async () => {
    if (!text || !passphrase) return;
    
    try {
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();

      if (activeTab === 'encrypt') {
        const salt = window.crypto.getRandomValues(new Uint8Array(16));
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        
        const passwordKey = await window.crypto.subtle.importKey(
          "raw", encoder.encode(passphrase), "PBKDF2", false, ["deriveKey"]
        );

        const key = await window.crypto.subtle.deriveKey(
          { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
          passwordKey,
          { name: "AES-GCM", length: 256 },
          false,
          ["encrypt"]
        );

        const encrypted = await window.crypto.subtle.encrypt(
          { name: "AES-GCM", iv }, key, encoder.encode(text)
        );

        // Combine Salt + IV + Data for a single string
        const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
        combined.set(salt, 0);
        combined.set(iv, salt.length);
        combined.set(new Uint8Array(encrypted), salt.length + iv.length);
        
        const base64 = btoa(String.fromCharCode(...combined));
        setResult(base64);
      } else {
        const combined = new Uint8Array(atob(text).split("").map(c => c.charCodeAt(0)));
        const salt = combined.slice(0, 16);
        const iv = combined.slice(16, 28);
        const data = combined.slice(28);

        const passwordKey = await window.crypto.subtle.importKey(
          "raw", encoder.encode(passphrase), "PBKDF2", false, ["deriveKey"]
        );

        const key = await window.crypto.subtle.deriveKey(
          { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
          passwordKey,
          { name: "AES-GCM", length: 256 },
          false,
          ["decrypt"]
        );

        const decrypted = await window.crypto.subtle.decrypt(
          { name: "AES-GCM", iv }, key, data
        );

        setResult(decoder.decode(decrypted));
      }
    } catch (err) {
      console.error(err);
      setResult(activeTab === 'encrypt' ? "Encryption failed." : "Decryption failed. Check text or passphrase.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id={id} className="py-20 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-slate-900 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-800 overflow-hidden">
          <div className="p-8 border-b border-slate-800 bg-slate-900/50 flex items-center gap-4">
             <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-900/40">
                <Lock className="w-6 h-6 text-white" />
             </div>
             <div>
                <h3 className="text-2xl font-bold text-white">Text Encryption</h3>
                <p className="text-sm text-slate-400">Secure your messages with AES-256-GCM encryption</p>
             </div>
          </div>

          <div className="flex bg-slate-950 p-2">
            <button
              onClick={() => { 
                setActiveTab('encrypt'); 
                setResult(''); 
                setText('');
                setPassphrase('');
              }}
              className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'encrypt' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Lock className="w-4 h-4" />
              Encrypt
            </button>
            <button
              onClick={() => { 
                setActiveTab('decrypt'); 
                setResult(''); 
                setText('');
                setPassphrase('');
              }}
              className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'decrypt' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Unlock className="w-4 h-4" />
              Decrypt
            </button>
          </div>

          <div className="p-8 space-y-6 text-slate-300">
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">
                {activeTab === 'encrypt' ? 'Plaintext' : 'Ciphertext'}
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={activeTab === 'encrypt' ? "Enter text to encrypt..." : "Paste ciphertext to decrypt..."}
                className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl p-4 min-h-[120px] focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-white placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">
                {activeTab === 'encrypt' ? 'Encryption Passphrase' : 'Decryption Passphrase'}
              </label>
              <div className="relative">
                <input
                  type={showPassphrase ? "text" : "password"}
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  placeholder="Enter a strong passphrase"
                  className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl p-4 pr-12 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-white placeholder:text-slate-600"
                />
                <button
                  onClick={() => setShowPassphrase(!showPassphrase)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-300"
                >
                  {showPassphrase ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              onClick={handleProcess}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2 group"
            >
              {activeTab === 'encrypt' ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
              {activeTab === 'encrypt' ? 'Encrypt Text' : 'Decrypt Text'}
            </button>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-8 space-y-4"
                >
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-wide">
                    {activeTab === 'encrypt' ? 'Encrypted Ciphertext' : 'Decrypted Text'}
                  </label>
                  <div className="relative group">
                    <div className={`w-full ${activeTab === 'encrypt' ? 'bg-black text-green-400' : 'bg-green-950/20 text-green-400'} border-2 border-slate-800 rounded-2xl p-6 font-mono text-sm break-all leading-relaxed`}>
                      {result}
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="absolute top-4 right-4 bg-white/5 hover:bg-white/10 p-2 rounded-lg text-white backdrop-blur-sm border border-white/10 transition-all opacity-0 group-hover:opacity-100"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  {copied && (
                    <p className="text-xs text-green-500 font-bold text-center">Copied to clipboard!</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-6 border-t border-slate-800 grid grid-cols-2 gap-4">
               <div className="text-[10px] text-slate-500 italic uppercase font-bold tracking-widest">Security: AES-256-GCM / PBKDF2</div>
               <div className="text-[10px] text-slate-500 italic text-right uppercase font-bold tracking-widest">Zero-Knowledge Architecture</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
