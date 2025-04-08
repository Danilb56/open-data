import styles from './styles.module.css';

export default function Input(props) {
  const { className, error, ...otherProps } = props;
  return (
    <div className={styles.wrapper + (className ? ' ' + className : '')}>
      <input
        className={styles.input + (error ? ' ' + styles.invalid : '')}
        type="time"
        {...otherProps}
      ></input>
    </div>
  );
}
