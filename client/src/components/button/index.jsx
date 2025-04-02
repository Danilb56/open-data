import styles from './styles.module.css';

export default function Button(props) {
  const { className, children, ...otherProps } = props;
  return (
    <button
      className={styles.button + (className ? ' ' + className : '')}
      {...otherProps}
    >
      {children}
    </button>
  );
}
