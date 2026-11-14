import { useNavigate } from "react-router-dom";

function Logout() {
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

export default Logout;
