import { ThemeContext } from '#app/providers/theme';
import Button from '#components/button';
import CardSlider from '#components/card-slider';
import { callApi } from '#utils/callApi';
import { useContext } from 'react';

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const theme = useContext(ThemeContext);
  const cards = [
    {
      title: 'StreetFit',
      text:
        'Это платформа для поиска единомышленников, с которыми можно вместе тренироваться' +
        ' на уличных спортивных площадках. Бег, турники, брусья или групповые воркаут-занятия — здесь ты найдешь команду или' +
        ' напарника для мотивационных тренировок под открытым небом',
    },
    {
      title: 'Ищешь партнёра для утренних подтягиваний?',
      text: 'Фильтры по локациям, уровню подготовки: от новичка до опытного атлета',
    },
    {
      title: 'Готовы начать?',
      text: 'Зарегистрируйтесь, заполните свою карточку, ищите новых друзей, и удачных Вам тренировок!',
    },
  ];
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
      <CardSlider
        cards={cards}
        terminate={true}
      />
    </>
  );
}
