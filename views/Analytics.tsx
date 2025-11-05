
import React from 'react';
import { ChevronDownIcon } from '../components/IconComponents';

const StatCard = ({ title, value, change, changeType, children }: { title: string, value: string, change?: string, changeType?: 'increase' | 'decrease', children?: React.ReactNode }) => (
     <div className="bg-slate-800 rounded-lg p-5">
        <h3 className="text-slate-400 text-sm">{title}</h3>
        <p className="text-4xl font-bold text-white mt-2">{value}</p>
        {change && (
            <p className={`mt-2 text-sm flex items-center ${changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
                <span className="font-mono">{changeType === 'increase' ? '▲' : '▼'}</span> {change}
            </p>
        )}
        {children}
    </div>
);

const InsightTable = ({ title, headers, data }: { title: string, headers: string[], data: (string|number)[][] }) => (
    <div className="bg-slate-800 rounded-lg p-5 mt-6">
        <h3 className="font-semibold text-white mb-4">{title}</h3>
        <table className="w-full text-sm text-left">
            <thead>
                <tr className="border-b border-slate-700">
                    {headers.map(h => <th key={h} className="pb-2 font-medium text-slate-400">{h}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map((row, i) => (
                    <tr key={i} className="border-b border-slate-700/50">
                        {row.map((cell, j) => <td key={j} className="py-3 text-slate-300">{cell}</td>)}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const Analytics: React.FC = () => {
    const topQuestions = [
        ["What are the shipping options?", 1204, "E-Commerce Bot"],
        ["How can I track my order?", 887, "E-Commerce Bot"],
        ["What is the return policy?", 512, "E-Commerce Bot"],
        ["How do I reset my password?", 653, "Support Bot"],
    ];

    const conversionBySite = [
        ["Main Website", "24%"],
        ["Mobile App", "18%"],
        ["Landing Page A", "35%"],
        ["Support Portal", "8%"]
    ];

    return (
        <div className="flex flex-col h-full">
             <header className="flex-shrink-0 flex items-center justify-between p-4 bg-slate-800/50 border-b border-slate-700">
                <h1 className="text-xl font-bold text-white">Analytics Dashboard</h1>
                 <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-sm bg-slate-700 px-3 py-1.5 rounded-md hover:bg-slate-600">
                        Date Range: Last 30 Days <ChevronDownIcon className="w-4 h-4" />
                    </button>
                     <button className="flex items-center gap-2 text-sm bg-slate-700 px-3 py-1.5 rounded-md hover:bg-slate-600">
                        Site/Bot: All Sites <ChevronDownIcon className="w-4 h-4" />
                    </button>
                </div>
            </header>
            <main className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Conversations" value="12,874" change="+5.2%" changeType="increase" />
                    <StatCard title="Avg. Response Time" value="1m 24s" change="-1.8%" changeType="decrease" />
                    <StatCard title="CSAT" value="92%" change="+2.1%" changeType="increase" />
                    <StatCard title="Conversation Volume" value="12,874" change="+5.2%" changeType="increase" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    <div className="lg:col-span-2">
                        <StatCard title="Conversation Volume" value="">
                            <div className="h-64 mt-4 flex items-center justify-center text-slate-500">[Conversation Volume Chart]</div>
                        </StatCard>
                    </div>
                    <div>
                         <StatCard title="Customer Satisfaction" value="">
                            <div className="h-64 mt-4 flex items-center justify-center text-slate-500">[CSAT Doughnut Chart]</div>
                        </StatCard>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-bold text-white">Key Insights</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <InsightTable title="Top Frequent Questions" headers={["Question", "Frequency", "Associated Bot"]} data={topQuestions} />
                        <InsightTable title="Conversion Rate by Site" headers={["Site", "Conversion Rate"]} data={conversionBySite} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Analytics;
