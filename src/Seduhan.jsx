import React from 'react';

function Seduhan() {
  return (
    <div className="space-y-4 animate-fadeIn">
      
      {/* PENGENALAN MENU */}
      <div className="w-full bg-white/90 backdrop-blur-sm rounded-[24px] p-5 shadow-[0_8px_25px_rgba(0,0,0,0.02)] space-y-1.5 border border-stone-200/60">
        <div className="flex items-center justify-center space-x-2">
          <h3 className="font-poppins font-black text-base text-[#7b1815] uppercase tracking-tight">Katalog Seduhan</h3>
        </div>
        <p className="text-[10px] text-stone-500 text-center font-medium uppercase tracking-wider">
          Diseduh manual, dinikmati tanpa kepura-puraan.
        </p>
      </div>

      {/* DAFTAR MENU ITEMS */}
      <div className="space-y-3">
        
        {/* ITEM 1: KOPI TUBRUK */}
        <div className="bg-white/90 backdrop-blur-sm border border-stone-200/60 rounded-[22px] p-4 flex items-center justify-between shadow-sm hover:scale-[1.01] transition-transform">
          <div className="space-y-1 max-w-[70%]">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black text-stone-900 font-poppins">Kopi Filter (V60)</span>
              <span className="px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded text-[7px] font-black uppercase tracking-wider">Ready</span>
            </div>
            <p className="text-[10px] text-stone-500 leading-tight font-poppins">Biji kopi Arabika Semendo, diseduh dengan akal dan hati.</p>
          </div>
          <span className="font-mono font-bold text-xs text-[#7b1815] bg-[#7b1815]/5 px-3 py-1.5 rounded-xl border border-[#7b1815]/10">15K</span>
        </div>

        {/* ITEM 2: KOPI SUSU KONTRAS */}
        <div className="bg-white/90 backdrop-blur-sm border border-stone-200/60 rounded-[22px] p-4 flex items-center justify-between shadow-sm hover:scale-[1.01] transition-transform">
          <div className="space-y-1 max-w-[70%]">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black text-stone-900 font-poppins">Kopi Susu Kontras</span>
              <span className="px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded text-[7px] font-black uppercase tracking-wider">Ready</span>
            </div>
            <p className="text-[10px] text-stone-500 leading-tight font-poppins">Perpaduan espresso pekat yang bertabrakan dengan kelembutan susu kental manis.</p>
          </div>
          <span className="font-mono font-bold text-xs text-[#7b1815] bg-[#7b1815]/5 px-3 py-1.5 rounded-xl border border-[#7b1815]/10">13K</span>
        </div>

        {/* ITEM 3 */}
        <div className="bg-white/90 backdrop-blur-sm border border-stone-200/60 rounded-[22px] p-4 flex items-center justify-between shadow-sm hover:scale-[1.01] transition-transform">
          <div className="space-y-1 max-w-[70%]">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black text-stone-900 font-poppins">Teh Rempah Alternatif</span>
              <span className="px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded text-[7px] font-black uppercase tracking-wider">Ready</span>
            </div>
            <p className="text-[10px] text-stone-500 leading-tight font-poppins">Seduhan daun teh hitam berpadu dengan jahe geprek penolak dinginnya angin malam.</p>
          </div>
          <span className="font-mono font-bold text-xs text-[#7b1815] bg-[#7b1815]/5 px-3 py-1.5 rounded-xl border border-[#7b1815]/10">8K</span>
        </div>

        {/* ITEM 4 */}
        <div className="bg-white/90 backdrop-blur-sm border border-stone-200/60 rounded-[22px] p-4 flex items-center justify-between shadow-sm hover:scale-[1.01] transition-transform">
          <div className="space-y-1 max-w-[70%]">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black text-stone-900 font-poppins">Cokelat Es Senyap</span>
              <span className="px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded text-[7px] font-black uppercase tracking-wider">Habis</span>
            </div>
            <p className="text-[10px] text-stone-500 leading-tight font-poppins">Bubuk cokelat pekat kental, opsi terbaik bagi jiwa-jiwa yang menolak pahitnya kopi.</p>
          </div>
          <span className="font-mono font-bold text-xs text-stone-400 bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200 line-through">12K</span>
        </div>

      </div>

      {/* NOTED BANNER */}
      <div className="w-full bg-[#7b1815]/5 border border-[#7b1815]/10 rounded-[20px] p-3.5 text-center">
        <p className="text-[9px] text-[#7b1815] font-bold uppercase tracking-wider leading-relaxed">
          *Keuntungan dari seduhan ini digunakan sepenuhnya untuk menambah koleksi buku gratis di lapak.
        </p>
      </div>

    </div>
  );
}

export default Seduhan;