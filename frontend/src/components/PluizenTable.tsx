import { useCallback, useEffect, useState } from "react";
import NewPluis from "./NewPluis";
import PluisDisplay from "./PluisDisplay";

export default function PluizenTable() {
  const [lidstatussen, setLidstatussen] = useState(null);
  const [pluizen, setPluizen] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const resLidstatussen = await fetch("/api/accounts/types");
      const dataLidstatussen = await resLidstatussen.json();
      setLidstatussen(dataLidstatussen);

      const resPluizen = await fetch("/api/accounts");
      const dataPluizen = await resPluizen.json();
      console.log(dataPluizen);
      setPluizen(dataPluizen);
    }
    fetchData()
  }, []);

  const handleDeletePluis = useCallback((id: number) => {
    setPluizen(pluizen.filter((pluis) => pluis.id != id));
  }, [pluizen]);

  const handleNewPluis = useCallback((newPluis) => {
    setPluizen([...pluizen, newPluis]);
  }, [pluizen]);

  return (
    <>
      <h2>Pluizen</h2>
      {
        !pluizen || pluizen.length === 0
        ?
        <p>Geen Pluizen gevonden</p>
        :
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">naam</th>
              <th scope="col">lidstatus</th>
              <th scope="col">indrinkdatum</th>
            </tr>
          </thead>
          <tbody>
            {
              pluizen.map(pluis =>
                <PluisDisplay key={pluis.id} lidstatussen={lidstatussen} pluis={pluis} onDeletePluis={handleDeletePluis} />
              )
            }
          </tbody>
        </table>
      }
      <NewPluis lidstatussen={lidstatussen} onNewPluis={handleNewPluis} />
    </>
  );
}
