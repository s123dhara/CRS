import React, { useState } from 'react';

export const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center border-b p-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button
                        className="text-gray-500 hover:text-gray-700 text-2xl font-bold focus:outline-none"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};