import React from 'react';

import FilterButton from '../../../components/common/DropdownFilter';
import Datepicker from '../../../components/common/Datepicker';

import DashboardCard01 from '../../../components/common/ChartCard/DashboardCard01';
import DashboardCard02 from '../../../components/common/ChartCard/DashboardCard02';
import DashboardCard03 from '../../../components/common/ChartCard/DashboardCard03';
import DashboardCard05 from '../../../components/common/ChartCard/DashboardCard05';
import DashboardCard07 from '../../../components/common/ChartCard/DashboardCard07';


function Dashboard() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

      {/* Dashboard actions */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">

        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Dashboard</h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Filter button */}
          <FilterButton align="right" />
          {/* Datepicker built with React Day Picker */}
          <Datepicker align="right" />
          {/* Add view button */}
          {/* <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-80">
            <svg className="fill-current shrink-0 xs:hidden" width="16" height="16" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="max-xs:sr-only">Add View</span>
          </button> */}
        </div>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-12 gap-6">
        <DashboardCard01 />
        <DashboardCard02 />
        <DashboardCard03 />
      </div>
      <div className="mt-3 space-y-3">
        <DashboardCard05 />
        <DashboardCard07 />
      </div>

    </div>
  );
}

export default Dashboard;