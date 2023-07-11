import ReactDOM from 'react-dom';

const Backdrop = props => {
  const { children, onClose } = props;
  return ReactDOM.createPortal(
    <div
      onClick={() => {
        onClose();
      }}
      className="fixed inset-0 z-40"
    >
      {children}
    </div>,
    document.getElementById('backdrop-root')
  );
};

export default Backdrop;
