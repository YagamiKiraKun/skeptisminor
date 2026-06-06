import React, { useState } from 'react';
import logoImg from './assets/skeptis minor.png';
import Login from './Login'; 
import Seduhan from './Seduhan'; 
import Koleksi from './Koleksi'; 

function App() {
  // === STATE ROLE MANAGEMENT ===
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isAdmin, setIsAdmin] = useState(false); 
  const [activeTab, setActiveTab] = useState('tentang');

  // === STATE ALUR 1: DATA OPERASIONAL LAPAK ===
  const [waktuLapak, setWaktuLapak] = useState("Rabu\n16:00 - Cukup");
  const [statusLapak, setStatusLapak] = useState("Sedang Buka"); 
  const [titikKumpul, setTitikKumpul] = useState("Landmark Unsri");
  // Default link maps yang normal agar tidak diblokir browser
  const [linkMaps, setLinkMaps] = useState("https://maps.google.com"); 

  // === STATE ALUR 2: DATA MENU SEDUHAN ===
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Kopi Filter (V60)', price: 15, status: 'Ready', desc: 'Biji kopi Arabika Semendo, diseduh dengan akal dan hati.' },
    { id: 2, name: 'Kopi Susu Kontras', price: 13, status: 'Ready', desc: 'Perpaduan espresso pekat yang bertabrakan dengan kelembutan susu kental manis.' },
    { id: 3, name: 'Teh Rempah Alternatif', price: 8, status: 'Ready', desc: 'Seduhan daun teh hitam berpadu dengan jahe geprek penolak dinginnya angin malam.' },
    { id: 4, name: 'Cokelat Es Senyap', price: 12, status: 'Habis', desc: 'Bubuk cokelat pekat kental, opsi terbaik bagi jiwa-jiwa yang menolak pahitnya kopi.' }
  ]);
  const [ordersHistory, setOrdersHistory] = useState([]); 

  // === STATE ALUR 3: DATA KOLEKSI BUKU ===
  const [koleksiBuku, setKoleksiBuku] = useState([
    { id: 1, judul: 'Madilog', penulis: 'Tan Malaka', kategori: 'Filsafat', status: 'Tersedia' },
    { id: 2, judul: 'Bumi Manusia', penulis: 'Pramoedya Ananta Toer', kategori: 'Sastra', status: 'Tersedia' },
    { id: 3, judul: 'Catatan Seorang Demonstran', penulis: 'Soe Hok Gie', kategori: 'Sosial', status: 'Sedang Dibaca' }
  ]);

  return (
    <div className="min-h-dvh w-full bg-stone-900 flex justify-center items-center p-0 sm:p-4 relative overflow-hidden font-sans">
      <div className="absolute top-[10%] left-[-10%] w-72 h-72 rounded-full bg-[#7b1815]/10 blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-80 h-80 rounded-full bg-[#7b1815]/15 blur-[100px] pointer-events-none"></div>

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-[410px] h-dvh sm:h-[820px] bg-[#fbf9f5] relative flex flex-col overflow-hidden border-0 sm:border sm:border-stone-200 shadow-none sm:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]">
        
        {!isLoggedIn ? (
          <Login onLoginSuccess={(adminStatus) => { setIsLoggedIn(true); setIsAdmin(adminStatus); }} logoImg={logoImg} />
        ) : (
          <>
            {/* FIXED TOP HEADER */}
            <div className="w-full h-36 bg-[#7b1815] relative overflow-hidden flex items-center justify-center shrink-0 select-none">
              <img src={logoImg} alt="Skeptis Minor Header" className="w-full h-full object-contain scale-60 pt-1 pointer-events-none" />
              
              {/* Badge Mode Admin */}
              {isAdmin && (
                <div className="absolute top-4 left-5 bg-amber-500 text-stone-950 font-black text-[7px] uppercase tracking-widest px-2 py-1 rounded-md shadow-sm">
                  Mode Admin
                </div>
              )}

              {/* Tombol Logout */}
              <div className="absolute top-4 right-4 z-50">
                <button
                  onClick={() => { setIsLoggedIn(false); setIsAdmin(false); }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-xl text-white/60 hover:text-white transition-all shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                  </svg>
                </button>
              </div>
            </div>

            {/* AREA CONTENT UTAMA */}
            <div className="flex-1 overflow-y-auto pb-28 pt-8 px-5 scrollbar-none bg-[#fbf9f5] rounded-t-[40px] -mt-8 shadow-[0_-15px_30px_rgba(123,24,21,0.08)] relative z-40 space-y-5">
              
              {/* TAB 1: TENTANG KAMI */}
              {activeTab === 'tentang' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* MANIFESTO CARD */}
                  <div className="w-full bg-white/90 backdrop-blur-sm rounded-[24px] p-5 shadow-sm space-y-2.5 border border-stone-200/60 select-none">
                    <div className="flex items-center justify-center">
                      <h3 className="font-poppins font-black text-base text-[#7b1815] uppercase tracking-tight">Manifesto Lapak</h3>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed font-poppins text-justify">
                      "Kami adalah ruang alternatif kecil yang menolak senyap. Menyediakan wadah baca gratis di ruang publik, ditemani seduhan kopi yang jujur, guna memicu obrolan-obrolan kritis dan hangat di pinggir jalan."
                    </p>
                  </div>

                  {/* GRID INFO OPERASIONAL */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* WAKTU */}
                    <div className="bg-white/90 backdrop-blur-sm border border-stone-200/60 rounded-[20px] p-3.5 flex flex-col justify-between space-y-3 shadow-sm">
                      <div className="p-1.5 bg-[#7b1815]/5 rounded-lg w-7 h-7 flex items-center justify-center text-[#7b1815] select-none">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                      </div>
                      <div>
                        <span className="text-[8px] uppercase font-bold text-stone-400 block tracking-wider select-none">Waktu</span>
                        {isAdmin ? (
                          <textarea 
                            value={waktuLapak} 
                            onChange={(e) => setWaktuLapak(e.target.value)}
                            className="w-full bg-stone-50 border border-stone-200 rounded-md text-[10px] p-1 mt-1 font-bold text-stone-800 focus:outline-none resize-none"
                            rows="2"
                          />
                        ) : (
                          <span className="text-[11px] font-bold text-stone-800 leading-tight block mt-0.5 whitespace-pre-line">{waktuLapak}</span>
                        )}
                      </div>
                    </div>

                    {/* STATUS LAPAK */}
                    <div className="bg-white/90 backdrop-blur-sm border border-stone-200/60 rounded-[20px] p-3.5 flex flex-col justify-between space-y-3 shadow-sm">
                      <div className="p-1.5 bg-emerald-500/10 rounded-lg w-7 h-7 flex items-center justify-center select-none">
                        <span className={`w-1.5 h-1.5 rounded-full ${statusLapak === 'Sedang Buka' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                      </div>
                      <div>
                        <span className="text-[8px] uppercase font-bold text-stone-400 block tracking-wider select-none">Status Lapak</span>
                        {isAdmin ? (
                          <select 
                            value={statusLapak} 
                            onChange={(e) => setStatusLapak(e.target.value)}
                            className="w-full bg-stone-50 border border-stone-200 rounded-md text-[10px] p-1 mt-1 font-black text-stone-800 focus:outline-none"
                          >
                            <option value="Sedang Buka">Sedang Buka</option>
                            <option value="Sedang Tutup">Sedang Tutup</option>
                          </select>
                        ) : (
                          <span className={`text-[11px] font-black tracking-wide block mt-0.5 uppercase ${statusLapak === 'Sedang Buka' ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {statusLapak}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* LOKASI CARD */}
                  <div className="w-full bg-white/90 backdrop-blur-sm border border-stone-200/60 rounded-[20px] p-4 flex flex-col justify-center shadow-sm space-y-3">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="p-2.5 bg-[#7b1815]/5 rounded-xl text-[#7b1815] select-none">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                        </div>
                        <div className="space-y-0.5 flex-1 pr-2">
                          <span className="text-[8px] uppercase font-bold text-stone-400 block tracking-wider select-none">Titik Kumpul</span>
                          {isAdmin ? (
                            <input 
                              type="text" 
                              placeholder="Nama Lokasi..."
                              value={titikKumpul} 
                              onChange={(e) => setTitikKumpul(e.target.value)}
                              className="w-full bg-stone-50 border border-stone-200 rounded-md text-xs p-1.5 font-bold text-stone-800 focus:outline-none"
                            />
                          ) : (
                            <h4 className="text-xs font-bold text-stone-800 leading-tight">{titikKumpul}</h4>
                          )}
                        </div>
                      </div>
                      
                      {/* === FIX: Tombol membuka Google Maps (Cerdas & Aman) === */}
                      {!isAdmin && (
                        <button 
                          type="button"
                          onClick={() => {
                            if (!linkMaps) return;
                            // Tambahkan 'https://' otomatis jika admin lupa mengetiknya
                            const validUrl = linkMaps.startsWith('http') ? linkMaps : `https://${linkMaps}`;
                            window.open(validUrl, '_blank', 'noopener,noreferrer');
                          }}
                          className={`bg-[#7b1815] text-white font-black text-[9px] uppercase tracking-widest px-3.5 py-1.5 rounded-lg shadow-sm transition-all select-none active:scale-95 ${
                            linkMaps ? 'hover:bg-[#9c2421] cursor-pointer' : 'opacity-50 cursor-not-allowed'
                          }`}
                        >
                          Maps
                        </button>
                      )}
                    </div>

                    {/* Input Link Maps (Khusus Admin) */}
                    {isAdmin && (
                      <div className="pt-2 border-t border-stone-100 space-y-1">
                        <span className="text-[8px] uppercase font-bold text-stone-400 block tracking-wider select-none">Tautan Google Maps</span>
                        <input 
                          type="url" 
                          placeholder="Paste link Google Maps di sini..."
                          value={linkMaps} 
                          onChange={(e) => setLinkMaps(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 rounded-md text-[10px] p-1.5 font-mono text-stone-600 focus:outline-none"
                        />
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* TAB 2: MENU SEDUHAN */}
              {activeTab === 'kopi' && (
                <Seduhan 
                  menuItems={menuItems} 
                  setMenuItems={setMenuItems} 
                  ordersHistory={ordersHistory} 
                  setOrdersHistory={setOrdersHistory} 
                  isAdmin={isAdmin} 
                />
              )}

              {/* TAB 3: RAK KOLEKSI BUKU */}
              {activeTab === 'buku' && (
                <Koleksi 
                  koleksiBuku={koleksiBuku} 
                  setKoleksiBuku={setKoleksiBuku} 
                  isAdmin={isAdmin} 
                />
              )}

            </div>

            {/* BOTTOM NAVIGATION BAR */}
            <div className="absolute bottom-5 left-4 right-4 h-20 bg-white/70 backdrop-blur-xl border border-stone-200/80 flex justify-around items-center px-2 z-50 rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.04)] select-none">
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
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;