// Import necessary packages and modules
const express = require('express'); // Framework for building web applications
const app = express(); // Create an instance of the Express application
const port = 4000; // Define the port for the server to listen on
const cors = require('cors'); // Middleware for handling Cross-Origin Resource Sharing (CORS)
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const mongoose = require('mongoose'); // MongoDB object modeling tool designed to work in an asynchronous environment

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies

// Connect to MongoDB
async function main() {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@mongodb.cpyhxs1.mongodb.net/MYDB1?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

main();

// Define car schema
const carSchema = new mongoose.Schema({
    make: String,
    model: String,
    price: Number,
    owner: String,
});

// Create car model
const carModel = mongoose.model('Davids_Cars', carSchema);

// Delete a car by ID
app.delete('/api/cars/:id', async (req, res) => {
    try {
        let car = await carModel.findByIdAndDelete(req.params.id);
        if (!car) {
            return res.status(404).send('Car not found');
        }
        res.send('Car deleted successfully');
    } catch (error) {
        console.error('Error deleting car:', error);
        res.status(500).send('Error deleting car');
    }
});

// Update a car by ID
app.put('/api/car/:id', async (req, res) => {
    try {
        console.log("Update: " + req.params.id);
        let car = await carModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(car);
    } catch (error) {
        console.error('Error updating car:', error);
        res.status(500).send('Error updating car');
    }
});

// Test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Create a new car
app.post('/api/cars', async (req, res) => {
    try {
        await carModel.create({
            make: req.body.make,
            model: req.body.model,
            price: req.body.price,
            owner: req.body.owner,
        });
        res.send('Car Created Successfully!');
    } catch (error) {
        console.error('Error creating car:', error);
        res.status(500).send('Error creating car');
    }
});

// Get all cars
app.get('/api/cars', async (req, res) => {
    try {
        let cars = await carModel.find({});
        res.json(cars);
    } catch (error) {
        console.error('Error getting cars:', error);
        res.status(500).send('Error getting cars');
    }
});

// Get a car by ID
app.get('/api/car/:id', async (req, res) => {
    try {
        let car = await carModel.findById(req.params.id);
        res.send(car);
    } catch (error) {
        console.error('Error getting car by ID:', error);
        res.status(500).send('Error getting car by ID');
    }
});

// Search cars by make
app.get('/api/cars/search', async (req, res) => {
    try {
        const make = req.query.make;

        if (!make) {
            return res.status(400).send('Make parameter is required for search');
        }

        let cars = await carModel.find({ make: new RegExp(make, 'i') });
        res.json(cars);
    } catch (error) {
        console.error('Error searching cars:', error);
        res.status(500).send('Error searching cars');
    }
});

// Exact search for cars by make
app.get('/api/cars/exactSearch', async (req, res) => {
    try {
        let cars = await carModel.find({ make: req.query.make });
        res.json(cars);
    } catch (error) {
        console.error('Error getting cars:', error);
        res.status(500).send('Error getting cars');
    }
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
