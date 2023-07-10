import React from 'react';

function TaskEditButton({ className, scale }) {
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
        d="M7.551 10H1.656C1.048 10 .552 9.521.552 8.934V1.901c0-.588.495-1.067 1.104-1.067h5.722c.607 0 1.102.479 1.102 1.067v7.033C8.479 9.521 8.158 10 7.551 10zM1.656 1.833c-.063 0-.104.04-.104.067v7.033c.001.027.042.067.104.067h5.722c.062 0 .102-.039.102-.066V1.901c0-.027-.04-.067-.102-.067H1.656z"
      ></path>
      <path fill="#E5E5E5" d="M2.314 2.961H7.021V3.961H2.314z"></path>
      <path fill="#E5E5E5" d="M2.314 5.047H7.021V6.047H2.314z"></path>
      <path
        fill="#E5E5E5"
        d="M5.185 5.101L5.014 7.506 7.026 6.179 7.015 6.173 10 1.07 8.171 0z"
      ></path>
      <path
        fill="#E5E5E5"
        d="M2.314 7.133H5.077999999999999V8.133H2.314z"
      ></path>
    </svg>
  );
}

export default TaskEditButton;
