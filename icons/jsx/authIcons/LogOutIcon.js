import React from 'react';

function LogOutIcon({ scale }) {
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
      <g fill="#E5E5E5">
        <path d="M5.438 7L5.438 8.5 1.5 8.5 1.5 1.5 5.438 1.5 5.438 3 6.938 3 6.938 0 0 0 0 10 6.938 10 6.938 7z"></path>
        <path d="M3 4.328H8.18V5.828H3z"></path>
        <path d="M8.18 3.338L10 5.078 8.18 6.818z"></path>
      </g>
    </svg>
  );
}

export default LogOutIcon;
