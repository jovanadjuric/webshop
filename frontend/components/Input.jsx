import React from "react";

function Input({ type, value, onChange, required }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="border rounded px-3 py-1 w-80"
    />
  );
}

export default Input;
