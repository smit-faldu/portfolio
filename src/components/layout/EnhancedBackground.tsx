'use client';

import React, { useEffect, useState } from 'react';
import '../../styles/enhanced-background.css';

const EnhancedBackground = () => {
    console.log('EnhancedBackground rendering');

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        console.log('EnhancedBackground mounted');
        setIsMounted(true);

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="enhanced-background">
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>
            <div className="blob blob-4"></div>
            <div className="blob blob-5"></div>

            {mousePosition.x > 0 && (
                <div
                    className="mouse-glow"
                    style={{
                        left: mousePosition.x,
                        top: mousePosition.y,
                    }}
                />
            )}
        </div>
    );
};

export default EnhancedBackground;