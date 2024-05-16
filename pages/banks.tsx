import React, { useState, useEffect } from 'react';
import { FC } from 'react';
import Image from "next/image";
import Head from "next/head";
import styles from "../src/app/page.module.css";
import stylesBanks from "../src/app/banks.module.css";
import { Navbar } from '../components';
import { useRouter } from 'next/router';


export default function Home() {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const logged = localStorage.getItem("logged");
      setLoggedIn(logged === "1");
      if(logged === "1"){

      }else{
        router.push('/login');
      }
    }, []);
  

    const handleClick = async () => {
        try {
            const response = await fetch('http://localhost:5000/get-banks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const resp = await response.json();
                console.log(resp);
                // router.push('/login');
            } else {
                console.error('Error al realizar la petición');
            }
        } catch (error) {
            console.error('Error al realizar la petición:', error);
        }
    }
  return (
    <>
    <Head>
      <title>Belvo | Bancos</title>
      <meta name="author" content="Charles Ruíz" />
      <meta name="description" content="Prueba técnica Next JS" />
    </Head>
    <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
    <main className={styles.main}>
      <div className={stylesBanks.container_banks}>
        <p>Bancos</p>
        
        <button className={stylesBanks.btn} type="button" onClick={handleClick}>GET BANKS</button>
      </div>
    </main>
    </>
  );
}
