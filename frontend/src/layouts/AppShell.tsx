import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import NotificationPanel from '@/components/layout/NotificationPanel';
import { useUIStore } from '@/store';

export default function AppShell() {
  const { sidebarCollapsed, notificationPanelOpen } = useUIStore();

  return (
    <div className="flex h-screen bg-dark-bg overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div
        className="flex-1 flex flex-col min-w-0 transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? '72px' : '256px' }}
      >
        {/* Topbar */}
        <Topbar />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

      {/* Notification panel overlay */}
      {notificationPanelOpen && <NotificationPanel />}
    </div>
  );
}
