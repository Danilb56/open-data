import Button from '#components/button';
import ScheduleInput from '#components/schedule-input';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (
      !Object.values(schedules).reduce((counter, s) => {
        if (s.active) {
          counter++;
        }
        return counter;
      }, 0)
    ) {
      setError('Выберите хотя бы один день');
      return;
    }
    Object.entries(schedules).map(([day, schedule]) => {
      if (schedule.active) {
        if (!schedule.start || !schedule.end) {
          setError('Выберите время для каждого дня');
          return;
        }
        if (schedule.start > schedule.end) {
          setError('Время начала не может быть больше времени окончания');
          return;
        }
      }
    });
    setError('');
  }, [schedules]);
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
      <span className={styles.error}>{error}</span>
      <Button
        contrast={true}
        onClick={() => {
          if (active) {
            if (!error) {
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
