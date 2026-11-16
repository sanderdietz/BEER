import { useEffect, useState } from "react";

export default function PluizenTable({ account_type }) {
  const [pluizen, setPluizen] = useState(null);

  useEffect(() => {
    async function fetchPluizen() {
      const res = await fetch(`/api/accounts?${account_type}`);
      const data = await res.json();
      setPluizen(data);
    }
    fetchPluizen();
  }, []);

  return (
    <>
      {
        !pluizen || pluizen.length === 0
        ?
        <p>Geen Pluizen gevonden</p>
        :
        <table className="table">
          <thead>
            <tr>
              <th scope="col">naam</th>
              <th scope="col">saldo</th>
            </tr>
          </thead>
          <tbody>
            {
              pluizen.map(pluis =>
                <tr key={pluis.id}>
                  <td>{pluis.name}</td>
                  <td>{pluis.balance}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      }
    </>
  );
}
