"use client";

import React, { useState } from 'react';
import "./styles.css";

interface StyleParameterProps {
    label: string;
    isSog: boolean;
    isPen: boolean;
    leftValue: number;
    rightValue: number;
    setLeftValue: React.Dispatch<React.SetStateAction<number>>;
    setRightValue: React.Dispatch<React.SetStateAction<number>>;
    incrementLeftValue: (value: number) => void;
    incrementRightValue: (value: number) => void;

}

const StyleParameter: React.FC<StyleParameterProps> = ({ label, isSog, isPen, incrementLeftValue, incrementRightValue, leftValue, rightValue, setLeftValue, setRightValue }) => {
    const [leftTotalIncrement, setLeftTotalIncrement] = useState(0);
    const [rightTotalIncrement, setRightTotalIncrement] = useState(0);

    const max = isPen ? 20 : 3;

    const incrementValue = (value: number, setValue: React.Dispatch<React.SetStateAction<number>>, max: number) => {
        setValue((value + 1) % (max + 1));
    };

    const checkColor = () => {
        if (isPen) return "red";
        if (isSog) return "grey";
        return "#007bff";
    };

    return (
        <div className="row" style={{ backgroundColor: `${checkColor()}` }}>
            <button
                style={{ flex: '1', backgroundColor: `${checkColor()}`, width: '50px' }}
                onClick={() => {
                    incrementValue(leftValue, setLeftValue, max);
                    if (isPen) {
                        incrementLeftValue(leftValue === max ? (max * 0.5) : -0.5);
                        setLeftTotalIncrement(prev => prev - 0.5);
                    }
                    else if (isSog) {
                        incrementLeftValue(leftValue === max ? -(max * 0.1) : 0.1);
                        setLeftTotalIncrement(prev => prev + 0.1);
                    }
                    else {
                        incrementLeftValue(leftValue === max ? -(max * 0.2) : 0.2);
                        setLeftTotalIncrement(prev => prev + 0.2);
                    }
                }}
            >
                {leftValue}
            </button>
            <div style={{ flex: '2', textAlign: 'center', width: '400px' }}>{label}</div>
            <button
                style={{ flex: '1', backgroundColor: `${checkColor()}`, width: '50px' }}
                onClick={() => {
                    incrementValue(rightValue, setRightValue, max);
                    if (isPen) {
                        incrementRightValue(rightValue === max ? (max * 0.5) : -0.5);
                        setRightTotalIncrement(prev => prev - 0.5);
                    }
                    else if (isSog) {
                        incrementRightValue(rightValue === max ? -(max * 0.1) : 0.1);
                        setRightTotalIncrement(prev => prev + 0.1);
                    }
                    else {
                        incrementRightValue(rightValue === max ? -(max * 0.2) : 0.2);
                        setRightTotalIncrement(prev => prev + 0.2);
                    }
                }}
            >
                {rightValue}
            </button>
        </div >
    );
};
export default StyleParameter;