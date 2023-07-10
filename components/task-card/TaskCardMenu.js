import TaskDeleteButton from '@/icons/jsx/TaskDeleteButton';
import Menu from '../UI/Menu';
import TaskEditButton from '@/icons/jsx/TaskEditButton';
import DropAnimation from '../animation/DropAnimation';

const TaskCardMenu = props => {
  const { menuClose, onEdit, onDelete } = props;

  return (
    <div className="absolute z-50 top-4 -right-4 w-[70px]">
      <DropAnimation>
        <div
          className="h-0 w-0 
        border-x-8 border-x-transparent 
        border-b-8 border-b-ColorFour
        mx-auto"
        ></div>
        <Menu
          className=" h-fit pt-[2px] pb-1 px-1 grid-cols-1 gap-1
         shadow-menuShadow
        "
        >
          <button
            onClick={() => {
              onEdit();
              menuClose();
            }}
            className="flex group w-max mr-[2px] 
            hover:scale-110 hover:border-b hover: border-b-TextColor"
          >
            <TaskEditButton scale={12} className="my-auto" />
            <p
              className="ml-1  group-hover:scale-100 
            text-xs"
            >
              Edit
            </p>
          </button>
          <button
            onClick={() => {
              onDelete();
              menuClose();
            }}
            className="flex group  hover:scale-110 
            hover:border-b hover: border-b-TextColor"
          >
            <TaskDeleteButton scale={12} className="my-auto" />
            <p
              className=" ml-1 group-hover:scale-100 
            text-xs"
            >
              Delete
            </p>
          </button>
        </Menu>
      </DropAnimation>
    </div>
  );
};

export default TaskCardMenu;
