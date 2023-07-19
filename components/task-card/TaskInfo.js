import { getRequiredExpForLevel, getPrevLevelExp } from '@/utility/levelexp';
import { AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { deleteTask, editTask, taskActions } from '@/slices/taskSlice';
import { useDispatch } from 'react-redux';
import ConfirmModal from '../Modals/ConfirmModal';
import Unchecked from '@/icons/jsx/NewChecked/Unchecked';
import Checked from '@/icons/jsx/NewChecked/Checked';
import CheckHover from '@/icons/jsx/NewChecked/CheckHover';
import Repeat from './Repeat';
import TaskCardUI from '../UI/TaskCardUI';
import TaskDropDown from './TaskDropDown';
import TaskCardMenu from './TaskCardMenu';
import useClickOutside from '../../hooks/useClickOutside';
import ExpandMenu from '@/icons/jsx/ExpandMenu';
import TaskDropdownUp from '@/icons/jsx/subtask/TaskDropdownUp';
import TaskDropdownDown from '@/icons/jsx/subtask/TaskDropdownDown';
import { useIsOverflow } from '@/hooks/useIsOverflow';

const TaskInfo = props => {
  const { task } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checked, setChecked] = useState(task.isComplete);
  const [isHovered, setIsHovered] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const { taskEditHandler } = props;
  const dispatch = useDispatch();
  const descriptionRef = useRef();
  const isOverflow = useIsOverflow(descriptionRef);

  // calcs
  const nextLevelExp = getRequiredExpForLevel(task.level);
  const prevLevelExp = getPrevLevelExp(task.level);
  const clearRate = (task.timeCompleted / task.timeGenerated) * 100;
  const expBar =
    (
      ((task.experience - prevLevelExp) / (nextLevelExp - prevLevelExp)) *
      100
    ).toFixed(1) + '%';

  // CheckboxButton chnages

  let checkboxButton = checked ? (
    <Checked className={'checkbox-button'} />
  ) : (
    <Unchecked className={'checkbox-button'} />
  );

  if (isHovered) {
    checkboxButton = <CheckHover className={'checkbox-button'} />;
  }

  // onClearhandler
  const onClearHandler = taskId => {
    const updatedData = { taskId: task._id, isComplete: task.isComplete };

    dispatch(editTask({ taskData: updatedData, isEdit: false }));
    setChecked(!checked);
  };

  const onCheckboxClickHandler = () => {
    onClearHandler(task._id);
  };

  // Delete handler
  const onClickDeleteHandler = () => {
    dispatch(deleteTask(task._id));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  //modal open and close functions
  const modalOpen = () => {
    setIsModalOpen(true);
  };

  const modalClose = () => {
    setIsModalOpen(false);
  };

  const dropDownHandler = () => {
    setDropDown(!dropDown);
  };

  //menu close function
  const menuCloseHandler = () => {
    setIsMenuOpen(false);
  };

  const domNode = useClickOutside(() => {
    setIsMenuOpen(false);
  });

  const fullDescDomNode = useClickOutside(() => {
    setShowFullDesc(false);
  });

  //show description function
  const onDescriptionClickHandler = () => {
    if (isOverflow) {
      setShowFullDesc(prevState => !prevState);
    }
  };

  return (
    <div className="mb-3">
      <TaskCardUI>
        {/* Interaction menu button */}
        <div ref={domNode} className="pr-1.5 pt-1.5 flex justify-end relative">
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            className="hover:scale-125"
          >
            <ExpandMenu />
          </button>
          {isMenuOpen && (
            <AnimatePresence>
              <TaskCardMenu
                menuClose={menuCloseHandler}
                onEdit={taskEditHandler}
                onDelete={modalOpen}
              />
            </AnimatePresence>
          )}
        </div>
        {/* Check box and task description */}
        <div
          ref={fullDescDomNode}
          className="flex items-center min-h-[50%] ml-4 relative"
        >
          <button
            onClick={onCheckboxClickHandler}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {checkboxButton}
          </button>
          {showFullDesc && (
            <div className="absolute left-6 top-0 -translate-y-[90%] w-[80%]">
              <p 
              className="bg-ColorFive rounded-md p-2">{task.description}</p>
              <div
                className="h-0 w-0 
        border-x-8 border-x-transparent 
        border-t-8 border-t-ColorFive
        mx-auto"
              />
            </div>
          )}
          <p
            onClick={onDescriptionClickHandler}
            ref={descriptionRef}
            className={`grow indent-3 text-[18px]  truncate   
             mr-3 ${isOverflow && 'cursor-pointer'}`}
          >
            {task.description}
          </p>
          <Repeat
            key={task._id}
            repeat={task.repeat}
            selectedDays={task.selectedDays ? task.selectedDays : null}
          />
        </div>
        {/* level and exp */}
        <div className="flex justify-between mx-3 text-[15px] group relative">
          {task.isRPG && <p>Lv {task.level}</p>}
          <button
            onClick={dropDownHandler}
            className="text-ColorSix flex justify-center w-[90%] absolute top-2 left-4
               group-hover:text-TextColor
            group-hover:scale-150 group-hover:animate-bounce "
          >
            {dropDown ? (
              <TaskDropdownUp scale={12} />
            ) : (
              <TaskDropdownDown scale={12} />
            )}
          </button>
          {task.isRPG && <p>{expBar}</p>}
        </div>

        {/* exp bar */}
        {task.isRPG && (
          <div className="w-full h-[7%] rounded-b-md bg-ColorOne overflow-x-hidden absolute bottom-0">
            <div
              className="bg-colorMain h-full rounded-bl-md"
              style={{ width: expBar }}
            ></div>
          </div>
        )}
        <AnimatePresence>
          {isModalOpen && (
            <ConfirmModal
              confirm={onClickDeleteHandler}
              reject={modalClose}
              message={'Do you wish to delete?'}
            />
          )}
        </AnimatePresence>
      </TaskCardUI>
      <AnimatePresence>
        {dropDown && (
          <TaskDropDown
            statusData={{
              clearRate,
              expPercent: expBar,
              nextLevelExp,
              experience: task.experience,
              timesCompleted: task.timeCompleted,
              timesGenereated: task.timeGenerated,
              createdAt: task.createdAt,
              hasSubTask: task.hasSubTask,
              taskId: task._id,
              isRPG: task.isRPG,
              repeat: task.repeat,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskInfo;
