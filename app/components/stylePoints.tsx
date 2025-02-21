"use client";

import React from 'react';
import "./styles.css";

interface StylePointsProps {
    leftValue: number;
    rightValue: number;
}

const StylePoints: React.FC<StylePointsProps> = ({ leftValue, rightValue }) => {
    return (
        <div className="row">
            <span className="scorePoints">{leftValue}</span>
            <div className="internalRow" ></div>
            <span className="scorePoints">{rightValue}</span>
        </div>
    );
};

export default StylePoints;