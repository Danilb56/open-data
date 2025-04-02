import styles from './styles.module.css';

const Card = (props) => {
  const { title, text, content, className, ...otherProps } = props;

  return (
    <div
      className={styles.card + (className ? ' ' + className : '')}
      {...otherProps}
    >
      <h2 className={styles.title}>{title}</h2>
      {text && <p className={styles.text}>{text}</p>}
      {content}
    </div>
  );
};

export default Card;
