import React, { useState } from 'react';

const AddNewTask = function (props) {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredDesc, setEnteredDesc] = useState('');

  const titleChangeHandler = function (e) {
    setEnteredTitle(e.target.value);
  };

  const descChangeHandler = function (e) {
    setEnteredDesc(e.target.value);
  };

  const submitHandler = function (e) {
    e.preventDefault();
    console.log(props);

    props.onSubmit(enteredTitle, enteredDesc);
  };

  return (
    <form onSubmit={submitHandler}>
      <h3>Add your New Task</h3>
      <label>Task Title</label>
      <input type="string" onChange={titleChangeHandler}></input>
      <label>Task description</label>
      <input type="string" onChange={descChangeHandler}></input>
      <button>Submit</button>
    </form>
  );
};

export default AddNewTask;
