import React, { useState } from 'react';

export const ReportAndBugs = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        severity: 'medium'
    });
    const [reports, setReports] = useState([
        {
            id: 1,
            title: 'Bug in Navigation',
            description: 'The navigation menu is not responsive on mobile devices. It sometimes overlaps with the content.',
            severity: 'high',
            date: 'April 25, 2025',
            status: 'Open'
        },
        {
            id: 2,
            title: 'Login Issue',
            description: 'Users are unable to login with their credentials, even though they are correct. Need to investigate the authentication mechanism.',
            severity: 'medium',
            date: 'April 23, 2025',
            status: 'In Progress'
        }
    ]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newReport = {
            id: reports.length + 1,
            title: formData.title,
            description: formData.description,
            severity: formData.severity,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            status: 'Open'
        };
        setReports([newReport, ...reports]);
        setFormData({ title: '', description: '', severity: 'medium' });
    };

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-green-100 text-green-800';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Open': return 'bg-blue-100 text-blue-800';
            case 'In Progress': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        // <div className="min-h-screen bg-gradient-to-br from-violet-600 to-indigo-600 p-6 text-white">
        <div className="min-h-screen bg-gradient-to-br from-violet-400 to-violet-600 p-6 text-white">
            <div className="max-w-4xl mx-auto space-y-8">
                <header className="text-center">
                    <h1 className="text-4xl font-bold mb-2">📋 Reports & Bugs</h1>
                    <p className="text-violet-100 text-lg">Help us improve by reporting issues you encounter</p>
                </header>

                {/* Bug Report Form */}
                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20">
                    <h2 className="text-2xl font-semibold mb-6">Report a Bug</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="title" className="block text-sm font-medium text-violet-100">Bug Title</label>
                            <input
                                id="title"
                                type="text"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Briefly describe the issue"
                                className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description" className="block text-sm font-medium text-violet-100">Bug Description</label>
                            <textarea
                                id="description"
                                rows="5"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Provide detailed steps to reproduce the issue"
                                className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="severity" className="block text-sm font-medium text-violet-100">Severity Level</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['low', 'medium', 'high'].map((level) => (
                                    <label key={level} className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            id="severity"
                                            name="severity"
                                            value={level}
                                            checked={formData.severity === level}
                                            onChange={handleChange}
                                            className="hidden peer"
                                        />
                                        <div className={`w-full p-3 rounded-lg border border-white/20 peer-checked:border-white peer-checked:bg-violet-700 peer-checked:text-white transition-all ${getSeverityColor(level)}`}>
                                            <span className="capitalize">{level}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 pt-4">
                            <button
                                type="reset"
                                onClick={() => setFormData({ title: '', description: '', severity: 'medium' })}
                                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all font-medium"
                            >
                                Clear Form
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 transition-all font-medium shadow-lg shadow-violet-500/20"
                            >
                                Submit Report
                            </button>
                        </div>
                    </form>
                </div>

                {/* Reports List */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold mb-2">Submitted Reports</h2>

                    {reports.length === 0 ? (
                        <div className="bg-white/5 p-8 rounded-2xl text-center border border-dashed border-white/20">
                            <p className="text-violet-200">No reports submitted yet</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {reports.map((report) => (
                                <div key={report.id} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-violet-400/50 transition-all">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                                        <h3 className="text-xl font-semibold">{report.title}</h3>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 text-xs rounded-full ${getSeverityColor(report.severity)}`}>
                                                {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                                            </span>
                                            <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(report.status)}`}>
                                                {report.status}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-violet-200 mb-4">{report.description}</p>
                                    <div className="flex justify-between items-center text-sm text-violet-300">
                                        <span>Reported on: {report.date}</span>
                                        <button className="text-violet-200 hover:text-white transition">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};