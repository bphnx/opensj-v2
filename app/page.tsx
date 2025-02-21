"use client";

import React, { useState, useEffect } from 'react';
import StyleParameter from "./components/styleParameter";
import StylePoints from "./components/stylePoints";
import StyleCodes from './components/styleCodes';

const calculateCode = (BAS: number, MOV: number, DIN: number, COM: number, SAPD: number, GCC: number, DIF: number, SOG: number, PEN: number) => {
  let a = '';
  let b = '';
  let c = '';
  let yz = '';
  const englishAlphabet = 'abcdefghijklmnopqrstuvwxyz';
  const reducedAlphabet = 'abcdefghjklmnpqrstuvwxy';

  let charPenalty = PEN.toString();
  if (PEN > 9) {
    charPenalty = reducedAlphabet[(PEN - 10)];
  }

  if ((COM == 0 && SAPD == 0 && DIF == 0) && (MOV + DIN + GCC < 6) && (MOV < 3 && DIN < 3 && GCC < 3)) {
    // One-letter format
    a = englishAlphabet[(MOV * 3 + DIN) * 3 + GCC];
    if (SOG > 0) {
      yz = "z" + SOG.toString();
      if (PEN > 0) {
        yz += charPenalty;
      }
    } else if (PEN > 0) {
      yz = "z0" + charPenalty;
    }
  } else if (SAPD < 2 && COM < 2 && DIF < 2) {
    // Two-letters format
    const value = (((((MOV * 4 + DIN) * 4 + GCC) * 2 + COM) * 2 + SAPD) * 2 + DIF);
    a = englishAlphabet[Math.floor(value / 23)];
    b = reducedAlphabet[value % 23];
    if (SOG > 0) {
      yz = SOG.toString();
      if (PEN > 0) {
        yz += charPenalty;
      }
    } else if (PEN > 0) {
      yz = "0" + charPenalty;
    }
  } else {
    // Three-letters format
    const value = (((((MOV * 4 + DIN) * 4 + GCC) * 4 + COM) * 4 + SAPD) * 4 + DIF);
    a = englishAlphabet[Math.floor(value / (23 * 26))];
    const remainder = value % (23 * 26);
    b = reducedAlphabet[Math.floor(remainder / 26)];
    c = englishAlphabet[remainder % 26];
    if (SOG > 0) {
      yz = SOG.toString();
      if (PEN > 0) {
        yz += charPenalty;
      }
    } else if (PEN > 0) {
      yz = "0" + charPenalty;
    }
  }
  const fullCode = a + (BAS + MOV + DIN + COM + SAPD + GCC + DIF).toString() + b + c + yz;
  return fullCode;
}

const useParameterState = (initialValue: number) => {
  const [leftValue, setLeftValue] = useState(initialValue);
  const [rightValue, setRightValue] = useState(initialValue);
  return { leftValue, setLeftValue, rightValue, setRightValue };
};

