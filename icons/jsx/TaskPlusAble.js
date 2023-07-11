import React from 'react';

function TaskPlusAble({ className, scale }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={scale}
      height={scale}
      x="0"
      y="0"
      version="1.1"
      viewBox="0 0 10 10"
      xmlSpace="preserve"
      className={className}
    >
      <path
        fill="#26B577"
        d="M5 0C2.238 0 0 2.238 0 5s2.238 5 5 5 5-2.238 5-5-2.238-5-5-5zm3.476 5.169c0 .385-.315.7-.7.7H5.869v1.906a.7.7 0 01-.7.7h-.338a.7.7 0 01-.7-.7V5.869H2.225a.702.702 0 01-.7-.7v-.338c0-.385.315-.7.7-.7h1.906V2.225a.7.7 0 01.7-.7h.338a.7.7 0 01.7.7v1.906h1.906c.385 0 .7.315.7.7v.338z"
      ></path>
    </svg>
  );
}

export default TaskPlusAble;
