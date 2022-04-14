import moment from "moment";
import styles from '../styles/Home.module.css'

const Footer = () => {

    const year = moment().format('YYYY');

    return(
        <>    
            <footer className={styles.footer}>
                <a
                    href="https://overzoom.it/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by &copy; Overzoom {year}
                </a>
            </footer>
        </>
    );
}

export default Footer;