import Button from '#components/button';
import Input from '#components/input';
import { useState } from 'react';
import styles from './styles.module.css';
import { updateUserCredentials } from './api';

const CredentialsForm = (props) => {
  const { user: initialData, className, ...otherProps } = props;
  const [user, setUser] = useState(initialData);
  const [active, setActive] = useState(false);
  const [error, setError] = useState({
    name: '',
    age: '',
    phone: '',
    tgUsername: '',
  });

  const handleEmpty = (e) => {
    if (!e.target.value)
      setError((prev) => ({
        ...prev,
        [e.target.name]: 'Поле обязательно для заполнения',
      }));
    else setError((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  return (
    <div className={styles.form}>
      <Input
        label="Имя"
        id="name"
        name="name"
        type="text"
        autoComplete="name"
        defaultValue={user.name}
        error={error.name}
        disabled={!active}
        onChange={(e) => {
          setUser((prev) => ({ ...prev, name: e.target.value }));
          handleEmpty(e);
        }}
      />
      <Input
        label="Возраст"
        id="age"
        name="age"
        type="number"
        autoComplete="age"
        defaultValue={user.age}
        error={error.age}
        disabled={!active}
        onChange={(e) => {
          setUser((prev) => ({ ...prev, age: e.target.value }));
          handleEmpty(e);
          if (Number(e.target.value) < 18)
            setError((prev) => ({
              ...prev,
              age: 'Чтобы пользоваться сайтом, Вам должно быть не менее 18 лет',
            }));
        }}
      />
      <Input
        label="Номер телефона"
        id="phone"
        name="phone"
        type="tel"
        autoComplete="tel"
        defaultValue={user.phone}
        error={error.phone}
        disabled={!active}
        onChange={(e) => {
          setUser((prev) => ({ ...prev, phone: e.target.value }));
        }}
      />
      <Input
        label="Telegram"
        id="tgUsername"
        name="tgUsername"
        type="text"
        autoComplete="off"
        defaultValue={user.tgUsername}
        error={error.tgUsername}
        disabled={!active}
        onChange={(e) => {
          setUser((prev) => ({ ...prev, tgUsername: e.target.value }));
        }}
      />
      <Button
        contrast={true}
        onClick={() => {
          if (active) {
            if (
              !Object.values(error).reduce((counter, e) => {
                if (e) counter++;
              }, 0)
            ) {
              updateUserCredentials(user);
              setActive(!active);
              return;
            } else {
              return;
            }
          } else {
            setActive(!active);
          }
        }}
      >
        {active ? 'Сохранить' : 'Редактировать'}
      </Button>
    </div>
  );
};

export default CredentialsForm;
