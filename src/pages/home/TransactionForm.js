import React, { useState, useEffect } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import styles from "./Home.module.css";

export default function TransactionForm({ uid }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { addDocument, response } = useFirestore("transactions");

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({
      uid: uid,
      name: name,
      amount: amount,
    });
  };

  useEffect(() => {
    if (response.success === true) {
      setName("");
      setAmount("");
    }
  }, [response.success]);

  return (
    <>
      <h3>
       Transaction
        <div className={styles.message}>
          <div className={styles.word2}>Receipt</div>
          <div className={styles.word3}>Payment</div>
          <div className={styles.word4}>...</div>
          <div className={styles.word1}>...</div>
        </div>
      </h3>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Account (€)</span>
          <input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <button>+</button>
      </form>
    </>
  );
}
