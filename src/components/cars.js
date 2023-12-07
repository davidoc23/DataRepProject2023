// Inside Cars component
import CarItem from "./carItem";
import "../App.css"; // Import the CSS file for styling

function Cars(props) {
    // Using the map function to iterate through an array of cars (props.myCars)
    return props.myCars.map((car) => {
        // Rendering the CarItem component for each car in the array
        // Passing car data as 'myCar' prop and using '_id' as a unique key
        return <CarItem myCar={car} key={car._id}></CarItem>;
    });
}

// Exporting the Cars component to make it available for use in other parts of the application
export default Cars;
