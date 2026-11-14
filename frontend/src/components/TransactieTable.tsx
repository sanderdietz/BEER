import { useEffect, useState } from "react";

export default function TransactieTable() {
  const [transacties, setTransacties] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/transacties");
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
              <th>van_account_id</th>
              <th>naar_account_id</th>
              <th>bedrag</th>
              <th>transactietype_id</th>
              <th>beschrijving</th>
            </tr>
          </thead>
          <tbody>
            {
              transacties.map(transactie =>
                <tr key={transactie.id}>
                  <td>{transactie.id}</td>
                  <td>{transactie.van_account_id}</td>
                  <td>{transactie.naar_account_id}</td>
                  <td>{transactie.bedrag}</td>
                  <td>{transactie.transactietype_id}</td>
                  <td>{transactie.beschrijving}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      }
    </>
  );
}
