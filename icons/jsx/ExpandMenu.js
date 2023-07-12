import React from 'react';

function ExpandMenu({ className, scale }) {
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
      <g fill="#E5E5E5">
        <circle cx="1.207" cy="5.001" r="1.207"></circle>
        <circle cx="5" cy="5.001" r="1.206"></circle>
        <circle cx="8.794" cy="5.001" r="1.206"></circle>
      </g>
    </svg>
  );
}

export default ExpandMenu;
