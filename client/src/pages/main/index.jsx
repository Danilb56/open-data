import Button from '#components/button';
import { callApi } from '#utils/callApi';
import { ThemeContext } from '#app/providers/theme';
import { useContext } from 'react';
export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const theme = useContext(ThemeContext);
  return (
    <>
      <div>MainPage</div>
      <Button
        style={{ backgroundColor: 'var(--blue)', width: '10rem' }}
        onClick={async () => {
          const res = await callApi('/auth/logout');
          console.log(res);
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
    </>
  );
}
