import { NextPage } from "next";
import Link from "next/link";
import styles from '../../styles/Auth.module.css';
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { UserModel } from "../../models/user";
import { useState } from "react";

const Register: NextPage = () => {

    const { register, handleSubmit } = useForm({});
    let [error, setError] = useState("");
    const router = useRouter();

    function submit(formdata: any) {

        const data: UserModel = formdata;

        if (!data.name) {
            setError("Inserisci un nome");
            return;
        }

        if (!data.surname) {
            setError("Inserisci un cognome");
            return;
        }

        if (!data.username) {
            setError("Inserisci un cognome");
            return;
        }

        if (!data.email) {
            setError("Inserisci un'email");
            return;
        }

        if (!data.password) {
            setError("Inserisci una password");
            return;
        }

        if (!data.confirm_password) {
            setError("Conferma password");
            return;
        }


        if (data.password !== data.confirm_password) {
            setError("Le due password non corrispondono!");
            return;
        } else {
            delete data.confirm_password;
        }

        fetch("/api/auth/register", {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then((result) => {

            if (result.status !== 200) {
                setError(result.message);
                return;
            }

            router.push("/auth/login");
          }, (error) => {
            console.error("ERRORE!", error);
          }
        )
    }

    function handleClick() {
        setError("");
    }  

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    <a href="https://wansport.com/">Wansport!</a>
                </h1>

                <form className={styles.card} onSubmit={handleSubmit(submit)}>
                    <label>Nome</label>
                    <input className={styles.input} {...register('name')} type="text"/>

                    <label>Cognome</label>
                    <input className={styles.input} {...register('surname')} type="text"/>

                    <label>Username</label>
                    <input className={styles.input} {...register('username')} type="text"/>

                    <label>Email</label>
                    <input className={styles.input} {...register('email')} type="email"/>

                    <label>Password</label>
                    <input className={styles.input} {...register('password')} type="password"/>

                    <label>Conferma Password</label>
                    <input className={styles.input} {...register('confirm_password')} name="confirm_password" type="password"/>

                    { !!error ?
                        <div className="alert">
                            <span className="closebtn" onClick={handleClick}>&times;</span> 
                            <strong>Attenzione!</strong> {error}
                        </div>
                      : `` } 
 
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