// Import necessary dependencies and components
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card, Modal } from 'react-bootstrap'; // Import Bootstrap components
import { Link, useNavigate } from 'react-router-dom';
import carPhoto from './Photo.jpg'; // Import an image for the cars
import '../App.css'; // Import the CSS file for styling

// Define the Search component
function Search() {
  // State hooks to manage various aspects of the component
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showEmptyQueryPopup, setShowEmptyQueryPopup] = useState(false);
  const [showWrongMakePopup, setShowWrongMakePopup] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);
  const navigate = useNavigate();

  // Function to handle the search based on car make
  const handleSearch = async (e) => {
    e.preventDefault();

    // Check if the search query is empty
    if (!searchQuery.trim()) {
      setShowEmptyQueryPopup(true);
      return;
    }

    try {
      // Fetch data based on the search query
      const response = await axios.get(`http://localhost:4000/api/cars/exactSearch?make=${searchQuery}`);
      const retrievedCars = response.data;

      // Filter matching cars based on the entered make
      const matchingCars = retrievedCars.filter((car) => car.make === searchQuery);

      // Update search results or show a popup for incorrect make
      if (matchingCars.length > 0) {
        setSearchResults(matchingCars);
      } else {
        setShowWrongMakePopup(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Functions to handle closing popups and trying again
  const handleCloseEmptyQueryPopup = () => {
    setShowEmptyQueryPopup(false);
  };

  const handleTryAgain = () => {
    setShowEmptyQueryPopup(false);
  };

  const handleCloseWrongMakePopup = () => {
    setShowWrongMakePopup(false);
  };

  // Function to navigate to adding a new car after an incorrect make
  const handleEnterNewCar = () => {
    setShowWrongMakePopup(false);
    navigate('/createCar');
  };

  // Functions to handle deletion confirmation and closing the confirmation popup
  const handleDelete = (car) => {
    setCarToDelete(car);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      // Delete the selected car and update the search results
      await axios.delete(`http://localhost:4000/api/cars/${carToDelete._id}`);
      setShowDeleteConfirmation(false);

      const updatedResults = searchResults.filter((car) => car._id !== carToDelete._id);
      setSearchResults(updatedResults);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  // JSX to render the Search component
  return (
    <div className='main'>
      <Container>
        <div className="ItemName">
          <h2>Search Cars</h2>
          {/* Form for entering the car make for search */}
          <Form onSubmit={handleSearch}>
            <Form.Group className="mb-3">
              <Form.Label>Search by Car Make:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter car make"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Form>

          <Container>
            {/* Display search results or a message if no matching cars found */}
            {searchResults.length > 0 ? (
              searchResults.map((car) => (
                // Display individual car details, image, and edit/delete options
                <Card key={car._id} className="mb-3">
                  <Card.Header>
                    Make: {car.make}
                    <br />
                    Model: {car.model}
                  </Card.Header>
                  <Card.Body>
                    <p>Owner: {car.owner}</p>
                    <p>Price: €{car.price}</p>
                  </Card.Body>
                  <Card.Body className="d-flex justify-content-center">
                    {/* Display placeholder car photos */}
                    <Card.Img src={carPhoto} alt="Car" style={{ width: '200px', height: '160px' }} />
                    <Card.Img src={carPhoto} alt="Car" style={{ width: '200px', height: '160px' }} />
                    <Card.Img src={carPhoto} alt="Car" style={{ width: '200px', height: '160px' }} />
                    <Card.Img src={carPhoto} alt="Car" style={{ width: '200px', height: '160px' }} />
                  </Card.Body>
                  {/* Links for editing and deleting the car */}
                  <Link to={`/edit/${car._id}`} className="btn btn-primary" style={{ width: 'auto', marginBottom: '10px', marginRight: '10px', marginLeft: '10px' }}>
                    Edit
                  </Link>
                  <Button
                    onClick={() => handleDelete(car)}
                    className="btn btn-danger"
                    style={{ width: 'auto', marginBottom: '10px', marginRight: '10px', marginLeft: '10px' }}
                  >
                    Delete
                  </Button>
                </Card>
              ))
            ) : (
              // Display a message and a link to add a new car if no matching cars found
              <div>
                <p>No matching cars found.</p>
                <Link to="/createCar" className="btn btn-primary">
                  Add a Car
                </Link>
              </div>
            )}
          </Container>

          {/* Modals for handling different popups */}
          {/* Empty Query Popup */}
          <Modal show={showEmptyQueryPopup} onHide={handleCloseEmptyQueryPopup}>
            <Modal.Header closeButton>
              <Modal.Title>Empty Search Query</Modal.Title>
            </Modal.Header>
            <Modal.Body>Please enter a value before searching.</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleTryAgain}>
                Try Again
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Wrong Make Popup */}
          <Modal show={showWrongMakePopup} onHide={handleCloseWrongMakePopup}>
            <Modal.Header closeButton>
              <Modal.Title>Incorrect Car Make</Modal.Title>
            </Modal.Header>
            <Modal.Body>The entered car make does not match any records. Please enter the proper details.</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseWrongMakePopup}>
                Close
              </Button>
              <Button variant="primary" onClick={handleEnterNewCar}>
                Add A New Car
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Delete Confirmation Modal */}
          <Modal show={showDeleteConfirmation} onHide={handleCloseDeleteConfirmation}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete the car with make: {carToDelete?.make} and model: {carToDelete?.model}?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleDeleteConfirmation}>
                Confirm Delete
              </Button>
              <Button variant="secondary" onClick={handleCloseDeleteConfirmation}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Container>
    </div>
  );
}

// Export the Search component as the default export
export default Search;
