import React, { useState, useEffect } from 'react';
import { db } from './firebase'; 
import { collection, onSnapshot } from 'firebase/firestore';
import logoImg from './assets/skeptis minor.png';
import Login from './Login'; 
import Seduhan from './Seduhan'; 
import Koleksi from './Koleksi'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isAdmin, setIsAdmin] = useState(false); 
  const [activeTab, setActiveTab] = useState('tentang');
  const [menuItems, setMenuItems] = useState([]);
  const [koleksiBuku, setKoleksiBuku] = useState([]);
  const [ordersHistory, setOrdersHistory] = useState([]); 

  const [waktuLapak, setWaktuLapak] = useState("Rabu\n16:00 - Cukup");
  const [statusLapak, setStatusLapak] = useState("Sedang Buka"); 
  const [titikKumpul, setTitikKumpul] = useState("Landmark Unsri");
  const [linkMaps, setLinkMaps] = useState("https://maps.google.com"); 

  useEffect(() => {
    const unsubMenu = onSnapshot(collection(db, 'menu'), (snapshot) => {
      setMenuItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    const unsubBuku = onSnapshot(collection(db, 'buku'), (snapshot) => {
      setKoleksiBuku(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => { unsubMenu(); unsubBuku(); };
  }, []);

  return (
    <div className="min-h-dvh w-full bg-stone-900 flex justify-center items-center p-0 sm:p-4 relative overflow-hidden font-sans">
      <div className="w-full max-w-[410px] h-dvh sm:h-[820px] bg-[#fbf9f5] relative flex flex-col overflow-hidden shadow-2xl">
        {!isLoggedIn ? (
          <Login onLoginSuccess={(adminStatus) => { setIsLoggedIn(true); setIsAdmin(adminStatus); }} logoImg={logoImg} />
        ) : (
          <>
            <div className="w-full h-36 bg-[#7b1815] flex items-center justify-center shrink-0">
              <img src={logoImg} className="w-full h-full object-contain scale-60 pt-1" />
              {isAdmin && <div className="absolute top-4 left-5 bg-amber-500 text-stone-950 font-black text-[7px] uppercase tracking-widest px-2 py-1 rounded-md">Mode Admin</div>}
            </div>

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

            <div className="flex-1 overflow-y-auto pb-28 pt-8 px-5 bg-[#fbf9f5] rounded-t-[40px] -mt-8 relative z-20 space-y-5">
              {activeTab === 'tentang' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="bg-white p-5 rounded-[24px] shadow-lg shadow-stone-200/50">
                    <h3 className="font-black text-center text-base text-[#7b1815] uppercase">Manifesto Lapak</h3>
                    <p className="text-xs text-stone-700 text-justify mt-2">"Kami adalah ruang alternatif kecil yang menolak senyap. Menyediakan wadah baca gratis di ruang publik, ditemani seduhan kopi yang jujur, guna memicu obrolan-obrolan kritis dan hangat di pinggir jalan."</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-[20px] p-4 flex flex-col space-y-2 shadow-lg shadow-stone-200/50">
                      <span className="text-[8px] font-bold text-stone-400 uppercase">Waktu</span>
                      <p className="text-[11px] font-bold text-stone-800 whitespace-pre-line">{waktuLapak}</p>
                    </div>
                    <div className="bg-white rounded-[20px] p-4 flex flex-col space-y-2 shadow-lg shadow-stone-200/50">
                      <span className="text-[8px] font-bold text-stone-400 uppercase">Status</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`w-2 h-2 rounded-full ${statusLapak === 'Sedang Buka' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                        <span className={`text-[11px] font-black uppercase ${statusLapak === 'Sedang Buka' ? 'text-emerald-600' : 'text-rose-600'}`}>{statusLapak}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-[20px] p-4 flex items-center justify-between shadow-lg shadow-stone-200/50">
                     <div>
                       <span className="text-[8px] font-bold text-stone-400 uppercase">Lokasi</span>
                       <h4 className="text-xs font-bold text-stone-800">{titikKumpul}</h4>
                     </div>
                     <button onClick={() => window.open(linkMaps, '_blank')} className="bg-[#7b1815] text-white text-[9px] font-black px-4 py-2 rounded-lg">MAPS</button>
                  </div>
                </div>
              )}
              {activeTab === 'kopi' && <Seduhan menuItems={menuItems} setMenuItems={setMenuItems} ordersHistory={ordersHistory} setOrdersHistory={setOrdersHistory} isAdmin={isAdmin} />}
              {activeTab === 'buku' && <Koleksi koleksiBuku={koleksiBuku} isAdmin={isAdmin} />}
            </div>

            {/* MODERN GLASS NAV BAR (TANPA BORDER) */}
            <div className="absolute bottom-6 left-6 right-6 h-16 bg-white/40 backdrop-blur-2xl flex justify-around items-center rounded-[24px] shadow-xl z-50">
              <button onClick={() => setActiveTab('tentang')} className={`flex flex-col items-center ${activeTab === 'tentang' ? 'text-[#7b1815]' : 'text-stone-600'}`}>
                <span className="text-[12px] font-black uppercase">Tentang</span>
              </button>
              
              <button onClick={() => setActiveTab('kopi')} className="w-14 h-14 bg-[#7b1815] rounded-full flex items-center justify-center -mt-8 shadow-2xl border-4 border-[#fbf9f5]">
                <span className="text-[20px]">☕</span>
              </button>
              
              <button onClick={() => setActiveTab('buku')} className={`flex flex-col items-center ${activeTab === 'buku' ? 'text-[#7b1815]' : 'text-stone-600'}`}>
                <span className="text-[12px] font-black uppercase">Koleksi</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;