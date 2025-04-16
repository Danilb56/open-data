import SidebarButton from '#components/sidebar-button';
import styles from './styles.module.css';
import { Dock, Heart, User, Users, LogOut, SunMoon } from 'lucide-react';
import { ThemeContext } from '#app/providers/theme';
import { useContext, useEffect } from 'react';
import { callApi } from '#utils/callApi';
import { Link, useLocation } from 'react-router';

const Sidebar = (props) => {
  const { className, ...otherProps } = props;
  const location = useLocation();
  const theme = useContext(ThemeContext);

  return (
    <div
      className={styles.sidebar + (className ? ' ' + className : '')}
      {...otherProps}
    >
      <Link
        style={{ display: 'contents' }}
        to={'/'}
      >
        <SidebarButton
          icon={
            <Dock
              color={
                location.pathname === '/'
                  ? 'var(--blue)'
                  : 'var(--muted-foreground)'
              }
            />
          }
        >
          Главная
        </SidebarButton>{' '}
      </Link>
      <Link
        style={{ display: 'contents' }}
        to={'/likes'}
      >
        <SidebarButton
          icon={
            <Heart
              color={
                location.pathname === '/likes'
                  ? 'var(--destructive)'
                  : 'var(--muted-foreground)'
              }
            />
          }
        >
          Лайки
        </SidebarButton>
      </Link>
      <Link
        style={{ display: 'contents' }}
        to={'/contacts'}
      >
        <SidebarButton
          icon={
            <Users
              color={
                location.pathname === '/contacts'
                  ? 'var(--blue)'
                  : 'var(--muted-foreground)'
              }
            />
          }
        >
          Контакты
        </SidebarButton>
      </Link>
      <Link
        style={{ display: 'contents' }}
        to={'/profile'}
      >
        <SidebarButton
          icon={
            <User
              color={
                location.pathname === '/profile'
                  ? 'var(--blue)'
                  : 'var(--muted-foreground)'
              }
            />
          }
        >
          Профиль
        </SidebarButton>
      </Link>
      <SidebarButton
        icon={<SunMoon />}
        onClick={() =>
          theme.setTheme(theme.theme === 'light' ? 'dark' : 'light')
        }
      >
        Тема
      </SidebarButton>
      <SidebarButton
        icon={<LogOut />}
        onClick={() => {
          callApi('/auth/logout');
        }}
      >
        Выход
      </SidebarButton>
    </div>
  );
};

export default Sidebar;
