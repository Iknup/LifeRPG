import { useReducer, useState } from 'react';
import TaskEditButton from '@/icons/jsx/TaskEditButton';
import Menu from '../UI/Menu';
import TaskDeleteButton from '@/icons/jsx/TaskDeleteButton';
import { Fragment } from 'react';
import SubtaskUnchecked from '@/icons/jsx/subtask/SubtaskUnchecked';
import { TASK_FILTER_ENUM } from '@/utility/ENUM';
import SubtaskChecked from '@/icons/jsx/subtask/SubtaskChecked';

// const reducer = (state, action )=> {
//   switch (action.type) {
//     case value:

//       break;

//     default:
//       break;
//   }
// }

const SectionMenu = props => {
  const { onEdit, onDelete, onClose, rpgSort, completeSort } = props;
  const menuButtonTxt = 'ml-[2px] text-[14px]';
  const [completeFilter, setCompleteFilter] = useState(TASK_FILTER_ENUM.FALSE);
  const [rpgChecked, setRpgChecked] = useState(false);
  // const [state, dispatch] = useReducer(reducer,{
  // })

  return (
    <Fragment>
      <div
        className="h-0 w-0 
        border-x-8 border-x-transparent 
        border-b-8 border-b-ColorFive
        mx-auto"
      />
      <Menu className="">
        <div className="py-1">
          <button
            onClick={() => {
              completeSort(TASK_FILTER_ENUM.FALSE);
              setCompleteFilter(TASK_FILTER_ENUM.FALSE);
            }}
            className="menu-button"
            type="checkbox"
          >
            {completeFilter === TASK_FILTER_ENUM.FALSE ? (
              <SubtaskChecked scale={12} />
            ) : (
              <SubtaskUnchecked scale={12} />
            )}
            <p className={menuButtonTxt}>Unclear</p>
          </button>
          <button
            onClick={() => {
              completeSort(TASK_FILTER_ENUM.TRUE);
              setCompleteFilter(TASK_FILTER_ENUM.TRUE);
            }}
            className="menu-button"
            type="checkbox"
          >
            {completeFilter === TASK_FILTER_ENUM.TRUE ? (
              <SubtaskChecked scale={12} />
            ) : (
              <SubtaskUnchecked scale={12} />
            )}
            <p className={menuButtonTxt}>Clear</p>
          </button>
          <button
            onClick={() => {
              completeSort(TASK_FILTER_ENUM.ALL);
              setCompleteFilter(TASK_FILTER_ENUM.ALL);
            }}
            className="menu-button"
            type="checkbox"
          >
            {completeFilter === TASK_FILTER_ENUM.ALL ? (
              <SubtaskChecked scale={12} />
            ) : (
              <SubtaskUnchecked scale={12} />
            )}

            <p className={menuButtonTxt}>All</p>
          </button>
          <div className=" mx-1 mb-1 border-b-2 border-b-ColorFour" />
          <button
            onClick={() => {
              setRpgChecked(prevState => !prevState);
              rpgSort(!rpgChecked);
            }}
            className="menu-button"
            type="checkbox"
          >
            {rpgChecked ? (
              <SubtaskChecked scale={12} />
            ) : (
              <SubtaskUnchecked scale={12} />
            )}
            <p className={menuButtonTxt}>RPGTask</p>
          </button>
          <div className=" mx-1 mb-1 border-b-2 border-b-ColorFour" />
          <button
            onClick={() => {
              onEdit();
              onClose();
            }}
            className="menu-button"
          >
            <TaskEditButton scale={12} />
            <p className={menuButtonTxt}>Edit</p>
          </button>
          <button
            onClick={() => {
              onDelete();
            }}
            className="menu-button"
          >
            <TaskDeleteButton scale={12} />
            <p className={menuButtonTxt}>Delete</p>
          </button>
        </div>
      </Menu>
    </Fragment>
  );
};

export default SectionMenu;
