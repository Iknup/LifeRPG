const { useSelector } = require('react-redux');

const useFindOption = id => {
  const isMatch = useSelector(state => state.options.options.sectionId === id);

  if (isMatch) {
    const options = useSelector(state => state.options.options);
    return options;
  } else false;
};

export default useFindOption;
