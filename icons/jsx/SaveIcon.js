import React from 'react';

function SaveIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      version="1.1"
      viewBox="0 0 64 64"
      xmlSpace="preserve"
      className={`${className}`}
    >
      <g>
        <path d="M35.267 6.041h-8v10h8v-10zm-1.897 8.102h-4.205V7.94h4.205v6.204zM41 47.041H21a1 1 0 100 2h20a1 1 0 100-2zM41 39.041H21a1 1 0 100 2h20a1 1 0 100-2z"></path>
        <path d="M12 56.041h38v-26H12v26zm2-24h34v22H14v-22z"></path>
        <path d="M49.381.041L49.361 0H7a4 4 0 00-4 4v56a4 4 0 004 4h50a4 4 0 004-4V11.696L49.381.041zm-9.42 2.04V20H14.038V2.082H39.96zM59 60c0 1.103-.897 2-2 2H7c-1.103 0-2-.897-2-2V4c0-1.103.897-2 2-2h5v20.041h30V2h6.51L59 12.523V60z"></path>
      </g>
    </svg>
  );
}

export default SaveIcon;
