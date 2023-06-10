import { motion, AnimatePresence } from 'framer-motion';

const TaskCardAnimation = ({ children }) => {
  const bounceTransition = {
    y: {
      duration: 0.4,
      ease: 'easeOut',
    },
    rotate: {
      duration: 0.8,
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        animate={{
          y: ['-20%', '20%', '0%'],
          rotate: [0, 1, -1, 0],
        }}
        exit={{ opacity: 0, y: ['-100%'] }}
        transition={bounceTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default TaskCardAnimation;
