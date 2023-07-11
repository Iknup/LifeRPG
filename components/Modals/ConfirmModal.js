import { motion } from 'framer-motion';

const Modal = props => {
  const { confirm, reject, message } = props;

  const onConfirm = () => {
    confirm();
  };

  const onReject = () => {
    reject();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: '-10%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '-10%' }}
      transition={{ type: 'tween', duration: 0.5 }}
      className="w-full h-full place-content-center inset-0 
    items-center justify-center z-50 flex flex-col absolute backdrop-filter backdrop-blur-sm"
    >
      <p className="mb-2">{message}</p>
      <div className="w-1/3 flex justify-between">
        <button onClick={onConfirm} className="btn-yes ">
          Yes
        </button>
        <button onClick={onReject} className=" btn-no">
          No
        </button>
      </div>
    </motion.div>
  );
};

export default Modal;
