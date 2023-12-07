// Importing necessary components from React
import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Content from './components/content';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import CreateCar from './components/createCar';
import Read from './components/read';
import Edit from './components/edit';
import Search from './components/search'; // Import the new Search component

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Navbar component */}
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Nav className="me-auto">
              {/* Dropdown menu */}
              <NavDropdown title="More" id="basic-nav-dropdown">
                <NavDropdown.Item href="/createCar">Create a Car</NavDropdown.Item>
                <NavDropdown.Item href="/read">List All Cars</NavDropdown.Item>
                <NavDropdown.Item href="/search">Search Cars</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/search">Search For A Car</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        {/* React Router's Routes component for handling different routes */}
        <Routes>
          <Route path='/' element={<Content />}></Route>
          <Route path='/read' element={<Read />}></Route>
          <Route path='/createCar' element={<CreateCar />}></Route>
          <Route path='/edit/:id' element={<Edit />}></Route>
          <Route path='/search' element={<Search />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
