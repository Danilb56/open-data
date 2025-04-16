import TimeInput from '#components/time-input';
import ToggleButton from '#components/toggle-button';

import { useEffect, useState } from 'react';
import styles from './styles.module.css';

const days = {
  monday: 'Пнд',
  tuesday: 'Втр',
  wednesday: 'Срд',
  thursday: 'Чтв',
  friday: 'Птн',
  saturday: 'Сбт',
  sunday: 'Вск',
};

export default function ScheduleInput(props) {
  const { day, onChange, disabled, initSchedule } = props;
  const [active, setActive] = useState(initSchedule ? true : false);
  const [data, setData] = useState(initSchedule || { start: '', end: '' });

  useEffect(() => {
    if (onChange) {
      onChange({ active, ...data });
    }
  }, [active, data]);

  return (
    <div className={styles.schedule}>
      <ToggleButton
        active={!disabled && active}
        onClick={() => {
          if (disabled) return;
          setActive(!active);
        }}
      >
        {days[day]}
      </ToggleButton>
      <TimeInput
        disabled={!active || disabled}
        type="time"
        defaultValue={initSchedule && initSchedule.start}
        error={active && (!data.start || data.start > data.end)}
        onChange={(e) => {
          setData((prev) => ({ ...prev, start: e.target.value }));
        }}
      />
      <TimeInput
        disabled={!active || disabled}
        type="time"
        defaultValue={initSchedule && initSchedule.end}
        error={active && (!data.end || data.start > data.end)}
        onChange={(e) => {
          setData((prev) => ({ ...prev, end: e.target.value }));
        }}
      />
    </div>
  );
}
