import styles from './styles.module.css';
import ScheduleBatch from '#components/schedule-batch';
import Map from '#components/map';
import { useState } from 'react';

const UserCard = (props) => {
  const { title, text, content, className, ...otherProps } = props;

  return (
    <div
      className={styles.card + (className ? ' ' + className : '')}
      {...otherProps}
    >
      <h2 className={styles.title}>{title}</h2>
      {text && <p className={styles.text}>{text}</p>}
      {content}
    </div>
  );
};

export default function Card(props) {
  const { card } = props;
  const [schedulesExpanded, setSchedulesExpanded] = useState(false);
  const [mapExpanded, setMapExpanded] = useState(false);
  return (
    <UserCard
      title={card.author.name + ', ' + card.author.age}
      text={(() => {
        if (card.distances.length > 3) {
          return (
            <span onClick={() => setMapExpanded(!mapExpanded)}>
              {card.distances.slice(0, 3).join(', ') +
                `, +${card.distances.length - 3}`}
            </span>
          );
        } else
          return (
            <span onClick={() => setMapExpanded(!mapExpanded)}>
              {card.distances.join(', ')}
            </span>
          );
      })()}
      content={
        <>
          {card.schedules.map(
            (schedule) =>
              (schedulesExpanded || schedule.overlap > 0) && (
                <ScheduleBatch
                  key={card.id + schedule.id}
                  {...schedule}
                  active={schedule.overlap > 0}
                />
              ),
          )}
          {card.schedules.reduce(
            (counter, schedule) =>
              schedule.overlap == 0 ? counter + 1 : counter,
            0,
          ) > 0 && (
            <span
              className={styles.showMore}
              onClick={() => setSchedulesExpanded(!schedulesExpanded)}
            >
              {schedulesExpanded ? 'Скрыть' : 'Показать все дни'}
            </span>
          )}
          {mapExpanded && (
            <div className={styles.map}>
              <Map
                markers={card.SportsObject_CardAddedObjects.map(
                  (obj) => obj.location,
                )}
                selectable={false}
              />
            </div>
          )}
        </>
      }
    />
  );
}
