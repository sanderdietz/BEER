import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";

export default function Login({ isPennie }) {
  const loginName = isPennie ? "Pennie login" : "Pluizen login";
  const navigate = useNavigate();

  function handleClick() {
    isPennie ? navigate("/penniepagina") : navigate("/pluizenpagina");
  }

  return (
    <Container>
      <Row>
        <h1 className="text-center">{loginName}</h1>
        <Col>
          <input
            type="password"
            className="form-control"
            placeholder="Wachtwoord"
          />
        </Col>
        <Col>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Inloggen
          </button>
        </Col>
      </Row>
    </Container>
  )
}
