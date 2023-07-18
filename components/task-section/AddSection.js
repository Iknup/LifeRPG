import useClickOutside from '@/hooks/useClickOutside';
import useInputFocus from '@/hooks/useInputFocus';
import { addSection } from '@/slices/userSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AddSection = props => {
  const user = useSelector(state => state.users.user);
  const { onClose } = props;
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const inputRef = useInputFocus();

  const onSectionTitleHandler = e => {
    setTitle(e.target.value);
  };

  const domNode = useClickOutside(() => {
    onClose();
  });

  const onSubmitHandler = e => {
    e.preventDefault();
    const userId = user._id;
    console.log(user);
    dispatch(
      addSection({ sectionData: { title: title, user: userId }, userId })
    );
    onClose();
  };

  return (
    <div className="task-section">
      <form onSubmit={onSubmitHandler} ref={domNode}>
        <input
          onChange={onSectionTitleHandler}
          type="text"
          ref={inputRef}
          value={title}
          placeholder="Section Name"
          className="pl-1 rounded-md h-[36px] bg-ColorFive w-[90%]
       placeholder:text-TextColor"
        />
      </form>
    </div>
  );
};

export default AddSection;
