/* eslint-disable react-hooks/rules-of-hooks */
import { ThemeContext } from '#app/providers/theme';
import UserCard from '#components/user-card';
import { useContext } from 'react';
import { useLoaderData } from 'react-router';
import styles from './styles.module.css';

export default function page() {
  const data = useLoaderData();
  const theme = useContext(ThemeContext);

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <div className="button">Profile</div>
        <div className="button">Profile</div>
        <div className="button">Profile</div>
        <div className="button">Profile</div>
        <div className="button">Profile</div>
      </div>
      <div className={styles.content}>
        <div className={styles.cardContainer}>
          {data.map((card) => (
            <UserCard
              key={card.id}
              card={card}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
