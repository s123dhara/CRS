import React, { useState, useEffect } from 'react';

function TableCard({ title, data, columns, rowsPerPage = 2 }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);  // State for loading spinner


    // Debounce the search term and show loading spinner
    useEffect(() => {
        setIsLoading(true);  // Show the loading spinner when the search starts
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            setIsLoading(false);  // Hide the loading spinner after debounce
        }, 500); // Set debounce delay (in ms)

        return () => {
            clearTimeout(timer); // Clear timeout if the component unmounts or searchTerm changes
        };
    }, [searchTerm]);
    // Handle search functionality
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);  // Reset to the first page when the search term changes
    };

    // Filter data based on search term
    const filteredData = data.filter(row =>
        columns.some(col =>
            String(row[col.key]).toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        )
    );

    // Pagination calculations
    const totalRows = filteredData.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const currentData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    }

    return (
        <div className="col-span-full xl:col-span-6 bg-white shadow-xs rounded-xl">
            <header className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
                <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        className="border border-gray-300 text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-700"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 14.5z"
                            />
                        </svg>
                    </div>
                </div>
            </header>

            <div className="p-3">
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-10">
                            <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="mt-2 text-sm text-gray-500 animate-pulse">Searching...</p>
                        </div>
                    ) :
                        (< table className="table-auto w-full">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                <tr>
                                    {columns.map((col, i) => (
                                        <th key={i} className="p-2 whitespace-nowrap">
                                            <div className={`font-semibold ${col.align ?? 'text-left'}`}>{col.label}</div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="text-sm divide-y divide-gray-100">
                                {currentData.map((row, rowIndex) => (
                                    <tr key={row.id || rowIndex}>
                                        {columns.map((col, colIndex) => (
                                            <td key={colIndex} className="p-2 whitespace-nowrap">
                                                <div className={col.align ?? 'text-left'}>
                                                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}                                
                            </tbody>
                        </table>
                        )}
                </div>
            </div>

            {/* Pagination Controls */}
            {
                totalPages > 1 && (
                    <div className="flex justify-center mt-4 space-x-2 p-3">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50 cursor-pointer"
                        >
                            Previous
                        </button>
                        {[...Array(totalPages).keys()].map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page + 1)}
                                className={`px-4 py-2 rounded-lg ${currentPage === page + 1 ? 'bg-violet-500 text-white' : 'bg-gray-200'} cursor-pointer`}
                            >
                                {page + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50 cursor-pointer"
                        >
                            Next
                        </button>
                    </div>
                )
            }
        </div >
    );
}

export default TableCard;
