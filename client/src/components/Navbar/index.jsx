import React, { useState } from "react";
import styles from "./styles.module.css";

const Navbar = ({children}) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("email");
		window.location.reload();
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>💰 My finances</h1>

				{isDropdownOpen && (
					<div className={styles.dropdown_menu}>
						<h2 className={styles.link}><a href="/">Dashboard</a></h2>
						<h2 className={styles.link}><a href="/reports">Reports</a></h2>
						<h2 className={styles.link}><a href="/stats">Stats</a></h2>
					</div>
				)}
				<h3>Logged as: {localStorage.getItem("email")}</h3>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
				<div className={styles.hamburger_menu} onClick={toggleDropdown}>
					<div className={styles.bar}></div>
					<div className={styles.bar}></div>
					<div className={styles.bar}></div>
				</div>
			</nav>
			{children}
		</div>
	);
};

export default Navbar;
