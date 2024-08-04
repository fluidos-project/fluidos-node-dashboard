import {Navbar, Container, Nav} from "react-bootstrap";
 
function Header(){
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
            <Navbar.Brand href="/">
                <img
                alt=""
                src="src/assets/Fluidos-logo-white-768x768.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                />{' '}
                Fluidos Dashboard
            </Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link href="#home">Flavor</Nav.Link>
            <Nav.Link href="#features">Solver</Nav.Link>
            <Nav.Link href="#pricing">Reservation</Nav.Link>
            <Nav.Link href="#pricing">Contract</Nav.Link>
            <Nav.Link href="#pricing">Transaction</Nav.Link>
            <Nav.Link href="#pricing">Allocation</Nav.Link>
            <Nav.Link href="#pricing">Peering Candidates</Nav.Link>
            
          </Nav>
          <Nav className="me-auto">
            <Nav.Link href="#pricing">Fluidos Node</Nav.Link>
            </Nav>

            </Container>
        </Navbar>
    )
}

export default Header