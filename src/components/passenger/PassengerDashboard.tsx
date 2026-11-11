import React, { useState } from 'react';
import {
  ShieldCheck,
  Calendar,
  Clock,
  ArrowRight,
  MessageSquare,
  Phone,
  CheckCircle2,
  ChevronRight,
  Shield,
  Bike,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { InteractiveMap } from '../common/InteractiveMap';

export const PassengerDashboard: React.FC = () => {
  const { activeTrip, completedTrips, scheduledTrips, bookNewTrip, setActiveModal, setModalPayload } = useApp();

  const [bookingMode, setBookingMode] = useState<'sekarang' | 'jadwalkan'>('jadwalkan');
  const [pickupLocation, setPickupLocation] = useState('Gedung B · Area pertemuan');
  const [destinationLocation, setDestinationLocation] = useState('Gedung C · Area administrasi');
  const [scheduleDateTime, setScheduleDateTime] = useState('Hari ini, 22 Okt 2026 · 13.00 WIB');
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    bookNewTrip(pickupLocation, destinationLocation, bookingMode === 'jadwalkan', scheduleDateTime);
    setIsBookingSuccess(true);
    setTimeout(() => setIsBookingSuccess(false), 3000);
  };

  const handleOpenContact = (type: 'message' | 'call') => {
    setModalPayload({
      type,
      targetName: activeTrip?.driverName || 'Bima Saputra',
      targetRole: 'Driver OOI',
      phone: activeTrip?.driverPhone || '0813-9876-5432',
    });
    setActiveModal(type === 'message' ? 'message_modal' : 'call_modal');
  };

  return (
    <div className="space-y-6">
      {/* Title & Greeting Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-bold text-amber-600 tracking-wider uppercase mb-1">
            MOBILITAS KEDINASAN
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Selamat pagi, Pak Raka.
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Perjalanan lebih ringkas, aktivitas tetap lancar.
          </p>
        </div>

        <div className="self-start sm:self-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Akses terotorisasi</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Approx 62-65% width) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          {/* Card 1: Booking Form */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-6">
            <div className="mb-4">
              <h2 className="text-base font-bold text-slate-900">Pesan perjalanan</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Transportasi untuk keperluan kedinasan Anda.
              </p>
            </div>

            {/* Segmented Switcher */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-4 border border-slate-200/70">
              <button
                type="button"
                onClick={() => setBookingMode('sekarang')}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  bookingMode === 'sekarang'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Sekarang
              </button>
              <button
                type="button"
                onClick={() => setBookingMode('jadwalkan')}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  bookingMode === 'jadwalkan'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Jadwalkan
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleBooking} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pickup Dropdown */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1.5">
                    Titik jemput
                  </label>
                  <div className="relative">
                    <select
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full pl-3 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    >
                      <option value="Gedung B · Area pertemuan">Gedung B · Area pertemuan</option>
                      <option value="Lobi A · Area administrasi">Lobi A · Area administrasi</option>
                      <option value="Gedung C · Area administrasi">Gedung C · Area administrasi</option>
                      <option value="Wisma Tamu · Sayap Barat">Wisma Tamu · Sayap Barat</option>
                    </select>
                  </div>
                </div>

                {/* Destination Dropdown */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1.5">
                    Tujuan
                  </label>
                  <div className="relative">
                    <select
                      value={destinationLocation}
                      onChange={(e) => setDestinationLocation(e.target.value)}
                      className="w-full pl-3 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    >
                      <option value="Gedung C · Area administrasi">Gedung C · Area administrasi</option>
                      <option value="Gedung B · Area pertemuan">Gedung B · Area pertemuan</option>
                      <option value="Lobi A · Area administrasi">Lobi A · Area administrasi</option>
                      <option value="Pusat Konferensi Utama">Pusat Konferensi Utama</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Date & Time (for Jadwalkan) */}
              {bookingMode === 'jadwalkan' && (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1.5">
                    Waktu penjemputan
                  </label>
                  <div className="relative">
                    <select
                      value={scheduleDateTime}
                      onChange={(e) => setScheduleDateTime(e.target.value)}
                      className="w-full pl-3 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    >
                      <option value="Hari ini, 22 Okt 2026 · 13.00 WIB">Hari ini, 22 Okt 2026 · 13.00 WIB</option>
                      <option value="Hari ini, 22 Okt 2026 · 14.30 WIB">Hari ini, 22 Okt 2026 · 14.30 WIB</option>
                      <option value="Hari ini, 22 Okt 2026 · 16.00 WIB">Hari ini, 22 Okt 2026 · 16.00 WIB</option>
                      <option value="Besok, 23 Okt 2026 · 08.30 WIB">Besok, 23 Okt 2026 · 08.30 WIB</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Bottom bar with Status & Action */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Akses perjalanan Anda aktif</span>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#102238] hover:bg-[#1a3455] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{bookingMode === 'jadwalkan' ? 'Jadwalkan perjalanan' : 'Pesan sekarang'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {isBookingSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Permohonan perjalanan berhasil diajukan ke sistem operasional!</span>
                </div>
              )}
            </form>
          </div>

          {/* Card 2: Interactive Route Map */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Rute perjalanan aktif</h2>
              <button
                onClick={() => setActiveModal('map_fullscreen')}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
              >
                <span>Perbesar peta</span>
                <span>→</span>
              </button>
            </div>

            <InteractiveMap heightClass="h-64 sm:h-72" />
          </div>

          {/* Card 3: Recent Trips */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">Perjalanan terakhir</h2>
              <button
                onClick={() => setActiveModal('trip_history')}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <span>Riwayat</span>
                <span>→</span>
              </button>
            </div>

            <div className="space-y-3">
              {completedTrips.slice(0, 2).map((trip) => (
                <div
                  key={trip.id}
                  className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {trip.pickup.split('·')[0].trim()} → {trip.destination.split('·')[0].trim()}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {trip.fullDateTime.split('·')[0]?.trim() || 'Hari ini'} · {trip.orderTime} · {trip.driverName}
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full">
                    ● Selesai
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Approx 35-38% width) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-5">
          {/* Active Trip Widget (Perjalanan Aktif) */}
          {activeTrip ? (
            <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs">
              {/* Dark Navy Header */}
              <div className="bg-[#102238] text-white p-5">
                <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                  <span className="tracking-wider uppercase text-[11px] font-bold text-slate-400">
                    PERJALANAN AKTIF
                  </span>
                  <span className="font-mono text-slate-400 font-semibold">{activeTrip.id}</span>
                </div>
                <h3 className="text-xl font-bold tracking-tight mt-1">
                  {activeTrip.status === 'arrived'
                    ? 'Driver telah tiba di lobi'
                    : activeTrip.status === 'in_progress'
                    ? 'Perjalanan sedang berlangsung'
                    : 'Driver menuju titik jemput'}
                </h3>
                <div className="text-xs text-slate-300 mt-1 flex items-center gap-1.5 font-medium">
                  <span className="text-xl font-bold text-white">{activeTrip.etaMinutes}</span>
                  <span>menit · tiba {activeTrip.orderTime}</span>
                </div>

                {/* Progress bar */}
                <div className="mt-4 pt-1">
                  <div className="grid grid-cols-3 gap-1.5 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="bg-amber-400 rounded-full" />
                    <div className={`rounded-full ${activeTrip.status !== 'assigned' ? 'bg-amber-400' : 'bg-slate-700'}`} />
                    <div className={`rounded-full ${activeTrip.status === 'in_progress' ? 'bg-amber-400' : 'bg-slate-700'}`} />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5 font-medium">
                    <span>Driver ditugaskan</span>
                    <span>Penjemputan</span>
                  </div>
                </div>
              </div>

              {/* Trip details inside card */}
              <div className="p-5 space-y-4">
                {/* Driver Profile */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-800 font-bold text-sm flex items-center justify-center border border-slate-300 shrink-0">
                    {activeTrip.driverInitials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{activeTrip.driverName}</div>
                    <div className="text-xs text-slate-500">
                      Driver terverifikasi · ★ {activeTrip.driverRating}
                    </div>
                  </div>
                </div>

                {/* Vehicle Card */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700">
                    <Bike className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{activeTrip.driverVehicle}</div>
                    <div className="text-[11px] text-slate-500">{activeTrip.driverPlate}</div>
                  </div>
                </div>

                {/* Pickup & Destination Nodes */}
                <div className="space-y-2 text-xs pt-1">
                  <div className="flex items-start gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-900 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        TITIK JEMPUT
                      </div>
                      <div className="font-semibold text-slate-900">{activeTrip.pickup} · {activeTrip.pickupDetail}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-sm bg-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        TUJUAN
                      </div>
                      <div className="font-semibold text-slate-900">{activeTrip.destination} · {activeTrip.destinationDetail}</div>
                    </div>
                  </div>
                </div>

                {/* Pickup PIN Verification Card (Golden/Amber) */}
                <div className="p-4 rounded-xl bg-[#FFF9EB] border border-[#FDE6B0] text-center">
                  <div className="text-[11px] font-semibold text-amber-900 mb-1">
                    Kode penjemputan
                  </div>
                  <div className="text-3xl font-extrabold text-[#78350F] tracking-widest font-mono py-1">
                    {activeTrip.pickupCode}
                  </div>
                  <p className="text-[11px] text-amber-800/80 mt-1">
                    Berikan kode hanya kepada driver saat Anda sudah bertemu.
                  </p>
                </div>

                {/* Action Buttons: Chat & Call */}
                <div className="grid grid-cols-2 gap-2 pt-1">
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

                <div className="text-center pt-1">
                  <button
                    onClick={() => setActiveModal('help_operator')}
                    className="text-[11px] text-slate-500 hover:text-slate-800 underline"
                  >
                    Kendala penjemputan? Hubungi operator
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
                <Bike className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">Tidak ada perjalanan aktif</h3>
              <p className="text-xs text-slate-500">
                Anda dapat memesan perjalanan baru melalui formulir pemesanan di samping.
              </p>
            </div>
          )}

          {/* Next Schedule Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Jadwal berikutnya</h3>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-emerald-50 border border-emerald-200/80 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[9px] font-bold text-emerald-700 tracking-wider">OKT</span>
                  <span className="text-base font-extrabold text-emerald-900 leading-none">22</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {scheduledTrips[0]?.orderTime || '14.30 WIB'} · Hari ini
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {scheduledTrips[0] ? `${scheduledTrips[0].pickup} → ${scheduledTrips[0].destination}` : 'Gedung C → Lobi A'}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-[11px] text-slate-400 mt-2.5">
              Driver ditugaskan mendekati waktu jemput.
            </p>
          </div>

          {/* Safety Reminder */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-950">
              <div className="font-bold mb-0.5">Aman di setiap perjalanan</div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Cocokkan identitas driver dan gunakan helm sebelum berangkat.
              </p>
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
