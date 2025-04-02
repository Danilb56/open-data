import styles from './styles.module.css';

export default function Input(props) {
  const { className, label, name, error, ...otherProps } = props;
  return (
    <div className={styles.wrapper + (className ? ' ' + className : '')}>
      <label
        className={styles.label}
        htmlFor={name}
        style={{ display: label ? 'block' : 'none' }}
      >
        {label ? label : name}
      </label>
      <input
        className={styles.input + (error ? ' ' + styles.invalid : '')}
        name={name}
        {...otherProps}
      ></input>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
