// Import React and necessary hooks and dependencies
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../App.css"; // Import the CSS file for styling

// Functional component for editing a car
export default function Edit(props) {
    // Retrieve the car id from the URL parameters
    let { id } = useParams();

    // State hooks to manage the form inputs and navigation
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [price, setPrice] = useState("");
    const [owner, setOwner] = useState("");
    const navigate = useNavigate();

    // useEffect hook to fetch the car details based on the id when the component mounts
    useEffect(() => {
        axios.get('http://localhost:4000/api/car/' + id)
            .then((response) => {
                // Set the state with the retrieved car details
                setMake(response.data.make);
                setModel(response.data.model);
                setPrice(response.data.price);
                setOwner(response.data.owner);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [id]); // Dependency array ensures this effect runs only when id changes

    // Function to handle changes in the price input, allowing only numeric values
    const handlePriceChange = (e) => {
        // Allow only numeric values and an empty string for the price
        const newValue = e.target.value.replace(/[^0-9]/g, '');
        setPrice(newValue);
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Check if any fields are empty
        if (!make || !model || !owner || !price) {
            alert("Please fill out all fields before submitting.");
            return;
        }

        // Create a new car object with updated details
        const newCar = {
            id: id,
            make: make,
            model: model,
            price: price,
            owner: owner
        };

        // Make a PUT request to update the car details
        axios.put('http://localhost:4000/api/car/' + id, newCar)
            .then((res) => {
                console.log(res.data);
                // Navigate to the 'read' page after successful update
                navigate('/read');
            });
    }

    // JSX to render the Edit component
    return (
        <div className="main">
            <form onSubmit={handleSubmit}>
                {/* Form inputs for updating car details */}
                <div className="form-group">
                    <label>Update car make: </label>
                    <input type="text" className="form-control" value={make} onChange={(e) => setMake(e.target.value)}
                    placeholder="Update car make:"/>
                </div>

                <div className="form-group">
                    <label>Update car model: </label>
                    <input type="text" className="form-control" value={model} onChange={(e) => setModel(e.target.value)} 
                    placeholder="Update car model:"/>
                </div>

                <div className="form-group">
                    <label>Update car owner: </label>
                    <input type="text" className="form-control" value={owner} onChange={(e) => setOwner(e.target.value)}
                    placeholder="Update car owner:"/>
                </div>

                <div className="form-group">
                    <label>Update car price: (Numerics only)</label>
                    <input type="text" className="form-control" value={price} onChange={handlePriceChange}
                    placeholder="Update car price: "/>
                </div>

                {/* Submit button */}
                <div className="form-group">
                    <input type="submit" value="Update Details" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}
