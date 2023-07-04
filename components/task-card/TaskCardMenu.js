import TaskDeleteButton from '@/icons/jsx/TaskDeleteButton';
import Menu from '../UI/Menu';
import TaskEditButton from '@/icons/jsx/TaskEditButton';
import DropAnimation from '../animation/DropAnimation';

const TaskCardMenu = props => {
  const { menuClose, onEdit, onDelete } = props;

  return (
    <div className="absolute flex z-50 top-4 right-0">
      <DropAnimation>
        <Menu>
          <div className="px-1 h-[22px] pb-[2px]">
            <button
              onClick={() => {
                onEdit();
                menuClose();
              }}
              className="group relative mr-[2px]  hover:scale-125"
            >
              <TaskEditButton />
              <p
                className="absolute bottom-2 scale-0 group-hover:scale-100 
            text-xs"
              >
                edit
              </p>
            </button>
            <button
              onClick={() => {
                onDelete();
                menuClose();
              }}
              className="group relative hover:scale-125 "
            >
              <TaskDeleteButton />
              <p
                className="absolute bottom-2 scale-0 group-hover:scale-100 
            text-xs"
              >
                delete
              </p>
            </button>
          </div>
        </Menu>
      </DropAnimation>
    </div>
  );
};

export default TaskCardMenu;
