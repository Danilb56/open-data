import styles from './styles.module.css';
import { Link } from 'react-router';
import Button from '#components/button';
import CardSlider from '#components/card-slider';
import SignUp from '#components/signup-form';
export default function page() {
  const cards = [
    {
      title: 'StreetFit',
      text:
        'Это платформа для поиска единомышленников, с которыми можно вместе тренироваться' +
        ' на уличных спортивных площадках. Бег, турники, брусья или групповые воркаут-занятия — здесь ты найдешь команду или' +
        ' напарника для мотивационных тренировок под открытым небом',
      content: (
        <Link to={'/login'}>
          <Button contrast={true}>У меня уже есть аккаунт</Button>
        </Link>
      ),
    },
    {
      title: 'Ищешь партнёра для утренних подтягиваний?',
      text: 'Сортировка по локациям, Вашему расписанию и возрасту',
    },
    {
      title: 'Готовы начать?',
      text: 'Зарегистрируйтесь, заполните свою карточку, ищите новых друзей, и удачных Вам тренировок!',
      content: <SignUp />,
    },
  ];
  return (
    <div className={styles.page}>
      <CardSlider
        cards={cards}
        terminate={true}
      />
    </div>
  );
}
