import React from 'react';

const TaskListRender = function (props) {
  console.log(props.task);
  const taskMarkup = props.task.map(task => {
    return (
      <div key={task.id}>
        <label>{task.title}</label>
        <label>{task.description}</label>
      </div>
    );
  });
  return <div>{taskMarkup}</div>;
};

export default TaskListRender;
