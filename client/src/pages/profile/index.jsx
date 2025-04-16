import Card from '#components/card';
import Button from '#components/button';
import CredentialsForm from '#components/credentials-form';
import Map from '#components/map';
import ScheduleForm from '#components/schedule-form';
import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import styles from './styles.module.css';
import { callApi } from '#utils/callApi';
import { updateLocations } from './api';

export default function Page() {
  const { user, card } = useLoaderData();
  const [markers, setMarkers] = useState();
  const [chosenLocations, setChosenLocations] = useState(
    card.SportsObject_CardAddedObjects.map((obj) => obj.location),
  );
  const [locationFormActive, setLocationFormActive] = useState(false);
  const [locationsError, setLocationsError] = useState();

  useEffect(() => {
    (async () => {
      const res = await callApi('/geo/markers');
      const data = await res.json();
      setMarkers(data.markers);
    })();
  }, [locationFormActive]);

  const cards = [
    {
      title: 'Контактная информация',
      content: <CredentialsForm user={user} />,
    },
    {
      title: 'Ваше расписание',
      content: <ScheduleForm schedules={card.schedules} />,
    },
    {
      title: 'Места тренировок',
      content: (
        <div className={styles.mapContainer}>
          <div className={styles.mapWrapper}>
            {locationFormActive ? (
              <Map
                key={'map-0'}
                markers={markers}
                selectable={true}
                onChange={(e) => {
                  setChosenLocations((prev) =>
                    e.map((el) => markers.find((m) => m.id === el)),
                  );
                }}
              />
            ) : (
              <Map
                key={'map-1'}
                markers={chosenLocations}
              />
            )}
          </div>
          <span className={styles.error}>{locationsError}</span>
          <Button
            contrast={true}
            onClick={() => {
              if (chosenLocations.length === 0 && locationFormActive) {
                setLocationsError('Выберите хотя бы одно место');
                return;
              } else {
                setLocationsError('');
              }
              if (locationFormActive) {
                if (!locationsError) {
                  updateLocations(chosenLocations);
                  setLocationFormActive(!locationFormActive);
                  return;
                } else {
                  return;
                }
              } else {
                setLocationFormActive(!locationFormActive);
              }
            }}
          >
            {locationFormActive ? 'Сохранить' : 'Редактировать'}
          </Button>
        </div>
      ),
    },
    {
      title: 'Добросовестное использование',
      text: (
        <>
          Мы используем: <br />
          <Link
            target="_blank"
            to={
              'https://data.mos.ru/opendata/898/description?version=11&release=104'
            }
          >
            Открытые данные
          </Link>
          <br />
          <Link
            target="_blank"
            to={'https://yandex.ru/legal/maps_api/'}
          >
            Сервисы Яндекс Карт
          </Link>
        </>
      ),
    },
  ];
  return (
    <div className={styles.page}>
      <div className={styles.cards}>
        {cards.map((card, index) => (
          <Card
            className={styles.card}
            key={index}
            {...card}
          />
        ))}
      </div>
    </div>
  );
}
