import Button from '#components/button';
import Input from '#components/input';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { login } from './api';
import styles from './styles.module.css';

export default function Form() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
      setError({ email: 'Email введен неверно' });
      return;
    }

    if (!data.password) {
      setError({ password: 'Пароль обязателен' });
      return;
    }

    login(data).then(async (res) => {
      if (res.status == 200) navigate('/');
      const { message } = await res.json();

      if (message == 'User credentials are required')
        setError({
          email: 'Email обязателен',
          password: 'Пароль обязателен',
        });

      if (message == 'User with this email does not exist')
        setError({ email: 'Пользователь с таким email не зарегистрирован' });

      if (message == 'Invalid password')
        setError({ password: 'Неверный пароль' });
    });
  };

  return (
    <form className={styles.form}>
      <Input
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        id="email"
        error={error.email}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            email: e.target.value.trim().toLowerCase(),
          }))
        }
      />
      <Input
        label="Пароль"
        name="password"
        type="password"
        autoComplete="current-password"
        id="password"
        error={error.password}
        onChange={(e) =>
          setData((prev) => ({ ...prev, password: e.target.value }))
        }
      />
      <Button
        type="button"
        style={{ backgroundColor: 'var(--blue)' }}
        onClick={handleLogin}
      >
        Войти
      </Button>
      <Link to={'/signup'}>У вас еще нет аккаунта?</Link>
    </form>
  );
}
