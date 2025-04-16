import Button from '#components/button';
import ScheduleInput from '#components/schedule-input';
import { useState } from 'react';
import styles from './styles.module.css';
import { updateSchedules } from './api';

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
        onClick={() => {
          if (active) {
            if (
              !Object.values(error).reduce((counter, e) => {
                if (e) counter++;
              }, 0)
            ) {
              updateSchedules(schedules);
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

export default ScheduleForm;
