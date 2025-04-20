import React from 'react'

export const Header = () => {
    return (
        <header className="bg-blue-600 text-white p-4 text-xl font-semibold flex justify-between items-center">
            <span>Dashboard</span>
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <span className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full"></span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a6 6 0 016 6v3.586l1.707 1.707a1 1 0 01-1.414 1.414l-2-2A1 1 0 0114 12V8a4 4 0 10-8 0v4a1 1 0 01-.293.707l-2 2a1 1 0 01-1.414-1.414L4 11.586V8a6 6 0 016-6z" />
                    </svg>
                </div>
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-blue-600 font-bold">U</div>
            </div>
        </header>
    )
}

    ;