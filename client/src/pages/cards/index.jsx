/* eslint-disable react-hooks/rules-of-hooks */
import SwipeableCard from '#components/swipeable-card/index.jsx';
import UserCard from '#components/user-card';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLoaderData } from 'react-router';
import styles from './styles.module.css';
import Card from '#components/card/index.jsx';
import { callApi } from '#utils/callApi';

export default function page() {
  const initialData = useLoaderData();

  const [showTip, setShowTip] = useState(true);
  const [data, setData] = useState(initialData);

  const handleLike = (id) => {
    callApi('/likes/like', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ cardId: id }),
    });
  };

  const handleDislike = (id) => {
    callApi('/likes/dislike', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ cardId: id }),
    });
  };
  const handleRemove = (id) => {
    const callback = (side) => {
      if (!side) return;
      if (side) setData((prev) => prev.filter((card) => card.id !== id));
      if (side === 'right') {
        handleLike(id);
        return;
      }
      handleDislike(id);
    };
    return callback;
  };

  return (
    <div className={styles.cardContainer}>
      <AnimatePresence>
        {showTip && (
          <SwipeableCard onRemove={() => setShowTip(false)}>
            <Card
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px 0px',
                height: '100%',
                width: '100%',
              }}
              text={
                <span
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    display: 'block',
                    color: 'var(--blue)',
                    fontWeight: 'bold',
                    fontSize: '24px',
                  }}
                >
                  Свайп вправо,
                  <br /> чтобы поставить лайк <br />
                  <br />
                  Свайп влево,
                  <br /> чтобы отказать
                </span>
              }
            />
          </SwipeableCard>
        )}
        {data.map((card) => (
          <SwipeableCard
            key={card.id}
            onRemove={handleRemove(card.id)}
          >
            <UserCard card={card} />
          </SwipeableCard>
        ))}
      </AnimatePresence>
    </div>
  );
}
