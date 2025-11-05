
import React from 'react';
import { ChevronDownIcon, SearchIcon } from '../components/IconComponents';

const MetricCard = ({ title, value, change, changeType }: { title: string, value: string, change?: string, changeType?: 'increase' | 'decrease' }) => (
    <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-slate-400 text-sm">{title}</h3>
        <p className="text-3xl font-bold text-white mt-2">{value}</p>
        {change && (
            <p className={`mt-2 text-sm ${changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
                {changeType === 'increase' ? '↑' : '↓'} {change}
            </p>
        )}
    </div>
);

const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col h-full bg-slate-900">
             <header className="flex-shrink-0 flex items-center justify-between p-4 bg-slate-800/50 border-b border-slate-700">
                <h1 className="text-xl font-bold text-white">Dashboard</h1>
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="search"
                        placeholder="Search conversations..."
                        className="bg-slate-700 border border-slate-600 rounded-md pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
            </header>
            <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <MetricCard title="Active Conversations" value="142" />
                    <MetricCard title="Messages Processed Today" value="8,321" />
                    <MetricCard title="Satisfaction Rate" value="92%" change="+1.2%" changeType="increase" />
                    <MetricCard title="Conversion Rate" value="15%" change="-0.5%" changeType="decrease" />
                </div>
                <div className="mt-8 bg-slate-800 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-white">Activity Overview</h2>
                        <button className="flex items-center gap-2 text-sm bg-slate-700 px-3 py-1.5 rounded-md hover:bg-slate-600">
                            Last 7 Days
                            <ChevronDownIcon className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="mt-6 h-72 flex items-center justify-center text-slate-500">
                        [Activity Chart Placeholder]
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
