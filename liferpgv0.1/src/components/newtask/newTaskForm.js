const NewTaskForm = function () {
  return (
    <div>
      <h3>Make a new Quest!</h3>
      <label>Task</label>
      <input type="text" />
      <label>Description</label>
      <input type="text" />
      <button>Add</button>
      <button>Cancel</button>
    </div>
  );
};

export default NewTaskForm;
