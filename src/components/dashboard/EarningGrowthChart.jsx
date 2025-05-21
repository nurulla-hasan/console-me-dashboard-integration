'use client';
import { useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const chartData = {
    2024: [
        { name: "Jan", active: 900, cancel: 600 },
        { name: "Feb", active: 850, cancel: 400 },
        { name: "Mar", active: 700, cancel: 500 },
        { name: "Apr", active: 950, cancel: 300 },
        { name: "May", active: 800, cancel: 600 },
        { name: "Jun", active: 880, cancel: 450 },
        { name: "Jul", active: 870, cancel: 200 },
        { name: "Aug", active: 780, cancel: 300 },
        { name: "Sept", active: 860, cancel: 500 },
        { name: "Oct", active: 900, cancel: 400 },
        { name: "Nov", active: 940, cancel: 600 },
        { name: "Dec", active: 850, cancel: 500 },
    ],
    2023: [
        { name: "Jan", active: 120, cancel: 840 },
        { name: "Feb", active: 770, cancel: 350 },
        { name: "Mar", active: 640, cancel: 420 },
        { name: "Apr", active: 670, cancel: 860 },
        { name: "May", active: 740, cancel: 520 },
        { name: "Jun", active: 310, cancel: 390 },
        { name: "Jul", active: 760, cancel: 180 },
        { name: "Aug", active: 790, cancel: 250 },
        { name: "Sept", active: 780, cancel: 430 },
        { name: "Oct", active: 830, cancel: 350 },
        { name: "Nov", active: 260, cancel: 300 },
        { name: "Dec", active: 730, cancel: 430 },
    ],
};

export default function EarningGrowthChart() {
    const [selectedYear, setSelectedYear] = useState('2024');
    return (
        <div className="bg-white rounded-md p-4 w-full text-[#4c4c4c] shadow-[0px_4px_4px_0px_#00000040]">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Earning Growth</h2>
                <div className="relative w-fit">
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="appearance-none border border-gray-400 outline-none rounded px-2 py-[4px] text-[12px] pr-6">
                        <option>2024</option>
                        <option>2023</option>
                    </select>
                    <div className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2">
                        <svg className="w-[12px] h-[12px] text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart
                    className='text-[12px]'
                    data={chartData[selectedYear]}
                    barSize={20}
                    margin={{ top: 0, right: 0, left: -24, bottom: -10 }}
                >
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        ticks={[0, 200, 400, 600, 800, 1000]}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip wrapperStyle={{ fontSize: '14px' }}/>
                    {/* <Legend
                        layout="horizontal"
                        verticalAlign="top"
                        align="right"
                        iconType="circle"
                        wrapperStyle={{ fontSize: '10px', paddingBottom: '10px' }}
                    /> */}
                    <Bar dataKey="active" fill="#107A7A" radius={[10, 10, 0, 0]}/>
                    <Bar dataKey="cancel" fill="#2FCFCF" radius={[10, 10, 0, 0]}/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
