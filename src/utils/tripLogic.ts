import { Trip, TripStatus, UserProfile, UserRole } from '../types';

export const DEMO_USERS: Record<UserRole, UserProfile> = {
  pengguna: {
    id: 'user-001',
    name: 'Raka Pradana',
    email: 'raka.pradana@istana.go.id',
    role: 'pengguna',
    roleLabel: 'Pengguna terotorisasi',
    avatarInitials: 'RP',
    department: 'Unit Administrasi & Rumah Tangga Istana',
    employeeId: 'PG-DEMO-018',
    phone: '0812-3456-7890',
    isVerified: true,
    statusBadge: 'Akses terotorisasi',
  },
  driver: {
    id: 'driver-001',
    name: 'Bima Saputra',
    email: 'bima.saputra@istana.go.id',
    role: 'driver',
    roleLabel: 'Pengemudi terverifikasi',
    avatarInitials: 'BS',
    driverId: 'DEMO 024',
    rating: 4.9,
    vehicle: {
      model: 'Honda Vario',
      color: 'Hitam',
      plate: 'DEMO 024',
      helmetReady: true,
    },
    phone: '0813-9876-5432',
    isVerified: true,
    statusBadge: 'Pengemudi terverifikasi',
  },
  admin: {
    id: 'admin-001',
    name: 'Nadia Putri',
    email: 'nadia.putri@istana.go.id',
    role: 'admin',
    roleLabel: 'Administrator',
    avatarInitials: 'NP',
    department: 'Pusat Operasional Transportasi Istana',
    phone: '0811-2233-4455',
    isVerified: true,
    statusBadge: 'Super Administrator',
  },
};

/**
 * Validates 4-digit pickup verification code
 */
export function validatePickupPin(enteredPin: string, expectedPin: string): boolean {
  const cleanEntered = enteredPin.replace(/\D/g, '').trim();
  const cleanExpected = expectedPin.replace(/\D/g, '').trim();
  if (cleanEntered.length !== 4) return false;
  return cleanEntered === cleanExpected;
}

/**
 * Checks whether the driver can mark arrival at the pickup point
 */
export function canDriverArrive(trip: Trip): boolean {
  return trip.status === 'assigned';
}

/**
 * Checks whether the driver can start the trip
 */
export function canDriverStartTrip(trip: Trip, pinMatched: boolean): boolean {
  return (trip.status === 'arrived' || trip.status === 'assigned') && pinMatched;
}

/**
 * Checks whether the trip can be completed
 */
export function canDriverCompleteTrip(trip: Trip): boolean {
  return trip.status === 'in_progress';
}

/**
 * Calculate simulated route metrics between Istana checkpoints
 */
export function calculateRouteEstimate(pickup: string, destination: string): { distanceKm: number; etaMinutes: number } {
  // Deterministic distances between internal spots
  const hash = (pickup + destination).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const distanceKm = Number((1.2 + (hash % 15) * 0.1).toFixed(1));
  const etaMinutes = Math.max(3, Math.round(distanceKm * 2.8));
  return { distanceKm, etaMinutes };
}

/**
 * Generates a random 4-digit PIN for pickup verification
 */
export function generatePickupPin(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

/**
 * Authenticates user credentials according to role-specific requirements
 */
export function authenticateRoleCredentials(
  role: UserRole,
  identifier: string,
  secret: string,
  extraCode?: string
): { success: boolean; message: string; user?: UserProfile } {
  const trimmedId = identifier.trim().toLowerCase();
  const trimmedSecret = secret.trim();

  if (!trimmedId) {
    const fieldName = role === 'pengguna' ? 'NIP / Email' : role === 'driver' ? 'ID Driver / No. Handphone' : 'Username Administrator';
    return { success: false, message: `${fieldName} wajib diisi` };
  }

  if (!trimmedSecret) {
    const secretName = role === 'driver' ? 'PIN Keamanan Driver (min 4 digit)' : 'Kata Sandi';
    return { success: false, message: `${secretName} wajib diisi` };
  }

  if (role === 'admin') {
    // Admin requires 2FA authenticator code if provided or default 6-digit verification
    if (extraCode && extraCode.trim().length > 0 && extraCode.trim().length !== 6) {
      return { success: false, message: 'Kode 2FA Operasional harus terdiri dari 6 digit' };
    }
    return {
      success: true,
      message: 'Autentikasi Administrator Berhasil',
      user: DEMO_USERS.admin,
    };
  }

  if (role === 'driver') {
    if (trimmedSecret.length < 4) {
      return { success: false, message: 'PIN Driver minimal 4 digit angka' };
    }
    return {
      success: true,
      message: 'Autentikasi Pengemudi Berhasil',
      user: DEMO_USERS.driver,
    };
  }

  // Pengguna
  return {
    success: true,
    message: 'Autentikasi Pengguna Kedinasan Berhasil',
    user: DEMO_USERS.pengguna,
  };
}
