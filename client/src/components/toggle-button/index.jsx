import styles from './styles.module.css';

export default function ToggleButton(props) {
  const { className, children, active, ...otherProps } = props;
  return (
    <button
      className={
        styles.button +
        (className ? ' ' + className : '') +
        (active ? ' ' + styles.active : '')
      }
      {...otherProps}
    >
      {children}
    </button>
  );
}
