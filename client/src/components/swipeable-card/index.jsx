import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

const SwipeableCard = (props) => {
  const { children, onSwipe, ...otherProps } = props;
  const [removing, setRemoving] = useState(undefined);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      setRemoving('left');
    },
    onSwipedRight: () => {
      setRemoving('right');
    },
    trackMouse: true,
  });

  useEffect(() => {
    if (removing) onSwipe(removing);
  }, [removing]);

  return (
    <motion.div
      layout
      initial={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: removing === 'left' ? -300 : 300 }}
      transition={{ duration: 0.2 }}
      {...swipeHandlers}
    >
      {children}
    </motion.div>
  );
};

export default SwipeableCard;
