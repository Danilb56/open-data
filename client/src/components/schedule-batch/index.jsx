import styles from './styles.module.css';

const days = {
  monday: 'Понедельник',
  tuesday: 'Вторник',
  wednesday: 'Среда',
  thursday: 'Четверг',
  friday: 'Пятница',
  saturday: 'Суббота',
  sunday: 'Воскресенье',
};
const ScheduleBatch = (props) => {
  const { dayOfWeek, startTime, endTime, active = false } = props;

  return (
    <div className={styles.schedule + (active ? ' ' + styles.active : '')}>
      <span className={styles.day}>{days[dayOfWeek]}</span>
      <span className={styles.time}>
        {startTime} - {endTime}
      </span>
    </div>
  );
};

export default ScheduleBatch;
