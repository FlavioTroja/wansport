import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Nav.module.css";
import { userService } from "../utils/services/user.service";

const Nav = ({user}: any) => {

    const router = useRouter();

    return(
        <>   
            <nav>
                <ul className={styles.ul}>
                    <li className={styles.li}>
                        <Link href="/dashboard">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li className={styles.li}>
                        <Link href="/about">
                            <a>About</a>
                        </Link>
                    </li>
                    <li className={styles.li}>
                        <Link href="/contacts">
                            <a>Contatti</a>
                        </Link>
                    </li>
                    { !!user ? 
                        <li className={styles.li}>
                            <div className={styles.dropdown}>
                                <a>{user}</a>
                                <div className={styles.dropdowncontent}>
                                    <a href="#">Link 1</a>
                                    <a href="#">Link 2</a>
                                    <Link href="">
                                        <a onClick={userService.logout}>Esci</a>
                                    </Link>
                                </div>
                            </div> 
                        </li>
                    : '' }
                </ul>
            </nav>
        </>
    );
}
  

export default Nav;