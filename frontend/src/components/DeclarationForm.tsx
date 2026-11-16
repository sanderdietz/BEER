import { useEffect, useState } from "react";

export default function DeclarationForm() {
  const [formData, setFormData] = useState({
    transactionType: "",
    name: null
  });
  const [pluizen, setPluizen] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // const resTransactionTypes = await fetch("/api/transactions/types");
      // const dataTransactionTypes = await resTransactionTypes.json();
      // setTransactionTypes(dataTransactionTypes);

      const res = await fetch("/api/accounts?meeloper&lid&oud_lid&order=initiation_date");
      const data = await res.json();
      setPluizen(data);
    }
    fetchData();
  }, [])

  return (
    <>
      {
        pluizen &&
        <form>
          <div className="form-group">
            <label>Type</label>
            <select
              required
              className="form-select"
              value={formData.transactionType}
              onChange={e => setFormData({...formData, transactionType: e.target.value})}
            >
              <option value={"cadeau"}>Cadeau</option>
              <option value={"eten"}>Eten</option>
              <option value={"overig"}>Overig</option>
            </select>

          </div>
          <div className="form-group">
            <label>Naam</label>
            <select
              className="form-select"
            >
              {
                pluizen.map((pluis) =>
                  <option key={pluis.id}>{pluis.name}</option>
                )
              }
            </select>
          </div>
        </form>
      }
    </>
  );
}
