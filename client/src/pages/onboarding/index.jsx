/* eslint-disable react-hooks/rules-of-hooks */
import CardSlider from '#components/card-slider';
import Input from '#components/input';
import Map from '#components/map';
import ScheduleInput from '#components/schedule-input';
import { useState } from 'react';
import styles from './styles.module.css';

export default function page() {
  const [data, setData] = useState({
    name: '',
    age: '',
    phone: '',
    tgUsername: '',
    schedules: {
      monday: { start: '00:00', end: '00:00', active: false, title: 'Пнд' },
      tuesday: { start: '00:00', end: '00:00', active: false, title: 'Втр' },
      wednesday: { start: '00:00', end: '00:00', active: false, title: 'Срд' },
      thursday: { start: '00:00', end: '00:00', active: false, title: 'Чтв' },
      friday: { start: '00:00', end: '00:00', active: false, title: 'Птн' },
      saturday: { start: '00:00', end: '00:00', active: false, title: 'Сбт' },
      sunday: { start: '00:00', end: '00:00', active: false, title: 'Вск' },
    },
    sportsObjects: [],
  });
  const [error, setError] = useState({
    name: '',
    age: '',
    phone: '',
    tgUsername: '',
    schedules: '',
    sportsObjects: '',
  });

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
      text: 'Заполните свою карточку, позже вы сможете ее изменить в своем профиле',
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
        </div>
      ),
    },
    {
      title: 'Выберите место',
      text: '...или сразу несколько!',
      content: (
        <div className={styles.mapWrapper}>
          <Map />
        </div>
      ),
    },
  ];
  return (
    <div className={styles.page}>
      <CardSlider
        cards={cards}
        terminate={false}
      />
    </div>
  );
}
