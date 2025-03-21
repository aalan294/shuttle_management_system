const Admin = require('../MODELS/AdminSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Admin Registration
const registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if admin already exists
        let existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const newAdmin = new Admin({
            username,
            password: hashedPassword,
        });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully' });

    } catch (error) {
        console.error("Error registering admin:", error);
        res.status(500).json({ message: 'Error registering admin', error });
    }
};

// Admin Login
const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if admin exists
        let admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: admin._id, username: admin.username }, 'your_secret_key', { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });

    } catch (error) {
        console.error("Error logging in admin:", error);
        res.status(500).json({ message: 'Error logging in', error });
    }
};

const Bus = require('../MODELS/BusSchema');


// Add a New Bus
const addBus = async (req, res) => {
    try {
        const { busNumber, type, seatsAvailable, route } = req.body;

        // Validate route structure
        if (!Array.isArray(route) || route.length === 0) {
            return res.status(400).json({ message: 'Route must be a non-empty array' });
        }

        // Check if bus already exists
        let existingBus = await Bus.findOne({ busNumber });
        if (existingBus) {
            return res.status(400).json({ message: 'Bus with this number already exists' });
        }

        // Ensure each stop has required fields
        for (const stop of route) {
            if (!stop.stop || typeof stop.time !== 'number' || typeof stop.fare !== 'number') {
                return res.status(400).json({ message: 'Each route stop must have stop name, travel time (number), and fare (number)' });
            }
        }

        // Create new bus
        const newBus = new Bus({
            busNumber,
            type,
            seatsAvailable,
            route,
        });

        await newBus.save();
        res.status(201).json({ message: 'New bus added successfully', bus: newBus });

    } catch (error) {
        console.error("Error adding bus:", error);
        res.status(500).json({ message: 'Error adding bus', error });
    }
};

// View All Buses
const getAllBuses = async (req, res) => {
    try {
        const buses = await Bus.find();
        res.status(200).json({ buses });

    } catch (error) {
        console.error("Error fetching buses:", error);
        res.status(500).json({ message: 'Error fetching bus details', error });
    }
};

// Update Bus Details (e.g., seats, route updates)
const updateBus = async (req, res) => {
    try {
        const { busNumber } = req.params;
        const { seatsAvailable, route } = req.body;

        // Find bus by busNumber
        let bus = await Bus.findOne({ busNumber });
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        // Update seats if provided
        if (seatsAvailable !== undefined) {
            bus.seatsAvailable = seatsAvailable;
        }

        // Update route if provided
        if (route && Array.isArray(route)) {
            for (const stop of route) {
                if (!stop.stop || typeof stop.time !== 'number' || typeof stop.fare !== 'number') {
                    return res.status(400).json({ message: 'Each route stop must have stop name, travel time (number), and fare (number)' });
                }
            }
            bus.route = route;
        }

        await bus.save();
        res.status(200).json({ message: 'Bus updated successfully', bus });

    } catch (error) {
        console.error("Error updating bus:", error);
        res.status(500).json({ message: 'Error updating bus details', error });
    }
};

// Delete a Bus
const deleteBus = async (req, res) => {
    try {
        const { busNumber } = req.params;

        // Find and delete the bus
        const deletedBus = await Bus.findOneAndDelete({ busNumber });
        if (!deletedBus) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        res.status(200).json({ message: 'Bus deleted successfully' });

    } catch (error) {
        console.error("Error deleting bus:", error);
        res.status(500).json({ message: 'Error deleting bus', error });
    }
};




module.exports = { registerAdmin, loginAdmin, addBus, getAllBuses, updateBus, deleteBus  };
