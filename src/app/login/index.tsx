import { FC } from 'react'
import Image from "next/image";
import Head from "next/head"
import styles from "../page.module.css";
import { Navbar } from '../../components'


export default function Home() {
  return (
    <>
    <Head>
      <title>Belvo | Login</title>
      <meta name="author" content="Charles Ruíz" />
      <meta name="description" content="Prueba técnica Next JS" />
    </Head>
    <Navbar />
    <main className={styles.main}>
    </main>
    </>
  );
}
