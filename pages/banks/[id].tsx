import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Head from "next/head";
import styles from "../../src/app/page.module.css";
import stylesBanks from "../../src/app/banks.module.css";
import { Navbar } from '../../components';

interface Bank {
    display_name: string;
    status: string;
    country_code: string;
  }

const BankPage = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [bank, setBank] = useState<Bank | null>(null);
    const [existsBank, setExistsBank] = useState(false);
    
    useEffect(() => {
        const logged = localStorage.getItem("logged");
        const bank_id = localStorage.getItem("bank_id");
        setLoggedIn(logged === "1");
        if(logged === "1"){
            handleClick(bank_id);
            
        }else{
        const router = useRouter();
        router.push('/login');
      }
    }, []);
  

    const handleClick = async (id_bank: string | number) => {
        try {
            const response = await fetch(`https://sandbox.belvo.com/api/institutions/${id_bank}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic MDUzNTRjZmMtMTE1Yy00NWE4LWJhMDYtZjkwMDQzY2M1YmMwOiNyZWw5dWYjeGsxdmFSdHRwMnd0Wm5NWnVUYzdOMGtaakpLYUt5RzA1WXVadzFsSnd4KlIxd2ZWI2JhMUNrZDU='
                }
            });
            if (response.ok) {
                const resp = await response.json();
                console.log(resp);
                setBank(resp)
                setExistsBank(true)
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
    <Navbar loggedIn={loggedIn} />
    <main className={styles.main}>
      <div className={stylesBanks.container_banks}>
        {existsBank && bank ? (
            <>
            <p>Bank: {bank.display_name}</p>
            <p>Status: {bank.status}</p>
            <p>Country Code: {bank.country_code}</p>
            </>
        ) : (
            <>
            <p>Loading...</p>
            </>
        )}
        
      </div>
    </main>
    </>
  );
};

export default BankPage;