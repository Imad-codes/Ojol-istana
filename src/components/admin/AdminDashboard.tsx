import React, { useState } from 'react';
import {
  Download,
  ShieldCheck,
  GitFork,
  Bike,
  Users,
  Timer,
  CheckCircle2,
  Clock,
  ChevronRight,
  Filter,
  Check,
  X,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminDashboard: React.FC = () => {
  const { allTrips, approvals, handleApproval, setActiveModal, setModalPayload } = useApp();
  const [approvalFilter, setApprovalFilter] = useState<'all' | 'pengguna' | 'driver'>('all');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const pendingApprovals = approvals.filter(a => a.status === 'pending');
  const userPendingCount = pendingApprovals.filter(a => a.roleType === 'pengguna').length;
  const driverPendingCount = pendingApprovals.filter(a => a.roleType === 'driver').length;

  const filteredApprovals = pendingApprovals.filter(a => {
    if (approvalFilter === 'all') return true;
    return a.roleType === approvalFilter;
  });

  const handleReview = (item: any) => {
    setModalPayload(item);
    setActiveModal('review_approval');
  };

  const handleDownloadReport = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Title & Download Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-amber-600 tracking-wider uppercase mb-1">
            PUSAT OPERASIONAL
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Ringkasan operasional
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Pantau mobilitas, kelola akses, dan jaga layanan tetap berjalan.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadReport}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Unduh laporan</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Laporan rekapitulasi operasional PDF/Excel berhasil diunduh.</span>
        </div>
      )}

      {/* Operational Banner */}
      <div className="p-3.5 px-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-emerald-950">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-medium">
            Layanan beroperasi normal. Seluruh perjalanan aktif menggunakan pengguna dan driver terverifikasi.
          </span>
        </div>
        <span className="font-mono text-emerald-800 font-bold bg-white/80 px-2 py-0.5 rounded border border-emerald-200/60 self-start sm:self-center">
          06.00–20.00 WIB
        </span>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Perjalanan hari ini</span>
            <GitFork className="w-4 h-4 text-slate-400 rotate-90" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 pt-1">42</div>
          <div className="text-[11px] text-slate-500">34 selesai · 8 berlangsung</div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Driver tersedia</span>
            <Bike className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 pt-1">10</div>
          <div className="text-[11px] text-slate-500">18 online dari 24 driver</div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Pengguna berizin</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 pt-1">126</div>
          <div className="text-[11px] text-slate-500">3 permohonan akses baru</div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Waktu jemput rata-rata</span>
            <Timer className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 pt-1">4 mnt</div>
          <div className="text-[11px] text-slate-500">Target layanan ≤ 5 menit</div>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Active Trips Table & Trip Trend */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Trips Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Perjalanan aktif</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  8 perjalanan berlangsung · Diperbarui 09.41 WIB
                </p>
              </div>
              <button
                onClick={() => setActiveModal('trip_history')}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <span>Lihat semua</span>
                <span>→</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <table className="w-full min-w-[500px] text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="pb-3 font-semibold">ID / Waktu</th>
                    <th className="pb-3 font-semibold">Pengguna / Driver</th>
                    <th className="pb-3 font-semibold">Rute</th>
                    <th className="pb-3 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allTrips.slice(0, 5).map((trip) => {
                    const isArrivingOrAssigned = trip.status === 'assigned';
                    const isPendingWait = trip.id === 'OI-1044';
                    return (
                      <tr key={trip.id} className="hover:bg-slate-50/60 transition">
                        <td className="py-3.5 pr-3">
                          <div className="font-bold text-slate-900">{trip.id}</div>
                          <div className="text-[11px] text-slate-500">{trip.orderTime}</div>
                        </td>
                        <td className="py-3.5 pr-3">
                          <div className="font-bold text-slate-900">{trip.passengerName}</div>
                          <div className="text-[11px] text-slate-500">{trip.driverName}</div>
                        </td>
                        <td className="py-3.5 pr-3">
                          <div className="font-medium text-slate-800">
                            {trip.pickup.split('·')[0].trim()} → {trip.destination.split('·')[0].trim()}
                          </div>
                        </td>
                        <td className="py-3.5 text-right whitespace-nowrap">
                          {isPendingWait ? (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/80">
                              ● Menunggu jemput
                            </span>
                          ) : isArrivingOrAssigned ? (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                              ● Menuju jemput
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-200/80">
                              ● Dalam perjalanan
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Card: 7-Day Trip Trend Bar Chart */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-bold text-slate-900">Tren perjalanan</h2>
              <button
                onClick={() => setActiveModal('report_modal')}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <span>7 hari terakhir</span>
                <span>→</span>
              </button>
            </div>

            {/* Custom SVG/Bar Chart */}
            <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2">
              {[
                { day: 'Jum', val: 24, max: 45, isToday: false },
                { day: 'Sab', val: 31, max: 45, isToday: false },
                { day: 'Min', val: 27, max: 45, isToday: false },
                { day: 'Sen', val: 38, max: 45, isToday: false },
                { day: 'Sel', val: 35, max: 45, isToday: false },
                { day: 'Rab', val: 29, max: 45, isToday: false },
                { day: 'Kam', val: 42, max: 45, isToday: true },
              ].map((item, idx) => {
                const heightPercent = Math.round((item.val / item.max) * 100);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className={`text-[11px] font-bold ${item.isToday ? 'text-slate-900' : 'text-slate-400'}`}>
                      {item.val}
                    </span>
                    <div className="w-full max-w-[54px] bg-slate-100 rounded-t-lg h-32 flex items-end p-0.5 overflow-hidden">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t transition-all duration-500 ${
                          item.isToday ? 'bg-[#102238]' : 'bg-[#E2E8F0] hover:bg-slate-300'
                        }`}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-500 mt-1">{item.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Approvals Card & Service Status */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card: Needs Approval */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Perlu persetujuan</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {pendingApprovals.length} permohonan menunggu tinjauan
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setApprovalFilter('pengguna')}
                className={`px-2.5 py-1 rounded-full font-semibold transition ${
                  approvalFilter === 'pengguna'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                }`}
              >
                ● {userPendingCount} pengguna
              </button>
              <button
                onClick={() => setApprovalFilter('driver')}
                className={`px-2.5 py-1 rounded-full font-semibold transition ${
                  approvalFilter === 'driver'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                }`}
              >
                ● {driverPendingCount} driver
              </button>
            </div>

            {/* List of pending approvals */}
            <div className="space-y-3">
              {filteredApprovals.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0">
                        {item.initials}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{item.name}</div>
                        <div className="text-[11px] text-slate-500">{item.subtitle}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-amber-600 font-medium">Menunggu verifikasi</span>
                    <button
                      onClick={() => handleReview(item)}
                      className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold rounded-lg transition shadow-xs cursor-pointer"
                    >
                      Tinjau
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => setActiveModal('all_approvals')}
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1"
              >
                <span>Lihat semua permohonan</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Card: Service Status */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3 text-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-2">Status layanan</h3>

            <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-600">Sistem pemesanan</span>
              <span className="font-bold text-emerald-600">Normal</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-600">Verifikasi akses</span>
              <span className="font-bold text-emerald-600">Normal</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-600">Jam operasional</span>
              <span className="font-medium text-slate-800">06.00–20.00</span>
            </div>

            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-600">Sinkronisasi terakhir</span>
              <span className="font-medium text-slate-500">09.41 WIB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="pt-4 border-t border-slate-200/80 flex items-center gap-2 text-xs text-slate-400">
        <span className="text-slate-400">ⓘ</span>
        <span>Konsep demonstrasi · Seluruh data fiktif. Bukan layanan resmi atau bentuk dukungan pemerintah.</span>
      </div>
    </div>
  );
};
