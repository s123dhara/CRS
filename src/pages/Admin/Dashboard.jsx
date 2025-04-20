import { useState } from 'react';
import {
  Search, Bell, Settings, Menu, X, ChevronDown,
  Home, Users, ShoppingBag, FileText, BarChart2,
  LogOut
} from 'lucide-react';

export default function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { name: 'Users', icon: <Users className="w-5 h-5" /> },
    { name: 'Products', icon: <ShoppingBag className="w-5 h-5" /> },
    { name: 'Orders', icon: <FileText className="w-5 h-5" /> },
    { name: 'Reports', icon: <BarChart2 className="w-5 h-5" /> },
    { name: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const placeholderWidgets = [
    { id: 1, title: 'Total Revenue', value: '$24,567', color: 'bg-blue-50' },
    { id: 2, title: 'Total Orders', value: '876', color: 'bg-green-50' },
    { id: 3, title: 'Total Users', value: '7,392', color: 'bg-purple-50' },
    { id: 4, title: 'Conversion Rate', value: '12.3%', color: 'bg-yellow-50' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 flex flex-col ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
        {/* Logo & App Name */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white rounded p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            {!isSidebarCollapsed && <span className="ml-3 font-bold text-gray-800">AdminDash</span>}
          </div>
          <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700">
            {isSidebarCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="py-4 flex-grow">
          <ul>
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  className={`flex items-center w-full py-3 px-4 ${activeTab === item.name
                      ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  onClick={() => setActiveTab(item.name)}
                >
                  <span className="text-lg">{item.icon}</span>
                  {!isSidebarCollapsed && <span className="ml-4">{item.name}</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* User Profile Section */}
        <div className="border-t p-4">
          <div className="flex items-center">
            <img
              src="/api/placeholder/40/40"
              alt="User avatar"
              className="w-10 h-10 rounded-full"
            />
            {!isSidebarCollapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Alex Johnson</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-800">{activeTab}</h1>

            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative md:w-64">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="w-5 h-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                >
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-700">Notifications</p>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      <div className="px-4 py-3 hover:bg-gray-50">
                        <p className="text-sm font-medium text-gray-700">New user registered</p>
                        <p className="text-xs text-gray-500">5 minutes ago</p>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50">
                        <p className="text-sm font-medium text-gray-700">New order placed</p>
                        <p className="text-xs text-gray-500">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* User Settings Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                >
                  <Settings className="w-6 h-6" />
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Account Settings</a>
                    <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Sign out</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {placeholderWidgets.map((widget) => (
              <div
                key={widget.id}
                className={`${widget.color} rounded-lg shadow-sm p-6`}
              >
                <h3 className="text-lg font-medium text-gray-700">{widget.title}</h3>
                <p className="text-3xl font-bold mt-2">{widget.value}</p>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Revenue Overview</h3>
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-500">Chart Placeholder</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-700 mb-4">User Activity</h3>
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-500">Chart Placeholder</p>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-700">Recent Orders</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <tr key={item} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{10000 + item}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Customer {item}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">April {10 + item}, 2025</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${Math.floor(Math.random() * 1000)}.00</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}