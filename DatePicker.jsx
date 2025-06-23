import React from "react";

export default function DatePicker({ selectedDate, onChange }) {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
 <input
  type="text"
  placeholder="DD-MM-YYYY"
  value={selectedDate}
  onChange={handleInputChange}
  maxLength={10}
  inputMode="numeric"
/>

  );
}
