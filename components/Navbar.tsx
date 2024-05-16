import React from "react";
import styles from "../src/app/page.module.css";
import Link from "next/link";

interface NavbarProps {
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar = ({ loggedIn, setLoggedIn }: NavbarProps) => {
    return (
        <header className={styles.header_area}>
            <div className={styles.navbar_area}>
                <div className={styles.container}>
                    <nav className={styles.site_navbar}>
                        <a href="" className={styles.site_logo}>Belvo</a>
                        <ul>
                            <li><Link href="/">Home</Link></li>
                            {!loggedIn ? (
                                <>
                                    <li><Link href="/login">Login</Link></li>
                                    <li><Link href="/register">Register</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link href="/login">Cuentas</Link></li>
                                    <li><Link href="/register">Salir</Link></li>
                                </>
                            )}
                        </ul>
                        <button className={styles.nav_toggler}>
                            <span></span>
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
};