export type UserRole = 'pengguna' | 'driver' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleLabel: string;
  avatarInitials: string;
  department?: string;
  employeeId?: string; // NIP or employee code
  driverId?: string; // DRV-024
  rating?: number;
  vehicle?: {
    model: string;
    color: string;
    plate: string;
    helmetReady: boolean;
  };
  phone: string;
  isVerified: boolean;
  statusBadge: string;
}

export type TripStatus = 'assigned' | 'arrived' | 'in_progress' | 'completed' | 'cancelled';

export interface Trip {
  id: string; // e.g. "OI-1048"
  orderTime: string; // e.g. "09.45 WIB"
  fullDateTime: string; // "Kamis, 22 Okt 2026 · 09.45 WIB"
  passengerId: string;
  passengerName: string;
  passengerInitials: string;
  passengerDept: string;
  passengerEmployeeId: string;
  passengerPhone: string;
  
  driverId: string;
  driverName: string;
  driverInitials: string;
  driverRating: number;
  driverPhone: string;
  driverVehicle: string;
  driverPlate: string;

  pickup: string;
  pickupDetail: string;
  destination: string;
  destinationDetail: string;

  pickupCode: string; // e.g. "4826"
  status: TripStatus;
  statusLabel: string;
  etaMinutes: number;
  distanceKm: number;
  durationMinutes: number;
  isScheduled: boolean;
  completedAt?: string;
}

export interface ApprovalItem {
  id: string;
  name: string;
  initials: string;
  roleType: 'pengguna' | 'driver';
  subtitle: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  departmentOrVehicle: string;
  notes: string;
}

export interface DriverShiftStatus {
  isOnline: boolean;
  isInDuty: boolean;
  shiftName: string;
  shiftHours: string;
  tripsToday: number;
  distanceTodayKm: number;
  ratingToday: number;
  vehicleCheckDone: boolean;
  documentsValid: boolean;
  nextBreak: string;
}
