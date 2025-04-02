import { useState } from 'react';
import Input from '#components/input';
import Button from '#components/button';
import styles from './styles.module.css';
import { Link } from 'react-router';

export default function Form() {
  const [data, setData] = useState();

  return (
    <form className={styles.form}>
      <Input
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
      />
      <Input
        label="Пароль"
        name="password"
        type="password"
        autoComplete="password"
      />
      <Button
        type="button"
        style={{ backgroundColor: 'var(--blue)' }}
      >
        Войти
      </Button>
      <Link to={'/signup'}>У вас еще нет аккаунта?</Link>
    </form>
  );
}
