import React from "react";

function Button({ type, children }) {
  return (
    <button
      className="bg-green-800 px-4 py-2 text-gray-100 rounded hover:bg-green-700 my-2"
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
