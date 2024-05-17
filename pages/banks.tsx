// pages/banks.tsx
import React, { useState, useEffect } from 'react';
import Head from "next/head";
import styles from "../src/app/page.module.css";
import stylesBanks from "../src/app/banks.module.css";
import stylesCard from "../src/app/cards.module.css";
import { Navbar } from '../components/Navbar';
import { useRouter } from 'next/navigation';

interface Bank {
  id: string;
  name: string;
  display_name: string;
  icon_logo: string;
  primary_color: string;
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

  const redirectToBank = (id_bank: string, name: string) => {
    localStorage.setItem('bank_id', id_bank);
    localStorage.setItem('bank_name', name);
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
                <div key={item.id} className={stylesCard.card}>
                  <div className={stylesCard.card_top}>
                    <div className={stylesCard.card_top_info}>
                      <div className={stylesCard.card_top_info_header}>
                        <h1>{item.display_name}</h1>
                      </div>
                    </div>
                    <div className={stylesCard.card_top_price}>
                      <h1 className={stylesCard.card_top_price_header}><img src={item.icon_logo}  /></h1>
                    </div>
                  </div>
                  <div className={stylesCard.card_bottom}>
                    <span className={stylesCard.card_bottom_description}>{item.name}</span>
                    <button className={stylesCard.card_bottom_btn}  style={{ backgroundColor: item.primary_color }} type="button" onClick={() => redirectToBank(item.id, item.name)} >Ver</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default BanksPage;