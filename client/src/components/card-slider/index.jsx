import Card from '#components/card';
import Button from '#components/button';
import styles from './styles.module.css';

import { useState } from 'react';
const CardSlider = (props) => {
  const { className, cards, terminate = false, ...otherProps } = props;
  const [current, setCurrent] = useState(0);

  const nextCard = () => {
    setCurrent((prevIndex) =>
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevCard = () => {
    setCurrent((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className={styles.container + (className ? ' ' + className : '')}>
      <div className={styles.slider}>
        <div
          className={styles.cardWrapper}
          style={{
            transform: `translateX(calc(${current * -100}% - ${
              current * 20
            }px))`,
          }}
        >
          {cards.map((card, index) => (
            <Card
              key={index}
              {...card}
              className={styles.card}
            />
          ))}
        </div>
        {!(cards.length - 1 == current && terminate) ? (
          <div className={styles.buttons}>
            {current != 0 && <Button onClick={prevCard}>Назад</Button>}
            {cards.length - 1 && <Button onClick={nextCard}>Далее</Button>}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CardSlider;
