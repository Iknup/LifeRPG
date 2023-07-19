import TaskEditButton from '@/icons/jsx/TaskEditButton';
import Menu from '../UI/Menu';
import TaskDeleteButton from '@/icons/jsx/TaskDeleteButton';
import { Fragment } from 'react';

const SectionMenu = props => {
  const { onEdit, onDelete, onClose } = props;
  return (
    <Fragment>
      <div
        className="h-0 w-0 
        border-x-8 border-x-transparent 
        border-b-8 border-b-ColorFive
        ml-2"
      />
      <Menu>
        <div className="py-1">
          <button
            onClick={() => {
              onEdit();
              onClose();
            }}
            className="menu-button"
          >
            <TaskEditButton scale={12} className="mr-[2px]" />
            <p className=" text-[14px]">Edit</p>
          </button>
          <button
            onClick={() => {
              onDelete();
            }}
            className="menu-button"
          >
            <TaskDeleteButton scale={12} className="mr-[2px]" />
            <p className=" text-[14px]">Delete</p>
          </button>
        </div>
      </Menu>
    </Fragment>
  );
};

export default SectionMenu;
