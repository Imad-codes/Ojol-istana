import React, { createContext, useContext, useState, useEffect } from 'react';
import { Trip, UserProfile, UserRole, ApprovalItem, DriverShiftStatus } from '../types';
import { DEMO_USERS, generatePickupPin } from '../utils/tripLogic';

interface AppContextType {
  currentUser: UserProfile | null;
  activeRole: UserRole | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  login: (role: UserRole, user?: UserProfile) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  
  // Trip management
  activeTrip: Trip | null;
  allTrips: Trip[];
  completedTrips: Trip[];
  scheduledTrips: Trip[];
  
  // Driver interactions
  driverStatus: DriverShiftStatus;
  setDriverStatus: React.Dispatch<React.SetStateAction<DriverShiftStatus>>;
  markDriverArrived: () => void;
  startTripWithPin: (pin: string) => { success: boolean; message: string };
  completeTrip: () => void;
  
  // Passenger interactions
  bookNewTrip: (pickup: string, destination: string, isScheduled: boolean, scheduledTime?: string) => void;
  
  // Admin interactions
  approvals: ApprovalItem[];
  handleApproval: (id: string, action: 'approve' | 'reject') => void;
  
  // Modals & UI helpers
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
  modalPayload: any;
  setModalPayload: (payload: any) => void;
  notificationCount: number;
  clearNotifications: () => void;
  
  // Reset demo
  resetDemoData: () => void;

