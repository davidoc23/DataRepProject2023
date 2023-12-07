// Importing necessary components from React
import React from 'react';
import { Link } from 'react-router-dom';

// Defining a functional component named Content
function Content() {
    return (
        <div className="main">
            {/* Section with welcome message and instructions */}
            <h2>Welcome! Get started with these steps:</h2>
            <ol>
                <li>Select "Create" from the dropdown menu at the top to add a new car to the database.</li>
                <li>If you want to edit an existing car, choose "Edit" from the dropdown menu at the top.</li>
            </ol>
            <p>Make sure to provide details like make, model, owner, and price for each car.</p>
            <p>Once you've created or edited cars, view the list by selecting "Read" in the navigation.</p>
            <p>Feel free to explore and manage your car database!</p>

            {/* Buttons for creating and editing cars */}
            <div>
                <h3>Feel free to click one of the buttons below or the button at the top of the page</h3>
                {/* Link to create a new car */}
                <Link to="/createCar" className="btn btn-primary">
                    Create a Car
                </Link>
                {" "}
                {/* Link to view the list of all cars */}
                <Link to="/read" className="btn btn-secondary">
                    List All Cars
                </Link>
                {/* Link to search for a specific car */}
                <Link to="/search" className="btn btn-secondary">
                    Search for a Car
                </Link>
            </div>
        </div>
    );
}

// Exporting the Content component to make it available for use in other parts of the application
export default Content;
