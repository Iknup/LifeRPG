module.exports = (svgCode, options) => {
  // Manipulate the svgCode and generate the JSX output
  const jsxCode = `
    import React from 'react';

    const IconComponent = (${options.templateProps}) => (
      ${svgCode}
    );

    export default IconComponent;
  `;

  return jsxCode;
};
