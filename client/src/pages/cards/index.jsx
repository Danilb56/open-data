/* eslint-disable react-hooks/rules-of-hooks */
import UserCard from '#components/user-card';
import { useLoaderData } from 'react-router';
import styles from './styles.module.css';

export default function page() {
  const data = useLoaderData();

  return (
    <div className={styles.cardContainer}>
      {data.map((card) => (
        <UserCard
          key={card.id}
          card={card}
        />
      ))}
    </div>
  );
}
