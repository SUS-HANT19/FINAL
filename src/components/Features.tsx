import { motion } from 'motion/react';
import { Shield, Scan, ShieldAlert, Zap } from 'lucide-react';

const features = [
  {
    title: "Military-Grade Encryption",
    description: "AES-256-GCM encryption with PBKDF2 key derivation protects your sensitive data.",
    icon: Shield,
  },
  {
    title: "OCR Technology",
    description: "Extract text from images with advanced optical character recognition.",
    icon: Scan,
  },
  {
    title: "Zero-Knowledge Security",
    description: "Your encryption keys are never stored or transmitted to our servers.",
    icon: ShieldAlert,
  },
  {
    title: "Lightning Fast",
    description: "Optimized performance ensures quick encryption and decryption operations.",
    icon: Zap,
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-gradient-to-b from-blue-600 to-cyan-500 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose SecureOX?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Industry-leading security features designed to protect what matters most
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-slate-900/60 transition-all cursor-default"
            >
              <div className="bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Security Guarantees */}
        <div className="mt-20 p-10 bg-slate-900/60 backdrop-blur-md rounded-3xl border border-white/10 max-w-4xl mx-auto">
          <h4 className="text-2xl font-bold mb-8 text-center">Security Guarantees</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-sm opacity-90">End-to-end encryption for all operations</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-sm opacity-90">GDPR and SOC 2 compliant infrastructure</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-sm opacity-90">Regular security audits and updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
