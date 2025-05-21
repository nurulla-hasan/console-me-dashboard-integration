'use client';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import { useState } from 'react';

const chartData = {
  2024: [
    { name: 'Jan', value: 80 },
    { name: 'Feb', value: 70 },
    { name: 'Mar', value: 100 },
    { name: 'Apr', value: 60 },
    { name: 'May', value: 90 },
    { name: 'Jun', value: 75 },
    { name: 'Jul', value: 85 },
    { name: 'Aug', value: 70 },
    { name: 'Sept', value: 95 },
    { name: 'Oct', value: 80 },
    { name: 'Nov', value: 70 },
    { name: 'Dec', value: 90 },
  ],
  2023: [
    { name: 'Jan', value: 50 },
    { name: 'Feb', value: 60 },
    { name: 'Mar', value: 75 },
    { name: 'Apr', value: 55 },
    { name: 'May', value: 68 },
    { name: 'Jun', value: 72 },
    { name: 'Jul', value: 65 },
    { name: 'Aug', value: 70 },
    { name: 'Sept', value: 78 },
    { name: 'Oct', value: 82 },
    { name: 'Nov', value: 75 },
    { name: 'Dec', value: 80 },
  ],
};

export default function UserGrowthChart() {
  const [selectedYear, setSelectedYear] = useState('2024');

  return (
    <div className="bg-white rounded-md p-4 w-full text-[#4c4c4c] shadow-[0px_4px_4px_0px_#00000040]">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">User Growth</h2>
        <div className="relative w-fit">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="appearance-none border border-gray-400 outline-none rounded px-2 py-[4px] text-[12px] pr-6"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
          <div className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2">
            <svg className="w-[12px] h-[12px] text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          className="text-[12px]"
          data={chartData[selectedYear]}
          margin={{ top: 0, right: 0, left: -32, bottom: -10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            ticks={[0, 20, 40, 60, 80, 100]}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip wrapperStyle={{ fontSize: '14px' }} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#2FCFCF"
            fill="#00A89D"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
