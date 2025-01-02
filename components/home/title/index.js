import styles from './title.module.css';


const Title = ({num=3,text='xxx'}) => {
  	return (
    		<div className={styles.frameParent}>
      			<div className={styles.frameGroup}>
        				<div className={styles.wrapper}>
          					<div className={styles.div}>{num}</div>
        				</div>
        				<div className={styles.div1}>
          					<span>{text}</span>
          					<span className={styles.span}>{` >>`}</span>
          					<span>{` `}</span>
        				</div>
        				<div className={styles.new}>!! (new)</div>
      			</div>
    		</div>);
};

export default Title;
