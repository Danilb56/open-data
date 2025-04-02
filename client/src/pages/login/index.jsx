import Card from '#components/card';
import LoginForm from '#components/login-form';
import styles from './styles.module.css';

export default function Page() {
  return (
    <div className={styles.page}>
      <Card
        className={styles.card}
        title="Вход"
        text="Авторизуйтесь и ищите единомышленников!"
        content={<LoginForm />}
      />
    </div>
  );
}
