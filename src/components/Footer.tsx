export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6 text-blue-500">
               <div className="bg-blue-600 text-white p-1 rounded-lg">
                  <span className="text-xs font-bold px-1">OX</span>
               </div>
               <span className="text-xl font-bold tracking-tight text-white uppercase">Secureox</span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              SecureOX is a leading cybersecurity company dedicated to protecting individuals 
              and organizations with advanced optical character recognition technology and 
              security solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
             <div>
                <h4 className="font-bold text-white mb-4">Contact us</h4>
                <div className="space-y-4">
                   <div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Email</p>
                      <p className="text-blue-400 font-medium text-sm">support@secureox.co</p>
                   </div>
                </div>
             </div>
             <div>
                <h4 className="font-bold text-white mb-4">Location</h4>
                <div className="space-y-4">
                   <div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">HQ</p>
                      <p className="text-slate-300 font-medium text-sm">Asia, Singapore</p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
           <p>© {new Date().getFullYear()} SECUREOX. All rights reserved.</p>
           <div className="flex gap-8">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Compliance</a>
           </div>
        </div>
      </div>
    </footer>
  );
}
