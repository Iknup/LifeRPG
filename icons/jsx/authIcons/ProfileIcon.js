import React from 'react';

function ProfileIcon({ scale }) {
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
        <ellipse cx="5" cy="1.813" rx="1.731" ry="1.813"></ellipse>
        <path d="M5 3.5c-2.209 0-4 2.91-4 6.5h8c0-3.59-1.791-6.5-4-6.5z"></path>
      </g>
    </svg>
  );
}

export default ProfileIcon;
