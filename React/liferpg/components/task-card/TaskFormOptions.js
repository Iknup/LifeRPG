import { useState } from 'react';

const TaskFormOptions = props => {
  const { className, getOptionHandler } = props;

  const [repeatOption, setRepeatOption] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleSelectChange = event => {
    setRepeatOption(event.target.value);
  };

  const handleRPGCheckChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = () => {
    getOptionHandler({ repeat: repeatOption, isRPG: isChecked });
  };

  return (
    <div className={`border-l-2 border-l-secondary px-2 ${className} relative`}>
      <h1 className="text-center">Advanced Options</h1>
      <div className="mb-2">
        <div className="mb-2">Repeat?</div>
        <select onChange={handleSelectChange} className="bg-secondary">
          <option>None</option>
          <option>Daily</option>
          <option>Weekly</option>
          <option>Every Weekdays</option>
          <option>Every selected day</option>
        </select>
      </div>
      <div className="flex mb-2">
        <input
          onChange={handleRPGCheckChange}
          type="checkbox"
          className="mr-2"
        />
        <div className="flex items-center">
          <p>RPG task?</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 ml-1 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="ml-auto bg-green-700 py-[2px] px-[4px] rounded-lg mb-2 absolute bottom-0 right-0
        mr-3"
      >
        Submit
      </button>
    </div>
  );
};

export default TaskFormOptions;
