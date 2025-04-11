import styles from './styles.module.css';
const Button = (props) => {
  const { className, icon, children, ...otherProps } = props;
  return (
    <button
      className={styles.button + (className ? ' ' + className : '')}
      {...otherProps}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};

export default Button;
