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
        const fetchUser = async () => {

          const response = await fetch(`/api/auth/me`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem('token') as string
            },
          });
          
          const user = await response.json();
          setUser(!user?.message ? user : null);

        }
    
        fetchUser();
      }, []);    

    return (
        <>
            <Head>
                <title>My Blog | Page</title>
                <meta name="description" content="Questa è la pagina del mio blog."/>
            </Head>
            { !!user ? <Nav/> : '' }
                { props.children }
            <Footer/>
        </>
    );
}

export default Layout;