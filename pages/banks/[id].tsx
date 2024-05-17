import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Head from "next/head";
import styles from "../../src/app/page.module.css";
import stylesBanks from "../../src/app/banks.module.css";
import stylesCard from "../../src/app/cards.module.css";
import { Navbar } from '../../components';

interface Bank {
    id: string;
    display_name: string;
    name: string;
    status: string;
    country_code: string;
    icon_logo: string;
    primary_color: string;
}

interface Balance {
  current: number;
  available: number;
}

interface CreditData {
  credit_limit: number;
}

interface Account {
  id: string;
  currency: string;
  category: string;
  name: string;
  balance_type: string;
  type: string;
  balance: Balance;
  credit_data: CreditData | null;
  loan_data: CreditData | null;
}

const BankPage = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [bank, setBank] = useState<Bank | null>(null);
    const [existsBank, setExistsBank] = useState(false);
    const [ingresos, setIngresos] = useState(0);
    const [egresos, setEgresos] = useState(0);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const router = useRouter();
    
    useEffect(() => {
        const logged = localStorage.getItem("logged");
        const bank_id = localStorage.getItem("bank_id");
        const bank_name = localStorage.getItem("bank_name");
        setLoggedIn(logged === "1");
        if(logged === "1" && bank_name && bank_id){
          handleClick(bank_id);
          showAccounts(bank_name);
            
        }else{
        
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
              console.log(resp, " | RESPUESTA API INSTITUTION|");
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

    const showAccounts = async (name: string) => {
        try {
            const response = await fetch(`https://sandbox.belvo.com/api/accounts/?page_size=100&institution=${name}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic MDUzNTRjZmMtMTE1Yy00NWE4LWJhMDYtZjkwMDQzY2M1YmMwOiNyZWw5dWYjeGsxdmFSdHRwMnd0Wm5NWnVUYzdOMGtaakpLYUt5RzA1WXVadzFsSnd4KlIxd2ZWI2JhMUNrZDU='
                }
            });
            if (response.ok) {
                const resp = await response.json();
                console.log(resp, " |RESPUESTA API ACCOUNTS|");
                setAccounts(resp.results);
                let ingresos_tmp = 0;
                let egresos_tmp = 0;

                for (const account of resp.results) {
                  if(account.loan_data !== null){
                    egresos_tmp += account.balance.current;
                  }else if(account.credit_data !== null){
                    egresos_tmp += account.balance.current;
                  }else if(account.loan_data === null && account.credit_data === null){
                    ingresos_tmp += account.balance.current;
                  }
                }

                setIngresos(ingresos_tmp);
                setEgresos(egresos_tmp);
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
            <div key={bank.id} className={stylesCard.card}>
              <div className={stylesCard.card_top}>
                <div className={stylesCard.card_top_info}>
                  <div className={stylesCard.card_top_info_header}>
                    <h1>{bank.display_name}</h1>
                  </div>
                </div>
                <div className={stylesCard.card_top_price}>
                  <h1 className={stylesCard.card_top_price_header}><img src={bank.icon_logo}  /></h1>
                </div>
                <div className={stylesCard.card_top_price}>
                  <h1 className={stylesCard.card_top_price_header}>Ingresos: ${ingresos.toFixed(2)}</h1>
                </div>
                <div className={stylesCard.card_top_price}>
                  <h1 className={stylesCard.card_top_price_header}>Egresos: {egresos.toFixed(2)}</h1>
                </div>
              </div>
              <div className={stylesCard.card_bottom}>
                <span className={stylesCard.card_bottom_description}></span>
                <button className={stylesCard.card_bottom_btn}  style={{ backgroundColor: bank.primary_color }} type="button" onClick={() => showAccounts(bank.name)} >Ver</button>
              </div>
            </div>

            <table className={stylesCard.rwd_table}>
              <tr>
                <th>Categoría</th>
                <th>Currency</th>
                <th>Tipo</th>
                <th>Nombre</th>
                <th>Saldo</th>
              </tr>
              {accounts.map((item) => (
                <tr key={item.id}>
                  <td data-th="Categoría">{item.category}</td>
                  <td data-th="Currency">{item.currency}</td>
                  <td data-th="Tipo">{item.type}</td>
                  <td data-th="Nombre">{item.name}</td>
                  <td data-th="Saldo">Current: {item.balance.current} - Available: {item.balance.available}</td>
                </tr>
              ))}
            </table>
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