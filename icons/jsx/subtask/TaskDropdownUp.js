import React from 'react';

function TaskDropdownUp({ className, scale }) {
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
        d="M11.551 7.489a1.508 1.508 0 01-2.133 2.132L6 6.203 2.581 9.621a1.506 1.506 0 01-2.131 0 1.505 1.505 0 010-2.132L6 1.938l5.551 5.551z"
      ></path>
    </svg>
  );
}

export default TaskDropdownUp;
