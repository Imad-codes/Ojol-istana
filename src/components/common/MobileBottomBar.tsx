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
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileBottomBar: React.FC = () => {
  const { activeRole, activeTab, setActiveTab, approvals } = useApp();

  const pendingApprovalsCount = approvals.filter(a => a.status === 'pending').length;

  if (!activeRole) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-2 py-1 shadow-lg">
      <nav className="flex items-center justify-around max-w-lg mx-auto">
        {activeRole === 'pengguna' && (
          <>
            <button
              onClick={() => setActiveTab('beranda')}
              className={`flex-1 flex flex-col items-center py-1.5 px-1 rounded-lg text-[10px] font-medium transition ${
                activeTab === 'beranda'
                  ? 'text-blue-600 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutDashboard className="w-5 h-5 mb-0.5" />
              <span>Beranda</span>
            </button>
            <button
              onClick={() => setActiveTab('perjalanan')}
              className={`flex-1 flex flex-col items-center py-1.5 px-1 rounded-lg text-[10px] font-medium transition ${
                activeTab === 'perjalanan'
                  ? 'text-blue-600 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Navigation className="w-5 h-5 mb-0.5" />
              <span>Perjalanan</span>
            </button>
            <button
              onClick={() => setActiveTab('jadwal')}
              className={`flex-1 flex flex-col items-center py-1.5 px-1 rounded-lg text-[10px] font-medium transition ${
                activeTab === 'jadwal'
                  ? 'text-blue-600 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Calendar className="w-5 h-5 mb-0.5" />
              <span>Jadwal</span>
            </button>
            <button
              onClick={() => setActiveTab('profil')}
              className={`flex-1 flex flex-col items-center py-1.5 px-1 rounded-lg text-[10px] font-medium transition ${
                activeTab === 'profil'
                  ? 'text-blue-600 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <UserCheck className="w-5 h-5 mb-0.5" />
              <span>Profil</span>
            </button>
          </>
        )}

        {activeRole === 'driver' && (
          <>
            <button
              onClick={() => setActiveTab('beranda')}
              className={`flex-1 flex flex-col items-center py-1.5 px-1 rounded-lg text-[10px] font-medium transition ${
                activeTab === 'beranda'
                  ? 'text-emerald-600 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutDashboard className="w-5 h-5 mb-0.5" />
              <span>Beranda</span>
            </button>
            <button
              onClick={() => setActiveTab('tugas')}
              className={`flex-1 flex flex-col items-center py-1.5 px-1 rounded-lg text-[10px] font-medium transition ${
                activeTab === 'tugas'
                  ? 'text-emerald-600 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Navigation className="w-5 h-5 mb-0.5" />
              <span>Tugas</span>
            </button>
            <button
              onClick={() => setActiveTab('aktivitas')}
              className={`flex-1 flex flex-col items-center py-1.5 px-1 rounded-lg text-[10px] font-medium transition ${
                activeTab === 'aktivitas'
                  ? 'text-emerald-600 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <BarChart3 className="w-5 h-5 mb-0.5" />
              <span>Aktivitas</span>
            </button>
            <button
              onClick={() => setActiveTab('profil_driver')}
              className={`flex-1 flex flex-col items-center py-1.5 px-1 rounded-lg text-[10px] font-medium transition ${
                activeTab === 'profil_driver'
                  ? 'text-emerald-600 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <ShieldCheck className="w-5 h-5 mb-0.5" />
              <span>Dokumen</span>
            </button>
          </>
        )}

        {activeRole === 'admin' && (
          <>
            <button
              onClick={() => setActiveTab('ringkasan')}
              className={`flex-1 flex flex-col items-center py-1.5 px-1 rounded-lg text-[10px] font-medium transition ${
                activeTab === 'ringkasan'
                  ? 'text-indigo-600 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutDashboard className="w-5 h-5 mb-0.5" />
              <span>Ringkasan</span>
            </button>
            <button
              onClick={() => setActiveTab('perjalanan_admin')}
              className={`flex-1 flex flex-col items-center py-1.5 px-1 rounded-lg text-[10px] font-medium transition ${
                activeTab === 'perjalanan_admin'
                  ? 'text-indigo-600 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Navigation className="w-5 h-5 mb-0.5" />
              <span>Perjalanan</span>
            </button>
            <button
              onClick={() => setActiveTab('pengguna_admin')}
              className={`flex-1 flex flex-col items-center py-1.5 px-1 rounded-lg text-[10px] font-medium transition ${
                activeTab === 'pengguna_admin'
                  ? 'text-indigo-600 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Users className="w-5 h-5 mb-0.5" />
              <span>Pengguna</span>
            </button>
            <button
              onClick={() => setActiveTab('persetujuan')}
              className={`flex-1 flex flex-col items-center py-1.5 px-1 rounded-lg text-[10px] font-medium transition relative ${
                activeTab === 'persetujuan'
                  ? 'text-indigo-600 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <ShieldCheck className="w-5 h-5 mb-0.5" />
                {pendingApprovalsCount > 0 && (
                  <span className="absolute -top-1 -right-2 text-[9px] font-bold bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                    {pendingApprovalsCount}
                  </span>
                )}
              </div>
              <span>Persetujuan</span>
            </button>
            <button
              onClick={() => setActiveTab('laporan')}
              className={`flex-1 flex flex-col items-center py-1.5 px-1 rounded-lg text-[10px] font-medium transition ${
                activeTab === 'laporan'
                  ? 'text-indigo-600 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-5 h-5 mb-0.5" />
              <span>Laporan</span>
            </button>
          </>
        )}
      </nav>
    </div>
  );
};
