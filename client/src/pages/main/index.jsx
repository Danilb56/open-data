/* eslint-disable react-hooks/rules-of-hooks */
import Sidebar from '#components/sidebar/index.jsx';
import { Outlet, useLoaderData } from 'react-router';
import styles from './styles.module.css';

export default function page() {
  const data = useLoaderData();

  return (
    <div className={styles.page}>
      <Sidebar className={styles.sidebar} />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
