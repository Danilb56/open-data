/* eslint-disable react-hooks/rules-of-hooks */
import UserCard from '#components/user-card';
import { useState } from 'react';
import { useLoaderData } from 'react-router';
import styles from './styles.module.css';

export default function page() {
  const initialData = useLoaderData();

  const [data, setData] = useState(initialData);

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
