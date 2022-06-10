import React, { useEffect, useId, useState } from "react";

import "./NumberInput.scss";

interface InternalValue {
  value: number;
  displayValue: string;
}

export const NumberInput = ({
  unit,
  placeholder,
  value,
  onChange,
  label,
}: {
  unit: string;
  label: string;
  value: number;
  onChange: (val: number) => void;
  placeholder?: string;
}) => {
  const [internalValue, setInternalValue] = useState<InternalValue>({
    value: value,
    displayValue: value.toString(),
  });
  const id = useId();

  useEffect(() => {
    setInternalValue({
      value: value,
      displayValue: convertValueToReadableFormat(value.toString()),
    });
  }, [value]);

  return (
    <div className="number-input">
      <label htmlFor={id} className="number-input__label">
        {label}
      </label>
      <div className="number-input__wrapper">
        <input
          className="number-input__input"
          type="text"
          name={id}
          autoComplete="disabled"
          placeholder={placeholder}
          value={internalValue.displayValue}
          onChange={(event) => {
            const text = event.target.value.replace(",", ".");
            const dotSeparated = text.split(".");
            if (dotSeparated.length > 2) {
              return;
            }

            if (
              text.length > 0 &&
              dotSeparated.some((val) => {
                if (val === "") {
                  return false;
                }
                return !isNumeric(val);
              })
            ) {
              return;
            }
            let next = {};
            const lastChar = text.charAt(text.length - 1);
            if (lastChar === ".") {
              next = {
                value: parseFloat(dotSeparated[0]),
                displayValue: text,
              } as InternalValue;
            } else if (text.length === 0) {
              next = {
                value: 1,
                displayValue: "",
              } as InternalValue;
            } else {
              next = {
                value: parseFloat(text),
                displayValue: convertValueToReadableFormat(text),
              } as InternalValue;
            }
            setInternalValue(next as InternalValue);
            onChange((next as InternalValue).value);
          }}
        />
        <span className="number-input__unit">{unit}</span>
      </div>
    </div>
  );
};

function isNumeric(str: string) {
  return /^\d+$/.test(str);
}

const convertValueToReadableFormat = (value: string) => {
  return roundToPrecision(value);
};

const roundToPrecision = (value: string) => {
  const [preDecimal, afterDecimal] = value.split(".");
  console.log(preDecimal, afterDecimal);
  if (typeof afterDecimal === "undefined") {
    return value;
  }
  return `${preDecimal}.${roundDecimal(afterDecimal)}`;
};

const roundDecimal = (value: string) => {
  const charList = value.split("");
  if (charList.length < 4) {
    return value;
  }
  const fourth = charList[3];
  if (Number(fourth) > 4) {
    charList[2] = String(Number(charList[2]) + 1);
  }
  let finalString: string = "";
  for (let i = 0; i <= 3; i++) {
    finalString += charList[i];
  }
  return finalString.slice(0, 3);
};
