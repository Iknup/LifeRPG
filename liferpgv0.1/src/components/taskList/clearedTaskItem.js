import TaskCard from '../../UI/Card Component/TaskCard';

const ClearedTaskItem = function (props) {
  const { task } = props;

  return (
    <TaskCard>
      <div>
        <input type="checkbox" disabled={true}></input>
      </div>
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div>
        <p>{task.clearedRate}%</p>
        <p>{`${task.clearedAmount}/${task.generatedAmount}`}</p>
      </div>
    </TaskCard>
  );
};

export default ClearedTaskItem;
