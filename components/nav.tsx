import Link from "next/link";
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";

const Nav = () => {
    const [name, setName] = useState();
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {

          const response = await fetch(`/api/auth/me`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem('token') as string
            },
          });
    
          if (!response.ok) {
            console.error(`Error: ${response.status}`);
          }
    
          const user = await response.json();
          setName(user?.username);
        }
    
        fetchUser().then();
      }, []);    

    return(
        <>        
            <nav>
                <ul>
                    <li>
                        <Link href="/dashboard">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/about">
                            <a>About</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/contacts">
                            <a>Contatti</a>
                        </Link>
                    </li>
                    <li>
                        <div className="dropdown">
                            <a>{name}</a>
                            <div className="dropdown-content">
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <Link href="">
                                    <a onClick={ () => {
                                        localStorage.clear()
                                        router.push('/auth/login')
                                        router.reload()
                                    }
                                    }>Esci</a>
                                </Link>
                            </div>
                        </div> 
                    </li>
                </ul>
            </nav>
            <style jsx>{`
                    ul {
                        list-style-type: none;
                        margin: 0;
                        padding: 0;
                        overflow: hidden;
                        background-color: #333;
                    }
                    
                    li {
                        float: left;
                    }
                    
                    li a {
                        display: block;
                        color: white;
                        text-align: center;
                        padding: 14px 16px;
                        text-decoration: none;
                    }

                    .dropdown a {
                        cursor: default; 
                    }

                    .dropdown-content {
                        display: none;
                        position: absolute;
                        background-color: #f9f9f9;
                        min-width: 160px;
                        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                        z-index: 1;
                    }
                    
                    .dropdown-content a {
                        float: none;
                        color: black;
                        padding: 12px 16px;
                        text-decoration: none;
                        display: block;
                        text-align: left;
                        cursor: pointer;
                    }
                    
                    .dropdown-content a:hover {
                        background-color: #ddd;
                    }
                    
                    .dropdown:hover .dropdown-content {
                        display: block;
                    }
            `}</style>
        </>
    );
}

export default Nav;