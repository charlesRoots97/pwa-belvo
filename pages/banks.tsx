// pages/banks.tsx
import React, { useState, useEffect } from 'react';
import Head from "next/head";
import styles from "../src/app/page.module.css";
import stylesBanks from "../src/app/banks.module.css";
import { Navbar } from '../components/Navbar';
import { useRouter } from 'next/navigation';

interface Bank {
  id: string;
  name: string;
}

const BanksPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const router = useRouter();

  useEffect(() => {
    const logged = localStorage.getItem("logged");
    setLoggedIn(logged === "1");
    if (logged === "1") {
      fetchBanks();
    } else {
      router.push('/login');
    }
  }, []);

  const fetchBanks = async () => {
    try {
      const response = await fetch('https://sandbox.belvo.com/api/institutions/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic MDUzNTRjZmMtMTE1Yy00NWE4LWJhMDYtZjkwMDQzY2M1YmMwOiNyZWw5dWYjeGsxdmFSdHRwMnd0Wm5NWnVUYzdOMGtaakpLYUt5RzA1WXVadzFsSnd4KlIxd2ZWI2JhMUNrZDU='
        }
      });
      if (response.ok) {
        const resp = await response.json();
        setBanks(resp.results);
        console.log(resp);
      } else {
        console.error('Error al realizar la petición');
      }
    } catch (error) {
      console.error('Error al realizar la petición:', error);
    }
  };

  const redirectToBank = (id_bank: string) => {
    localStorage.setItem('bank_id', id_bank);
    router.push(`banks/${id_bank}/`);
  };

  return (
    <>
      <Head>
        <title>Belvo | Bancos</title>
        <meta name="author" content="Charles Ruíz" />
        <meta name="description" content="Prueba técnica Next JS" />
      </Head>
      <Navbar loggedIn={loggedIn} />
      <main className={styles.main}>
        <div className={stylesBanks.container_banks}>
          <p>Bancos</p>
          <div className={stylesBanks.scroll_container}>
            <div className={stylesBanks.horizontal_scroll}>
              {banks.map((item) => (
                <button key={item.id} className={stylesBanks.btn} type="button" onClick={() => redirectToBank(item.id)}>{item.name}</button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default BanksPage;