  // Responsive mobile navigation drawer
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_TRIP: Trip = {
  id: 'OI-1048',
  orderTime: '09.45 WIB',
  fullDateTime: 'Kamis, 22 Okt 2026 · 09.45 WIB',
  passengerId: 'user-001',
  passengerName: 'Raka Pradana',
  passengerInitials: 'RP',
  passengerDept: 'Unit administrasi',
  passengerEmployeeId: 'PG-DEMO-018',
  passengerPhone: '0812-3456-7890',
  
  driverId: 'driver-001',
  driverName: 'Bima Saputra',
  driverInitials: 'BS',
  driverRating: 4.9,
  driverPhone: '0813-9876-5432',
  driverVehicle: 'Honda Vario · Hitam',
  driverPlate: 'DEMO 024 · Helm tersedia',

  pickup: 'Lobi A',
  pickupDetail: 'Area administrasi',
  destination: 'Gedung B',
  destinationDetail: 'Area pertemuan',

  pickupCode: '4826',
  status: 'assigned',
  statusLabel: 'Menuju titik jemput',
  etaMinutes: 4,
  distanceKm: 1.8,
  durationMinutes: 6,
  isScheduled: false,
};

const INITIAL_ALL_TRIPS: Trip[] = [
  INITIAL_TRIP,
  {
    id: 'OI-1047',
    orderTime: '09.38 WIB',
    fullDateTime: 'Kamis, 22 Okt 2026 · 09.38 WIB',
    passengerId: 'user-002',
    passengerName: 'Ayu Lestari',
    passengerInitials: 'AL',
    passengerDept: 'Protokol Istana',
    passengerEmployeeId: 'PG-DEMO-022',
    passengerPhone: '0812-7788-9900',
    driverId: 'driver-002',
    driverName: 'Dedi Santoso',
    driverInitials: 'DS',
    driverRating: 4.8,
    driverPhone: '0813-1122-3344',
    driverVehicle: 'Honda Vario · Putih',
    driverPlate: 'DEMO 012',
    pickup: 'Gedung C',
    pickupDetail: 'Area administrasi',
    destination: 'Lobi A',
    destinationDetail: 'Lobi Utama',
    pickupCode: '3190',
    status: 'in_progress',
    statusLabel: 'Dalam perjalanan',
    etaMinutes: 3,
    distanceKm: 1.4,
    durationMinutes: 5,
    isScheduled: false,
  },
  {
    id: 'OI-1046',
    orderTime: '09.35 WIB',
    fullDateTime: 'Kamis, 22 Okt 2026 · 09.35 WIB',
    passengerId: 'user-003',
    passengerName: 'Arif Wibowo',
    passengerInitials: 'AW',
    passengerDept: 'Biro Komunikasi & Media',
    passengerEmployeeId: 'PG-DEMO-045',
    passengerPhone: '0812-4455-6677',
    driverId: 'driver-003',
    driverName: 'Fajar Hidayat',
    driverInitials: 'FH',
    driverRating: 4.9,
    driverPhone: '0813-5566-7788',
    driverVehicle: 'Yamaha Aerox · Abu-abu',
    driverPlate: 'DEMO 019',
    pickup: 'Lobi A',
    pickupDetail: 'Area pers',
    destination: 'Gedung C',
    destinationDetail: 'Gedung Kominfo',
    pickupCode: '7251',
    status: 'in_progress',
    statusLabel: 'Dalam perjalanan',
    etaMinutes: 5,
    distanceKm: 2.1,
    durationMinutes: 7,
    isScheduled: false,
  },
  {
    id: 'OI-1045',
    orderTime: '09.32 WIB',
    fullDateTime: 'Kamis, 22 Okt 2026 · 09.32 WIB',
    passengerId: 'user-004',
    passengerName: 'Dina Permata',
    passengerInitials: 'DP',
    passengerDept: 'Sekretariat Militer',
    passengerEmployeeId: 'PG-DEMO-088',
    passengerPhone: '0812-9988-7766',
    driverId: 'driver-004',
    driverName: 'Yusuf Ramadhan',
    driverInitials: 'YR',
    driverRating: 4.7,
    driverPhone: '0813-8877-6655',
    driverVehicle: 'Honda PCX · Hitam',
    driverPlate: 'DEMO 008',
    pickup: 'Gedung B',
    pickupDetail: 'Area pertemuan',
    destination: 'Lobi A',
    destinationDetail: 'Area administrasi',
    pickupCode: '6142',
    status: 'in_progress',
    statusLabel: 'Dalam perjalanan',
    etaMinutes: 2,
    distanceKm: 1.2,
    durationMinutes: 4,
    isScheduled: false,
  },
  {
    id: 'OI-1044',
    orderTime: '09.30 WIB',
    fullDateTime: 'Kamis, 22 Okt 2026 · 09.30 WIB',
    passengerId: 'user-005',
    passengerName: 'Sinta Maharani',
    passengerInitials: 'SM',
    passengerDept: 'Bagian Logistik',
    passengerEmployeeId: 'PG-DEMO-031',
    passengerPhone: '0812-2233-4411',
    driverId: 'driver-005',
    driverName: 'Andi Wijaya',
    driverInitials: 'AW',
    driverRating: 4.9,
    driverPhone: '0813-2211-4433',
    driverVehicle: 'Honda Vario · Merah',
    driverPlate: 'DEMO 033',
    pickup: 'Lobi A',
    pickupDetail: 'Gudang inventaris',
    destination: 'Gedung B',
    destinationDetail: 'Ruang transit',
    pickupCode: '8520',
    status: 'assigned',
    statusLabel: 'Menunggu jemput',
    etaMinutes: 6,
    distanceKm: 1.5,
    durationMinutes: 5,
    isScheduled: false,
  },
];

const INITIAL_COMPLETED_TRIPS: Trip[] = [
  {
    id: 'OI-1042',
    orderTime: '08.55 WIB',
    fullDateTime: 'Hari ini · 08.55 WIB',
    passengerId: 'user-005',
    passengerName: 'Sinta Maharani',
    passengerInitials: 'SM',
    passengerDept: 'Bagian Logistik',
    passengerEmployeeId: 'PG-DEMO-031',
    passengerPhone: '0812-2233-4411',
    driverId: 'driver-001',
    driverName: 'Bima Saputra',
    driverInitials: 'BS',
    driverRating: 4.9,
    driverPhone: '0813-9876-5432',
    driverVehicle: 'Honda Vario · Hitam',
    driverPlate: 'DEMO 024',
    pickup: 'Gedung C',
    pickupDetail: 'Pintu Timur',
    destination: 'Lobi A',
    destinationDetail: 'Lobi Utama',
    pickupCode: '1122',
    status: 'completed',
    statusLabel: 'Selesai',
    etaMinutes: 0,
    distanceKm: 1.9,
    durationMinutes: 7,
    isScheduled: false,
    completedAt: '09.02 WIB',
  },
  {
    id: 'OI-1039',
    orderTime: '08.20 WIB',
    fullDateTime: 'Hari ini · 08.20 WIB',
    passengerId: 'user-002',
    passengerName: 'Ayu Lestari',
    passengerInitials: 'AL',
    passengerDept: 'Protokol Istana',
    passengerEmployeeId: 'PG-DEMO-022',
    passengerPhone: '0812-7788-9900',
    driverId: 'driver-001',
    driverName: 'Bima Saputra',
    driverInitials: 'BS',
    driverRating: 4.9,
    driverPhone: '0813-9876-5432',
    driverVehicle: 'Honda Vario · Hitam',
    driverPlate: 'DEMO 024',
    pickup: 'Lobi A',
    pickupDetail: 'Area administrasi',
    destination: 'Gedung B',
    destinationDetail: 'Ruang Rapat VIP',
    pickupCode: '9843',
    status: 'completed',
    statusLabel: 'Selesai',
    etaMinutes: 0,
    distanceKm: 1.8,
    durationMinutes: 6,
    isScheduled: false,
    completedAt: '08.26 WIB',
  },
  {
    id: 'OI-1031',
    orderTime: '16.20 WIB',
    fullDateTime: 'Kemarin · 16.20 WIB',
    passengerId: 'user-001',
    passengerName: 'Raka Pradana',
    passengerInitials: 'RP',
    passengerDept: 'Unit administrasi',
    passengerEmployeeId: 'PG-DEMO-018',
    passengerPhone: '0812-3456-7890',
    driverId: 'driver-001',
    driverName: 'Bima Saputra',
    driverInitials: 'BS',
    driverRating: 4.9,
    driverPhone: '0813-9876-5432',
    driverVehicle: 'Honda Vario · Hitam',
    driverPlate: 'DEMO 024',
    pickup: 'Gedung B',
    pickupDetail: 'Area pertemuan',
    destination: 'Lobi A',
    destinationDetail: 'Area administrasi',
    pickupCode: '5561',
    status: 'completed',
    statusLabel: 'Selesai',
    etaMinutes: 0,
    distanceKm: 1.8,
    durationMinutes: 6,
    isScheduled: false,
    completedAt: '16.26 WIB',
  },
];

const INITIAL_SCHEDULED_TRIPS: Trip[] = [
  {
    id: 'OI-1055',
    orderTime: '14.30 WIB',
    fullDateTime: 'Kamis, 22 Okt 2026 · 14.30 WIB',
    passengerId: 'user-001',
    passengerName: 'Raka Pradana',
    passengerInitials: 'RP',
    passengerDept: 'Unit administrasi',
    passengerEmployeeId: 'PG-DEMO-018',
    passengerPhone: '0812-3456-7890',
    driverId: 'driver-pending',
    driverName: 'Belum Ditugaskan',
    driverInitials: '--',
    driverRating: 5.0,
    driverPhone: '-',
    driverVehicle: 'Motor Listrik Operasional',
    driverPlate: 'DEMO TBD',
    pickup: 'Gedung C',
    pickupDetail: 'Area administrasi',
    destination: 'Lobi A',
    destinationDetail: 'Area lobi',
    pickupCode: '9012',
    status: 'assigned',
    statusLabel: 'Terjadwal',
    etaMinutes: 8,
    distanceKm: 1.6,
    durationMinutes: 6,
    isScheduled: true,
  },
];

const INITIAL_APPROVALS: ApprovalItem[] = [
  {
    id: 'app-01',
    name: 'Maya Kusuma',
    initials: 'MK',
    roleType: 'pengguna',
    subtitle: 'Pengguna · Unit administrasi',
    status: 'pending',
    date: 'Hari ini · 09.15 WIB',
    departmentOrVehicle: 'Unit Administrasi & Kepegawaian',
    notes: 'Permohonan otorisasi akses mobilitas kedinasan untuk penugasan antar gedung kementerian.',
  },
  {
    id: 'app-02',
    name: 'Rizki Firmansyah',
    initials: 'RF',
    roleType: 'driver',
    subtitle: 'Driver · Dokumen diperbarui',
    status: 'pending',
    date: 'Hari ini · 08.40 WIB',
    departmentOrVehicle: 'Honda Vario 160 (B 4910 PKO)',
    notes: 'Pembaruan masa berlaku SIM C Kedinasan dan hasil uji emisi kendaraan per Oktober 2026.',
  },
  {
    id: 'app-03',
    name: 'Hendra Gunawan',
    initials: 'HG',
    roleType: 'pengguna',
    subtitle: 'Pengguna · Protokol Kepresidenan',
    status: 'pending',
    date: 'Kemarin · 15.10 WIB',
    departmentOrVehicle: 'Bagian Protokol Acara Kenegaraan',
    notes: 'Pengajuan akses prioritas pengawalan & shuttle cepat antar wisma tamu istana.',
  },
  {
    id: 'app-04',
    name: 'Dewi Kartika',
    initials: 'DK',
    roleType: 'pengguna',
    subtitle: 'Pengguna · Sekretariat Militer',
    status: 'pending',
    date: 'Kemarin · 14.20 WIB',
    departmentOrVehicle: 'Biro Pengamanan Objek Khusus',
    notes: 'Pembaruan kartu dinas staf dan sertifikat kelayakan mobilitas internal.',
  },
  {
    id: 'app-05',
    name: 'Agus Salim',
    initials: 'AS',
    roleType: 'driver',
    subtitle: 'Driver · Sertifikasi Berkendara',
    status: 'pending',
    date: '21 Okt 2026',
    departmentOrVehicle: 'Yamaha NMAX (B 3021 PKS)',
    notes: 'Pengajuan kembali sertifikat defensive riding dan tes kesehatan berkala pengemudi.',
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('ooi_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeRole, setActiveRole] = useState<UserRole | null>(() => {
    const saved = localStorage.getItem('ooi_active_role');
    return saved ? (saved as UserRole) : null;
  });

  const [activeTab, setActiveTab] = useState<string>('beranda');

  const [activeTrip, setActiveTrip] = useState<Trip | null>(() => {
    const saved = localStorage.getItem('ooi_active_trip');
    return saved ? JSON.parse(saved) : INITIAL_TRIP;
  });

  const [allTrips, setAllTrips] = useState<Trip[]>(() => {
    const saved = localStorage.getItem('ooi_all_trips');
    return saved ? JSON.parse(saved) : INITIAL_ALL_TRIPS;
  });

  const [completedTrips, setCompletedTrips] = useState<Trip[]>(() => {
    const saved = localStorage.getItem('ooi_completed_trips');
    return saved ? JSON.parse(saved) : INITIAL_COMPLETED_TRIPS;
  });

  const [scheduledTrips, setScheduledTrips] = useState<Trip[]>(() => {
    const saved = localStorage.getItem('ooi_scheduled_trips');
    return saved ? JSON.parse(saved) : INITIAL_SCHEDULED_TRIPS;
  });

  const [approvals, setApprovals] = useState<ApprovalItem[]>(() => {
    const saved = localStorage.getItem('ooi_approvals');
    return saved ? JSON.parse(saved) : INITIAL_APPROVALS;
  });

  const [driverStatus, setDriverStatus] = useState<DriverShiftStatus>({
    isOnline: true,
    isInDuty: true,
    shiftName: 'Shift pagi',
    shiftHours: '07.00–15.00 WIB',
    tripsToday: 6,
    distanceTodayKm: 18.4,
    ratingToday: 4.9,
    vehicleCheckDone: true,
    documentsValid: true,
    nextBreak: '12.00–12.30 WIB',
  });

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalPayload, setModalPayload] = useState<any>(null);
  const [notificationCount, setNotificationCount] = useState<number>(3);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Sync state to localStorage for session durability
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ooi_current_user', JSON.stringify(currentUser));
      localStorage.setItem('ooi_active_role', currentUser.role);
    } else {
      localStorage.removeItem('ooi_current_user');
      localStorage.removeItem('ooi_active_role');
    }
  }, [currentUser]);

  useEffect(() => {
    if (activeTrip) {
      localStorage.setItem('ooi_active_trip', JSON.stringify(activeTrip));
    } else {
      localStorage.removeItem('ooi_active_trip');
    }
  }, [activeTrip]);

  useEffect(() => {
    localStorage.setItem('ooi_all_trips', JSON.stringify(allTrips));
  }, [allTrips]);

  useEffect(() => {
    localStorage.setItem('ooi_approvals', JSON.stringify(approvals));
  }, [approvals]);

  const login = (role: UserRole, user?: UserProfile) => {
    const targetUser = user || DEMO_USERS[role];
    setCurrentUser(targetUser);
    setActiveRole(role);
    setActiveTab(role === 'admin' ? 'ringkasan' : 'beranda');
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveRole(null);
    localStorage.removeItem('ooi_current_user');
    localStorage.removeItem('ooi_active_role');
  };

  const switchRole = (role: UserRole) => {
    login(role);
  };

  const markDriverArrived = () => {
    if (!activeTrip) return;
    const updated: Trip = {
      ...activeTrip,
      status: 'arrived',
      statusLabel: 'Tiba di lokasi jemput',
    };
    setActiveTrip(updated);
    setAllTrips(prev => prev.map(t => (t.id === updated.id ? updated : t)));
  };

  const startTripWithPin = (pin: string): { success: boolean; message: string } => {
    if (!activeTrip) {
      return { success: false, message: 'Tidak ada penugasan aktif' };
    }
    const cleanInput = pin.replace(/\D/g, '').trim();
    if (cleanInput !== activeTrip.pickupCode) {
      return { success: false, message: `Kode verifikasi ${cleanInput || 'kosong'} tidak cocok dengan kode penumpang.` };
    }

    const updated: Trip = {
      ...activeTrip,
      status: 'in_progress',
      statusLabel: 'Dalam perjalanan',
    };
    setActiveTrip(updated);
    setAllTrips(prev => prev.map(t => (t.id === updated.id ? updated : t)));
    return { success: true, message: 'Kode terverifikasi! Perjalanan dimulai.' };
  };

  const completeTrip = () => {
    if (!activeTrip) return;
    const completed: Trip = {
      ...activeTrip,
      status: 'completed',
      statusLabel: 'Selesai',
      completedAt: '09.52 WIB',
    };

    setCompletedTrips(prev => [completed, ...prev]);
    setAllTrips(prev => prev.filter(t => t.id !== completed.id));
    setActiveTrip(null);

    setDriverStatus(prev => ({
      ...prev,
      tripsToday: prev.tripsToday + 1,
      distanceTodayKm: Number((prev.distanceTodayKm + completed.distanceKm).toFixed(1)),
      isInDuty: false,
    }));
  };

  const bookNewTrip = (pickup: string, destination: string, isScheduled: boolean, scheduledTime?: string) => {
    const newId = `OI-${Math.floor(1050 + Math.random() * 50)}`;
    const newPin = generatePickupPin();

    const newTrip: Trip = {
      id: newId,
      orderTime: '09.55 WIB',
      fullDateTime: isScheduled ? (scheduledTime || 'Hari ini, 22 Okt 2026 · 13.00 WIB') : 'Kamis, 22 Okt 2026 · 09.55 WIB',
      passengerId: currentUser?.id || 'user-001',
      passengerName: currentUser?.name || 'Raka Pradana',
      passengerInitials: currentUser?.avatarInitials || 'RP',
      passengerDept: currentUser?.department || 'Unit administrasi',
      passengerEmployeeId: currentUser?.employeeId || 'PG-DEMO-018',
      passengerPhone: currentUser?.phone || '0812-3456-7890',

      driverId: 'driver-001',
      driverName: 'Bima Saputra',
      driverInitials: 'BS',
      driverRating: 4.9,
      driverPhone: '0813-9876-5432',
      driverVehicle: 'Honda Vario · Hitam',
      driverPlate: 'DEMO 024 · Helm tersedia',

      pickup,
      pickupDetail: 'Titik penjemputan resmi',
      destination,
      destinationDetail: 'Gedung tujuan kedinasan',

      pickupCode: newPin,
      status: 'assigned',
      statusLabel: isScheduled ? 'Terjadwal' : 'Menuju titik jemput',
      etaMinutes: 4,
      distanceKm: 1.8,
      durationMinutes: 6,
      isScheduled,
    };

    if (isScheduled) {
      setScheduledTrips(prev => [newTrip, ...prev]);
    } else {
      setActiveTrip(newTrip);
      setAllTrips(prev => [newTrip, ...prev]);
      setDriverStatus(prev => ({ ...prev, isInDuty: true }));
    }
  };

  const handleApproval = (id: string, action: 'approve' | 'reject') => {
    setApprovals(prev =>
      prev.map(app => (app.id === id ? { ...app, status: action === 'approve' ? 'approved' : 'rejected' } : app))
    );
  };

  const clearNotifications = () => {
    setNotificationCount(0);
  };

  const resetDemoData = () => {
    setActiveTrip(INITIAL_TRIP);
    setAllTrips(INITIAL_ALL_TRIPS);
    setCompletedTrips(INITIAL_COMPLETED_TRIPS);
    setScheduledTrips(INITIAL_SCHEDULED_TRIPS);
    setApprovals(INITIAL_APPROVALS);
    setDriverStatus({
      isOnline: true,
      isInDuty: true,
      shiftName: 'Shift pagi',
      shiftHours: '07.00–15.00 WIB',
      tripsToday: 6,
      distanceTodayKm: 18.4,
      ratingToday: 4.9,
      vehicleCheckDone: true,
      documentsValid: true,
      nextBreak: '12.00–12.30 WIB',
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        activeRole,
        activeTab,
        setActiveTab,
        login,
        logout,
        switchRole,
        activeTrip,
        allTrips,
        completedTrips,
        scheduledTrips,
        driverStatus,
        setDriverStatus,
        markDriverArrived,
        startTripWithPin,
        completeTrip,
        bookNewTrip,
        approvals,
        handleApproval,
        activeModal,
        setActiveModal,
        modalPayload,
        setModalPayload,
        notificationCount,
        clearNotifications,
        resetDemoData,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
