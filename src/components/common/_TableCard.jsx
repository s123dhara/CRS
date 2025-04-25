import React, { useState, useEffect } from 'react';

function TableCard({ title, columns, apiEndpoint, rowsPerPage = 10 }) {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);

    // Fetch data from the server
    const fetchData = async (page, search) => {
        try {
            const response = await fetch(`${apiEndpoint}?page=${page}&limit=${rowsPerPage}&search=${search}`);
            const result = await response.json();
            setData(result.data);
            setTotalRows(result.total); // Assuming the response includes a total count of records
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Call fetchData whenever page, search term, or rowsPerPage changes
    useEffect(() => {
        fetchData(currentPage, searchTerm);
    }, [currentPage, searchTerm, rowsPerPage]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);  // Reset to the first page when the search term changes
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(totalRows / rowsPerPage);

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
                        className="border border-gray-300 text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-amber-700"
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
                    <table className="table-auto w-full">
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
                            {data.map((row, rowIndex) => (
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
                </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    {[...Array(totalPages).keys()].map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page + 1)}
                            className={`px-4 py-2 rounded-lg ${currentPage === page + 1 ? 'bg-amber-700 text-white' : 'bg-gray-200'}`}
                        >
                            {page + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default TableCard;
