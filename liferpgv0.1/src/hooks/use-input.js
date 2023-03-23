import { useState } from 'react';

const useInput = function (needValidate, validateFn) {
  const [enteredInput, setEnteredInput] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  let validInput;
  if (!needValidate) {
    validInput = true;
  }
  if (needValidate) {
    validInput = validateFn(enteredInput);
  }

  const hasError = !validInput && isTouched;

  const changeInputHandler = function (e) {
    const inputValue = e.target.value;
    setEnteredInput(inputValue);
  };

  const onblurHandler = function () {
    setIsTouched(true);
  };

  const reset = function () {
    setEnteredInput('');
    setIsTouched(false);
  };

  return {
    value: enteredInput,
    isValid: validInput,
    hasError,
    changeInputHandler,
    onblurHandler,
    reset,
  };
};

export default useInput;
