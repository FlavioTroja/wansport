import { NextPage } from "next";
import Link from "next/link";
import styles from '../../styles/Auth.module.css';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Register: NextPage = () => {

    const [values, setValues] = useState({});
    const router = useRouter();

    function submit(e: { preventDefault: () => void; }) {
        e.preventDefault();
    
        fetch("/api/auth/register", {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then((result) => {
            router.push("/auth/login");
          }, (error) => {
            console.error("ERRORE!", error);
          }
        )
    }

    function handleChange(event: { target: { value: string; name: string; }; }) {
        const value = event.target.value;
        const name = event.target.name;
    
        setValues({ ...values, [name]: value });
    }
    
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    <a href="https://wansport.com/">Wansport!</a>
                </h1>

                <form className={styles.card} onSubmit={submit}>
                    <label>Nome</label>
                    <input className={styles.input} name="name" type="text" onChange={(e) => handleChange(e)}/>

                    <label>Cognome</label>
                    <input className={styles.input} name="surname" type="text" onChange={(e) => handleChange(e)}/>

                    <label>Username</label>
                    <input className={styles.input} name="username" type="text" onChange={(e) => handleChange(e)}/>

                    <label>Email</label>
                    <input className={styles.input} name="email" type="email" onChange={(e) => handleChange(e)}/>

                    <label>Password</label>
                    <input className={styles.input} name="password" type="password" onChange={(e) => handleChange(e)}/>

                    <label>Conferma Password</label>
                    <input className={styles.input} name="confirm_password" type="password" onChange={(e) => handleChange(e)}/>

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