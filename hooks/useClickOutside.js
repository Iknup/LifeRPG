import { useEffect, useRef } from 'react';

const useClickOutside = handler => {
  const domNode = useRef();

  useEffect(() => {
    const fx = e => {
      if (!domNode.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', fx);

    return () => {
      document.removeEventListener('mousedown', fx);
    };
  }, []);

  return domNode;
};

export default useClickOutside;
