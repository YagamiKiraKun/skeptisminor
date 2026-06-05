import React, { useState } from 'react';

function Login({ onLoginSuccess, logoImg }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    onLoginSuccess(); // Trigger transisi masuk ke halaman utama jika form di-submit
  };

  return (
    <div className="flex-1 flex flex-col justify-center px-6 pb-12 animate-fadeIn z-10 space-y-7 bg-[#7b1815]">
      
      {/* Header Identity (Logo & Welcome Text) */}
      <div className="text-center space-y-3">
        <div className="w-28 h-28 mx-auto overflow-hidden rounded-[24px] shadow-2xl border border-white/10 bg-[#7b1815] p-1">
          <img src={logoImg} alt="Skeptis Minor" className="w-full h-full object-contain scale-125" />
        </div>
        <div className="space-y-1">
          <h2 className="font-poppins font-black text-2xl text-white tracking-tight">Welcome, Kamerad!</h2>
          <p className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-bold">Skeptis Minor Digital Space</p>
        </div>
      </div>

      {/* Glassmorphism Form Card */}
      <form onSubmit={handleLogin} className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-[28px] p-6 shadow-2xl space-y-4">
        
        {/* INPUT USERNAME */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-bold uppercase tracking-wider text-white/50 block pl-1">Email / Username</label>
          <input 
            type="text" 
            placeholder="masukkan nama atau email..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-poppins"
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-bold uppercase tracking-wider text-white/50 block pl-1">Password</label>
          <input 
            type="password" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-poppins"
            required
          />
        </div>

        {/* Lupa Password Link */}
        <div className="text-right pr-1">
          <span className="text-[10px] text-white/40 hover:text-white/60 cursor-pointer transition-colors">Lupa password?</span>
        </div>

        {/* SUBMIT BUTTON (Solid Broken White) */}
        <button 
          type="submit"
          className="w-full bg-[#fbf9f5] text-[#7b1815] font-poppins font-black text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-lg hover:bg-white transition-all active:scale-[0.97] mt-2"
        >
          Masuk Ruang
        </button>

      </form>

      {/* Guest Bypass Link */}
      <div className="text-center">
        <button 
          type="button"
          onClick={onLoginSuccess} 
          className="text-xs text-white/60 hover:text-white underline underline-offset-4 transition-colors font-medium"
        >
          Masuk sebagai Tamu →
        </button>
      </div>

    </div>
  );
}

export default Login;