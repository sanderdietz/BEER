import { useEffect, useState } from "react";

export default function TransactionsTable() {
  const [transacties, setTransacties] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransacties(data);
    }
    fetchData()
  }, []);

  return (
    <>
      <h2>Transacties</h2>
      {
        !transacties || transacties.length === 0
        ?
        <p>Geen transacties gevonden</p>
        :
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>from_account</th>
              <th>to_account</th>
              <th>amount</th>
              <th>transaction_type</th>
              <th>transaction_date</th>
              <th>description</th>
            </tr>
          </thead>
          <tbody>
            {
              transacties.map(transactie =>
                <tr key={transactie.id}>
                  <td>{transactie.id}</td>
                  <td>{transactie.from_account}</td>
                  <td>{transactie.to_account}</td>
                  <td>{transactie.amount}</td>
                  <td>{transactie.transaction_type}</td>
                  <td>{transactie.transaction_date}</td>
                  <td>{transactie.description}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      }
    </>
  );
}
