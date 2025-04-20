import React from 'react'

const BlurrySpinner = () => (

    <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Blurred background overlay */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>

        {/* Loading spinner centered on screen */}
        <div className="relative z-10">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 shadow-lg"></div>
        </div>
    </div>
)

export default BlurrySpinner