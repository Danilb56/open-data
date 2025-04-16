import Button from '#components/button';
import CardSlider from '#components/card-slider';
import Input from '#components/input';
import Map from '#components/map';
import ScheduleInput from '#components/schedule-input';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import styles from './styles.module.css';
import { validateForm } from './validateForm';
import { createCard } from './api';
import { useNavigate } from 'react-router';

export default function Page() {
  const { markers } = useLoaderData();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    age: '',
    phone: '',
    tgUsername: '',
    schedules: {
      monday: { start: '00:00', end: '00:00', active: false },
      tuesday: { start: '00:00', end: '00:00', active: false },
      wednesday: { start: '00:00', end: '00:00', active: false },
      thursday: { start: '00:00', end: '00:00', active: false },
      friday: { start: '00:00', end: '00:00', active: false },
      saturday: { start: '00:00', end: '00:00', active: false },
      sunday: { start: '00:00', end: '00:00', active: false },
    },
    locations: [],
  });

  const [error, setError] = useState({
    name: '',
    age: '',
    phone: '',
    tgUsername: '',
    schedules: '',
    locations: '',
  });

  const [scrollTo, setScrollTo] = useState();

  useEffect(() => {
    setScrollTo((prev) => undefined);
  }, [scrollTo]);
  const handleEmpty = (e) => {
    if (!e.target.value)
      setError((prev) => ({
        ...prev,
        [e.target.name]: 'Поле обязательно для заполнения',
      }));
    else setError((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const cards = [
    {
      title: 'Осталось немного',
      text: 'Заполните свою карточку, позже Вы сможете ее изменить в своем профиле',
      content: (
        <div className={styles.form}>
          <Input
            label="Как Вас зовут?"
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            error={error.name}
            onChange={(e) => {
              setData((prev) => ({ ...prev, name: e.target.value }));
              handleEmpty(e);
            }}
          />
          <Input
            label="Сколько Вам лет?"
            id="age"
            name="age"
            type="number"
            autoComplete="age"
            error={error.age}
            onChange={(e) => {
              setData((prev) => ({ ...prev, age: e.target.value }));
              handleEmpty(e);
              if (Number(e.target.value) < 18)
                setError((prev) => ({
                  ...prev,
                  age: 'Чтобы пользоваться сайтом, Вам должно быть не менее 18 лет',
                }));
            }}
          />
        </div>
      ),
    },
    {
      title: 'Настройте Ваше расписание',
      content: (
        <div className={styles.form}>
          {[
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday',
          ].map((day) => (
            <ScheduleInput
              key={day}
              day={day}
              onChange={(data) =>
                setData((prev) => ({
                  ...prev,
                  schedules: {
                    ...prev.schedules,
                    [day]: { ...prev.schedules[day], ...data },
                  },
                }))
              }
            />
          ))}
          <span className={styles.error}>{error.schedules}</span>
        </div>
      ),
    },
    {
      title: 'Выберите место',
      text: '...или сразу несколько!',
      content: (
        <div className={styles.mapContainer}>
          <div className={styles.mapWrapper}>
            <Map
              markers={markers}
              selectable
              onChange={(e) => {
                setData((prev) => ({ ...prev, locations: e }));
              }}
            />
          </div>
          <span className={styles.error}>{error.locations}</span>
        </div>
      ),
    },
    {
      title: 'Укажите свои контакты',
      text:
        'Выберите какие контакты увидит Ваш новый друг, когда Вы получите' +
        ' взаимный лайк! Если оставите поля пустыми, то будет отображаться только email.',
      content: (
        <div className={styles.form}>
          <Input
            label="Номер телефона"
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            error={error.phone}
            onChange={(e) => {
              setData((prev) => ({ ...prev, phone: e.target.value }));
            }}
          />
          <Input
            label="Telegram"
            id="tgUsername"
            name="tgUsername"
            type="text"
            autoComplete="off"
            error={error.tgUsername}
            onChange={(e) => {
              setData((prev) => ({ ...prev, tgUsername: e.target.value }));
            }}
          />
        </div>
      ),
    },
    {
      title: 'Проверьте, все ли Вы заполнили',
      content: (
        <div className={styles.form}>
          <Button
            contrast={true}
            onClick={() => {
              if (validateForm(data, setError, setScrollTo)) {
                createCard(data)
                  .then((res) => res.json())
                  .then((data) => {
                    navigate('/');
                  });
              }
            }}
          >
            Подтвердить
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className={styles.page}>
      <CardSlider
        cards={cards}
        scrollTo={scrollTo}
      />
    </div>
  );
}
