import { editSection } from '@/slices/userSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const EditSection = props => {
  const { sectionData, onClose } = props;
  const [sectionTitle, setSectionTitle] = useState(sectionData.title);
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();

  const onInputChangeHandler = e => {
    setSectionTitle(e.target.value);
    if (sectionTitle.length !== 0) {
      setShowError(false);
    }
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    if (sectionTitle.length === 0) {
      setShowError(true);
    } else {
      const sectionDoc = { _id: sectionData._id, title: sectionTitle };
      dispatch(editSection(sectionDoc));
      onClose();
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <input
        onChange={onInputChangeHandler}
        value={sectionTitle}
        type="text"
        className={`${
          !showError && 'mb-5'
        } pb-1 mx-2 text-2xl font-bold bg-ColorFour ${
          showError && 'bg-DarkRed'
        }`}
        autoFocus
      />
      {showError && (
        <p className="text-LightRed text-sm">
          Section name needs to be longer than 1 character
        </p>
      )}
    </form>
  );
};

export default EditSection;
