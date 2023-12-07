import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css"; // Import the CSS file for styling

// Defining a functional component named Create
function CreateCar() {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [owner, setOwner] = useState('');
  const [price, setPrice] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handlePriceChange = (e) => {
    // Allow only numeric values and an empty string for the price
    const newValue = e.target.value.replace(/[^0-9]/g, '');
    setPrice(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any fields are empty
    if (!make || !model || !owner || !price) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    // Car array
    const car = {
      make: make,
      model: model,
      price: price,
      owner: owner,
    };

    axios.post('http://localhost:4000/api/cars', car)
      .then((response) => {
        // Log the response from the server
        console.log(response.data);
        // Set success message
        setSuccessMessage('Car successfully created!');
        // Clear form inputs
        setMake('');
        setModel('');
        setOwner('');
        setPrice('');
        // Show popup
        setShowPopup(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closePopup = () => {
    // Close the popup
    setShowPopup(false);
    // Optionally, you can navigate to /read here if needed
  };

  return (
    <div className="main">
      <h2>Add a New Car</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Car Make:</label>
          <input
            type="text"
            className="form-control"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            placeholder="Enter car make"
          />
        </div>
        <div className="form-group">
          <label>Car Model:</label>
          <input
            type="text"
            className="form-control"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Enter car model"
          />
        </div>
        <div className="form-group">
          <label>Car Owner:</label>
          <input
            type="text"
            className="form-control"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder="Enter car owner"
          />
        </div>
        <div className="form-group">
          <label>Car Price (Numerics only):</label>
          <input
            type="text"
            className="form-control"
            value={price}
            onChange={handlePriceChange}
            placeholder="Enter car price"
          />
        </div>
        <br />
        <div>
          <button type="submit" className="btn btn-primary">
            Add Car to Database
          </button>
        </div>
      </form>

      {/* Popup for success message */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>{successMessage}</p>
            <button onClick={closePopup}>Close</button>
            <Link to="/read">
              <button className="btn btn-primary">View Cars</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// Exporting the Create component to make it available for use in other parts of the application
export default CreateCar;
