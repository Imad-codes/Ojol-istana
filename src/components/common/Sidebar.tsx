import React from 'react';
import {
  LayoutDashboard,
  Navigation,
  Calendar,
  UserCheck,
  FileText,
  Users,
  Bike,
  ShieldCheck,
  BarChart3,
  HelpCircle,
  Settings,
  LogOut,
  ArrowUpRight,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const {
    activeRole,
    activeTab,
    setActiveTab,
    approvals,
    setActiveModal,
    logout,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  } = useApp();

  const pendingApprovalsCount = approvals.filter(a => a.status === 'pending').length;

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const renderNavItems = () => {
    if (activeRole === 'pengguna') {
      return (
        <div className="space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Ruang Pengguna
          </div>
          <button
            onClick={() => handleTabClick('beranda')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'beranda'
                ? 'bg-blue-600/25 text-white font-semibold'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-slate-300 shrink-0" />
            <span>Beranda</span>
          </button>
          <button
            onClick={() => handleTabClick('perjalanan')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'perjalanan'
                ? 'bg-blue-600/25 text-white font-semibold'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <Navigation className="w-4 h-4 text-slate-300 shrink-0" />
            <span>Perjalanan saya</span>
          </button>
          <button
            onClick={() => handleTabClick('jadwal')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'jadwal'
                ? 'bg-blue-600/25 text-white font-semibold'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4 text-slate-300 shrink-0" />
            <span>Jadwal</span>
          </button>
          <button
            onClick={() => handleTabClick('profil')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'profil'
                ? 'bg-blue-600/25 text-white font-semibold'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4 text-slate-300 shrink-0" />
            <span>Profil & akses</span>
          </button>
        </div>
      );
    }

    if (activeRole === 'driver') {
      return (
        <div className="space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Ruang Pengemudi
          </div>
          <button
            onClick={() => handleTabClick('beranda')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'beranda'
                ? 'bg-blue-600/25 text-white font-semibold'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-slate-300 shrink-0" />
            <span>Beranda</span>
          </button>
          <button
            onClick={() => handleTabClick('tugas')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'tugas'
                ? 'bg-blue-600/25 text-white font-semibold'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <Navigation className="w-4 h-4 text-slate-300 shrink-0" />
            <span>Tugas perjalanan</span>
          </button>
          <button
            onClick={() => handleTabClick('aktivitas')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'aktivitas'
                ? 'bg-blue-600/25 text-white font-semibold'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-slate-300 shrink-0" />
            <span>Aktivitas harian</span>
          </button>
          <button
            onClick={() => handleTabClick('profil_driver')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'profil_driver'
                ? 'bg-blue-600/25 text-white font-semibold'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-slate-300 shrink-0" />
            <span>Profil & dokumen</span>
          </button>
        </div>
      );
    }

    // Admin view
    return (
      <div className="space-y-1">
        <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
          Pusat Operasional
        </div>
        <button
          onClick={() => handleTabClick('ringkasan')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'ringkasan'
              ? 'bg-blue-600/25 text-white font-semibold'
              : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 text-slate-300 shrink-0" />
          <span>Ringkasan</span>
        </button>
        <button
          onClick={() => handleTabClick('perjalanan_admin')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'perjalanan_admin'
              ? 'bg-blue-600/25 text-white font-semibold'
              : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
          }`}
        >
          <Navigation className="w-4 h-4 text-slate-300 shrink-0" />
          <span>Perjalanan</span>
        </button>
        <button
          onClick={() => handleTabClick('pengguna_admin')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'pengguna_admin'
              ? 'bg-blue-600/25 text-white font-semibold'
              : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4 text-slate-300 shrink-0" />
          <span>Pengguna</span>
        </button>
        <button
          onClick={() => handleTabClick('driver_admin')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'driver_admin'
              ? 'bg-blue-600/25 text-white font-semibold'
              : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
          }`}
        >
          <Bike className="w-4 h-4 text-slate-300 shrink-0" />
          <span>Driver</span>
        </button>
        <button
          onClick={() => handleTabClick('persetujuan')}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'persetujuan'
              ? 'bg-blue-600/25 text-white font-semibold'
              : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-slate-300 shrink-0" />
            <span>Persetujuan</span>
          </div>
          {pendingApprovalsCount > 0 && (
            <span className="text-xs font-semibold px-1.5 py-0.5 rounded text-amber-300 bg-amber-500/20">
              0{pendingApprovalsCount}
            </span>
          )}
        </button>
        <button
          onClick={() => handleTabClick('laporan')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'laporan'
              ? 'bg-blue-600/25 text-white font-semibold'
              : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4 text-slate-300 shrink-0" />
          <span>Laporan</span>
        </button>
      </div>
    );
  };

  const renderSidebarContent = (isDrawer = false) => (
    <div className="flex flex-col justify-between h-full">
      <div>
        {/* Brand Header */}
        <div className="p-5 flex items-center justify-between border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-200 shadow-inner shrink-0">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="6" r="3" />
                <path d="M6 15V9a3 3 0 0 1 3-3h6" />
                <path d="M18 9v6a3 3 0 0 1-3 3H9" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-white tracking-tight leading-tight text-[15px]">
                Ojek Online
              </div>
              <div className="font-bold text-white tracking-tight leading-tight text-[15px]">
                Istana
              </div>
            </div>
          </div>

          {/* Close button for mobile drawer only */}
          {isDrawer && (
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              aria-label="Tutup navigasi"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation list */}
        <nav className="p-3">{renderNavItems()}</nav>
      </div>

      {/* Bottom widgets */}
      <div className="p-4 space-y-3">
        {/* Help box */}
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80">
          <div className="flex items-center gap-2 mb-1.5 text-slate-200">
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs font-semibold">Butuh bantuan?</span>
          </div>
          <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">
            Pusat bantuan tersedia selama jam layanan.
          </p>
          <button
            onClick={() => {
              setActiveModal('help_operator');
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-1 text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition cursor-pointer"
          >
            <span>Hubungi operator</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        {/* Account settings */}
        <button
          onClick={() => {
            setActiveModal('account_settings');
            setIsMobileMenuOpen(false);
          }}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800/80 hover:text-white transition cursor-pointer"
        >
          <Settings className="w-3.5 h-3.5 shrink-0" />
          <span>Pengaturan akun</span>
        </button>

        {/* Logout to login page */}
        <button
          onClick={() => {
            logout();
            setIsMobileMenuOpen(false);
          }}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:bg-red-950/40 hover:text-red-300 transition border border-transparent hover:border-red-900/50 cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            <span>Keluar Sesi</span>
          </div>
          <span className="text-[10px] text-slate-500">Halaman Login</span>
        </button>

        {/* System Version */}
        <div className="pt-2 text-[10px] tracking-wide text-slate-500 uppercase font-mono px-1">
          OOI / KONSEP LAYANAN v1.0
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#102238] flex-col justify-between border-r border-slate-800 select-none text-slate-200 shrink-0 sticky top-0 h-screen overflow-y-auto">
        {renderSidebarContent(false)}
      </aside>

      {/* Mobile & Tablet Slide-Over Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer container */}
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-[#102238] shadow-2xl border-r border-slate-800 text-slate-200 z-10 overflow-y-auto">
            {renderSidebarContent(true)}
          </div>
        </div>
      )}
    </>
  );
};
