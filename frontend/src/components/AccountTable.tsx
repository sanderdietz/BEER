import { useCallback, useEffect, useState } from "react"
import { AccountDisplay } from "./AccountDisplay";

type Column = "id" | "name" | "account_type" | "initiation_date" | "balance";

export function AccountTable() {
  const [accounts, setAccounts] = useState(null);
  const [columns, setColumns] = useState(["name", "account_type", "balance"]);

  useEffect(() => {
    async function fetchAccounts() {
      const res = await fetch("/api/accounts");
      const data = await res.json();
      setAccounts(data);
    }

    fetchAccounts();
  }, []);

  const handleDeleteAccount = useCallback((id) => {
    setAccounts(accounts.filter((account) => account.id != id));
  }, [accounts]);

  return (
    <>
      {
        !accounts || accounts.length === 0
        ?
        <p>Geen accounts gevonden</p>
        :
        <table>
          <thead>
            <tr>
              <th>naam</th>
              <th>accounttype</th>
              <th>saldo</th>
              <th>aanpassen</th>
            </tr>
          </thead>
          <tbody>
            {
              accounts.map(account =>
                <AccountDisplay account={account} onDeleteAccount={handleDeleteAccount} />
              )
            }
          </tbody>
        </table>
      }
    </>
  )
}
