import { motion } from 'framer-motion';

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
    <motion.div
      animate={{
        y: ['-20%', '20%', '0%'],
        rotate: [0, 1, -1, 0],
      }}
      exit={{ opacity: [1, 0.5, 0], y: ['0%', '-50%', '-100%'] }}
      transition={bounceTransition}
    >
      {children}
    </motion.div>
  );
};

export default TaskCardAnimation;
