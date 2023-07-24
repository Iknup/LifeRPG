import { useDragLayer } from 'react-dnd';
import TaskCardUI from './TaskCardUI';

const TaskCardDragLayer = props => {
  const { item, itemType, isDragging, currentOffset } = useDragLayer(
    monitor => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      isDragging: monitor.isDragging(),
      currentOffset: monitor.getSourceClientOffset(),
    })
  );

  const getItemStyles = () => {
    if (!currentOffset) {
      return { display: 'none' };
    }

    const { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;

    return {
      position: 'fixed',
      left: 0,
      top: 0,
      transform,
      WebkitTransform: transform,
    };
  };

  if (!isDragging) {
    return null;
  }

  return (
    <div style={getItemStyles()}>
      <TaskCardUI>
        <div>TAAASSK</div>
      </TaskCardUI>
    </div>
  );
};

export default TaskCardDragLayer;
