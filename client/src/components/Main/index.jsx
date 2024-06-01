import styles from "./styles.module.css";
import FinanceForm from "../FinanceForm";

const Main = () => {

	const notifyMe = () => {
		if (!("Notification" in window)) {
			// Check if the browser supports notifications
			alert("This browser does not support desktop notification");
		} else if (Notification.permission === "granted") {
			// Check whether notification permissions have already been granted;
			// if so, create a notification
			const notification = new Notification("Hi there!");
			// …
		} else if (Notification.permission !== "denied") {
			// We need to ask the user for permission
			Notification.requestPermission().then((permission) => {
				// If the user accepts, let's create a notification
				if (permission === "granted") {
					const notification = new Notification("Hi there!");
					// …
				}
			});
		}
	}

	return (
		<div className={styles.main}>
			<button onClick={() => {
				notifyMe()
			}}>Notify me!</button>
			<FinanceForm />
		</div>
	);
};

export default Main;
