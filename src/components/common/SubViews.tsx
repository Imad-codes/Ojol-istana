import React from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  User,
  Bike,
  FileText,
  Filter,
  Search,
  Download,
  AlertTriangle,
  QrCode,
  Award,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SubViews: React.FC = () => {
  const {
    activeRole,
    activeTab,
    allTrips,
    completedTrips,
    scheduledTrips,
    approvals,
    handleApproval,
    currentUser,
    driverStatus,
  } = useApp();

  // Pengguna: Perjalanan saya
  if (activeRole === 'pengguna' && activeTab === 'perjalanan') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Perjalanan Saya</h1>
          <p className="text-xs text-slate-500 mt-1">Daftar riwayat dan jadwal transportasi kedinasan Anda.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <div className="divide-y divide-slate-100">
            {[...allTrips, ...completedTrips].map((trip, idx) => (
              <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900">{trip.id}</span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs font-bold text-slate-800">{trip.pickup} → {trip.destination}</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {trip.fullDateTime} · Driver: {trip.driverName} ({trip.driverVehicle})
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {trip.statusLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Pengguna: Jadwal
  if (activeRole === 'pengguna' && activeTab === 'jadwal') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Jadwal Penjemputan</h1>
          <p className="text-xs text-slate-500 mt-1">Agenda mobilitas kedinasan antar gedung yang telah dijadwalkan.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scheduledTrips.map((s, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-900">{s.fullDateTime}</span>
                </div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                  Terjadwal
                </span>
              </div>
              <div className="text-sm font-bold text-slate-800">
                {s.pickup} → {s.destination}
              </div>
              <p className="text-xs text-slate-500">
                Driver akan dialokasikan secara otomatis 15 menit sebelum waktu penjemputan.
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Pengguna: Profil & Akses
  if (activeRole === 'pengguna' && activeTab === 'profil') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Profil & Otorisasi Akses</h1>
          <p className="text-xs text-slate-500 mt-1">Informasi identitas pegawai dan status izin penggunaan armada OOI.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center">
                RP
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Raka Pradana</h2>
                <p className="text-xs text-slate-500">Unit Administrasi & Rumah Tangga Istana</p>
                <div className="mt-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block">
                  ● Otorisasi Akses Penuh (Tingkat II)
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span>Nomor Registrasi Pegawai (NIP)</span>
                <span className="font-mono font-bold text-slate-900">PG-DEMO-018</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span>Email Kedinasan</span>
                <span className="font-mono text-slate-900">raka.pradana@istana.go.id</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span>Masa Berlaku Izin</span>
                <span className="font-bold text-slate-900">31 Desember 2026</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 text-center space-y-3 flex flex-col items-center justify-center">
            <div className="w-32 h-32 bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center">
              <QrCode className="w-20 h-20 text-slate-700" />
            </div>
            <div className="text-xs font-bold text-slate-900">QR Kartu Akses Kedinasan</div>
            <p className="text-[11px] text-slate-500">Tunjukkan barcode saat pemeriksaan pos keamanan gerbang istana.</p>
          </div>
        </div>
      </div>
    );
  }

  // Driver: Tugas perjalanan
  if (activeRole === 'driver' && activeTab === 'tugas') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Tugas Perjalanan Driver</h1>
          <p className="text-xs text-slate-500 mt-1">Daftar tugas antar-jemput kedinasan hari ini.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <div className="space-y-3">
            {allTrips.map((t, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-slate-900">{t.id} · {t.pickup} → {t.destination}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Penumpang: {t.passengerName} ({t.passengerDept}) · Jam: {t.orderTime}</div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {t.statusLabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Driver: Aktivitas harian
  if (activeRole === 'driver' && activeTab === 'aktivitas') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Aktivitas Harian & Kinerja</h1>
          <p className="text-xs text-slate-500 mt-1">Statistik jarak tempuh, efisiensi waktu, dan kepatuhan keselamatan.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5">
            <span className="text-xs text-slate-500 font-semibold">Total Perjalanan</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-1">{driverStatus.tripsToday}</div>
            <span className="text-[11px] text-emerald-600 font-medium">100% selesai tepat waktu</span>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5">
            <span className="text-xs text-slate-500 font-semibold">Total Jarak Tempuh</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-1">{driverStatus.distanceTodayKm} km</div>
            <span className="text-[11px] text-slate-500">Dalam area perimeter istana</span>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5">
            <span className="text-xs text-slate-500 font-semibold">Indeks Kepuasan</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-1">★ {driverStatus.ratingToday}</div>
            <span className="text-[11px] text-amber-600 font-medium">Standar layanan prima</span>
          </div>
        </div>
      </div>
    );
  }

  // Driver: Profil & dokumen
  if (activeRole === 'driver' && activeTab === 'profil_driver') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Profil & Kelayakan Dokumen</h1>
          <p className="text-xs text-slate-500 mt-1">Verifikasi SIM C Kedinasan, izin operasional kendaraan, dan perlengkapan safety.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white font-extrabold text-xl flex items-center justify-center">
              BS
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Bima Saputra</h2>
              <p className="text-xs text-slate-500">Pengemudi Resmi Armada Ojek Online Istana</p>
              <div className="mt-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block">
                ● Status Aktif & Terverifikasi
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 space-y-2">
              <div className="font-bold text-slate-900">Data Armada Kendaraan</div>
              <div className="flex justify-between"><span>Unit Model:</span><strong className="text-slate-800">Honda Vario 160</strong></div>
              <div className="flex justify-between"><span>Nomor Registrasi:</span><strong className="text-slate-800">DEMO 024</strong></div>
              <div className="flex justify-between"><span>Kesiapan Helm:</span><strong className="text-emerald-700">2 Unit SNI Tersedia</strong></div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 space-y-2">
              <div className="font-bold text-slate-900">Dokumen Kedinasan</div>
              <div className="flex justify-between"><span>SIM Kedinasan:</span><strong className="text-emerald-700">Aktif (s.d 2028)</strong></div>
              <div className="flex justify-between"><span>Sertifikat Defensive:</span><strong className="text-emerald-700">Lulus Uji</strong></div>
              <div className="flex justify-between"><span>Pemeriksaan Medis:</span><strong className="text-emerald-700">Sehat Prima</strong></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin sub-views
  if (activeRole === 'admin') {
    if (activeTab === 'perjalanan_admin') {
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-extrabold text-slate-900">Manajemen Perjalanan Seluruh Armada</h1>
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                  <th className="pb-3">ID Trip</th>
                  <th className="pb-3">Waktu</th>
                  <th className="pb-3">Penumpang</th>
                  <th className="pb-3">Pengemudi</th>
                  <th className="pb-3">Rute</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[...allTrips, ...completedTrips].map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="py-3 font-mono font-bold">{t.id}</td>
                    <td className="py-3 text-slate-500">{t.orderTime}</td>
                    <td className="py-3 font-medium text-slate-800">{t.passengerName}</td>
                    <td className="py-3 text-slate-600">{t.driverName}</td>
                    <td className="py-3 text-slate-700">{t.pickup} → {t.destination}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {t.statusLabel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activeTab === 'persetujuan') {
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-extrabold text-slate-900">Pusat Persetujuan Akses</h1>
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
            <div className="space-y-3">
              {approvals.map((app) => (
                <div key={app.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-slate-900">{app.name} · {app.subtitle}</div>
                    <div className="text-[11px] text-slate-600 mt-1">{app.notes}</div>
                    <div className="text-[10px] text-slate-400 mt-1">{app.date} · {app.departmentOrVehicle}</div>
                  </div>
                  <div>
                    {app.status === 'pending' ? (
                      <button
                        onClick={() => handleApproval(app.id, 'approve')}
                        className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-500 transition"
                      >
                        Setujui
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                        Disetujui
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'pengguna_admin') {
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-extrabold text-slate-900">Direktori Pengguna Terotorisasi</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Raka Pradana', role: 'Unit Administrasi', nip: 'PG-DEMO-018', status: 'Aktif' },
              { name: 'Ayu Lestari', role: 'Biro Protokol', nip: 'PG-DEMO-022', status: 'Aktif' },
              { name: 'Arif Wibowo', role: 'Biro Komunikasi & Media', nip: 'PG-DEMO-045', status: 'Aktif' },
              { name: 'Dina Permata', role: 'Sekretariat Militer', nip: 'PG-DEMO-088', status: 'Aktif' },
            ].map((u, i) => (
              <div key={i} className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-slate-900">{u.name}</div>
                  <div className="text-[11px] text-slate-500">{u.role} · {u.nip}</div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {u.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === 'driver_admin') {
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-extrabold text-slate-900">Status Armada & Pengemudi</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Bima Saputra', plate: 'DEMO 024', vehicle: 'Honda Vario Hitam', status: 'Online · Bertugas' },
              { name: 'Dedi Santoso', plate: 'DEMO 012', vehicle: 'Honda Vario Putih', status: 'Online · Bertugas' },
              { name: 'Fajar Hidayat', plate: 'DEMO 019', vehicle: 'Yamaha Aerox', status: 'Online · Standby' },
              { name: 'Yusuf Ramadhan', plate: 'DEMO 008', vehicle: 'Honda PCX', status: 'Online · Bertugas' },
            ].map((d, i) => (
              <div key={i} className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-slate-900">{d.name} ({d.plate})</div>
                  <div className="text-[11px] text-slate-500">{d.vehicle}</div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === 'laporan') {
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-extrabold text-slate-900">Laporan & Analitik Mobilitas</h1>
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
            <p className="text-xs text-slate-600">
              Laporan berkala mobilitas kendaraan internal mencakup penggunaan armada, konsumsi energi kendaraan listrik, dan kepatuhan waktu penjemputan.
            </p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-xs text-slate-900">Rekapitulasi Operasional Oktober 2026</div>
                <div className="text-[11px] text-slate-500">Total 1.240 perjalanan kedinasan terlaksana</div>
              </div>
              <button className="px-3 py-1.5 bg-[#102238] text-white rounded-lg text-xs font-bold hover:bg-slate-800">
                Unduh PDF
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  return null;
};
