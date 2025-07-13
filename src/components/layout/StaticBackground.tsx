'use client';

import React from 'react';

const StaticBackground = () => {
    console.log('StaticBackground rendering');

    // Define styles inline to avoid any CSS file loading issues
    const backgroundStyle = {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none' as const,
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
        overflow: 'hidden',
    };

    const vignetteStyle = {
        position: 'absolute' as const,
        inset: 0,
        boxShadow: 'inset 0 0 150px 60px rgba(0, 0, 0, 0.8)',
    };

    const blobBaseStyle = {
        position: 'absolute' as const,
        borderRadius: '50%',
        filter: 'blur(40px)',
        opacity: 1,
    };

    const blob1Style = {
        ...blobBaseStyle,
        width: '40vh',
        height: '40vh',
        left: '10%',
        top: '20%',
        backgroundColor: 'rgba(242, 242, 242, 0.2)',
    };

    const blob2Style = {
        ...blobBaseStyle,
        width: '35vh',
        height: '35vh',
        right: '15%',
        top: '10%',
        backgroundColor: 'rgba(234, 228, 213, 0.25)',
    };

    const blob3Style = {
        ...blobBaseStyle,
        width: '45vh',
        height: '45vh',
        left: '25%',
        bottom: '15%',
        backgroundColor: 'rgba(182, 176, 159, 0.3)',
    };

    const blob4Style = {
        ...blobBaseStyle,
        width: '30vh',
        height: '30vh',
        right: '25%',
        bottom: '20%',
        backgroundColor: 'rgba(216, 208, 192, 0.25)',
    };

    return (
        <div style={backgroundStyle}>
            <div style={vignetteStyle}></div>
            <div style={blob1Style}></div>
            <div style={blob2Style}></div>
            <div style={blob3Style}></div>
            <div style={blob4Style}></div>
        </div>
    );
};

export default StaticBackground;