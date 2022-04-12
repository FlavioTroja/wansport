import moment from "moment";

const Footer = () => {

    const year = moment().format('YYYY');

    return(
        <>    
            <footer>
                <p>
                    &copy; Overzoom {year}
                </p>
            </footer>
            <style jsx>{`
                p {
                    text-align: center
                }
            `}</style>
        </>
    );
}

export default Footer;