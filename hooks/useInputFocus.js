import { useEffect, useRef } from 'react';

const useInputFocus = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return inputRef;
};

export default useInputFocus;
