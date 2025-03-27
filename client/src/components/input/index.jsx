import styles from './styles.module.css';

export default function Input(props) {
	const { className, label, name, ...otherProps } = props;
	return (
		<div className={styles.wrapper + (className ? ' ' + className : '')}>
			<label
				className={styles.label}
				for={name}
				style={{ display: label ? 'block' : 'none' }}
			>
				{label ? label : name}
			</label>
			<input
				className={styles.input}
				name={name}
				{...otherProps}
			></input>
		</div>
	);
}
