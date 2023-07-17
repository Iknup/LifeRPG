import TaskDeleteButton from '@/icons/jsx/TaskDeleteButton';
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
    items-center justify-center z-50 flex flex-col 
    absolute backdrop-filter backdrop-blur-[2px]"
    >
      <div className="bg-ColorThree h-[80%] w-[60%] pt-1 rounded-lg">
        <TaskDeleteButton scale={20} className="text-LightRed mx-auto" />
        <p className="text-center mt-1">{message}</p>
        <div className="bg-ColorTwo h-[40%] flex justify-evenly mt-1 ">
          <button onClick={onConfirm} className="text-LightRed">
            Confirm
          </button>
          <div className="border-l-[2px] border-TextColor h-3 my-auto" />
          <button onClick={onReject}>Cancel</button>
        </div>
      </div>
    </motion.div>
  );
};

export default Modal;
