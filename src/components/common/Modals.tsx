import React, { useState } from 'react';
import {
  X,
  Phone,
  MessageSquare,
  Send,
  ShieldCheck,
  Check,
  Radio,
  Clock,
  Layers,
  MapPin,
  Calendar,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { InteractiveMap } from './InteractiveMap';

export const Modals: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    modalPayload,
    handleApproval,
    currentUser,
    allTrips,
    completedTrips,
    approvals,
    resetDemoData,
  } = useApp();

  const [chatMessages, setChatMessages] = useState<string[]>([
    'Halo Pak, saya sudah berada di titik penjemputan Lobi A.',
    'Baik, saya sedang menuju lobi dengan motor Vario Hitam plat DEMO 024. Helm 2 buah sudah siap.',
  ]);
  const [newChatText, setNewChatText] = useState('');
  const [callTimer, setCallTimer] = useState('00:14');

  if (!activeModal) return null;

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatText.trim()) return;
    setChatMessages([...chatMessages, newChatText.trim()]);
    setNewChatText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      {/* Help / Contact Operator Modal */}
      {activeModal === 'help_operator' && (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="p-5 bg-[#102238] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Radio className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-base">Pusat Bantuan Operasional</h3>
            </div>
            <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 space-y-4 text-xs text-slate-600">
            <p className="text-slate-700 font-medium">
              Operator Pusat Kendali OOI siaga selama jam operasional (06.00 – 20.00 WIB) untuk menangani kendala penjemputan, perubahan rute, atau situasi darurat internal.
            </p>
            <div className="space-y-2">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Saluran Telepon Internal</div>
                  <div className="text-slate-500 font-mono">Ext. 1044 / 021-384-0010</div>
                </div>
                <a href="tel:1044" className="px-3 py-1.5 bg-[#102238] text-white rounded-lg font-bold">
                  Hubungi
                </a>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Kanal Radio HT (VHF)</div>
                  <div className="text-slate-500 font-mono">Channel 04 - Transportasi Istana</div>
                </div>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded">Aktif</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
            <button
              onClick={() => setActiveModal(null)}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Account Settings Modal */}
      {activeModal === 'account_settings' && (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">Pengaturan Akun & Akses</h3>
            <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 space-y-4 text-xs">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-800 font-bold text-sm flex items-center justify-center">
                {currentUser?.avatarInitials}
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900">{currentUser?.name}</div>
                <div className="text-slate-500">{currentUser?.email}</div>
                <div className="text-[10px] text-emerald-700 font-bold mt-0.5">{currentUser?.statusBadge}</div>
              </div>
            </div>

            <div className="space-y-2 text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Peran Sistem</span>
                <span className="font-bold text-slate-900 capitalize">{currentUser?.role}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>No. Identitas / NIP</span>
                <span className="font-mono text-slate-900">{currentUser?.employeeId || currentUser?.driverId || 'PG-001'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Kontak Terdaftar</span>
                <span className="font-mono text-slate-900">{currentUser?.phone}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  resetDemoData();
                  setActiveModal(null);
                }}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition"
              >
                Reset Data Simulasi ke Kondisi Awal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Approval Modal */}
      {activeModal === 'review_approval' && modalPayload && (
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-base text-slate-900">Tinjau Permohonan Akses</h3>
            </div>
            <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 space-y-4 text-xs">
            <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-800 font-bold text-sm flex items-center justify-center">
                {modalPayload.initials}
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900">{modalPayload.name}</div>
                <div className="text-slate-500">{modalPayload.subtitle}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{modalPayload.date}</div>
              </div>
            </div>

            <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-xl space-y-1">
              <div className="font-bold text-blue-900">Keterangan Pengajuan:</div>
              <p className="text-slate-700 leading-relaxed">{modalPayload.notes}</p>
            </div>

            <div className="space-y-1.5 text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Unit / Kendaraan</span>
                <span className="font-bold text-slate-900">{modalPayload.departmentOrVehicle}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Status Saat Ini</span>
                <span className="font-bold text-amber-600 uppercase text-[10px]">Menunggu Verifikasi</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              onClick={() => {
                handleApproval(modalPayload.id, 'reject');
                setActiveModal(null);
              }}
              className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 font-bold text-xs rounded-xl"
            >
              Tolak Permohonan
            </button>
            <button
              onClick={() => {
                handleApproval(modalPayload.id, 'approve');
                setActiveModal(null);
              }}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs"
            >
              Setujui & Terbitkan Izin
            </button>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {activeModal === 'message_modal' && modalPayload && (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[480px]">
          <div className="p-4 bg-[#102238] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs">
                {modalPayload.targetName.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-xs">{modalPayload.targetName}</div>
                <div className="text-[10px] text-slate-400">{modalPayload.targetRole}</div>
              </div>
            </div>
            <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] p-3 rounded-2xl ${
                  i % 2 === 0
                    ? 'ml-auto bg-blue-600 text-white rounded-br-xs'
                    : 'mr-auto bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                }`}
              >
                {msg}
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={newChatText}
              onChange={(e) => setNewChatText(e.target.value)}
              placeholder="Tulis pesan cepat..."
              className="flex-1 px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Call Modal */}
      {activeModal === 'call_modal' && modalPayload && (
        <div className="w-full max-w-xs bg-slate-900 rounded-3xl shadow-2xl p-6 text-center text-white space-y-6">
          <div className="text-xs text-slate-400 font-mono tracking-widest uppercase">
            Panggilan Kedinasan Terenkripsi
          </div>
          <div className="w-20 h-20 rounded-full bg-slate-800 mx-auto flex items-center justify-center text-xl font-bold border-2 border-emerald-500/50 shadow-lg">
            {modalPayload.targetName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="text-base font-bold">{modalPayload.targetName}</div>
            <div className="text-xs text-slate-400">{modalPayload.phone}</div>
            <div className="text-emerald-400 text-xs font-mono mt-1">{callTimer} Terhubung</div>
          </div>
          <div className="pt-4 flex items-center justify-center gap-4">
            <button
              onClick={() => setActiveModal(null)}
              className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center text-white shadow-lg cursor-pointer"
            >
              <Phone className="w-6 h-6 rotate-[135deg]" />
            </button>
          </div>
        </div>
      )}

      {/* Enlarged Map Modal */}
      {activeModal === 'map_fullscreen' && (
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">Peta Kompleks Kedinasan Istana (Simulasi Rute)</h3>
            <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4">
            <InteractiveMap heightClass="h-96" />
          </div>
        </div>
      )}

      {/* Full Trip History / All Trips Modal */}
      {activeModal === 'trip_history' && (
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">Semua Riwayat Perjalanan</h3>
            <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 max-h-[500px] overflow-y-auto space-y-3 text-xs">
            {[...allTrips, ...completedTrips].map((trip, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">{trip.pickup} → {trip.destination}</div>
                  <div className="text-slate-500 text-[11px]">{trip.fullDateTime} · Driver: {trip.driverName} · ID: {trip.id}</div>
                </div>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded font-semibold text-[10px]">
                  {trip.statusLabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Approvals Modal */}
      {activeModal === 'all_approvals' && (
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">Daftar Permohonan Izin & Verifikasi</h3>
            <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 max-h-[500px] overflow-y-auto space-y-3 text-xs">
            {approvals.map((app) => (
              <div key={app.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">{app.name} ({app.subtitle})</div>
                  <div className="text-slate-600 text-[11px] mt-0.5">{app.notes}</div>
                  <div className="text-slate-400 text-[10px] mt-1">{app.date} · {app.departmentOrVehicle}</div>
                </div>
                <div className="text-right shrink-0 ml-3">
                  {app.status === 'pending' ? (
                    <button
                      onClick={() => {
                        handleApproval(app.id, 'approve');
                      }}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs"
                    >
                      Setujui
                    </button>
                  ) : (
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full text-[10px]">
                      {app.status === 'approved' ? 'Disetujui' : 'Ditolak'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
