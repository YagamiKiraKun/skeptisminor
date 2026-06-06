import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore'; 

function Koleksi({ koleksiBuku, isAdmin }) {
  // FORM LOCAL STATE UNTUK INPUT DATA BUKU BARU
  const [judul, setJudul] = useState('');
  const [penulis, setPenulis] = useState('');
  const [kategori, setKategori] = useState('Filsafat');

  // FUNGSI TAMBAH BUKU KE FIREBASE
  const handleAddBuku = async (e) => {
  e.preventDefault();
  console.log("Tombol diklik, mencoba menambah buku..."); // Tambahkan ini
  
  if (!judul.trim() || !penulis.trim()) return;

  try {
    const docRef = await addDoc(collection(db, 'buku'), {
      judul,
      penulis,
      kategori,
      status: 'Tersedia'
    });
    console.log("Berhasil! ID dokumen:", docRef.id); // Cek ini di Inspect Element > Console
    setJudul('');
    setPenulis('');
  } catch (error) {
    console.error("Error Firebase:", error); // Cek apakah ada error di sini
  }
};

  // FUNGSI UPDATE STATUS BUKU DI FIREBASE
  const toggleStatusBuku = async (buku) => {
    if (!isAdmin) return;
    try {
      const bukuRef = doc(db, 'buku', buku.id);
      await updateDoc(bukuRef, { 
        status: buku.status === 'Tersedia' ? 'Sedang Dibaca' : 'Tersedia' 
      });
    } catch (error) {
      console.error("Gagal update status: ", error);
    }
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      
      {/* HEADER RAK BUKU */}
      <div className="w-full bg-white/90 backdrop-blur-sm rounded-[24px] p-5 shadow-[0_8px_25px_rgba(0,0,0,0.02)] space-y-1.5 border border-stone-200/60">
        <div className="flex items-center justify-center">
          <h3 className="font-poppins font-black text-base text-[#7b1815] uppercase tracking-tight">Rak Koleksi</h3>
        </div>
        <p className="text-[10px] text-stone-500 text-center font-medium uppercase tracking-wider">
          {isAdmin ? 'Mode Kelola Perpustakaan Jalanan' : 'Silakan baca di tempat. Gratis, bebas, dan merdeka.'}
        </p>
      </div>

      {/* TAMPILAN FORM INPUT HANYA MUNCUL DI LAYAR ADMIN */}
      {isAdmin && (
        <form onSubmit={handleAddBuku} className="bg-white/90 backdrop-blur-sm border border-stone-200/60 rounded-[24px] p-4 shadow-sm space-y-3 animate-fadeIn">
          <h4 className="text-[10px] font-black text-[#7b1815] uppercase tracking-wider">Tambah Koleksi Buku</h4>
          
          <div className="space-y-2">
            <input 
              type="text" 
              placeholder="Judul buku baru..." 
              value={judul} 
              onChange={(e) => setJudul(e.target.value)} 
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
              required 
            />
            <input 
              type="text" 
              placeholder="Nama penulis..." 
              value={penulis} 
              onChange={(e) => setPenulis(e.target.value)} 
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
              required 
            />
            <select 
              value={kategori} 
              onChange={(e) => setKategori(e.target.value)} 
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
            >
              <option value="Filsafat">Filsafat</option>
              <option value="Sastra">Sastra</option>
              <option value="Sosial">Sosial</option>
              <option value="Politik">Politik</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-[#7b1815] text-white font-poppins font-black text-[10px] uppercase tracking-widest py-2.5 rounded-xl shadow-sm hover:bg-[#9c2421]">
            Tambahkan ke Rak
          </button>
        </form>
      )}

      {/* DAFTAR BUKU DI LAPAK */}
      <div className="space-y-3">
        {koleksiBuku.map((buku) => (
          <div key={buku.id} className="bg-white/90 backdrop-blur-sm border border-stone-200/60 rounded-[22px] p-4 flex items-center justify-between shadow-sm">
            <div className="space-y-1 max-w-[75%]">
              <div className="flex items-center space-x-2">
                <span className="px-1.5 py-0.5 bg-[#7b1815]/5 border border-[#7b1815]/10 text-[#7b1815] rounded text-[7px] font-black uppercase tracking-wider">{buku.kategori}</span>
                
                {/* Badge Status Buku */}
                <span 
                  onClick={() => toggleStatusBuku(buku)}
                  className={`px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-wider border ${
                    buku.status === 'Tersedia' 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' 
                      : 'bg-amber-500/10 border-amber-500/20 text-amber-600'
                  } ${isAdmin ? 'cursor-pointer hover:scale-105' : ''}`}
                >
                  {buku.status}
                </span>
              </div>
              <h4 className="text-xs font-black text-stone-900 font-poppins mt-1">{buku.judul}</h4>
              <p className="text-[10px] text-stone-400 font-medium">{buku.penulis}</p>
            </div>
            
            <div className="text-stone-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Koleksi;