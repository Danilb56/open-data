import SidebarButton from '#components/sidebar-button';
import styles from './styles.module.css';
import { Dock, Heart, User, Users, LogOut, SunMoon } from 'lucide-react';
import { ThemeContext } from '#app/providers/theme';
import { useContext } from 'react';
import { callApi } from '#utils/callApi';

const Sidebar = (props) => {
  const { className, ...otherProps } = props;
  const theme = useContext(ThemeContext);

  return (
    <div
      className={styles.sidebar + (className ? ' ' + className : '')}
      {...otherProps}
    >
      <SidebarButton icon={<Dock />}>Главная</SidebarButton>
      <SidebarButton icon={<Heart />}>Лайки</SidebarButton>
      <SidebarButton icon={<Users />}>Контакты</SidebarButton>
      <SidebarButton icon={<User />}>Профиль</SidebarButton>
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
