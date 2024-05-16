import { FC } from 'react'
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Head from "next/head"
import styles from "../src/app/page.module.css";
import stylesLogin from "../src/app/login.module.css";
import { Navbar } from '../components'
import { useRouter } from 'next/navigation';

interface LoginData {
  email: string;
  password: string;
}


export default function Home() {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const logged = localStorage.getItem("logged");
      setLoggedIn(logged === "1");
      console.log(logged, " LOGGED" );
      console.log(logged === "1", " LOGGED" );
    }, []);
  

    const handleClick = async (data: LoginData) => {
        try {
            const response = await fetch('https://apps-ws.spot1.mx/api/login-next', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const resp = await response.json();
                console.log(resp);
                localStorage.setItem('logged', '1');
                localStorage.setItem('email', data.email);
                setLoggedIn(true)
                router.push('/banks');
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
      <title>Belvo | Login</title>
      <meta name="author" content="Charles Ruíz" />
      <meta name="description" content="Prueba técnica Next JS" />
    </Head>
    <Navbar loggedIn={loggedIn}  />
    <main className={styles.main}>
      <form className={stylesLogin.form}>
        <p>Login</p>
        <div className={stylesLogin.group}>
          <input className={stylesLogin.main_input} name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <span className={stylesLogin.highlight_span}></span>
          <label className={stylesLogin.lebal_email}>Email</label>
        </div>
        <div className={stylesLogin.container_1}>
          <div className={stylesLogin.group}>
            <input className={stylesLogin.main_input} name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <span className={stylesLogin.highlight_span}></span>
            <label className={stylesLogin.lebal_email}>Password</label>
          </div>
        </div>
        <button className={stylesLogin.btn} type="button" onClick={() => handleClick({email, password})}>SIGN IN</button>
      </form>
    </main>
    </>
  );
}