export default function Home() {
  const [leftValue, setLeftValue] = useState(5.5);
  const [rightValue, setRightValue] = useState(5.5);

  const bas = useParameterState(0);
  const mov = useParameterState(0);
  const din = useParameterState(0);
  const com = useParameterState(0);
  const sapd = useParameterState(0);
  const gcc = useParameterState(0);
  const dif = useParameterState(0);
  const sog = useParameterState(0);
  const pen = useParameterState(0);

  const [leftCode, setLeftCode] = useState(calculateCode(bas.leftValue, mov.leftValue, din.leftValue, com.leftValue, sapd.leftValue, gcc.leftValue, dif.leftValue, sog.leftValue, pen.leftValue));
  const [rightCode, setRightCode] = useState(calculateCode(bas.rightValue, mov.rightValue, din.rightValue, com.rightValue, sapd.rightValue, gcc.rightValue, dif.rightValue, sog.rightValue, pen.rightValue));

  useEffect(() => {
    setLeftCode(calculateCode(bas.leftValue, mov.leftValue, din.leftValue, com.leftValue, sapd.leftValue, gcc.leftValue, dif.leftValue, sog.leftValue, pen.leftValue));
  }, [bas.leftValue, mov.leftValue, din.leftValue, com.leftValue, sapd.leftValue, gcc.leftValue, dif.leftValue, sog.leftValue, pen.leftValue]);

  useEffect(() => {
    setRightCode(calculateCode(bas.rightValue, mov.rightValue, din.rightValue, com.rightValue, sapd.rightValue, gcc.rightValue, dif.rightValue, sog.rightValue, pen.rightValue));
  }, [bas.rightValue, mov.rightValue, din.rightValue, com.rightValue, sapd.rightValue, gcc.rightValue, dif.rightValue, sog.rightValue, pen.rightValue]);


  const incrementLeftValue = (value: number) => {
    setLeftValue(prev => parseFloat((prev + value).toFixed(1)));
    setLeftCode(calculateCode(bas.leftValue, mov.leftValue, din.leftValue, com.leftValue, sapd.leftValue, gcc.leftValue, dif.leftValue, sog.leftValue, pen.leftValue));
  };

  const incrementRightValue = (value: number) => {
    setRightValue(prev => parseFloat((prev + value).toFixed(1)));
    setRightCode(calculateCode(bas.rightValue, mov.rightValue, din.rightValue, com.rightValue, sapd.rightValue, gcc.rightValue, dif.rightValue, sog.rightValue, pen.rightValue));
  };

  const resetValues = () => {
    bas.setLeftValue(0);
    bas.setRightValue(0);
    mov.setLeftValue(0);
    mov.setRightValue(0);
    din.setLeftValue(0);
    din.setRightValue(0);
    com.setLeftValue(0);
    com.setRightValue(0);
    sapd.setLeftValue(0);
    sapd.setRightValue(0);
    gcc.setLeftValue(0);
    gcc.setRightValue(0);
    dif.setLeftValue(0);
    dif.setRightValue(0);
    sog.setLeftValue(0);
    sog.setRightValue(0);
    pen.setLeftValue(0);
    pen.setRightValue(0);
    setLeftValue(5.5);
    setRightValue(5.5);
  };

  let pressTimer: NodeJS.Timeout;

  const handleMouseDown = () => {
    pressTimer = setTimeout(resetValues, 1000);
  };

  const handleMouseUp = () => {
    clearTimeout(pressTimer);
  };

  return (
    <div className="container grid">
      <main className="flex flex-col gap-4">
        <StylePoints leftValue={leftValue} rightValue={rightValue} />
        <StyleCodes leftCode={leftCode} rightCode={rightCode} />
        <StyleParameter label="BAS" isSog={false} isPen={false} incrementLeftValue={incrementLeftValue} incrementRightValue={incrementRightValue} leftValue={bas.leftValue} rightValue={bas.rightValue} setLeftValue={bas.setLeftValue} setRightValue={bas.setRightValue} />
        <StyleParameter label="MOV" isSog={false} isPen={false} incrementLeftValue={incrementLeftValue} incrementRightValue={incrementRightValue} leftValue={mov.leftValue} rightValue={mov.rightValue} setLeftValue={mov.setLeftValue} setRightValue={mov.setRightValue} />
        <StyleParameter label="DIN" isSog={false} isPen={false} incrementLeftValue={incrementLeftValue} incrementRightValue={incrementRightValue} leftValue={din.leftValue} rightValue={din.rightValue} setLeftValue={din.setLeftValue} setRightValue={din.setRightValue} />
        <StyleParameter label="COM" isSog={false} isPen={false} incrementLeftValue={incrementLeftValue} incrementRightValue={incrementRightValue} leftValue={com.leftValue} rightValue={com.rightValue} setLeftValue={com.setLeftValue} setRightValue={com.setRightValue} />
        <StyleParameter label="SAPD" isSog={false} isPen={false} incrementLeftValue={incrementLeftValue} incrementRightValue={incrementRightValue} leftValue={sapd.leftValue} rightValue={sapd.rightValue} setLeftValue={sapd.setLeftValue} setRightValue={sapd.setRightValue} />
        <StyleParameter label="GCC" isSog={false} isPen={false} incrementLeftValue={incrementLeftValue} incrementRightValue={incrementRightValue} leftValue={gcc.leftValue} rightValue={gcc.rightValue} setLeftValue={gcc.setLeftValue} setRightValue={gcc.setRightValue} />
        <StyleParameter label="DIF" isSog={false} isPen={false} incrementLeftValue={incrementLeftValue} incrementRightValue={incrementRightValue} leftValue={dif.leftValue} rightValue={dif.rightValue} setLeftValue={dif.setLeftValue} setRightValue={dif.setRightValue} />
        <StyleParameter label="SOG" isSog={true} isPen={false} incrementLeftValue={incrementLeftValue} incrementRightValue={incrementRightValue} leftValue={sog.leftValue} rightValue={sog.rightValue} setLeftValue={sog.setLeftValue} setRightValue={sog.setRightValue} />
        <StyleParameter label="PEN" isSog={false} isPen={true} incrementLeftValue={incrementLeftValue} incrementRightValue={incrementRightValue} leftValue={pen.leftValue} rightValue={pen.rightValue} setLeftValue={pen.setLeftValue} setRightValue={pen.setRightValue} />
        <button
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="reset-button"
        >
          Reset All
        </button>
      </main>
    </div>
  );
}
