import styles from './styles.module.css';

export default function Button(props) {
  const { className, children, contrast, ...otherProps } = props;
  return (
    <button
      className={
        styles.button +
        (className ? ' ' + className : '') +
        (contrast ? ' ' + styles.contrast : '')
      }
      {...otherProps}
    >
      {children}
    </button>
  );
}
