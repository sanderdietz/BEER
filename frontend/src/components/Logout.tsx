import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }
  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={handleClick}
    >
      Log uit
    </button>
  )
}
