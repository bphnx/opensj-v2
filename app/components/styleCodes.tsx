"use client";

import React from 'react';
import "./styles.css";

interface StyleCodesProps {
    leftCode: string;
    rightCode: string;
}

const StyleCodes: React.FC<StyleCodesProps> = ({ leftCode, rightCode }) => {
    return (
        <div className="row">
            <span className="scorePoints">{leftCode}</span>
            <div className="internalRow" ></div>
            <span className="scorePoints">{rightCode}</span>
        </div>
    );
};

export default StyleCodes;