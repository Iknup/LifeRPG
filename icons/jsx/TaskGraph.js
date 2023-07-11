import React from 'react';

function TaskGraph({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      x="0"
      y="0"
      version="1.1"
      viewBox="0 0 10 10"
      xmlSpace="preserve"
      className={className}
    >
      <path fill="#E5E5E5" d="M4 4.732H6V10H4z"></path>
      <path fill="#E5E5E5" d="M7.25 2.511H9.25V10H7.25z"></path>
      <path fill="#E5E5E5" d="M0.75 0H2.75V10H0.75z"></path>
    </svg>
  );
}

export default TaskGraph;
