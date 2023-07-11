import React from 'react';

function RPGCheck({ className, active }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      x="0"
      y="0"
      version="1.1"
      viewBox="0 0 10 10"
      xmlSpace="preserve"
      className={className}
    >
      <g fill={!active ? `#E5E5E5` : 'rgb(38,181,119)'}>
        <path d="M2.558 3.307H7.558V5.167H2.558z"></path>
        <path d="M2.558 9.182H7.558V10H2.558z"></path>
        <path d="M2.558 6.418H7.558V7.93H2.558z"></path>
        <path d="M0 3.307L4.999 0 10 3.307z"></path>
      </g>
    </svg>
  );
}

export default RPGCheck;
