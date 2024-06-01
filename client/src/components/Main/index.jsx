import styles from "./styles.module.css";
import FinanceForm from "../FinanceForm";

const Main = () => {

	

	return (
		<div className={styles.main}>
			{/* <button onClick={() => {
				notifyMe()
			}}>Notify me!</button> */}
			<FinanceForm />
		</div>
	);
};

export default Main;
