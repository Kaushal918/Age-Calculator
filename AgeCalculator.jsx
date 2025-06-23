import React, { useState } from "react";
import { DateTime } from "luxon";
import DatePicker from "./DatePicker.jsx";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState(null);
  const [error, setError] = useState("");

  const calculateAge = () => {
  setError("");
  setAge(null);

  const datePattern = /^(\d{2})-(\d{2})-(\d{4})$/;
  const match = birthDate.match(datePattern);

  if (!match) {
    setError("Invalid format. Use DD-MM-YYYY.");
    return;
  }

  const [_, day, month, year] = match;
  const dob = DateTime.fromFormat(birthDate, "dd-MM-yyyy");

  if (!dob.isValid || dob > DateTime.now()) {
    setError("Please enter a valid past date in DD-MM-YYYY format.");
    return;
  }

  const now = DateTime.now();
  const diff = now.diff(dob, ["years", "months", "days"]).toObject();

  setAge({
    years: Math.floor(diff.years),
    months: Math.floor(diff.months),
    days: Math.floor(diff.days),
  });
};


  return (
    <div className="calculator-container">
      <label>Enter your Birth Date (DD-MM-YYYY):</label>
      <DatePicker selectedDate={birthDate} onChange={setBirthDate} />
      <button onClick={calculateAge}>Calculate Age</button>

      {error && <p className="error">{error}</p>}

      {age && (
        <div className="result">
          <p>You are:</p>
          <h2>
            {age.years} years, {age.months} months, {age.days} days old.
          </h2>
        </div>
      )}
    </div>
  );
}
