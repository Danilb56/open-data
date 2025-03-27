import { useState } from 'react';
import Input from '#components/input';
import Button from '#components/button';
import styles from './styles.module.css';

export default function Form() {
	const [data, setData] = useState();

	return (
		<form className={styles.form}>
			<Input
				label='Email'
				name='email'
				type='email'
				autocomplete='email'
			/>
			<Input
				label='Пароль'
				name='new-password'
				type='password'
				autocomplete='new-password'
			/>
			<Button style={{ backgroundColor: 'var(--blue)' }}>
				Зарегистрироваться
			</Button>
		</form>
	);
}
