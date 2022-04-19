import { NextPage } from "next/types";
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { userService } from "../utils/services/user.service";

const Dashboard: NextPage = () => {

    const router = useRouter();
    const [user, setUser] = useState();


    useEffect(() => {
        const fetchUser = async () => {

          const response = await userService.me();
    
          if (!response.ok) {
            router.push("/auth/login");
          } 
    
          const res = await response.json();
          setUser(res.username);
        }
    
        fetchUser();
      });    


    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome {user}
                </h1>


                <div className={styles.grid}>
                    <a className={styles.card}></a>
                    <a className={styles.card}></a>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;