import React from 'react';

function SubtaskChecked({ scale }) {
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
    >
      <path
        fill="currentColor"
        d="M5 1c2.206 0 4 1.794 4 4S7.206 9 5 9 1 7.205 1 5s1.794-4 4-4m0-1a5 5 0 10.001 10.001A5 5 0 005 0z"
      ></path>
      <circle cx="5" cy="5" r="2.954" fill="currentColor"></circle>
    </svg>
  );
}

export default SubtaskChecked;
