import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  Lock,
  Unlock,
  MessageSquare,
  Phone,
  ShieldCheck,
  Clock,
  ArrowRight,
  Bike,
  Sparkles,
  AlertTriangle,
  ArrowUpRight,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { InteractiveMap } from '../common/InteractiveMap';

export const DriverDashboard: React.FC = () => {
  const {
    activeTrip,
    driverStatus,
    setDriverStatus,
    markDriverArrived,
    startTripWithPin,
    completeTrip,
    setActiveModal,
    setModalPayload,
  } = useApp();

  const [pinDigits, setPinDigits] = useState(['', '', '', '']);
  const [pinError, setPinError] = useState<string | null>(null);
  const [pinSuccess, setPinSuccess] = useState<string | null>(null);

  const handleDigitChange = (index: number, val: string) => {
    const digit = val.slice(-1).replace(/\D/g, '');
    const newDigits = [...pinDigits];
    newDigits[index] = digit;
    setPinDigits(newDigits);
    setPinError(null);

    // Auto advance to next input
    if (digit && index < 3) {
      const nextInput = document.getElementById(`pin-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pinDigits[index] && index > 0) {
      const prevInput = document.getElementById(`pin-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const fullPin = pinDigits.join('');
  const isPinComplete = fullPin.length === 4;

  const handleStartTrip = () => {
    if (!activeTrip) return;
    const result = startTripWithPin(fullPin);
    if (result.success) {
      setPinSuccess(result.message);
      setPinError(null);
    } else {
      setPinError(result.message);
    }
  };

  const handleQuickFillPin = () => {
    if (activeTrip?.pickupCode) {
      const digits = activeTrip.pickupCode.split('');
      setPinDigits(digits);
      setPinError(null);
    }
  };

  const handleOpenContact = (type: 'message' | 'call') => {
    setModalPayload({
      type,
      targetName: activeTrip?.passengerName || 'Raka Pradana',
      targetRole: 'Penumpang Kedinasan',
      phone: activeTrip?.passengerPhone || '0812-3456-7890',
    });
    setActiveModal(type === 'message' ? 'message_modal' : 'call_modal');
  };

  return (
    <div className="space-y-6">
      {/* Title & Greeting Banner */}
      <div>
        <div className="text-[11px] font-bold text-amber-600 tracking-wider uppercase mb-1">
          RUANG PENGEMUDI
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Selamat bertugas, Pak Bima.
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Satu perjalanan, satu tanggung jawab. Utamakan keselamatan dan ketepatan waktu.
        </p>
      </div>

      {/* Driver Online Shift Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Toggle Switch */}
          <button
            type="button"
            onClick={() => setDriverStatus(prev => ({ ...prev, isOnline: !prev.isOnline }))}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
              driverStatus.isOnline ? 'bg-emerald-600' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform absolute top-0.5 ${
                driverStatus.isOnline ? 'left-6.5' : 'left-0.5'
              }`}
            />
          </button>
          <div>
            <div className="text-xs font-bold text-slate-900">
              {driverStatus.isOnline
                ? activeTrip
                  ? 'Online · Dalam penugasan'
                  : 'Online · Siap menerima tugas'
                : 'Offline · Istirahat'}
            </div>
            <div className="text-[11px] text-slate-500">
              {activeTrip ? 'Permintaan baru dijeda hingga tugas selesai.' : 'Menunggu penugasan dari pusat operasional.'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-full self-start sm:self-center">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{driverStatus.shiftName} · {driverStatus.shiftHours}</span>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Active Task & Map) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          {/* Active Task Card */}
          {activeTrip ? (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    TUGAS AKTIF · {activeTrip.id}
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    {activeTrip.status === 'arrived'
                      ? 'Tiba di lokasi penjemputan'
                      : activeTrip.status === 'in_progress'
                      ? 'Perjalanan sedang berlangsung'
                      : 'Menuju titik jemput'}
                  </h2>
                </div>

                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full">
                  ● {activeTrip.status === 'arrived' ? 'Tiba' : activeTrip.status === 'in_progress' ? 'Berjalan' : 'Ditugaskan'}
                </span>
              </div>

              {/* Gold/Cream Banner */}
              <div className="p-3.5 rounded-xl bg-[#FFF9EB] border border-[#FDE6B0] flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-amber-900 uppercase">JEMPUT HARI INI</div>
                  <div className="text-sm font-extrabold text-amber-950">{activeTrip.orderTime}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold text-amber-950">{activeTrip.etaMinutes} menit</div>
                  <div className="text-[10px] text-amber-900 font-medium">ke titik penjemputan</div>
                </div>
              </div>

              {/* Route Details */}
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      TITIK JEMPUT
                    </div>
                    <div className="font-bold text-slate-900">{activeTrip.pickup} · {activeTrip.pickupDetail}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-sm bg-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      TUJUAN
                    </div>
                    <div className="font-bold text-slate-900">{activeTrip.destination} · {activeTrip.destinationDetail}</div>
                  </div>
                </div>
              </div>

              {/* Interactive Map */}
              <InteractiveMap heightClass="h-64 sm:h-72" />

              {/* Action Buttons */}
              <div className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setActiveModal('map_fullscreen')}
                    className="py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Compass className="w-4 h-4 text-slate-600" />
                    <span>Buka navigasi rute</span>
                  </button>

                  {activeTrip.status === 'assigned' && (
                    <button
                      onClick={markDriverArrived}
                      className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Check className="w-4 h-4" />
                      <span>Saya sudah tiba</span>
                    </button>
                  )}

                  {activeTrip.status === 'arrived' && (
                    <div className="py-2 px-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Telah tiba di titik jemput</span>
                    </div>
                  )}

                  {activeTrip.status === 'in_progress' && (
                    <button
                      onClick={completeTrip}
                      className="py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Selesaikan perjalanan</span>
                    </button>
                  )}
                </div>

                <div className="text-center">
                  <span className="text-[11px] text-slate-400">
                    {activeTrip.status === 'assigned'
                      ? 'Tandai kedatangan setelah berada di titik jemput yang disepakati.'
                      : activeTrip.status === 'arrived'
                      ? 'Minta kode verifikasi dari penumpang untuk memulai perjalanan.'
                      : 'Pastikan penumpang turun di lobi tujuan dengan selamat.'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
                <Bike className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Tidak ada tugas perjalanan aktif</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Anda sedang dalam antrean prioritas. Sistem operasional akan segera mengirimkan penugasan baru.
              </p>
            </div>
          )}
        </div>

        {/* Right Column (Passenger, PIN Verification, Safety) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-5">
          {/* Passenger Details Card */}
          {activeTrip && (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Penumpang Anda</h3>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-800 font-bold text-sm flex items-center justify-center border border-slate-300 shrink-0">
                  {activeTrip.passengerInitials}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{activeTrip.passengerName}</div>
                  <div className="text-xs text-slate-500">
                    {activeTrip.passengerDept} · {activeTrip.passengerEmployeeId}
                  </div>
                </div>
              </div>

              {/* Active Passenger Access Badge */}
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/70 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950">
                  <div className="font-bold mb-0.5">Akses penumpang aktif</div>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    Identitas dan izin perjalanan telah diverifikasi oleh sistem.
                  </p>
                </div>
              </div>

              {/* Action Buttons: Message & Call */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleOpenContact('message')}
                  className="py-2.5 bg-[#102238] hover:bg-[#1a3455] text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Pesan</span>
                </button>
                <button
                  onClick={() => handleOpenContact('call')}
                  className="py-2.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-600" />
                  <span>Telepon</span>
                </button>
              </div>

              {/* PIN Verification Section */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-xs font-bold text-slate-900">Verifikasi saat bertemu</h4>
                  <button
                    type="button"
                    onClick={handleQuickFillPin}
                    className="text-[10px] text-blue-600 font-semibold hover:underline"
                  >
                    Gunakan PIN Penumpang ({activeTrip.pickupCode})
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mb-3">
                  Minta 4 digit kode dari penumpang. Jangan mulai perjalanan sebelum kode cocok.
                </p>

                {/* 4 Digit PIN Inputs */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  {[0, 1, 2, 3].map((idx) => (
                    <input
                      key={idx}
                      id={`pin-input-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={pinDigits[idx]}
                      onChange={(e) => handleDigitChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      disabled={activeTrip.status === 'in_progress'}
                      className="w-11 h-11 sm:w-12 sm:h-12 text-center text-lg sm:text-xl font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition font-mono disabled:bg-slate-100 disabled:text-slate-400"
                    />
                  ))}
                </div>

                {pinError && (
                  <div className="mb-2 p-2 rounded-lg bg-red-50 text-red-700 text-xs text-center border border-red-200">
                    {pinError}
                  </div>
                )}

                {pinSuccess && (
                  <div className="mb-2 p-2 rounded-lg bg-emerald-50 text-emerald-700 text-xs text-center border border-emerald-200">
                    {pinSuccess}
                  </div>
                )}

                {/* Start Trip Button */}
                {activeTrip.status !== 'in_progress' ? (
                  <button
                    onClick={handleStartTrip}
                    disabled={!isPinComplete}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      isPinComplete
                        ? 'bg-[#102238] hover:bg-[#1a3455] text-white shadow-xs cursor-pointer'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Mulai perjalanan</span>
                  </button>
                ) : (
                  <div className="w-full py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold text-center flex items-center justify-center gap-1.5">
                    <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Perjalanan sedang berlangsung</span>
                  </div>
                )}

                <div className="text-center text-[10px] text-slate-400 mt-2">
                  Aktif setelah tiba dan kode terverifikasi
                </div>
              </div>

              {/* Safety First Card */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-950">
                <div className="font-bold mb-0.5 text-amber-900">Keselamatan diutamakan</div>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Pastikan penumpang mengenakan helm. Ikuti rute dan prosedur akses yang berlaku.
                </p>
              </div>
            </div>
          )}

          {/* Daily Service Readiness Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Kesiapan layanan</h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold text-slate-800">Kendaraan & 2 helm</div>
                  <div className="text-[11px] text-slate-500">Pemeriksaan 06.50 · Lengkap</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold text-slate-800">Dokumen driver</div>
                  <div className="text-[11px] text-slate-500">Terverifikasi · Aktif</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <div className="font-bold text-slate-800">Jeda terjadwal</div>
                  <div className="text-[11px] text-slate-500">{driverStatus.nextBreak}</div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => setActiveModal('help_operator')}
                className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:underline"
              >
                <span>Hubungi pusat operasional</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Activities Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900">Aktivitas hari ini</h3>
            <button
              onClick={() => setActiveModal('trip_history')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
            >
              <span>Lihat semua</span>
              <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-5 border-b border-slate-100 mb-4">
            <div>
              <div className="text-2xl font-extrabold text-slate-900">{driverStatus.tripsToday}</div>
              <div className="text-xs text-slate-500">Perjalanan selesai</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-slate-900">{driverStatus.distanceTodayKm.toString().replace('.', ',')} km</div>
              <div className="text-xs text-slate-500">Jarak tempuh</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-slate-900">{driverStatus.ratingToday.toString().replace('.', ',')}</div>
              <div className="text-xs text-slate-500">Rating layanan</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-slate-600">08.55</span>
                <div>
                  <div className="text-xs font-bold text-slate-900">Gedung C → Lobi A</div>
                  <div className="text-[11px] text-slate-500">Sinta Maharani</div>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                ● Selesai
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-slate-600">08.20</span>
                <div>
                  <div className="text-xs font-bold text-slate-900">Lobi A → Gedung B</div>
                  <div className="text-[11px] text-slate-500">Ayu Lestari</div>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                ● Selesai
              </span>
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
