'use client';

import React from 'react';

// The simplest possible background component - just a gradient
const FallbackBackground = () => {
    console.log('FallbackBackground rendering');

    return (
        <div
            className="fixed inset-0 w-full h-full pointer-events-none z-[-1]"
            style={{
                background: 'linear-gradient(135deg, #0a0a0a 0%, #141414 100%)',
                boxShadow: 'inset 0 0 150px 60px rgba(0,0,0,0.8)',
            }}
        />
    );
};

export default FallbackBackground;