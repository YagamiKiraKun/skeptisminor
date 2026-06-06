import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'; 

function Koleksi({ koleksiBuku, isAdmin }) {
  // FORM LOCAL STATE UNTUK INPUT DATA BUKU BARU / EDIT
  const [judul, setJudul] = useState('');
  const [penulis, setPenulis] = useState('');
  const [kategori, setKategori] = useState('Filsafat');
  const [coverUrl, setCoverUrl] = useState('');

  // STATE UNTUK MELACAK APAKAH ADMIN SEDANG MODE EDIT BUKU LAMA
  const [editMode, setEditMode] = useState(false);
  const [selectedBukuId, setSelectedBukuId] = useState(null);

  // ==========================================
  // STATE BARU: PENCARIAN & FILTER KATEGORI
  // ==========================================
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // FUNGSI SUBMIT (Bisa Tambah Baru ATAU Simpan Perubahan Edit)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!judul.trim() || !penulis.trim()) return;

    try {
      if (editMode) {
        // PROSES UPDATE BUKU LAMA
        const bukuRef = doc(db, 'buku', selectedBukuId);
        await updateDoc(bukuRef, {
          judul: judul.trim(),
          penulis: penulis.trim(),
          kategori,
          coverUrl: coverUrl.trim()
        });
        // Reset mode edit
        setEditMode(false);
        setSelectedBukuId(null);
      } else {
        // PROSES TAMBAH BUKU BARU
        await addDoc(collection(db, 'buku'), {
          judul: judul.trim(),
          penulis: penulis.trim(),
          kategori,
          coverUrl: coverUrl.trim(),
          status: 'Tersedia'
        });
      }

      // Reset Form Inputs
      setJudul('');
      setPenulis('');
      setCoverUrl('');
    } catch (error) {
      console.error("Error Firebase Operation:", error); 
    }
  };

  // FUNGSI TRIGGER UNTUK MENAIKKAN DATA BUKU KE FORM ATAS (MODE EDIT)
  const handlePemicuEdit = (buku) => {
    setEditMode(true);
    setSelectedBukuId(buku.id);
    setJudul(buku.judul);
    setPenulis(buku.penulis);
    setKategori(buku.kategori);
    setCoverUrl(buku.coverUrl || '');
    // Scroll otomatis ke atas agar form kelihatan di device HP
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // FUNGSI BATALKAN MODE EDIT
  const handleBatalEdit = () => {
    setEditMode(false);
    setSelectedBukuId(null);
    setJudul('');
    setPenulis('');
    setCoverUrl('');
  };

  // FUNGSI HAPUS BUKU PERMANEN DARI FIREBASE
  const handleHapusBuku = async (id, judulBuku) => {
    const konfirmasi = window.confirm(`Apakah kamu yakin ingin menghapus buku "${judulBuku}" secara permanen dari rak?`);
    if (!konfirmasi) return;

    try {
      const bukuRef = doc(db, 'buku', id);
      await deleteDoc(bukuRef);
      
      // Jika buku yang sedang diedit ternyata dihapus, reset formnya
      if (selectedBukuId === id) {
        handleBatalEdit();
      }
    } catch (error) {
      console.error("Gagal menghapus buku:", error);
    }
  };

  // FUNGSI UPDATE STATUS BUKU DI PLACE
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

  const tangkapCoverBuku = (url) => {
    if (!url || url.trim() === "") return null;
    return url;
  };

  // ==========================================
  // LOGIKAFILTER DATA BUKU BERDASARKAN INPUT
  // ==========================================
  const bukuTerfilter = koleksiBuku.filter((buku) => {
    const cocokKategori = selectedCategory === 'Semua' || buku.kategori === selectedCategory;
    const cocokSearch = 
      buku.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
      buku.penulis.toLowerCase().includes(searchQuery.toLowerCase());
    return cocokKategori && cocokSearch;
  });

  return (
    <div className="space-y-4 animate-fadeIn">
      
      {/* HEADER RAK BUKU */}
      <div 
        style={{ borderRadius: '24px', boxShadow: '0 10px 15px -3px rgba(214, 211, 209, 0.3)' }}
        className="w-full bg-white p-5 border border-stone-100 space-y-1.5 animate-fadeIn"
      >
        <div className="flex items-center justify-center">
          <h3 className="font-poppins font-black text-base text-[#7b1815] uppercase tracking-tight">Rak Koleksi</h3>
        </div>
        <p className="text-[10px] text-stone-500 text-center font-medium uppercase tracking-wider">
          {isAdmin ? 'Mode Kelola Perpustakaan Jalanan' : 'Silakan baca di tempat. Gratis, bebas, dan merdeka.'}
        </p>
      </div>

      {/* COMPONENT BARU: SEARCH BAR & KATEGORI FILTER */}
      <div className="space-y-2">
        {/* Input Text Search */}
        <div className="relative flex items-center">
          <input 
            type="text"
            placeholder="Cari judul buku atau penulis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#7b1815] transition-all shadow-sm shadow-stone-100"
          />
          <svg className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 text-[10px] font-black text-stone-400 hover:text-stone-600">✕</button>
          )}
        </div>

        {/* Tab Filter Kategori Horizontal */}
        <div className="flex space-x-1.5 overflow-x-auto pb-1 scrollbar-none select-none">
          {['Semua', 'Filsafat', 'Sastra', 'Sosial', 'Politik'].map((kat) => (
            <button
              key={kat}
              onClick={() => setSelectedCategory(kat)}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all border whitespace-nowrap shrink-0 ${
                selectedCategory === kat 
                  ? 'bg-[#7b1815] border-[#7b1815] text-white shadow-sm' 
                  : 'bg-white border-stone-200 text-stone-500 hover:text-stone-700'
              }`}
            >
              {kat}
            </button>
          ))}
        </div>
      </div>

      {/* FORM INPUT ADMIN (DINAMIS: BISA UNTUK TAMBAH / EDIT DATA) */}
      {isAdmin && (
        <form 
          onSubmit={handleFormSubmit} 
          style={{ borderRadius: '24px', boxShadow: '0 10px 15px -3px rgba(214, 211, 209, 0.3)' }}
          className="bg-white p-5 border border-stone-100 space-y-3 animate-fadeIn"
        >
          <div className="flex justify-between items-center">
            <h4 className="text-[10px] font-black text-[#7b1815] uppercase tracking-wider">
              {editMode ? '📝 Edit Informasi Buku' : '➕ Tambah Koleksi Buku'}
            </h4>
            {editMode && (
              <button 
                type="button" 
                onClick={handleBatalEdit} 
                className="text-[9px] font-bold uppercase tracking-wider text-stone-400 hover:text-stone-600 bg-stone-100 px-2 py-0.5 rounded"
              >
                Batal Edit
              </button>
            )}
          </div>
          
          <div className="space-y-2.5">
            <input 
              type="text" 
              placeholder="Judul buku..." 
              value={judul} 
              onChange={(e) => setJudul(e.target.value)} 
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-400 transition-all"
              required 
            />
            <input 
              type="text" 
              placeholder="Nama penulis..." 
              value={penulis} 
              onChange={(e) => setPenulis(e.target.value)} 
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-400 transition-all"
              required 
            />
            <input 
              type="text" 
              placeholder="Tempel Link URL Cover Gambar (Opsional)..." 
              value={coverUrl} 
              onChange={(e) => setCoverUrl(e.target.value)} 
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-400 transition-all"
            />
            <select 
              value={kategori} 
              onChange={(e) => setKategori(e.target.value)} 
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-400 transition-all"
            >
              <option value="Filsafat">Filsafat</option>
              <option value="Sastra">Sastra</option>
              <option value="Sosial">Sosial</option>
              <option value="Politik">Politik</option>
            </select>
          </div>

          <button type="submit" className={`w-full text-white font-poppins font-black text-[10px] uppercase tracking-widest py-2.5 rounded-xl shadow-sm transition-all ${editMode ? 'bg-amber-600 hover:bg-amber-700' : 'bg-[#7b1815] hover:bg-[#9c2421]'}`}>
            {editMode ? 'Simpan Perubahan' : 'Tambahkan ke Rak'}
          </button>
        </form>
      )}

      {/* DAFTAR BUKU DI LAPAK (Data diambil dari hasil filter) */}
      <div className="space-y-3">
        {bukuTerfilter.length > 0 ? (
          bukuTerfilter.map((buku) => {
            const srcCover = tangkapCoverBuku(buku.coverUrl);

            return (
              <div 
                key={buku.id} 
                style={{ borderRadius: '24px', boxShadow: '0 10px 15px -3px rgba(214, 211, 209, 0.15)' }}
                className="bg-white p-3.5 flex items-center justify-between border border-stone-100 transition-all animate-fadeIn"
              >
                <div className="flex items-center space-x-4 max-w-[75%]">
                  
                  {/* DOCK CONTAINER COVER BUKU */}
                  <div className="w-11 h-16 bg-stone-100 border border-stone-200/60 rounded-xl overflow-hidden shrink-0 shadow-sm flex items-center justify-center relative">
                    {srcCover ? (
                      <img 
                        src={srcCover} 
                        alt="Cover" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentNode.innerHTML = `<span class="text-[9px] font-black text-stone-400 uppercase">${buku.judul.substring(0, 2)}</span>`;
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#7b1815]/5 p-1">
                        <span className="text-[9px] font-black text-[#7b1815] uppercase tracking-tighter">{buku.judul.substring(0, 2)}</span>
                      </div>
                    )}
                  </div>

                  {/* DETAIL INFORMASI BUKU */}
                  <div className="space-y-1">
                    <div className="flex items-center flex-wrap gap-1.5">
                      <span className="px-1.5 py-0.5 bg-[#7b1815]/5 border border-[#7b1815]/10 text-[#7b1815] rounded text-[7px] font-black uppercase tracking-wider">{buku.kategori}</span>
                      
                      <span 
                        onClick={() => toggleStatusBuku(buku)}
                        className={`px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-wider border transition-transform active:scale-95 ${
                          buku.status === 'Tersedia' 
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' 
                            : 'bg-amber-500/10 border-amber-500/20 text-amber-600'
                        } ${isAdmin ? 'cursor-pointer hover:bg-stone-50' : ''}`}
                      >
                        {buku.status} {isAdmin && '↺'}
                      </span>
                    </div>
                    <h4 className="text-xs font-black text-stone-900 font-poppins pt-0.5 leading-tight">{buku.judul}</h4>
                    <p className="text-[10px] text-stone-400 font-medium">{buku.penulis}</p>
                  </div>
                </div>
                
                {/* TOMBOL KENDALIAKSI */}
                {isAdmin ? (
                  <div className="flex items-center space-x-1.5 shrink-0 pl-1">
                    <button 
                      onClick={() => handlePemicuEdit(buku)} 
                      className="p-1.5 text-stone-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      title="Edit Informasi Buku"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleHapusBuku(buku.id, buku.judul)} 
                      className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Hapus Buku dari Rak"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="text-stone-300 pr-1 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          /* TAMPILAN JIKA BUKU YANG DICARI TIDAK DITEMUKAN */
          <div className="text-center py-10 bg-white rounded-[24px] border border-stone-100 shadow-sm">
            <span className="text-2xl block mb-2">✕</span>
            <p className="text-xs font-bold text-stone-700">Buku tidak ditemukan</p>
            <p className="text-[10px] text-stone-400 mt-0.5">Coba cari dengan kata kunci judul atau penulis lain.</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default Koleksi;