import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from '../../styles/Auth.module.css';
import { userService } from "../../utils/services/user.service";

const Login: NextPage = () => {

    const [values, setValues] = useState({});
    const router = useRouter();
    let [error, setError] = useState(null);

    function submit(e: { preventDefault: () => void; }) {
        e.preventDefault();
    
        
        userService.login(values)
          .then(() => {
            const returnUrl = router.query.returnUrl || '/dashboard' as any;
            router.push(returnUrl);
          })
          .catch(error => {
            console.error(error);        
          });
    }

    function handleChange(event: { target: { value: string; name: string; }; }) {
        const value = event.target.value;
        const name = event.target.name;
    
        setValues({ ...values, [name]: value });
    }

    function handleClick() {
      setError(null);
    }

    return (
      <>
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    <a href="https://wansport.com/">Wansport!</a>
                </h1>

                <form className={styles.card} onSubmit={submit}>
                    <label>Username/Email</label>
                    <input 
                        className={styles.input} 
                        name="username" 
                        type="text" 
                        onChange={(e) => handleChange(e)}
                    />

                    <label>Password</label>
                    <input 
                        className={styles.input} 
                        name="password" 
                        type="password" 
                        onChange={(e) => 
                        handleChange(e)}
                    />

                    { !!error ?
                        <div className="alert">
                            <span className="closebtn" onClick={handleClick}>&times;</span> 
                            <strong>Attenzione!</strong> {error}
                        </div>
                      : `` } 
 

                    <button className={styles.button} type="submit">Login</button>

                    <Link href="/auth/register">
                        <a className={styles.link}>Non hai un account? Registrati</a>
                    </Link>
                </form>
            </main>
        </div>
      </>
    );
} 

export default Login;