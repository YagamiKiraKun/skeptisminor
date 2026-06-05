import React, { useState } from 'react';
import logoImg from './assets/skeptis minor.png';
import Login from './Login'; 
import Seduhan from './Seduhan'; 
import Koleksi from './Koleksi'; // <--- IMPORT FILE KOLEKSI BARU DI SINI

function App() {
  // === STATE MANAGEMENT ===
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [activeTab, setActiveTab] = useState('tentang');

  return (
    /* CONTAINER LUAR: Background charcoal hangat untuk kontras simulator HP */
    <div className="min-h-dvh w-full bg-stone-900 flex justify-center items-center p-0 sm:p-4 select-none relative overflow-hidden font-sans">
      
      {/* BACKGROUND ORBS */}
      <div className="absolute top-[10%] left-[-10%] w-72 h-72 rounded-full bg-[#7b1815]/10 blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-80 h-80 rounded-full bg-[#7b1815]/15 blur-[100px] pointer-events-none"></div>

      {/* ================= CASING HANDPHONE MAIN CONTAINER ================= */}
      <div className="w-full max-w-[410px] h-dvh sm:h-[820px] bg-[#fbf9f5] relative flex flex-col overflow-hidden rounded-none sm:rounded-[40px] border-0 sm:border sm:border-stone-200 shadow-none sm:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]">
        
        {/* TOP STATUS BAR SIMULATION */}
        <div className="w-full h-9 flex justify-between items-center px-6 pt-3 text-white/40 text-[11px] font-mono z-50 bg-[#7b1815] shrink-0">
          <span>9:41</span>
          <div className="flex space-x-1.5 items-center">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>
            <div className="w-4 h-2.5 border border-white/40 rounded-sm p-0.5 flex items-center"><div className="w-full h-full bg-white/40 rounded-[1px]"></div></div>
          </div>
        </div>

        {/* === LOGIC CONDITIONAL RENDERING === */}
        {!isLoggedIn ? (
          <Login onLoginSuccess={() => setIsLoggedIn(true)} logoImg={logoImg} />
        ) : (
          <>
            {/* ================= FIXED STICKY TOP HEADER ================= */}
            <div className="w-full h-36 bg-[#7b1815] relative overflow-hidden rounded-b-[44px] shadow-[0_12px_25px_rgba(123,24,21,0.15)] z-40 flex items-center justify-center shrink-0">
              <img src={logoImg} alt="Skeptis Minor Header" className="w-full h-full object-contain scale-125 pt-1" />

              {/* TOMBOL LOG OUT */}
              <div className="absolute top-4 right-4 z-50">
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ================= AREA UTAMA CONTENT ================= */}
            <div className="flex-1 overflow-y-auto pb-28 pt-14 px-5 scrollbar-none z-10 space-y-5 bg-[#fbf9f5]">
              
              {/* TAB 1: TENTANG KAMI */}
              {activeTab === 'tentang' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* MANIFESTO CARD */}
                  <div className="w-full bg-white/90 backdrop-blur-sm rounded-[24px] p-5 shadow-[0_8px_25px_rgba(0,0,0,0.02)] space-y-2.5 border border-stone-200/60 relative overflow-hidden">
                    <div className="flex items-center justify-center space-x-2">
                      <h3 className="font-poppins font-black text-base text-[#7b1815] uppercase tracking-tight">
                        Manifesto Lapak
                      </h3>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed font-poppins text-justify">
                      "Kami adalah ruang alternatif kecil yang menolak senyap. Menyediakan wadah baca gratis di ruang publik, ditemani seduhan kopi yang jujur, guna memicu obrolan-obrolan kritis dan hangat di pinggir jalan."
                    </p>
                  </div>

                  {/* GRID INFO OPERASIONAL */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/90 backdrop-blur-sm border border-stone-200/60 rounded-[20px] p-3.5 flex flex-col justify-between space-y-3 shadow-sm">
                      <div className="p-1.5 bg-[#7b1815]/5 rounded-lg w-7 h-7 flex items-center justify-center border border-[#7b1815]/10 text-[#7b1815]">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                      </div>
                      <div>
                        <span className="text-[8px] uppercase font-bold text-stone-400 block tracking-wider">Waktu</span>
                        <span className="text-[11px] font-bold text-stone-800 leading-tight block mt-0.5">Rabu<br/>16:00 - Cukup</span>
                      </div>
                    </div>

                    <div className="bg-white/90 backdrop-blur-sm border border-stone-200/60 rounded-[20px] p-3.5 flex flex-col justify-between space-y-3 shadow-sm">
                      <div className="p-1.5 bg-emerald-500/10 rounded-lg w-7 h-7 flex items-center justify-center border border-emerald-500/20 text-emerald-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      </div>
                      <div>
                        <span className="text-[8px] uppercase font-bold text-stone-400 block tracking-wider">Status Lapak</span>
                        <span className="text-[11px] font-black text-emerald-600 tracking-wide block mt-0.5 uppercase">Sedang Buka</span>
                      </div>
                    </div>
                  </div>

                  {/* LOKASI CARD */}
                  <div className="w-full bg-white/90 backdrop-blur-sm border border-stone-200/60 rounded-[20px] p-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 bg-[#7b1815]/5 rounded-xl border border-[#7b1815]/10 text-[#7b1815] shadow-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[8px] uppercase font-bold text-stone-400 block tracking-wider">Titik Kumpul</span>
                        <h4 className="text-xs font-bold text-stone-800 leading-tight">Landmark Unsri</h4>
                      </div>
                    </div>
                    <button className="bg-[#7b1815] text-white font-black text-[9px] uppercase tracking-widest px-3.5 py-1.5 rounded-lg shadow-sm hover:bg-[#9c2421] transition-all active:scale-95">
                      Maps
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: MENU SEDUHAN */}
              {activeTab === 'kopi' && <Seduhan />}

              {/* === TAB 3: RAK KOLEKSI BUKU (SEKARANG PANGGIL FILE TERPISAH) === */}
              {activeTab === 'buku' && <Koleksi />}

              {/* EMPTY VIEW FALLBACK UNTUK TAB ARTIKEL / CATATAN */}
              {activeTab === 'artikel' && (
                <div className="h-48 flex flex-col justify-center items-center text-center space-y-2 animate-fadeIn">
                  <div className="p-3 bg-[#7b1815]/5 rounded-full text-[#7b1815]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                  </div>
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">Segera Hadir</h4>
                  <p className="text-[10px] text-stone-400 max-w-[180px]">Arsip catatan dan artikel berkala sedang dalam proses penulisan.</p>
                </div>
              )}

            </div>

            <div className="absolute bottom-5 left-4 right-4 h-20 bg-white/70 backdrop-blur-xl border border-stone-200/80 flex justify-around items-center px-2 z-50 rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
              <button onClick={() => setActiveTab('tentang')} className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-xl transition-all duration-300 ${activeTab === 'tentang' ? 'text-[#7b1815] bg-[#7b1815]/5 border border-[#7b1815]/10 scale-105 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
                <span className="text-[8px] font-black uppercase tracking-tight">Tentang</span>
              </button>
              <button onClick={() => setActiveTab('kopi')} className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-xl transition-all duration-300 ${activeTab === 'kopi' ? 'text-[#7b1815] bg-[#7b1815]/5 border border-[#7b1815]/10 scale-105 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" /></svg>
                <span className="text-[8px] font-black uppercase tracking-tight">Seduhan</span>
              </button>
              <button onClick={() => setActiveTab('buku')} className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-xl transition-all duration-300 ${activeTab === 'buku' ? 'text-[#7b1815] bg-[#7b1815]/5 border border-[#7b1815]/10 scale-105 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>
                <span className="text-[8px] font-black uppercase tracking-tight">Koleksi</span>
              </button>
              <button onClick={() => setActiveTab('artikel')} className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-xl transition-all duration-300 ${activeTab === 'artikel' ? 'text-[#7b1815] bg-[#7b1815]/5 border border-[#7b1815]/10 scale-105 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125H9.75M10.5 7.5H12m-.75 3H12M3 16.5v-10.5A2.25 2.25 0 0 1 5.25 3.75h1.5m.75 3H12v9.75m-9.75 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0V7.5" /></svg>
                <span className="text-[8px] font-black uppercase tracking-tight">Catatan</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;