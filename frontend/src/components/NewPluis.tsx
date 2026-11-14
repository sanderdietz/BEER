import { useState } from "react";

export default function NewPluis({ lidstatussen, onNewPluis }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    naam: "",
    lidstatusId: 1
  });
  const [error, setError] = useState(null);

  function resetState() {
    setFormData({
      naam: "",
      lidstatusId: 1
    });
    setError(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("/api/accounts", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" }
      });

      if (!res.ok) {
        const data = await res.json();
        if (res.status === 409) {
          setError(data.error);
          return;
        }
        throw new Error(data.error);
      }

      const newPluis = await res.json();
      onNewPluis(newPluis);
      setShowForm(false);
      resetState();
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }

  function handleCancel() {
    setShowForm(false);
    resetState();
  }

  return (
    <>
      {
        showForm
        ?
        <form onSubmit={handleSubmit}>
          <h3>Nieuwe pluis:</h3>
          <input
            type="input"
            className="form-control"
            placeholder="naam"
            onChange={e =>
              setFormData({...formData, naam: e.target.value})
            }
          />
          <select
            className="form-select"
            value={formData.lidstatusId}
            onChange={e =>
              setFormData({...formData, lidstatusId: Number(e.target.value)})
            }
          >
            {
              Object.keys(lidstatussen).map(key =>
                <option key={key} value={key}>{lidstatussen[key]}</option>
              )
            }
          </select>
          {
            error && <>
              <i className="bi bi-exclamation-circle invalid-feedback d-block"> {error}</i>
            </>
          }
          <input
            type="submit"
            value="Voeg toe"
            className="btn btn-primary"
            disabled={!formData.naam}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCancel}
          >
            Annuleer
          </button>
        </form>
        :
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          Nieuwe pluis
        </button>
      }
    </>
  );
}
