import { useState } from 'react';
import Input from '#components/input';
import Button from '#components/button';
import styles from './styles.module.css';
import { signup } from './api';
import { useNavigate } from 'react-router';

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

	return (
		<form className={styles.form}>
			<Input
				label='Email'
				name='email'
				type='email'
				autoComplete='email'
				error={error.email}
				onChange={(e) =>
					setData((prev) => ({ ...prev, email: e.target.value }))
				}
			/>
			<Input
				label='Пароль'
				name='new-password'
				type='password'
				autoComplete='new-password'
				error={error.password}
				onChange={(e) =>
					setData((prev) => ({ ...prev, password: e.target.value }))
				}
			/>
			<Button
				style={{ backgroundColor: 'var(--blue)' }}
				type='button'
				onClick={() =>
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
					})
				}
			>
				Зарегистрироваться
			</Button>
		</form>
	);
}
