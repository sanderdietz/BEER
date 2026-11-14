import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Login from "../components/Login";

function Home() {
  return (
    <Container>
      <Row>
        <Col>
          <Login isPennie={false} />
        </Col>
        <Col>
          <Login isPennie={true} />
        </Col>
      </Row>
    </Container>
  )
}

export default Home;
