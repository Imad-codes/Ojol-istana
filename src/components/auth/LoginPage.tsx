import React, { useState } from 'react';
import {
  User,
  Bike,
  ShieldAlert,
  KeyRound,
  Lock,
  Mail,
  Fingerprint,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Building2,
  Clock,
  Sparkles,
  Info,
} from 'lucide-react';
import { UserRole } from '../../types';
import { useApp } from '../../context/AppContext';
import { authenticateRoleCredentials, DEMO_USERS } from '../../utils/tripLogic';

export const LoginPage: React.FC = () => {
  const { login } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('pengguna');

  // Form states per role
  // Pengguna
  const [userIdentifier, setUserIdentifier] = useState('raka.pradana@istana.go.id');
  const [userPassword, setUserPassword] = useState('••••••••••••');
  const [userDepartment, setUserDepartment] = useState('Unit Administrasi');

  // Driver
  const [driverIdInput, setDriverIdInput] = useState('DRV-024');
  const [driverPin, setDriverPin] = useState('4826');
  const [driverShift, setDriverShift] = useState('Shift Pagi (07.00 - 15.00 WIB)');

  // Admin
  const [adminUsername, setAdminUsername] = useState('admin.nadia@istana.go.id');
  const [adminPassword, setAdminPassword] = useState('••••••••••••');
  const [admin2FA, setAdmin2FA] = useState('849201');

  // Feedback messages
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      let result;
      if (selectedRole === 'pengguna') {
        result = authenticateRoleCredentials('pengguna', userIdentifier, userPassword);
      } else if (selectedRole === 'driver') {
        result = authenticateRoleCredentials('driver', driverIdInput, driverPin);
      } else {
        result = authenticateRoleCredentials('admin', adminUsername, adminPassword, admin2FA);
      }

      setIsLoading(false);
      if (result.success && result.user) {
        login(selectedRole, result.user);
      } else {
        setErrorMessage(result.message);
      }
    }, 400);
  };

  const handleQuickDemo = (role: UserRole) => {
    login(role, DEMO_USERS[role]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c1829] via-[#102238] to-[#0A1424] text-slate-100 flex flex-col justify-between selection:bg-blue-500 selection:text-white">
      {/* Top Banner & Security Classification */}
      <header className="border-b border-slate-800/80 bg-slate-950/40 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="6" r="3" />
                <path d="M6 15V9a3 3 0 0 1 3-3h6" />
                <path d="M18 9v6a3 3 0 0 1-3 3H9" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-wide">OJEK ONLINE ISTANA</div>
              <div className="text-[11px] text-slate-400">Sistem Mobilitas & Transportasi Kedinasan Internal</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>JARINGAN INTERNAL TERISOLASI · TINGKAT OTORISASI 1</span>
          </div>
        </div>
      </header>

      {/* Main Login Body */}
      <main className="max-w-6xl w-full mx-auto px-4 py-6 md:py-8 flex-1 flex flex-col justify-center">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>PORTAL AUTENTIKASI MULTI-PERAN</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Masuk ke Layanan OOI
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-400">
            Pilih peran Anda untuk mengakses sistem penugasan, pemesanan kendaraan, atau pusat komando operasional.
          </p>
        </div>

        {/* Role Selection Tabs */}
        <div className="max-w-xl w-full mx-auto mb-6">
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl">
            <button
              type="button"
              onClick={() => {
                setSelectedRole('pengguna');
                setErrorMessage(null);
              }}
              className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl transition-all duration-200 ${
                selectedRole === 'pengguna'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 font-semibold ring-1 ring-blue-400/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <User className="w-5 h-5" />
              <span className="text-xs font-bold">1. Pengguna</span>
              <span className="text-[10px] opacity-80 hidden sm:inline">Pegawai & Staf</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedRole('driver');
                setErrorMessage(null);
              }}
              className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl transition-all duration-200 ${
                selectedRole === 'driver'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 font-semibold ring-1 ring-emerald-400/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Bike className="w-5 h-5" />
              <span className="text-xs font-bold">2. Driver</span>
              <span className="text-[10px] opacity-80 hidden sm:inline">Pengemudi OOI</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedRole('admin');
                setErrorMessage(null);
              }}
              className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl transition-all duration-200 ${
                selectedRole === 'admin'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40 font-semibold ring-1 ring-indigo-400/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <ShieldAlert className="w-5 h-5" />
              <span className="text-xs font-bold">3. Admin</span>
              <span className="text-[10px] opacity-80 hidden sm:inline">Pusat Operasional</span>
            </button>
          </div>
        </div>

        {/* Dynamic Card Container */}
        <div className="max-w-xl w-full mx-auto bg-slate-900/70 border border-slate-800/90 rounded-2xl p-5 sm:p-7 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {/* Subtle Role Gradient Glow */}
          <div
            className={`absolute top-0 left-0 right-0 h-1 ${
              selectedRole === 'pengguna'
                ? 'bg-blue-500'
                : selectedRole === 'driver'
                ? 'bg-emerald-500'
                : 'bg-indigo-500'
            }`}
          />

          {/* Quick 1-Click Access Pill */}
          <div className="mb-6 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                  selectedRole === 'pengguna'
                    ? 'bg-blue-500/20 text-blue-300'
                    : selectedRole === 'driver'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-indigo-500/20 text-indigo-300'
                }`}
              >
                {DEMO_USERS[selectedRole].avatarInitials}
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Demo Akun: {DEMO_USERS[selectedRole].name}</span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono">
                    Siap Pakai
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {selectedRole === 'pengguna' && 'Unit Administrasi · PG-DEMO-018'}
                  {selectedRole === 'driver' && 'Honda Vario Hitam · DEMO 024'}
                  {selectedRole === 'admin' && 'Pusat Operasional Transportasi'}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleQuickDemo(selectedRole)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-md transition flex items-center gap-1 ${
                selectedRole === 'pengguna'
                  ? 'bg-blue-600 hover:bg-blue-500'
                  : selectedRole === 'driver'
                  ? 'bg-emerald-600 hover:bg-emerald-500'
                  : 'bg-indigo-600 hover:bg-indigo-500'
              }`}
            >
              <span>1-Klik Masuk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-lg bg-red-900/30 border border-red-700/60 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form Content: ROLE 1 PENGGUNA */}
          {selectedRole === 'pengguna' && (
            <form onSubmit={handleRoleSubmit} className="space-y-4">
              <div className="border-b border-slate-800 pb-3 mb-2">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-400" />
                  <span>Autentikasi Pengguna Kedinasan</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Gunakan email kedinasan resmi @istana.go.id atau Nomor Induk Pegawai (NIP).
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  NIP Pegawai / Email Kedinasan
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={userIdentifier}
                    onChange={(e) => setUserIdentifier(e.target.value)}
                    required
                    placeholder="nama.pegawai@istana.go.id"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Kata Sandi Portal
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    required
                    placeholder="Masukkan kata sandi"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Unit Kerja / Satuan Organisasi
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={userDepartment}
                    onChange={(e) => setUserDepartment(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition appearance-none"
                  >
                    <option value="Unit Administrasi">Unit Administrasi & Rumah Tangga</option>
                    <option value="Protokol Istana">Biro Protokol Acara Kenegaraan</option>
                    <option value="Sekretariat Militer">Sekretariat Militer Presiden</option>
                    <option value="Biro Pers & Media">Biro Pers, Media dan Informasi</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/30 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="text-xs">Memverifikasi kredensial...</span>
                ) : (
                  <>
                    <span>Masuk sebagai Pengguna</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Form Content: ROLE 2 DRIVER */}
          {selectedRole === 'driver' && (
            <form onSubmit={handleRoleSubmit} className="space-y-4">
              <div className="border-b border-slate-800 pb-3 mb-2">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Bike className="w-4 h-4 text-emerald-400" />
                  <span>Autentikasi Pengemudi (Driver OOI)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Akses khusus pengemudi terverifikasi Ojek Online Istana dengan ID Unit & PIN.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  ID Pengemudi / No. Registrasi Kendaraan
                </label>
                <div className="relative">
                  <Bike className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={driverIdInput}
                    onChange={(e) => setDriverIdInput(e.target.value)}
                    required
                    placeholder="Contoh: DRV-024 atau DEMO 024"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  PIN Keamanan Driver (4 - 6 Digit)
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    maxLength={6}
                    value={driverPin}
                    onChange={(e) => setDriverPin(e.target.value)}
                    required
                    placeholder="Masukkan PIN keamanan"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition tracking-widest"
                  />
                </div>
                <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                  <Info className="w-3 h-3 text-slate-400" />
                  <span>PIN digunakan untuk otentikasi shift dan validasi penumpang.</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Jadwal Shift Kedinasan
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={driverShift}
                    onChange={(e) => setDriverShift(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition appearance-none"
                  >
                    <option value="Shift Pagi (07.00 - 15.00 WIB)">Shift Pagi (07.00 – 15.00 WIB)</option>
                    <option value="Shift Siang (12.00 - 20.00 WIB)">Shift Siang (12.00 – 20.00 WIB)</option>
                    <option value="Shift Khusus Pengawalan">Shift Khusus / Protokol Tamu Negara</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/30 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="text-xs">Memverifikasi unit pengemudi...</span>
                ) : (
                  <>
                    <span>Masuk sebagai Pengemudi</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Form Content: ROLE 3 ADMIN */}
          {selectedRole === 'admin' && (
            <form onSubmit={handleRoleSubmit} className="space-y-4">
              <div className="border-b border-slate-800 pb-3 mb-2">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-indigo-400" />
                  <span>Autentikasi Pusat Operasional (Administrator)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Kontrol armada terpusat, persetujuan akses izin, dan pemantauan mobilitas.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Username Administrator Operasional
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    required
                    placeholder="admin.nadia@istana.go.id"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Kata Sandi Tingkat Operasional
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Kode Verifikasi 2FA / Token Operasional (6 Digit)
                </label>
                <div className="relative">
                  <Fingerprint className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    maxLength={6}
                    value={admin2FA}
                    onChange={(e) => setAdmin2FA(e.target.value)}
                    required
                    placeholder="849201"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition font-mono tracking-widest"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-900/30 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="text-xs">Memverifikasi hak akses Super Admin...</span>
                ) : (
                  <>
                    <span>Masuk ke Pusat Operasional</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Bottom Security Notice */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Sistem ini dipantau secara berkala oleh Divisi Keamanan Informasi & Operasional Transportasi Istana.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 bg-slate-950/60 py-4 px-6 text-center text-xs text-slate-500">
        Konsep demonstrasi · Seluruh data fiktif. Bukan layanan resmi atau bentuk dukungan pemerintah.
      </footer>
    </div>
  );
};
