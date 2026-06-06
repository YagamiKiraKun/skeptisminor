import React, { useState } from 'react';

function Login({ onLoginSuccess, logoImg }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Tambahan state untuk menyimpan pesan error

  const handleLogin = (e) => {
    e.preventDefault();
    setError(''); // Reset error setiap kali mau submit ulang
    
    // Validasi akun admin sesuai instruksi Zidane
    if (username === 'skeptisminor@gmail.com' && password === 'mainmalakamini') {
      onLoginSuccess(true); // Tembus sebagai Admin
    } else {
      // Jika salah, JANGAN diloloskan. Beri peringatan!
      setError('Kredensial salah! Ruang ini khusus Admin. Jika Anda Tamu, klik Masuk sebagai Tamu di bawah.');
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center px-6 pb-12 animate-fadeIn z-10 space-y-7 bg-[#fbf9f5]">
      
      {/* Header Identity */}
      <div className="text-center space-y-3">
        <div className="w-28 h-28 mx-auto overflow-hidden rounded-[24px] shadow-md border border-stone-200 bg-[#7b1815] p-1">
          <img src={logoImg} alt="Skeptis Minor" className="w-full h-full object-contain scale-125" />
        </div>
        <div className="space-y-1">
          <h2 className="font-poppins font-black text-2xl text-[#7b1815] tracking-tight">Welcome back</h2>
          <p className="text-[9px] text-stone-400 uppercase tracking-[0.2em] font-bold">Skeptis Minor Digital Space</p>
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleLogin} className="bg-white/90 backdrop-blur-sm border border-stone-200/60 rounded-[28px] p-6 shadow-[0_8px_25px_rgba(0,0,0,0.02)] space-y-4">
        
        {/* Notifikasi Error (Hanya muncul kalau state error terisi) */}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-600 text-[10px] font-medium p-3 rounded-xl text-center leading-relaxed font-poppins animate-pulse">
            {error}
          </div>
        )}

        {/* INPUT USERNAME */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-bold uppercase tracking-wider text-stone-400 block pl-1">Email / Username</label>
          <input 
            type="text" 
            placeholder="masukkan nama atau email..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-stone-50/50 border border-stone-200 rounded-xl px-4 py-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 focus:bg-white transition-all font-poppins"
            required
          />
        </div>

        {/* INPUT PASSWORD */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-bold uppercase tracking-wider text-stone-400 block pl-1">Password</label>
          <input 
            type="password" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-stone-50/50 border border-stone-200 rounded-xl px-4 py-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 focus:bg-white transition-all font-poppins"
            required
          />
        </div>

        <div className="text-right pr-1">
          <span className="text-[10px] text-stone-400 hover:text-[#7b1815] cursor-pointer transition-colors">Lupa password?</span>
        </div>

        <button 
          type="submit"
          className="w-full bg-[#7b1815] text-white font-poppins font-black text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-sm hover:bg-[#9c2421] transition-all active:scale-[0.97] mt-2"
        >
          Masuk Ruang
        </button>

      </form>

      {/* Guest Bypass (Di-set sebagai bkn Admin / Tamu biasa) */}
      <div className="text-center">
        <button 
          type="button"
          onClick={() => onLoginSuccess(false)} 
          className="text-xs text-stone-400 hover:text-[#7b1815] underline underline-offset-4 transition-colors font-medium"
        >
          Masuk sebagai Tamu →
        </button>
      </div>

    </div>
  );
}

export default Login;