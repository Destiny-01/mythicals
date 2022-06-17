import React from "react";

export default function Button({ children, type, onClick }) {
  const defaultClass = `bg-gradient-to-b from-main via-gradient to-main border-main text-white`;
  const outlineClass = `bg-transparent border-main text-main`;
  return (
    <button
      className={`${
        type === "outline" ? outlineClass : defaultClass
      } py-3 px-7 font-medium text-base rounded border`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
