import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import styles from '../../styles/Auth.module.css';

const Login: NextPage = () => {

    const [values, setValues] = useState({});
    //const navigate = useNavigate();  

    function submit(e: any) {
        e.preventDefault();
    
        fetch("/api/auth", {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then((result) => {
            localStorage.setItem("token", result.token);
            //navigate("/home");
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
                    <label>Username/Email</label>
                    <input className={styles.input} name="username" type="text" onChange={(e) => handleChange(e)}/>

                    <label>Password</label>
                    <input className={styles.input} name="password" type="password" onChange={(e) => handleChange(e)}/>

                    <button className={styles.button} type="submit">Login</button>

                    <Link href="/auth/register">
                        <a className={styles.link}>Non hai un account? Registrati</a>
                    </Link>
                </form>
            </main>
        </div>
    );
} 

export default Login;