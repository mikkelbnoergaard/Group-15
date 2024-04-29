import React from 'react';
import './LoadingIndicator.css';

const LoadingIndicator: React.FC = () => {
    return (
        <div className="loading-overlay">
            <div className="loading-indicator">Loading...</div>
        </div>
    );
};

export default LoadingIndicator;