
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const AppLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto bg-white dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
