import React from 'react';

function SubtaskCancel({ className, scale }) {
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
      <path
        fill="currentColor"
        d="M5 1c2.206 0 4 1.794 4 4S7.206 9 5 9 1 7.206 1 5s1.794-4 4-4m0-1C2.238 0 0 2.238 0 5s2.238 5 5 5 5-2.238 5-5-2.238-5-5-5z"
      ></path>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        d="M3.176 6.753L6.824 3.104"
      ></path>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        d="M6.824 6.753L3.176 3.104"
      ></path>
    </svg>
  );
}

export default SubtaskCancel;
