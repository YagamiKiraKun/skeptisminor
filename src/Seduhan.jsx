import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { db } from './firebase';
import { doc, updateDoc } from 'firebase/firestore'; 

function Seduhan({ menuItems, setMenuItems, ordersHistory, setOrdersHistory, isAdmin }) {
  // === STATE MANAGEMENT ALUR PESANAN ===
  const [step, setStep] = useState('menu'); 
  const [selectedItem, setSelectedItem] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  // FUNGSI PILIH MENU (Jika Tamu: tidak bisa klik menu Habis)
  const handleSelectItem = (item) => {
    if (isAdmin) return;
    if (item.status === 'Habis') return; 
    setSelectedItem(item);
    setStep('form');
  };

  // FUNGSI ADMIN: UBAH STATUS READY / HABIS (TERKONEKSI FIREBASE)
  const handleToggleStatus = async (id, e) => {
    e.stopPropagation(); 
    const item = menuItems.find(i => i.id === id);
    if (!item) return;
    
    try {
      const menuRef = doc(db, 'menu', id);
      await updateDoc(menuRef, { 
        status: item.status === 'Ready' ? 'Habis' : 'Ready' 
      });
    } catch (error) {
      console.error("Gagal update status di Firebase:", error);
    }
  };

  // FUNGSI SUBMIT DETAIL KE INVOICE & SIMPAN KE RIWAYAT
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim()) return;

    const totalHarga = selectedItem.price * quantity;
    const newOrder = {
      id: Date.now(),
      customerName,
      menuName: selectedItem.name,
      quantity,
      totalPrice: totalHarga,
      notes,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };
    
    setOrdersHistory([newOrder, ...ordersHistory]); 
    setStep('invoice');
  };

  // === FUNGSI GENERATE & DOWNLOAD PDF ===
  const handleDownloadInvoice = () => {
    const totalHarga = selectedItem.price * quantity;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [80, 140] });

    doc.setFont('courier', 'bold');
    doc.setFontSize(12);
    doc.text('SKEPTIS MINOR SPACE', 40, 15, { align: 'center' });
    
    doc.setFont('courier', 'normal');
    doc.setFontSize(8);
    doc.text('Nota Transaksi Seduhan', 40, 20, { align: 'center' });
    doc.text('--------------------------------', 40, 25, { align: 'center' });
    
    doc.text(`Tanggal : ${new Date().toLocaleDateString('id-ID')}`, 8, 32);
    doc.text(`Nama    : ${customerName}`, 8, 37);
    doc.text('--------------------------------', 40, 43, { align: 'center' });
    
    doc.setFont('courier', 'bold');
    doc.text(`${selectedItem.name}`, 8, 50);
    doc.setFont('courier', 'normal');
    doc.text(`${quantity}x @ ${selectedItem.price}K`, 8, 55);
    doc.text(`${totalHarga}K`, 72, 55, { align: 'right' });
    
    let yOffset = 63;
    if (notes) {
      doc.text('Catatan:', 8, 63);
      doc.setFont('courier', 'italic');
      doc.text(`"${notes}"`, 8, 68);
      doc.setFont('courier', 'normal');
      yOffset = 76;
    }
    
    doc.text('--------------------------------', 40, yOffset, { align: 'center' });
    doc.setFont('courier', 'bold');
    doc.text('TOTAL TAGIHAN:', 8, yOffset + 6);
    doc.text(`${totalHarga}K`, 72, yOffset + 6, { align: 'right' });
    
    doc.setFont('courier', 'normal');
    doc.text('--------------------------------', 40, yOffset + 12, { align: 'center' });
    doc.setFontSize(7);
    doc.text('~ Diseduh manual tanpa kepura-puraan ~', 40, yOffset + 18, { align: 'center' });

    doc.save(`Nota-${customerName.replace(/\s+/g, '-')}.pdf`);
  };

  // FUNGSI LEMPAR DATA KE API WHATSAPP
  const handleKirimWhatsApp = () => {
    const totalHarga = selectedItem.price * quantity;
    const nomorWA = "6282180875271";
    
    const textWA = `*INVOICE SKEPTIS MINOR*\n` +
                   `---------------------------------\n` +
                   `*Nama Pemesan:* ${customerName}\n` +
                   `*Detail Menu:* ${selectedItem.name}\n` +
                   `*Jumlah:* ${quantity}x\n` +
                   `*Catatan:* ${notes || '-'}\n` +
                   `---------------------------------\n` +
                   `*Total Tagihan:* Rp ${totalHarga}.000\n\n` +
                   `Mohon segera diseduh ya kawan! ☕🔥`;

    window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(textWA)}`, '_blank');
  };

  const handleReset = () => {
    setStep('menu');
    setSelectedItem(null);
    setCustomerName('');
    setQuantity(1);
    setNotes('');
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      
      {step === 'menu' && (
        <>
          <div className="w-full bg-white/90 backdrop-blur-sm rounded-[24px] p-5 shadow-[0_8px_25px_rgba(0,0,0,0.02)] space-y-1.5 border border-stone-200/60 select-none">
            <div className="flex items-center justify-center">
              <h3 className="font-poppins font-black text-base text-[#7b1815] uppercase tracking-tight">Katalog Seduhan</h3>
            </div>
            <p className="text-[10px] text-stone-500 text-center font-medium uppercase tracking-wider">
              {isAdmin ? "Ketuk status untuk mengubah ketersediaan (Ready/Habis)." : "Pilih menu, isi detail, dan kirim nota pesananmu."}
            </p>
          </div>

          <div className="space-y-3">
            {menuItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => handleSelectItem(item)}
                className={`bg-white/90 backdrop-blur-sm border border-stone-200/60 rounded-[22px] p-4 flex items-center justify-between shadow-sm transition-all ${
                  item.status === 'Ready' && !isAdmin
                    ? 'hover:scale-[1.01] cursor-pointer active:scale-95' 
                    : isAdmin ? 'cursor-default' : 'opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="space-y-1 max-w-[70%]">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-black text-stone-900 font-poppins">{item.name}</span>
                    {isAdmin ? (
                      <button 
                        onClick={(e) => handleToggleStatus(item.id, e)}
                        className={`px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-wider border transition-all hover:scale-105 active:scale-95 ${
                          item.status === 'Ready' 
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' 
                            : 'bg-rose-500/10 border-rose-500/20 text-rose-600'
                        }`}
                      >
                        {item.status} ↺
                      </button>
                    ) : (
                      <span className={`px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-wider border ${
                        item.status === 'Ready' 
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' 
                          : 'bg-amber-500/10 border-amber-500/20 text-amber-600'
                      }`}>
                        {item.status}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-stone-500 leading-tight font-poppins">{item.desc}</p>
                </div>
                <span className={`font-mono font-bold text-xs px-3 py-1.5 rounded-xl border ${
                  item.status === 'Ready' || isAdmin
                    ? 'text-[#7b1815] bg-[#7b1815]/5 border-[#7b1815]/10'
                    : 'text-stone-400 bg-stone-100 border-stone-200 line-through'
                }`}>
                  {item.price}K
                </span>
              </div>
            ))}
          </div>

          {isAdmin && (
            <div className="mt-6 pt-4 border-t border-stone-200/60 animate-fadeIn">
              <div className="flex items-center space-x-2 mb-3">
                <span className="w-1.5 h-3.5 bg-amber-500 rounded-full"></span>
                <h3 className="font-poppins font-black text-sm text-stone-800 uppercase tracking-tight">Antrean Pesanan Masuk ({ordersHistory.length})</h3>
              </div>

              {ordersHistory.length === 0 ? (
                <div className="bg-white/50 border border-stone-200/60 rounded-[20px] p-5 text-center">
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Belum ada pesanan masuk...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {ordersHistory.map((order) => (
                    <div key={order.id} className="bg-amber-50/60 border border-amber-200/50 rounded-[20px] p-4 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
                      <div className="flex justify-between items-start border-b border-amber-200/50 pb-2 mb-2">
                        <div>
                          <p className="text-xs font-black text-stone-800 font-poppins">{order.customerName}</p>
                          <p className="text-[9px] font-bold text-amber-600/80 uppercase tracking-wider">{order.timestamp}</p>
                        </div>
                        <span className="font-mono font-bold text-xs text-amber-700 bg-amber-100 px-2 py-1 rounded-lg">
                          {order.totalPrice}K
                        </span>
                      </div>
                      <p className="text-[11px] font-bold text-stone-700">{order.quantity}x {order.menuName}</p>
                      {order.notes && (
                        <p className="text-[9px] text-stone-500 italic mt-1 font-poppins border-l-2 border-stone-300 pl-2">
                          "{order.notes}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {step === 'form' && selectedItem && !isAdmin && (
        <form onSubmit={handleFormSubmit} className="bg-white/90 backdrop-blur-sm border border-stone-200/60 rounded-[28px] p-5 shadow-sm space-y-4 animate-fadeIn">
          <div className="flex items-center space-x-2 pb-1 border-b border-stone-100">
            <button type="button" onClick={handleReset} className="text-stone-400 hover:text-stone-600 text-xs font-bold">← Kembali</button>
            <span className="text-stone-300">|</span>
            <span className="text-[10px] font-black text-[#7b1815] uppercase tracking-wider">Detail Ruang Seduh</span>
          </div>

          <div className="p-3 bg-[#7b1815]/5 rounded-xl border border-[#7b1815]/10 flex justify-between items-center">
            <div>
              <h4 className="text-xs font-black text-stone-900 font-poppins">{selectedItem.name}</h4>
              <p className="text-[9px] text-stone-400 uppercase font-bold tracking-wider mt-0.5">Menu Terpilih</p>
            </div>
            <span className="font-mono font-bold text-xs text-[#7b1815]">{selectedItem.price}K / porsi</span>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase tracking-wider text-stone-400 block pl-1">Nama Pemesan</label>
            <input 
              type="text" 
              placeholder="ketik nama atau inisial kawan..."
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-stone-50/50 border border-stone-200 rounded-xl px-4 py-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 focus:bg-white transition-all font-poppins"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase tracking-wider text-stone-400 block pl-1">Jumlah Porsi</label>
            <div className="flex items-center space-x-3 bg-stone-50/50 border border-stone-200 rounded-xl p-1.5 max-w-[140px]">
              <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-lg bg-white border border-stone-200 font-black text-stone-600 flex items-center justify-center active:scale-90 transition-transform">-</button>
              <span className="flex-1 text-center text-xs font-black text-stone-900 font-mono">{quantity}</span>
              <button type="button" onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-lg bg-white border border-stone-200 font-black text-stone-600 flex items-center justify-center active:scale-90 transition-transform">+</button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase tracking-wider text-stone-400 block pl-1">Catatan Khusus (Opsional)</label>
            <textarea 
              placeholder="contoh: less sugar, es agak banyak, jahe digeprek kuat..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="2"
              className="w-full bg-stone-50/50 border border-stone-200 rounded-xl px-4 py-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 focus:bg-white transition-all font-poppins resize-none"
            />
          </div>

          <button type="submit" className="w-full bg-[#7b1815] text-white font-poppins font-black text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-sm hover:bg-[#9c2421] transition-all active:scale-[0.97] mt-2">
            Buat Invoice Tagihan
          </button>
        </form>
      )}

      {step === 'invoice' && selectedItem && !isAdmin && (
        <div className="space-y-4 animate-fadeIn">
          <div className="w-full bg-white border border-stone-200 rounded-[24px] p-6 shadow-md space-y-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-stone-100 via-stone-200 to-stone-100"></div>
            <div className="text-center space-y-1 pt-1">
              <h3 className="font-poppins font-black text-sm text-stone-900 uppercase tracking-widest">Skeptis Minor Space</h3>
              <p className="text-[8px] font-bold text-stone-400 uppercase tracking-wider">Nota Transaksi Seduhan</p>
            </div>
            <div className="border-t border-b border-dashed border-stone-300 py-2.5 text-[10px] font-mono text-stone-600 space-y-1">
              <div className="flex justify-between"><span>Tanggal:</span><span className="font-bold">{new Date().toLocaleDateString('id-ID')}</span></div>
              <div className="flex justify-between"><span>Pelanggan:</span><span className="font-bold text-stone-900">{customerName}</span></div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-start">
                <div className="max-w-[70%]">
                  <span className="font-bold text-stone-900 font-poppins block">{selectedItem.name}</span>
                  <span className="text-[10px] text-stone-400 font-mono">{quantity} x {selectedItem.price}K</span>
                </div>
                <span className="font-mono font-bold text-stone-900">{selectedItem.price * quantity}K</span>
              </div>
              {notes && (
                <div className="bg-stone-50 p-2 rounded-lg border border-stone-100">
                  <span className="text-[8px] font-black uppercase text-stone-400 tracking-wider block">Catatan Anda:</span>
                  <p className="text-[10px] text-stone-600 italic font-poppins">"{notes}"</p>
                </div>
              )}
            </div>
            <div className="border-t-2 border-dashed border-stone-300 pt-3 flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-wider text-stone-500">Total Tagihan</span>
              <span className="font-mono font-black text-base text-[#7b1815] bg-[#7b1815]/5 px-3 py-1 rounded-xl border border-[#7b1815]/10">
                {(selectedItem.price * quantity)}K
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <button onClick={handleKirimWhatsApp} className="w-full bg-[#25D366] text-white font-poppins font-black text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-md hover:bg-[#20ba5a] transition-all flex items-center justify-center space-x-2 active:scale-95">
              <span>Kirim Nota ke WhatsApp</span>
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={handleDownloadInvoice} className="bg-white border border-stone-200 text-stone-700 font-poppins font-black text-[10px] uppercase tracking-wider py-3 rounded-xl hover:bg-stone-50 transition-all text-center active:scale-95 shadow-sm">Download Nota</button>
              <button onClick={handleReset} className="bg-stone-200 hover:bg-stone-300 text-stone-700 font-poppins font-black text-[10px] uppercase tracking-wider py-3 rounded-xl transition-all text-center active:scale-95 shadow-sm">Pesan Lagi</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Seduhan;