const Student = require('../MODELS/StudentSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Bus = require('../MODELS/BusSchema');
const Ride = require('../MODELS/RideSchema');

const registerStudent = async (req, res) => {
    try {
        const { name, regNo, email, mobile, department, password } = req.body;

        // Check if student already exists
        let existingStudent = await Student.findOne({ regNo });
        if (existingStudent) {
            return res.status(400).json({ message: 'Student already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new student
        const newStudent = new Student({
            name,
            regNo,
            email,
            mobile,
            department,
            password: hashedPassword,
            totalRideCount: 0,
            rideHistory: [],
            balance: 500,
        });
        console.log(newStudent)

        await newStudent.save();
        res.status(201).json({ message: 'Student registered successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error registering student', error });
    }
};

const loginStudent = async (req, res) => {
    try {
        const { regNo, password } = req.body;

        // Check if student exists
        let student = await Student.findOne({ regNo });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Ensure password field exists
        if (!student.password) {
            return res.status(500).json({ message: 'No password found in database. Try re-registering.' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: student._id, regNo: student.regNo }, 'your_secret_key', { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });

    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
        console.log(error);
    }
};



// Student Booking a Ride
const bookRide = async (req, res) => {
    try {
        const { studentId, type, source, destination } = req.body;

        // Validate request body
        if (!studentId || !type || !source || !destination) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find student
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Find the appropriate bus (either "in" or "out")
        const bus = await Bus.findOne({ type });
        if (!bus) {
            return res.status(404).json({ message: "No bus available for this route" });
        }

        // Check if bus has available seats
        if (bus.seatsAvailable <= 0) {
            return res.status(400).json({ message: "No available seats on this bus" });
        }

        // Calculate fare & travel time based on stops
        let fare = 0;
        let travelTime = 0;
        let startFound = false;

        for (let i = 0; i < bus.route.length; i++) {
            if (bus.route[i].stop === source) {
                startFound = true;
                fare = bus.route[i].fare;
                travelTime = bus.route[i].time;
            }
            if (bus.route[i].stop === destination) break;
            if (startFound) {
                fare += bus.route[i].fare;
                travelTime += bus.route[i].time;
            }
        }

        // Check if valid route was found
        if (fare === 0 || travelTime === 0) {
            return res.status(400).json({ message: "Invalid source or destination" });
        }

        // Check if student has enough balance
        if (student.balance < fare) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        // Deduct fare from student balance
        student.balance -= fare;
        student.totalRideCount += 1;

        // Reduce available seats in the bus
        bus.seatsAvailable -= 1;

        // Create new ride entry
        const newRide = new Ride({
            studentId: student._id,
            busId: bus._id,
            source,
            destination,
            fare,
            time: `${travelTime} minutes`
        });

        // Save updates
        await student.save();
        await bus.save();
        await newRide.save();

        res.status(201).json({ message: "Ride booked successfully", ride: newRide });

    } catch (error) {
        console.error("Error booking ride:", error);
        res.status(500).json({ message: "Error booking ride", error });
    }
};

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find(); // Fetch all students from DB
        res.status(200).json({ students });

    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Error fetching student details", error });
    }
};





module.exports = { registerStudent, loginStudent, bookRide,getAllStudents };
