import react, { useEffect, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { connector } from "../config/web3";

export default function Home() {
  const { activate, active, deactivate, account, error, chainId } =
    useWeb3React();

    const connect = useCallback(() => {
      activate(connector);
      localStorage.setItem("isconnected", true);
    }, [activate]);
    
  useEffect(() => {
    if (localStorage.getItem("isconnected") === "true") {
      connect();
    }
  }, [connect]);

 

  const disconnect = () => {
    deactivate();
    localStorage.removeItem("isconnected");
  };

  if(error){
    return <p>se produjo un error  </p>
  }

  return (
    <div className={styles.container}>
      <h1>web3 demo app</h1>
      {active ? (<>
        <button onClick="disconnect">Disconect wallet</button>
        <p>
          estas conectado a {chainId}
          <br />
          your account is {account}
        </p>
        </>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </div>
  );
}
