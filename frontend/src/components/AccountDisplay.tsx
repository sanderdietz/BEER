export function AccountDisplay({ account, onDeleteAccount }) {
  async function deleteAccount() {
    const res = await fetch(`/api/accounts/${account.id}`,
      { method: "DELETE" });
    if (res.ok) {
      onDeleteAccount(account.id);
    }
  }

  return (
    <tr>
      <td>{account.name}</td>
      <td>{account.account_type}</td>
      <td>{account.balance}</td>
      <td>
        <button
          type="button"
          className="btn btn-outline-primary"
          // onClick={deleteAccount}
        >
          <i className="bi bi-pencil" />
        </button>
      </td>
    </tr>
  )
}
