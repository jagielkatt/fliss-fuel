import React, { useState } from "react";
import cx from "classnames";

import "./Converter.scss";
import { NumberInput } from "../numberInput/NumberInput";

const POUND_TO_KG = 0.45359237;

const UNITS = {
  POUNDS_GALLON: "lbs/gal.",
  KG_LITER: "kg/l",
  POUNDS: "lbs",
  KG: "kg",
  GALLON: "gal.",
  LITER: "l",
};

export const Calculator = () => {
  const [currentWeight, setCurrentWeight] = useState<number>(0);
  const [currentVolume, setCurrentVolume] = useState<number>(0);
  const [wantedWeight, setWantedWeight] = useState<number>(0);
  const [wantedVolume, setWantedVolume] = useState<number>(0);
  const [togglePounds, setTogglePounds] = useState(true);
  const [density, setDensity] = useState(6.7);

  return (
    <div className="converter">
      <div className="emoji-wrapper">
        lbs
        <div
          className="emoji-button"
          onClick={() => {
            setTogglePounds(!togglePounds);
          }}
        >
          <span
            className={cx("emoji-button__emoji", {
              "emoji-button__emoji--left": togglePounds,
              "emoji-button__emoji--right": !togglePounds,
            })}
          >
            &#128054;
          </span>
        </div>
        kg
      </div>
      <div>
        <div className="converter__section">
          <NumberInput
            placeholder={togglePounds ? UNITS.POUNDS_GALLON : UNITS.KG_LITER}
            value={density}
            onChange={(val) => setDensity(val)}
            unit={togglePounds ? UNITS.POUNDS_GALLON : UNITS.KG_LITER}
            label={"Density"}
          />
        </div>
        <div className="converter__section  converter__input-wrapper">
          <NumberInput
            placeholder={togglePounds ? UNITS.POUNDS : UNITS.KG}
            value={currentWeight}
            onChange={(val) => {
              setCurrentWeight(val);
              setCurrentVolume(val / density);
            }}
            unit={togglePounds ? UNITS.POUNDS : UNITS.KG}
            label={"Current weight"}
          />
          <NumberInput
            placeholder={togglePounds ? UNITS.GALLON : UNITS.LITER}
            value={currentVolume}
            onChange={(val) => {
              setCurrentVolume(val);
              setCurrentWeight(val * density);
            }}
            unit={togglePounds ? UNITS.GALLON : UNITS.LITER}
            label={"Current amount"}
          />
        </div>
        <dl className="converter__section converter__list">
          <dt>{togglePounds ? UNITS.POUNDS : UNITS.KG}</dt>
          <dd>{currentWeight}</dd>
          <dt>{togglePounds ? "Gallons" : "Liters"}</dt>
          <dd>{currentVolume}</dd>
          <dt>{togglePounds ? UNITS.KG : UNITS.POUNDS}</dt>
          <dd>
            {togglePounds
              ? currentWeight * POUND_TO_KG
              : currentWeight / POUND_TO_KG}
          </dd>
        </dl>
        <div className="converter__section converter__input-wrapper">
          <NumberInput
            placeholder={togglePounds ? UNITS.POUNDS : UNITS.KG}
            value={wantedWeight}
            onChange={(val) => {
              setWantedWeight(val);
              setWantedVolume(val / density);
            }}
            unit={togglePounds ? UNITS.POUNDS : UNITS.KG}
            label={"Wanted weight"}
          />
          <NumberInput
            placeholder={togglePounds ? UNITS.POUNDS : UNITS.KG}
            value={wantedVolume}
            onChange={(val) => {
              setWantedVolume(val);
              setWantedWeight(val * density);
            }}
            unit={togglePounds ? UNITS.POUNDS : UNITS.KG}
            label={"Wanted amount"}
          />
        </div>
      </div>
      <dl className="converter__section converter__list">
        <dt>{togglePounds ? UNITS.POUNDS : UNITS.KG}</dt>
        <dd>{wantedWeight}</dd>
        <dt>{togglePounds ? "Gallons" : "Liters"}</dt>
        <dd>{wantedVolume}</dd>
        <dt>{togglePounds ? UNITS.KG : UNITS.POUNDS}</dt>
        <dd>
          {togglePounds
            ? wantedWeight * POUND_TO_KG
            : wantedWeight / POUND_TO_KG}
        </dd>
      </dl>
      <h2>Difference</h2>
      <hr />
      <dl className="converter__section converter__list">
        <dt>{togglePounds ? UNITS.POUNDS : UNITS.KG}</dt>
        <dd>{wantedWeight - currentWeight}</dd>
        <dt>{togglePounds ? "Gallons" : "Liters"}</dt>
        <dd>{wantedVolume - currentVolume}</dd>
        <dt>{togglePounds ? UNITS.KG : UNITS.POUNDS}</dt>
        <dd>
          {togglePounds
            ? wantedWeight * POUND_TO_KG - currentWeight * POUND_TO_KG
            : wantedWeight / POUND_TO_KG - currentWeight / POUND_TO_KG}
        </dd>
      </dl>
      <details className="converter__section">
        <summary>Definitions</summary>
        <p>1 pound = {POUND_TO_KG} kg</p>
      </details>
    </div>
  );
};
