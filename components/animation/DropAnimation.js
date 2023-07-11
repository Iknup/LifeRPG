import { motion } from 'framer-motion';

const DropAnimation = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: '-100%' }}
      animate={{ opacity: [0, 1], y: ['-20%', '0%'] }}
      exit={{ opacity: [1, 0], y: ['0%', '-20%'] }}
      transition={{ y: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export default DropAnimation;
