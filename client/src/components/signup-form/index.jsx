import Button from '#components/button';
import Input from '#components/input';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { signup } from './api';
import styles from './styles.module.css';

export default function Form() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({
    email: '',
    password: '',
  });

  const handleSignup = () => {
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
      setError({ email: 'Email введен неверно' });
      return;
    }

    if (!data.password) {
      setError({ password: 'Пароль обязателен' });
      return;
    }

    if (data.password.length < 8) {
      setError({ password: 'Пароль должен быть не менее 8 символов' });
      return;
    }

    signup(data).then(async (res) => {
      if (res.status == 200) navigate('/');
      const { message } = await res.json();

      if (message == 'User with this email already exists')
        setError({
          email: 'Пользователь с таким email уже зарегистрирован',
        });

      if (message == 'User credentials are required')
        setError({
          email: 'Email обязателен',
          password: 'Пароль обязателен',
        });

      if (message == 'Email is required')
        setError({ email: 'Email обязателен' });

      if (message == 'Password is required')
        setError({ password: 'Пароль обязателен' });
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
        name="new-password"
        type="password"
        autoComplete="new-password"
        id="new-password"
        error={error.password}
        onChange={(e) =>
          setData((prev) => ({ ...prev, password: e.target.value }))
        }
      />
      <Button
        style={{
          backgroundColor: 'var(--blue)',
          border: '2px solid var(--blue)',
          color: 'var(--white)',
        }}
        type="button"
        onClick={handleSignup}
      >
        Зарегистрироваться
      </Button>
    </form>
  );
}
