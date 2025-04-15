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
    trackMouse: false,
  });

  useEffect(() => {
    if (removing) onSwipe(removing);
  }, [removing]);

  return (
    <motion.div
      layout
      initial={{ opacity: 1, x: 0, y: 0 }}
      exit={{
        opacity: 0,
        x: removing ? (removing === 'left' ? -300 : 300) : 0,
      }}
      transition={{ duration: 0.2 }}
      {...swipeHandlers}
    >
      {children}
    </motion.div>
  );
};

export default SwipeableCard;
