import React, { useState, useEffect } from 'react';
import { db } from './firebase'; 
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
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

  // State Info Lapak
  const [waktuLapak, setWaktuLapak] = useState("Rabu\n16:00 - Cukup");
  const [statusLapak, setStatusLapak] = useState("Sedang Buka"); 
  const [titikKumpul, setTitikKumpul] = useState("Landmark Unsri");
  const [linkMaps, setLinkMaps] = useState("https://maps.google.com"); 

  // State kontrol edit Info Lapak khusus Admin
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [infoForm, setInfoForm] = useState({ waktu: "", status: "", lokasi: "", mapsUrl: "" });

  // State Buku Yang Sedang Hangat
  const [bukuHangat, setBukuHangat] = useState({
    judul: "Zarathustra",
    penulis: "Friedrich Nietzsche",
    kutipan: "Menolak tunduk pada dogma usang, memicu kawan jalanan berpikir merdeka.",
    coverUrl: "zarathustra.jpg" 
  });
  const [isEditingBuku, setIsEditingBuku] = useState(false);
  const [editForm, setEditForm] = useState({ ...bukuHangat });

  useEffect(() => {
    const unsubMenu = onSnapshot(collection(db, 'menu'), (snapshot) => {
      setMenuItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    const unsubBuku = onSnapshot(collection(db, 'buku'), (snapshot) => {
      setKoleksiBuku(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    
    const unsubBukuHangat = onSnapshot(doc(db, 'fitur', 'buku_hangat'), (docSnap) => {
      if (docSnap.exists()) {
        setBukuHangat(docSnap.data());
        setEditForm(docSnap.data());
      }
    });

    const unsubInfoLapak = onSnapshot(doc(db, 'fitur', 'info_lapak'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setWaktuLapak(data.waktu);
        setStatusLapak(data.status);
        setTitikKumpul(data.lokasi);
        setLinkMaps(data.mapsUrl);
        setInfoForm(data);
      } else {
        setInfoForm({ waktu: waktuLapak, status: statusLapak, lokasi: titikKumpul, mapsUrl: linkMaps });
      }
    });

    return () => { unsubMenu(); unsubBuku(); unsubBukuHangat(); unsubInfoLapak(); };
  }, []);

  const handleSimpanInfoLapak = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'fitur', 'info_lapak'), infoForm);
      setIsEditingInfo(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSimpanBukuHangat = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'fitur', 'buku_hangat'), editForm);
      setIsEditingBuku(false);
    } catch (error) {
      console.error(error);
    }
  };

  const dapatkanSrcCover = (path) => {
    if (!path) return "";
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    return new URL(`./assets/${path}`, import.meta.url).href;
  };

  return (
    <div className="min-h-dvh w-full bg-stone-900 flex justify-center items-center p-0 sm:p-4 relative overflow-hidden font-sans">
      <div className="w-full max-w-[410px] h-dvh sm:h-[820px] bg-[#fbf9f5] relative flex flex-col overflow-hidden shadow-2xl">
        {!isLoggedIn ? (
          <Login onLoginSuccess={(adminStatus) => { setIsLoggedIn(true); setIsAdmin(adminStatus); }} logoImg={logoImg} />
        ) : (
          <>
            <div className="w-full h-52 bg-[#7b1815] flex items-center justify-center shrink-0 relative rounded-b-[40px] shadow-md z-30">
              <img src={logoImg} className="w-full h-full object-contain scale-60 pt-2" />
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

            <div className="flex-1 overflow-y-auto pb-32 pt-6 px-5 bg-[#fbf9f5] relative z-20 space-y-5">
              
              {/* TAB TENTANG */}
              {activeTab === 'tentang' && (
                <div key="tab-tentang" className="space-y-5 animate-fadeIn">
                  
                  {isAdmin && (
                    <div className="flex justify-end">
                      <button onClick={() => setIsEditingInfo(!isEditingInfo)} className="text-[9px] font-black uppercase tracking-wider bg-amber-500 text-stone-950 px-3 py-1.5 rounded-xl shadow-sm">
                        {isEditingInfo ? "✕ Batal Edit Info" : "⚙ Edit Info Operasional"}
                      </button>
                    </div>
                  )}

                  {isAdmin && isEditingInfo ? (
                    <form onSubmit={handleSimpanInfoLapak} className="bg-white p-5 rounded-[24px] shadow-lg border border-amber-200/60 space-y-3 animate-fadeIn text-xs">
                      <h4 className="font-black text-[#7b1815] uppercase text-[10px] tracking-wider border-b pb-1">Edit Informasi Operasional</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[8px] font-bold text-stone-400 uppercase mb-1">Waktu Buka</label>
                          <textarea rows="2" required className="w-full bg-stone-50 border p-2 rounded-lg" value={infoForm.waktu} onChange={(e) => setInfoForm({ ...infoForm, waktu: e.target.value })} />
                        </div>
                        <div>
                          <label className="block text-[8px] font-bold text-stone-400 uppercase mb-1">Status Lapak</label>
                          <select className="w-full bg-stone-50 border p-2 h-10 rounded-lg font-bold" value={infoForm.status} onChange={(e) => setInfoForm({ ...infoForm, status: e.target.value })}>
                            <option value="Sedang Buka">Sedang Buka</option>
                            <option value="Sedang Tutup">Sedang Tutup</option>
                            <option value="Libur">Libur</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold text-stone-400 uppercase mb-1">Nama Lokasi / Titik Kumpul</label>
                        <input type="text" required className="w-full bg-stone-50 border p-2 rounded-lg" value={infoForm.lokasi} onChange={(e) => setInfoForm({ ...infoForm, lokasi: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold text-stone-400 uppercase mb-1">Link URL Google Maps</label>
                        <input type="text" required className="w-full bg-stone-50 border p-2 rounded-lg" value={infoForm.mapsUrl} onChange={(e) => setInfoForm({ ...infoForm, mapsUrl: e.target.value })} />
                      </div>
                      <button type="submit" className="w-full bg-emerald-600 text-white font-bold p-2 rounded-lg text-[10px] uppercase tracking-wider shadow-sm">Simpan Info Operasional</button>
                    </form>
                  ) : (
                    <>
                      {/* Manifesto */}
                      <div className="bg-white p-5 rounded-[24px] shadow-lg shadow-stone-200/50 border border-stone-100">
                        <h3 className="font-black text-center text-base text-[#7b1815] uppercase">Manifesto Lapak</h3>
                        <p className="text-xs text-stone-700 text-justify mt-2 leading-relaxed">"Kami adalah ruang alternatif kecil yang menolak senyap. Menyediakan wadah baca gratis di ruang publik, ditemani seduhan kopi yang jujur, guna memicu obrolan-obrolan kritis dan hangat di pinggir jalan."</p>
                      </div>
                      
                      {/* Grid Waktu & Status */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white rounded-[20px] p-4 flex flex-col space-y-2 shadow-lg shadow-stone-200/50 border border-stone-100">
                          <span className="text-[8px] font-bold text-stone-400 uppercase tracking-wider">Waktu</span>
                          <p className="text-[11px] font-bold text-stone-800 whitespace-pre-line leading-snug">{waktuLapak}</p>
                        </div>
                        <div className="bg-white rounded-[20px] p-4 flex flex-col space-y-2 shadow-lg shadow-stone-200/50 border border-stone-100">
                          <span className="text-[8px] font-bold text-stone-400 uppercase tracking-wider">Status</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`w-2 h-2 rounded-full ${statusLapak === 'Sedang Buka' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                            <span className={`text-[11px] font-black uppercase ${statusLapak === 'Sedang Buka' ? 'text-emerald-600' : 'text-rose-600'}`}>{statusLapak}</span>
                          </div>
                        </div>
                      </div>

                      {/* Lokasi */}
                      <div className="bg-white rounded-[20px] p-4 flex items-center justify-between shadow-lg shadow-stone-200/50 border border-stone-100">
                         <div>
                           <span className="text-[8px] font-bold text-stone-400 uppercase tracking-wider">Lokasi</span>
                           <h4 className="text-xs font-bold text-stone-800 mt-0.5">{titikKumpul}</h4>
                         </div>
                         <button onClick={() => window.open(linkMaps, '_blank')} className="bg-[#7b1815] text-white text-[9px] font-black px-4 py-2 rounded-lg tracking-widest hover:bg-[#911f1c] transition-colors shadow-sm">MAPS</button>
                      </div>
                    </>
                  )}

                  {/* SOROTAN BUKU PEKAN INI */}
                  <div className="bg-white p-5 rounded-[24px] shadow-lg shadow-stone-200/50 border border-stone-100 space-y-3 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-1 h-3.5 bg-[#7b1815] rounded-full"></span>
                        <h4 className="text-[10px] font-black text-stone-800 uppercase tracking-wider">Sedang Hangat Dibahas</h4>
                      </div>
                      {isAdmin && (
                        <button onClick={() => setIsEditingBuku(!isEditingBuku)} className="text-[9px] font-black uppercase bg-amber-500 text-stone-950 px-2 py-1 rounded-md shadow-sm">
                          {isEditingBuku ? "Batal" : "Ubah Data"}
                        </button>
                      )}
                    </div>

                    {isAdmin && isEditingBuku ? (
                      <form onSubmit={handleSimpanBukuHangat} className="space-y-2.5 pt-2 animate-fadeIn text-xs">
                        <div>
                          <label className="block text-[9px] font-bold text-stone-400 uppercase mb-1">Link URL Gambar Cover / Nama File</label>
                          <input type="text" required className="w-full bg-stone-50 border border-stone-200 p-2 rounded-lg focus:outline-[#7b1815]" placeholder="Tempel link https://... atau ketik zarathustra.jpg" value={editForm.coverUrl} onChange={(e) => setEditForm({ ...editForm, coverUrl: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[9px] font-bold text-stone-400 uppercase mb-1">Judul Buku</label>
                            <input type="text" required className="w-full bg-stone-50 border border-stone-200 p-2 rounded-lg focus:outline-[#7b1815]" value={editForm.judul} onChange={(e) => setEditForm({ ...editForm, judul: e.target.value })} />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-stone-400 uppercase mb-1">Penulis</label>
                            <input type="text" required className="w-full bg-stone-50 border border-stone-200 p-2 rounded-lg focus:outline-[#7b1815]" value={editForm.penulis} onChange={(e) => setEditForm({ ...editForm, penulis: e.target.value })} />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-stone-400 uppercase mb-1">Kutipan / Review Singkat</label>
                          <textarea rows="2" required className="w-full bg-stone-50 border border-stone-200 p-2 rounded-lg focus:outline-[#7b1815]" value={editForm.kutipan} onChange={(e) => setEditForm({ ...editForm, kutipan: e.target.value })} />
                        </div>
                        <button type="submit" className="w-full bg-emerald-600 text-white font-bold p-2 rounded-lg text-[10px] uppercase tracking-wider shadow-sm">Simpan Perubahan</button>
                      </form>
                    ) : (
                      <div className="flex items-start space-x-4 bg-stone-50/60 p-3 rounded-xl border border-stone-100">
                        <div className="w-12 h-16 bg-stone-200 rounded border border-stone-300 overflow-hidden shrink-0 shadow-sm flex items-center justify-center">
                          <img 
                            src={dapatkanSrcCover(bukuHangat.coverUrl)} 
                            alt="Cover" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentNode.innerHTML = '<span class="text-[9px] text-stone-400 font-bold text-center p-1">NO COV</span>';
                            }}
                          />
                        </div>
                        <div className="space-y-0.5 flex-1">
                          <h5 className="text-xs font-black text-stone-900 font-poppins">{bukuHangat.judul}</h5>
                          <p className="text-[9px] text-stone-400 font-medium">{bukuHangat.penulis}</p>
                          <p className="text-[10px] text-stone-600 italic mt-1.5 leading-tight">"{bukuHangat.kutipan}"</p>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* TAB SEDUHAN */}
              {activeTab === 'kopi' && <Seduhan key="tab-kopi" menuItems={menuItems} setMenuItems={setMenuItems} ordersHistory={ordersHistory} setOrdersHistory={setOrdersHistory} isAdmin={isAdmin} />}

              {/* TAB KOLEKSI BUKU */}
              {activeTab === 'buku' && <Koleksi key="tab-buku" koleksiBuku={koleksiBuku} isAdmin={isAdmin} />}
              
            </div>

            {/* MODERN ELEGANT FLOATING NAV BAR */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[340px] h-16 bg-white/60 backdrop-blur-xl flex justify-around items-center rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white/40 z-50 px-3">
              <div className="flex-1 flex justify-center items-center h-full">
                <button onClick={() => setActiveTab('tentang')} className={`w-[85%] py-2.5 rounded-full transition-all duration-300 flex items-center justify-center border ${activeTab === 'tentang' ? 'bg-[#7b1815]/85 border-[#7b1815]/30 shadow-[0_4px_15px_rgba(123,24,21,0.2)] text-white' : 'bg-transparent border-transparent text-stone-400 hover:text-stone-500'}`}>
                  <span className="text-[10px] font-black uppercase tracking-[0.12em]">Tentang</span>
                </button>
              </div>
              <div className="relative -mt-10 shrink-0">
                <button onClick={() => setActiveTab('kopi')} className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl border-[6px] border-[#fbf9f5] ${activeTab === 'kopi' ? 'bg-[#7b1815] rotate-[360deg]' : 'bg-stone-800'}`}>
                  <span className={`text-2xl transition-transform duration-300 ${activeTab === 'kopi' ? 'scale-110' : 'scale-90'}`}>☕</span>
                </button>
              </div>
              <div className="flex-1 flex justify-center items-center h-full">
                <button onClick={() => setActiveTab('buku')} className={`w-[85%] py-2.5 rounded-full transition-all duration-300 flex items-center justify-center border ${activeTab === 'buku' ? 'bg-[#7b1815]/85 border-[#7b1815]/30 shadow-[0_4px_15px_rgba(123,24,21,0.2)] text-white' : 'bg-transparent border-transparent text-stone-400 hover:text-stone-500'}`}>
                  <span className="text-[10px] font-black uppercase tracking-[0.12em]">Koleksi</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;