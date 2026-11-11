/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LoginPage } from './components/auth/LoginPage';
import { Sidebar } from './components/common/Sidebar';
import { Navbar } from './components/common/Navbar';
import { MobileBottomBar } from './components/common/MobileBottomBar';
import { PassengerDashboard } from './components/passenger/PassengerDashboard';
import { DriverDashboard } from './components/driver/DriverDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { SubViews } from './components/common/SubViews';
import { Modals } from './components/common/Modals';

const MainLayout: React.FC = () => {
  const { currentUser, activeRole, activeTab } = useApp();

  if (!currentUser || !activeRole) {
    return <LoginPage />;
  }

  const isMainDashboardTab =
    (activeRole === 'pengguna' && activeTab === 'beranda') ||
    (activeRole === 'driver' && activeTab === 'beranda') ||
    (activeRole === 'admin' && activeTab === 'ringkasan');

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans antialiased text-slate-800">
      {/* Dark Navy Sidebar (Desktop persistent + Mobile slide-over drawer) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
        <Navbar />

        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          {isMainDashboardTab ? (
            <>
              {activeRole === 'pengguna' && <PassengerDashboard />}
              {activeRole === 'driver' && <DriverDashboard />}
              {activeRole === 'admin' && <AdminDashboard />}
            </>
          ) : (
            <SubViews />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Phone & Tablet) */}
      <MobileBottomBar />

      {/* Global Modals */}
      <Modals />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
