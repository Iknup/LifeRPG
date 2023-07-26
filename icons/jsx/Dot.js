import React from 'react';

function Dot({ scale }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={scale || '20'}
      height={scale || '20'}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="2" fill="currentColor"></circle>
    </svg>
  );
}

export default Dot;
