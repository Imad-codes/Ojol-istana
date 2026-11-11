import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validatePickupPin,
  canDriverArrive,
  canDriverStartTrip,
  canDriverCompleteTrip,
  calculateRouteEstimate,
  authenticateRoleCredentials,
} from './tripLogic';
import { Trip } from '../types';

const mockTrip: Trip = {
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
  driverPlate: 'DEMO 024',
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

test('validatePickupPin checks 4 digit matching accurately', () => {
  assert.equal(validatePickupPin('4826', '4826'), true);
  assert.equal(validatePickupPin('4825', '4826'), false);
  assert.equal(validatePickupPin('482', '4826'), false);
  assert.equal(validatePickupPin(' 4826 ', '4826'), true);
});

test('trip state transitions are enforced correctly', () => {
  // Initial state is assigned
  assert.equal(canDriverArrive(mockTrip), true);
  assert.equal(canDriverStartTrip(mockTrip, false), false);
  assert.equal(canDriverStartTrip(mockTrip, true), true);
  assert.equal(canDriverCompleteTrip(mockTrip), false);

  // Arrived state
  const arrivedTrip = { ...mockTrip, status: 'arrived' as const };
  assert.equal(canDriverArrive(arrivedTrip), false);
  assert.equal(canDriverStartTrip(arrivedTrip, false), false);
  assert.equal(canDriverStartTrip(arrivedTrip, true), true);

  // In progress state
  const inProgressTrip = { ...mockTrip, status: 'in_progress' as const };
  assert.equal(canDriverCompleteTrip(inProgressTrip), true);
});

test('calculateRouteEstimate gives realistic non-zero values', () => {
  const estimate = calculateRouteEstimate('Lobi A', 'Gedung B');
  assert.ok(estimate.distanceKm > 0);
  assert.ok(estimate.etaMinutes >= 3);
});

test('authenticateRoleCredentials checks mandatory fields per role', () => {
  // Empty identifier fails
  const failedUser = authenticateRoleCredentials('pengguna', '', 'secret123');
  assert.equal(failedUser.success, false);

  // Driver requires pin >= 4 digits
  const failedDriver = authenticateRoleCredentials('driver', 'DRV-024', '12');
  assert.equal(failedDriver.success, false);

  const goodDriver = authenticateRoleCredentials('driver', 'DRV-024', '1234');
  assert.equal(goodDriver.success, true);
  assert.equal(goodDriver.user?.role, 'driver');

  // Admin checks
  const badAdmin2FA = authenticateRoleCredentials('admin', 'admin@istana.go.id', 'secret123', '12');
  assert.equal(badAdmin2FA.success, false);

  const goodAdmin = authenticateRoleCredentials('admin', 'admin@istana.go.id', 'secret123', '123456');
  assert.equal(goodAdmin.success, true);
  assert.equal(goodAdmin.user?.role, 'admin');
});
