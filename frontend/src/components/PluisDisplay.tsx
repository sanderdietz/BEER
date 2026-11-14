export default function PluisDisplay({ pluis, onDeletePluis }) {
  async function deletePluis() {
    const res = await fetch(`/api/accounts/${pluis.id}`, { method: "DELETE" });
    if (res.ok) {
      onDeletePluis(pluis.id);
    }
  }

  return (
    <tr key={pluis.id}>
      {/*<td>{pluis.id}</td>*/}
      <td>{pluis.name}</td>
      <td>{pluis.account_type_id}</td>
      {/*<td>{lidstatussen[pluis.lidstatus_id]}</td>*/}
      <td>{pluis.initiation_date}</td>
      <td>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={deletePluis}
        >
          <i className="bi bi-trash" />
        </button>
      </td>
    </tr>
  );
}
