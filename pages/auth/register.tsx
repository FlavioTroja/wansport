import { NextPage } from "next";
import Link from "next/link";
import styles from '../../styles/Auth.module.css';

const Register: NextPage = () => {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    <a href="https://wansport.com/">Wansport!</a>
                </h1>

                <form className={styles.card}>
                    <label>Nome</label>
                    <input className={styles.input} name="name" type="text"/>

                    <label>Cognome</label>
                    <input className={styles.input} name="surname" type="text"/>

                    <label>Username</label>
                    <input className={styles.input} name="username" type="text"/>

                    <label>Email</label>
                    <input className={styles.input} name="email" type="email"/>

                    <label>Password</label>
                    <input className={styles.input} name="password" type="password"/>

                    <label>Conferma Password</label>
                    <input className={styles.input} name="confirm_password" type="password"/>

                    <button className={styles.button} type="submit">Registra</button>

                    <Link href="/auth/login">
                        <a className={styles.link}>Già registrato? Accedi</a>
                    </Link>
                </form>
            </main>
        </div>
    );
} 

export default Register;