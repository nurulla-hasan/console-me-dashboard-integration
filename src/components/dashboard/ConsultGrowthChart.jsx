
'use client';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useState, useEffect } from 'react';

export default function ConsultGrowthChart({ chartData, currentYear, onYearChange, availableYears }) {
    const [selectedYearLocal, setSelectedYearLocal] = useState(currentYear?.toString());

    useEffect(() => {
        if (currentYear !== undefined && currentYear !== null) {
            setSelectedYearLocal(currentYear.toString());
        }
    }, [currentYear]);

    const handleYearChange = (e) => {
        const newYear = parseInt(e.target.value);
        setSelectedYearLocal(newYear.toString());
        onYearChange(newYear);
    };

    const formattedChartData = chartData?.data?.map((value, index) => ({
        name: chartData.labels[index],
        value: value
    })) || [];


    return (
        <div className="bg-white rounded-md p-4 w-full text-[#4c4c4c] shadow-[0px_4px_4px_0px_#00000040]">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Consultant Growth - {selectedYearLocal}</h2>
                <div className="relative w-fit">
                    <select
                        value={selectedYearLocal}
                        onChange={handleYearChange}
                        className="appearance-none border border-gray-400 outline-none rounded px-2 py-[4px] text-[12px] pr-6">
                        {availableYears.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
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
                    data={formattedChartData}
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