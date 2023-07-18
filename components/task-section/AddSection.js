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
      <form onSubmit={onSubmitHandler} ref={domNode} className="w-[90%]">
        <input
          onChange={onSectionTitleHandler}
          type="text"
          ref={inputRef}
          value={title}
          placeholder="Section Name"
          className="pl-1 rounded-t-md h-12 bg-ColorThree w-full
          indent-2 text-2xl
       placeholder:text-TextColor placeholder:text-2xl placeholder:font-bold"
        />
        <p className="indent-3 py-1 bg-ColorTwo rounded-b-md">
          give me a name father!
        </p>
      </form>
    </div>
  );
};

export default AddSection;
