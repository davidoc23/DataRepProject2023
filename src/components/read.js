// Import React and necessary hooks from React
import React, { useEffect, useState } from "react";
// Axios for making HTTP requests
import axios from "axios";
// Import the Cars component from the specified file
import Cars from "./cars";
// Import Link from react-router-dom for navigation
import { Link } from 'react-router-dom';
// Import the CSS file for styling
import "../App.css";

// Define the Read component
function Read() {
  // State hook to manage the data fetched from the API
  const [data, setData] = useState([]);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    axios.get('http://localhost:4000/api/cars')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching car data:', error);
      });
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  // JSX to render the component
  return (
    <div className="main">
      <h2>Explore Our Cars</h2>

      {/* Conditional rendering based on whether there is data or not */}
      <div className=".mb-3">
        {data.length > 0 ? (
          // Render the Cars component if there is data
          <Cars myCars={data}></Cars>
        ) : (
          // Render a message and a link to add a car if there is no data
          <div>
            <p>No cars found in the database.</p>
            <p>Please add a car to continue</p>
            {/* Link to the createCar route */}
            <Link to="/createCar" className="btn btn-primary">
              Add a Car
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// Export the Read component as the default export
export default Read;
