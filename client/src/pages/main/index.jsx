import Button from '#components/button';
import { callApi } from '#utils/callApi';
export default function page() {
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
    </>
  );
}
