import React from 'react';

function TaskDropdownDown({ className, scale }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={scale || '10'}
      height={scale || '10'}
      x="0"
      y="0"
      version="1.1"
      viewBox="0 0 12 12"
      xmlSpace="preserve"
      className={className}
    >
      <path
        fill="currentColor"
        // fill="#3C3E42"
        d="M6 10.063L.45 4.511a1.505 1.505 0 010-2.132 1.506 1.506 0 012.131 0L6 5.797l3.418-3.418a1.508 1.508 0 012.133 2.132L6 10.063z"
      ></path>
    </svg>
  );
}

export default TaskDropdownDown;
