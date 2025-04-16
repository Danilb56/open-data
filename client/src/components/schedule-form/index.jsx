import styles from './styles.module.css';
import ScheduleInput from '#components/schedule-input';
import Button from '#components/button';
import { act, useEffect, useState } from 'react';

const ScheduleForm = (props) => {
  const { schedules: initialData, className, ...otherProps } = props;

  const [schedules, setSchedules] = useState(
    initialData.reduce(
      (prev, s) => ({
        ...prev,
        [s.dayOfWeek]: {
          active: false,
          start: s.startTime,
          end: s.endTime,
        },
      }),
      {},
    ),
  );

  const [active, setActive] = useState(false);
  const [error, setError] = useState('');
  return (
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
          disabled={!active}
          initSchedule={(() => {
            const schedule = initialData.find((s) => s.dayOfWeek === day);
            if (!schedule) return;
            return {
              start: schedule.startTime,
              end: schedule.endTime,
            };
          })()}
          onChange={(data) =>
            setSchedules((prev) => ({
              ...prev,
              [day]: data,
            }))
          }
        />
      ))}
      <span className={styles.error}>{error.schedules}</span>
      <Button
        contrast={true}
        onClick={() => setActive((prev) => !active)}
      >
        {active ? 'Сохранить' : 'Редактировать'}
      </Button>
    </div>
  );
};

export default ScheduleForm;
