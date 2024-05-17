import { FC } from 'react'
import React, { useState } from 'react';
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

    const handleClick = async (data: LoginData) => {
        try {
            const response = await fetch('https://apps-ws.spot1.mx/api/register-next', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const resp = await response.json();
                console.log(resp);
                router.push('/login');
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
      <title>Belvo | Register</title>
      <meta name="author" content="Charles Ruíz" />
      <meta name="description" content="Prueba técnica Next JS" />
    </Head>
    <Navbar loggedIn={loggedIn} />
    <main className={styles.main}>
      <form className={stylesLogin.form}>
        <p>Register</p>
        <div className={stylesLogin.group}>
          <input className={stylesLogin.main_input} name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <span className={stylesLogin.highlight_span}></span>
          <label className={stylesLogin.lebal_email}>Email</label>
        </div>
        <div className={stylesLogin.container_1}>
          <div className={stylesLogin.group}>
            <input type="password" className={stylesLogin.main_input} name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <span className={stylesLogin.highlight_span}></span>
            <label className={stylesLogin.lebal_email}>Password</label>
          </div>
        </div>
        <button className={stylesLogin.btn} type="button" onClick={() => handleClick({email, password})}>SIGN UP</button>
      </form>
    </main>
    </>
  );
}
