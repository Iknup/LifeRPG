import React from 'react';

function SortingButton({ scale, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={scale || '10'}
      height={scale || '10'}
      x="0"
      y="0"
      version="1.1"
      viewBox="0 0 10 10"
      xmlSpace="preserve"
      className={className}
    >
      <g
        fill="none"
        stroke="#CCC"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      >
        <path d="M3.562 1L3.562 9 1.312 7.168"></path>
        <path d="M6.438 9L6.438 1 8.688 2.834"></path>
      </g>
    </svg>
  );
}

export default SortingButton;
