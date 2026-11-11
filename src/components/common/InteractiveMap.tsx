import React, { useState } from 'react';
import { Bike, Layers, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface InteractiveMapProps {
  onExpand?: () => void;
  heightClass?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onExpand, heightClass = 'h-64 sm:h-72' }) => {
  const { activeTrip } = useApp();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // Status-based bike positioning on path
  // Coordinates along path:
  // Path starts at Lobi A (180, 220), goes up to (180, 160), across to (580, 160), up to Gedung B (580, 130)
  // Total length approx 40 + 400 + 30 = 470px
  let bikeX = 340;
  let bikeY = 160;

  if (activeTrip?.status === 'assigned') {
    bikeX = 360;
    bikeY = 160;
  } else if (activeTrip?.status === 'arrived') {
    bikeX = 180;
    bikeY = 190;
  } else if (activeTrip?.status === 'in_progress') {
    bikeX = 460;
    bikeY = 160;
  } else if (activeTrip?.status === 'completed') {
    bikeX = 580;
    bikeY = 140;
  }

  return (
    <div className={`relative w-full ${heightClass} rounded-2xl bg-[#F6F8FA] border border-slate-200/90 overflow-hidden select-none`}>
      {/* Top Left Simulation Badge */}
      <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 z-10 flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-md bg-white/95 border border-slate-200/80 shadow-xs text-[11px] sm:text-xs font-medium text-slate-700">
        <Layers className="w-3.5 h-3.5 text-slate-500" />
        <span>Zona layanan · simulasi</span>
      </div>

      {/* Top Right Map Control (Expand) */}
      {onExpand && (
        <button
          onClick={onExpand}
          className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 z-10 text-[11px] sm:text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white/95 border border-slate-200/80 px-2 sm:px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1 cursor-pointer"
        >
          <span>Perbesar</span>
          <span>→</span>
        </button>
      )}

      {/* Fully Responsive Vector Canvas with viewBox */}
      <svg
        viewBox="0 0 760 320"
        className="w-full h-full object-contain pointer-events-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="dot-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#CBD5E1" opacity="0.6" />
          </pattern>
        </defs>

        {/* Background dotted grid */}
        <rect width="760" height="320" fill="url(#dot-pattern)" />

        {/* Green lawn / central park area */}
        <rect
          x="330"
          y="110"
          width="130"
          height="55"
          rx="18"
          fill="#E0EBE2"
          stroke="#C8DCDB"
          strokeWidth="1.2"
        />

        {/* Campus Buildings (Interactive hotspots) */}
        {/* Building 1: Top Left */}
        <g onClick={() => setSelectedLocation('Wisma Tamu Istana')} className="cursor-pointer">
          <rect x="30" y="45" width="105" height="60" rx="12" fill="#E2E8F0" opacity="0.8" />
        </g>

        {/* Building 2: Top Center */}
        <g onClick={() => setSelectedLocation('Gedung Sekretariat Negara')} className="cursor-pointer">
          <rect x="180" y="30" width="120" height="75" rx="12" fill="#E2E8F0" opacity="0.8" />
        </g>

        {/* Building 3: Mid Center */}
        <g onClick={() => setSelectedLocation('Gedung C')} className="cursor-pointer">
          <rect x="350" y="45" width="105" height="60" rx="12" fill="#E2E8F0" opacity="0.8" />
        </g>

        {/* Building 4: Top Right (Gedung B) */}
        <g onClick={() => setSelectedLocation('Gedung B')} className="cursor-pointer">
          <rect x="520" y="45" width="135" height="85" rx="14" fill="#E2E8F0" opacity="0.85" />
        </g>

        {/* Building 5: Bottom Left */}
        <g onClick={() => setSelectedLocation('Gedung Pengamanan')} className="cursor-pointer">
          <rect x="30" y="210" width="115" height="75" rx="12" fill="#E2E8F0" opacity="0.8" />
        </g>

        {/* Building 6: Bottom Center (Lobi A) */}
        <g onClick={() => setSelectedLocation('Lobi A')} className="cursor-pointer">
          <rect x="190" y="225" width="120" height="65" rx="12" fill="#E2E8F0" opacity="0.85" />
        </g>

        {/* Building 7: Bottom Right-Center */}
        <g onClick={() => setSelectedLocation('Ruang Konferensi')} className="cursor-pointer">
          <rect x="360" y="220" width="95" height="65" rx="12" fill="#E2E8F0" opacity="0.8" />
        </g>

        {/* Building 8: Bottom Right */}
        <g onClick={() => setSelectedLocation('Pusat Logistik')} className="cursor-pointer">
          <rect x="525" y="225" width="125" height="65" rx="12" fill="#E2E8F0" opacity="0.8" />
        </g>

        {/* Main Transit Way Line */}
        <path
          d="M 180 230 L 180 160 L 580 160 L 580 130"
          fill="none"
          stroke="#1E293B"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dotted extension path */}
        <path
          d="M 400 160 L 400 220"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeDasharray="4 4"
        />

        {/* Point A Marker (Lobi A) */}
        <g transform="translate(180, 160)">
          <circle cx="0" cy="0" r="12" fill="#102238" stroke="#FFFFFF" strokeWidth="2" />
          <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">A</text>
          {/* Label pill */}
          <rect x="16" y="-10" width="55" height="20" rx="4" fill="#FFFFFF" opacity="0.95" stroke="#E2E8F0" />
          <text x="43" y="4" textAnchor="middle" fill="#1E293B" fontSize="10" fontWeight="bold">
            {activeTrip?.pickup.split('·')[0].trim() || 'Lobi A'}
          </text>
        </g>

        {/* Point B Marker (Gedung B) */}
        <g transform="translate(580, 130)">
          <circle cx="0" cy="0" r="12" fill="#C28E34" stroke="#FFFFFF" strokeWidth="2" />
          <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">B</text>
          {/* Label pill */}
          <rect x="16" y="-10" width="65" height="20" rx="4" fill="#FFFFFF" opacity="0.95" stroke="#E2E8F0" />
          <text x="48" y="4" textAnchor="middle" fill="#1E293B" fontSize="10" fontWeight="bold">
            {activeTrip?.destination.split('·')[0].trim() || 'Gedung B'}
          </text>
        </g>

        {/* Moving Bike Marker */}
        <g transform={`translate(${bikeX}, ${bikeY})`} className="transition-all duration-700 ease-in-out">
          <circle cx="0" cy="0" r="16" fill="#FFFFFF" stroke="#102238" strokeWidth="2.5" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.15))" />
          {/* Motorcycle Icon SVG */}
          <g transform="translate(-8, -8) scale(0.66)">
            <path
              d="M5.5 17.5A2.5 2.5 0 1 0 5.5 12.5a2.5 2.5 0 0 0 0 5zM18.5 17.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM15 6h-3l-2.5 4.5M12 15l-3-6h-3M18.5 15l-3.5-7h-3"
              fill="none"
              stroke="#102238"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>

      {/* Selected location tooltip if clicked */}
      {selectedLocation && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-30 bg-slate-900 text-white text-[11px] sm:text-xs px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Titik: <strong>{selectedLocation}</strong></span>
          <button onClick={() => setSelectedLocation(null)} className="text-slate-400 hover:text-white ml-2 text-xs">✕</button>
        </div>
      )}

      {/* Bottom Left Metric Badge */}
      <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 z-10 px-2 sm:px-2.5 py-1 rounded-md bg-white/95 border border-slate-200/80 shadow-xs text-[11px] sm:text-xs font-bold text-slate-800">
        {activeTrip ? `${activeTrip.durationMinutes} menit · ${activeTrip.distanceKm.toString().replace('.', ',')} km` : '6 menit · 1,8 km'}
      </div>

      {/* Bottom Right Disclaimer */}
      <div className="absolute bottom-2.5 sm:bottom-3 right-2.5 sm:right-3 z-10 text-[9px] sm:text-[10px] text-slate-400 font-medium">
        Bukan peta operasional
      </div>
    </div>
  );
};
