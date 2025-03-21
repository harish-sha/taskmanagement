import Sidebar from '../components/common/Sidebar';
import TaskTable from '../components/common/TaskTable';
import DashboardChart from '../components/common/DashboardChart';
import CalendarComponent from '../components/common/CalendarComponent';

// Placeholder UI Concept - Modern Admin Dashboard Structure
// Use this as a base to build a beautiful, scalable dashboard

import React from "react";
import { FaTasks, FaUsers, FaChartLine, FaBell, FaUserShield, FaMoon } from "react-icons/fa";

const ModernDashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 to-slate-800 text-white">
      {/* Sidebar */}
      <aside className="w-72 p-6 bg-black bg-opacity-20 backdrop-blur-xl flex flex-col justify-between border-r border-slate-700">
        <div>
          <h1 className="text-2xl font-bold text-blue-400 mb-8">TaskPilot</h1>
          <nav className="space-y-6">
            <div className="flex items-center gap-3 hover:text-blue-400 cursor-pointer">
              <FaTasks /> Dashboard
            </div>
            <div className="flex items-center gap-3 hover:text-blue-400 cursor-pointer">
              <FaUsers /> Users
            </div>
            <div className="flex items-center gap-3 hover:text-blue-400 cursor-pointer">
              <FaChartLine /> Analytics
            </div>
            <div className="flex items-center gap-3 hover:text-blue-400 cursor-pointer">
              <FaBell /> Notifications
            </div>
            <div className="flex items-center gap-3 hover:text-blue-400 cursor-pointer">
              <FaUserShield /> Roles
            </div>
          </nav>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-400 cursor-pointer hover:text-blue-400">
          <FaMoon /> Dark Mode
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 space-y-10">
        {/* Header */}
        <header className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Welcome Admin</h2>
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white font-medium shadow">
            + New Task
          </button>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 rounded-xl shadow-xl">
            <p className="text-sm text-slate-300">Total Tasks</p>
            <h3 className="text-2xl font-semibold mt-2">320</h3>
          </div>
          <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-5 rounded-xl shadow-xl">
            <p className="text-sm text-slate-300">Completed</p>
            <h3 className="text-2xl font-semibold mt-2">214</h3>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-orange-400 p-5 rounded-xl shadow-xl">
            <p className="text-sm text-slate-800">Pending</p>
            <h3 className="text-2xl font-semibold mt-2 text-slate-800">86</h3>
          </div>
          <div className="bg-gradient-to-r from-red-600 to-pink-500 p-5 rounded-xl shadow-xl">
            <p className="text-sm text-slate-100">Overdue</p>
            <h3 className="text-2xl font-semibold mt-2">20</h3>
          </div>
        </div>

        {/* Add more sections here (e.g., charts, task table, calendar, activity feed) */}
      </main>
    </div>
  );
};

export default ModernDashboardLayout;
