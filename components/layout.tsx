import Nav from './nav';
import Footer from './footer';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export interface LayoutProps  { 
  children: React.ReactNode
}

const Layout = (props: LayoutProps) => {

    const [user, setUser] = useState();
    
    useEffect(() => {
        const token = localStorage.getItem('token') as string;

        const fetchUser = async () => {

          const response = await fetch(`/api/auth/me`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": token
            },
          });
          

          const data = await response.json();
          setUser(!data?.message ? data.name : null);
        }
    
        if (!!token) {
          fetchUser();
        }
    }, [user]);


    return (
        <>
            <Head>
                <title>My Blog | Page</title>
                <meta name="description" content="Questa è la pagina del mio blog."/>
            </Head>
            { !!user ? <Nav user={user}/> : `` }
                { props.children }
            <Footer/>
        </>
    );
}

export default Layout;