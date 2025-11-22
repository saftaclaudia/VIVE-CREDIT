import { NavLink, Outlet } from "react-router-dom";
import { Home, ShieldCheck, Users, DollarSign } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";

const navItems = [
  { label: "Home", path: "/dashboard", icon: Home },
  { label: "Sales", path: "sales", icon: DollarSign },
  { label: "Risk", path: "risk", icon: ShieldCheck },
  { label: "Collections", path: "collections", icon: Users },
];

export default function OperatorDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div
        className={clsx(
          "fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-md transform transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:static md:inset-auto"
        )}
      >
        <div className="text-xl font-semibold text-blue-500 mb-4 text-center mt-8">
          Operator Dashboard
        </div>

        <nav className=" flex flex-col gap-2">
          {navItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl transition ${
                  isActive
                    ? "bg-blue-100 text-blue-600 shadow-sm"
                    : "text-grey-200 hover:bg-blue-50 hover:text-blue-500"
                }`
              }
            >
              <div className="flex gap-3">
                <Icon
                  size={20}
                  className={` isActive ? "bg-blue-600" : "text-grey-200" `}
                />
                <span> {label} </span>
              </div>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white shadow-md md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded hover:bg-gray-200"
          >
            {/* Hamburger icon */}
            <span className="block w-6 h-0.5 bg-gray-600 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-600 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-600"></span>
          </button>
          <div className="font-bold">Operator Dashboard</div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4, overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
