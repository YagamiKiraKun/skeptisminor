import React from 'react';

function Koleksi() {
  return (
    <div className="space-y-4 animate-fadeIn">
      
      {/* PENGENALAN RAK BUKU */}
      <div className="w-full bg-white/90 backdrop-blur-sm rounded-[24px] p-5 shadow-[0_8px_25px_rgba(0,0,0,0.02)] space-y-1.5 border border-stone-200/60">
        <div className="flex items-center justify-center space-x-2">
          <h3 className="font-poppins font-black text-base text-[#7b1815] uppercase tracking-tight">Rak Koleksi</h3>
        </div>
        <p className="text-[10px] text-stone-500 text-center font-medium uppercase tracking-wider">
          Silakan baca di tempat. Gratis, bebas, dan merdeka.
        </p>
      </div>

      {/* DAFTAR BUKU DI LAPAK */}
      <div className="space-y-3">
        
        {/* BUKU 1 */}
        <div className="bg-white/90 backdrop-blur-sm border border-stone-200/60 rounded-[22px] p-4 flex items-center justify-between shadow-sm hover:scale-[1.01] transition-transform">
          <div className="space-y-1 max-w-[75%]">
            <div className="flex items-center space-x-2">
              <span className="px-1.5 py-0.5 bg-[#7b1815]/5 border border-[#7b1815]/10 text-[#7b1815] rounded text-[7px] font-black uppercase tracking-wider">Filsafat</span>
              <span className="px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded text-[7px] font-black uppercase tracking-wider">Tersedia</span>
            </div>
            <h4 className="text-xs font-black text-stone-900 font-poppins mt-1">Madilog</h4>
            <p className="text-[10px] text-stone-400 font-medium">Tan Malaka</p>
          </div>
          <div className="text-stone-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>
          </div>
        </div>

        {/* BUKU 2 */}
        <div className="bg-white/90 backdrop-blur-sm border border-stone-200/60 rounded-[22px] p-4 flex items-center justify-between shadow-sm hover:scale-[1.01] transition-transform">
          <div className="space-y-1 max-w-[75%]">
            <div className="flex items-center space-x-2">
              <span className="px-1.5 py-0.5 bg-[#7b1815]/5 border border-[#7b1815]/10 text-[#7b1815] rounded text-[7px] font-black uppercase tracking-wider">Sastra</span>
              <span className="px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded text-[7px] font-black uppercase tracking-wider">Tersedia</span>
            </div>
            <h4 className="text-xs font-black text-stone-900 font-poppins mt-1">Bumi Manusia</h4>
            <p className="text-[10px] text-stone-400 font-medium">Pramoedya Ananta Toer</p>
          </div>
          <div className="text-stone-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>
          </div>
        </div>

        {/* BUKU 3 */}
        <div className="bg-white/90 backdrop-blur-sm border border-stone-200/60 rounded-[22px] p-4 flex items-center justify-between shadow-sm hover:scale-[1.01] transition-transform">
          <div className="space-y-1 max-w-[75%]">
            <div className="flex items-center space-x-2">
              <span className="px-1.5 py-0.5 bg-[#7b1815]/5 border border-[#7b1815]/10 text-[#7b1815] rounded text-[7px] font-black uppercase tracking-wider">Sosial</span>
              <span className="px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded text-[7px] font-black uppercase tracking-wider">Sedang Dibaca</span>
            </div>
            <h4 className="text-xs font-black text-stone-900 font-poppins mt-1">Catatan Seorang Demonstran</h4>
            <p className="text-[10px] text-stone-400 font-medium">Soe Hok Gie</p>
          </div>
          <div className="text-stone-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>
          </div>
        </div>

        {/* BUKU 4 */}
        <div className="bg-white/90 backdrop-blur-sm border border-stone-200/60 rounded-[22px] p-4 flex items-center justify-between shadow-sm hover:scale-[1.01] transition-transform">
          <div className="space-y-1 max-w-[75%]">
            <div className="flex items-center space-x-2">
              <span className="px-1.5 py-0.5 bg-[#7b1815]/5 border border-[#7b1815]/10 text-[#7b1815] rounded text-[7px] font-black uppercase tracking-wider">Komedi</span>
              <span className="px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded text-[7px] font-black uppercase tracking-wider">Sedang Dibaca</span>
            </div>
            <h4 className="text-xs font-black text-stone-900 font-poppins mt-1">Lucunya, CEO MBG!</h4>
            <p className="text-[10px] text-stone-400 font-medium">Soe Hok Gie</p>
          </div>
          <div className="text-stone-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>
          </div>
        </div>

      </div>

      {/* SYARAT PINJAM BANNER */}
      <div className="w-full bg-[#7b1815]/5 border border-[#7b1815]/10 rounded-[20px] p-3.5 text-center">
        <p className="text-[9px] text-[#7b1815] font-bold uppercase tracking-wider leading-relaxed">
          *Selesai membaca, harap kembalikan buku ke tempat semula agar bisa dinikmati kawan yang lain.
        </p>
      </div>

    </div>
  );
}

export default Koleksi;