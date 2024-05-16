import { FC } from 'react'
import React, { useState } from 'react';
import Image from "next/image";
import Head from "next/head"
import styles from "./page.module.css";
import { Navbar } from '../../components'


export default function Home() {
  const isClient = typeof window !== 'undefined';
  const [loggedIn, setLoggedIn] = isClient ? React.useState(false) : [false, () => {}];

  return (
    <>
    <Head>
      <title>Belvo</title>
      <meta name="author" content="Charles Ruíz" />
      <meta name="description" content="Prueba técnica Next JS" />
    </Head>
    <Navbar loggedIn={loggedIn} />
    <main className={styles.main}>
      <div className={styles.intro_area}>
          <div className={styles.container}>
            <h2>BIENVENIDO -  NEXT JS</h2>
            {/* <p>Prueba Técnica con Next JS</p> */}
          </div>
        </div>
    </main>
    </>
  );
}
