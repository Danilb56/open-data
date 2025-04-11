/* eslint-disable react-hooks/rules-of-hooks */
import { ThemeContext } from '#app/providers/theme';
import Button from '#components/button';
import { callApi } from '#utils/callApi';
import { useContext } from 'react';
import { useLoaderData } from 'react-router';

export default function page() {
  const data = useLoaderData();
  const theme = useContext(ThemeContext);

  return (
    <>
      <div>MainPage</div>
      <Button
        style={{ backgroundColor: 'var(--blue)', width: '10rem' }}
        onClick={async () => {
          const res = await callApi('/auth/logout');
        }}
      >
        Выйти
      </Button>
      <Button
        style={{ backgroundColor: 'var(--blue)', width: '10rem' }}
        onClick={() =>
          theme.setTheme(theme.theme === 'light' ? 'dark' : 'light')
        }
      >
        Тема
      </Button>
      <div>
        {data.map((el) => {
          return (
            <div key={el.id}>
              <div>
                {Math.round(el.score)},{el.author.age},{' '}
              </div>
              {el.schedules.map((schedule) => {
                return (
                  <div key={schedule.id}>
                    {schedule.dayOfWeek}, {schedule.startTime},{' '}
                    {schedule.endTime}, {schedule.overlap}
                  </div>
                );
              })}
              {el.distances.reduce(
                (str, curr) => str + ', ' + Math.round(curr),
                '',
              )}
              <br />
              <br />
              <br />
              <br />
            </div>
          );
        })}
      </div>
    </>
  );
}
