import { useEffect, useState } from "react";

function RemoteValue() {
  const [localValue, setLocalValue] = useState(50);
  const [remoteValue, setRemoteValue] = useState<number | null>(null);

  useEffect(() => {
    async function fetchValue() {
      const res = await fetch("/api/value");
      const data = await res.json();
      setRemoteValue(data.value);
    }

    fetchValue();
  }, []);

  async function handleClick() {
    const res = await fetch("/api/value", {
      method: "POST",
      body: JSON.stringify({value: "test"}),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    console.log(`click: ${data}`);
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = Number(e.target.value);
    setLocalValue(newValue);
    const res = await fetch("/api/value", {
      method: "PUT",
      body: JSON.stringify({value: newValue}),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    setRemoteValue(data.value);
  }

  return (
    <>
      <label>Range</label>
      <input type="range" className="form-range" value={localValue} onChange={handleChange} />
      <p>Value (local): {localValue}</p>
      <p>Value (remote): {remoteValue ?? "Loading..."}</p>
      <button onClick={handleClick}>click</button>
    </>
  )
}

export default RemoteValue;
