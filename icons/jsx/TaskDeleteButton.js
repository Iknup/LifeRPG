import React from 'react';

function TaskDeleteButton({ className, scale }) {
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
        fill="#E5E5E5"
        d="M9.26 1.65c0 .413-.338.75-.75.75H1.49a.752.752 0 01-.75-.75c0-.413.337-.75.75-.75h7.02c.412 0 .75.337.75.75z"
      ></path>
      <path
        fill="#E5E5E5"
        d="M1.813 1.425L2.21 10h5.58l.397-8.575H1.813zm2.093 6.059h-.625V4.281h.625v3.203zm1.407 0h-.625V4.281h.625v3.203zm1.406 0h-.625V4.281h.625v3.203z"
      ></path>
      <path
        fill="#E5E5E5"
        d="M5.9.4a.4.4 0 00-.4-.4h-1a.4.4 0 00-.4.4v1c0 .22.18.4.4.4h1a.4.4 0 00.4-.4v-1z"
      ></path>
    </svg>
  );
}

export default TaskDeleteButton;
