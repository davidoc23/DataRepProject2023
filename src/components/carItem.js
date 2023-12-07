// Import necessary dependencies and components
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Modal } from 'react-bootstrap'; // Import Bootstrap components
import carPhoto from './Photo.jpg'; // Import an image for the cars
import "../App.css"; // Import the CSS file for styling

// Functional component for rendering individual car items
function CarItem({ myCar }) {
  // Hook for navigation
  const navigate = useNavigate();

  // Confirmation Modal State
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Function to handle the delete button click, showing the confirmation modal
  const handleDelete = () => {
    setShowConfirmation(true);
  };

  // Function to handle the confirmation of deletion
  const handleDeleteConfirmation = () => {
    // Send a DELETE request to remove the car from the database
    axios
      .delete(`http://localhost:4000/api/cars/${myCar._id}`)
      .then((response) => {
        console.log(response.data);
        // Close the confirmation modal
        setShowConfirmation(false);
        // Show success popup with options
        setSuccessPopup(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Function to handle closing the confirmation modal without deleting the car
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  // Success Popup State
  const [successPopup, setSuccessPopup] = useState(false);

  // Function to handle closing the success popup
  const handleCloseSuccessPopup = () => {
    setSuccessPopup(false);
  };

  // Function to handle adding another car after successful deletion
  const handleAddAnotherCar = () => {
    // Close the success popup
    setSuccessPopup(false);
    // Optionally, you can navigate to the createCar route or perform any other action
    navigate('/createCar');
  };

  // Function to handle navigating to the homepage after successful deletion
  const handleGoToHomepage = () => {
    // Close the success popup
    setSuccessPopup(false);
    // Navigate to the homepage
    navigate('/');
  };

  // JSX to render the individual car item
  return (
    <div>
      <Card>
        <Card.Header className='ItemName'>
          Make: {myCar.make}
          <br />
          Model: {myCar.model}
        </Card.Header>
        <Card.Body>
          <p>Owner: {myCar.owner}</p>
          <p>Price: €{myCar.price}</p>
        </Card.Body>
        <Card.Body className="d-flex justify-content-center">
          {/* Display placeholder car photos */}
          <Card.Img src={carPhoto} alt="Car" style={{ width: '200px', height: '160px' }} />
          <Card.Img src={carPhoto} alt="Car" style={{ width: '200px', height: '160px' }} />
          <Card.Img src={carPhoto} alt="Car" style={{ width: '200px', height: '160px' }} />
          <Card.Img src={carPhoto} alt="Car" style={{ width: '200px', height: '160px' }} />
          <Card.Img src={carPhoto} alt="Car" style={{ width: '200px', height: '160px' }} />
        </Card.Body>
        <div className="d-flex justify-content-center">
          {/* Links for editing and deleting the car */}
          <Link to={`/edit/${myCar._id}`} className="btn btn-primary" style={{ width: '150px', marginRight: '10px', marginBottom: '10px' }}>
            Edit
          </Link>
          <Button onClick={handleDelete} className="btn btn-danger" style={{ width: '150px', marginBottom: '10px' }}>
            Delete
          </Button>
        </div>
      </Card>

      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this car?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteConfirmation}>
            Confirm Delete
          </Button>
          <Button variant="secondary" onClick={handleCloseConfirmation}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Popup */}
      {successPopup && (
        <Modal show={successPopup} onHide={handleCloseSuccessPopup}>
          <Modal.Header closeButton>
            <Modal.Title>Deletion Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>What would you like to do next?</Modal.Body>
          <Modal.Footer>
            {/* Button to add another car */}
            <Button variant="primary" onClick={handleAddAnotherCar}>
              Add Another Car
            </Button>
            {/* Link to go to the homepage */}
            <Link to="/">
              <Button variant="primary" onClick={handleGoToHomepage}>
                Go to Homepage
              </Button>
            </Link>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

// Export the CarItem component
export default CarItem;
