import React, { useState } from 'react';
import { Bell, ChevronDown, LogOut, RefreshCw, Shield, User, Menu } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const { currentUser, activeRole, activeTab, logout, resetDemoData, notificationCount, clearNotifications, setIsMobileMenuOpen } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Derive breadcrumb text
  const getBreadcrumbs = () => {
    let roleText = 'Pengguna';
    if (activeRole === 'driver') roleText = 'Pengemudi';
    if (activeRole === 'admin') roleText = 'Admin';

    let tabText = 'Beranda';
    if (activeTab === 'perjalanan' || activeTab === 'perjalanan_admin') tabText = 'Perjalanan';
    if (activeTab === 'jadwal') tabText = 'Jadwal';
    if (activeTab === 'profil' || activeTab === 'profil_driver') tabText = 'Profil & akses';
    if (activeTab === 'ringkasan') tabText = 'Ringkasan';
    if (activeTab === 'pengguna_admin') tabText = 'Pengguna';
    if (activeTab === 'driver_admin') tabText = 'Driver';
    if (activeTab === 'persetujuan') tabText = 'Persetujuan';
    if (activeTab === 'laporan') tabText = 'Laporan';
    if (activeTab === 'tugas') tabText = 'Tugas perjalanan';
    if (activeTab === 'aktivitas') tabText = 'Aktivitas harian';

    return { roleText, tabText };
  };

  const { roleText, tabText } = getBreadcrumbs();

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile Hamburger & Breadcrumbs */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden p-1.5 -ml-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
          aria-label="Buka menu navigasi"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
          <span className="text-slate-500 font-normal">{roleText}</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-semibold">{tabText}</span>
        </div>
      </div>

      {/* Right side items */}
      <div className="flex items-center gap-5">
        {/* Date */}
        <div className="text-xs font-medium text-slate-500 hidden md:block">
          Kamis, 22 Oktober 2026
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition relative"
            aria-label="Pemberitahuan"
          >
            <Bell className="w-4 h-4" />
            {notificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800">Notifikasi Kedinasan</span>
                {notificationCount > 0 && (
                  <button
                    onClick={clearNotifications}
                    className="text-[11px] text-blue-600 hover:underline"
                  >
                    Tandai dibaca
                  </button>
                )}
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-blue-50/70 border border-blue-100/60">
                  <p className="font-semibold text-slate-900">Perjalanan OI-1048 aktif</p>
                  <p className="text-slate-600 text-[11px]">Driver Bima Saputra sedang menuju titik jemput Lobi A.</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <p className="font-semibold text-slate-900">Jadwal Perjalanan Mendatang</p>
                  <p className="text-slate-600 text-[11px]">Penjemputan Gedung C ke Lobi A terjadwal pukul 14.30 WIB.</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <p className="font-semibold text-slate-900">Pembaruan Prosedur Akses</p>
                  <p className="text-slate-600 text-[11px]">Seluruh penumpang wajib memverifikasi 4 digit kode penjemputan.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Chip */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 p-1 pr-2 rounded-full hover:bg-slate-100/80 transition"
          >
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center border border-slate-300">
              {currentUser?.avatarInitials || 'RP'}
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-slate-900 leading-tight">
                {currentUser?.name || 'Raka Pradana'}
              </div>
              <div className="text-[10px] text-slate-500 font-medium leading-tight">
                {currentUser?.roleLabel || 'Pengguna terotorisasi'}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <div className="text-xs font-bold text-slate-900">{currentUser?.name}</div>
                <div className="text-[11px] text-slate-500">{currentUser?.email}</div>
                <div className="text-[10px] text-emerald-700 font-medium mt-1 bg-emerald-50 px-1.5 py-0.5 rounded inline-block">
                  {currentUser?.statusBadge}
                </div>
              </div>

              <div className="pt-1 border-t border-slate-100 space-y-1">
                <button
                  onClick={() => {
                    resetDemoData();
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 rounded flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                  <span>Reset data simulasi</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-500" />
                  <span>Halaman Login</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
