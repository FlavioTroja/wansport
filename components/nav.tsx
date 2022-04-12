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
                        <Link href="">
                            <a onClick={ () => {
                                localStorage.clear()
                                router.push('/auth/login')
                                router.reload()
                            }
                            }>{name}</a>
                        </Link>
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
            `}</style>
        </>
    );
}

export default Nav;