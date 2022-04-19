import Nav from './nav';
import Footer from './footer';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { userService } from '../utils/services/user.service';

export interface LayoutProps  { 
  children: React.ReactNode
}

const Layout = (props: LayoutProps) => {

    const [user, setUser] = useState();
    
    useEffect(() => {

        const fetchUser = async () => {

          const response = await userService.me();
          const data = await response.json();

          setUser(!data?.message ? data.name : null);
        }
    
        if (!!userService.userValue) {
          fetchUser();
        }
    }, [userService.userValue]);


    return (
        <>
            <Head>
                <title>My Blog | Page</title>
                <meta name="description" content="Questa è la pagina del mio blog."/>
            </Head>
              {!! userService.userValue ? 
                <Nav user={user}/>
              : ''}
                { props.children }
            <Footer/>
        </>
    );
}

export default Layout;