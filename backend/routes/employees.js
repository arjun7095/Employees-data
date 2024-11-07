const express = require("express");
const Employee = require("../models/Employee");
const router = express.Router();
const multer = require('multer');
const path = require('path'); 
const fs = require('fs');
// Get all employees working fine....
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    const employeesWithFullImagePath = employees.map((employee) => ({
      ...employee.toObject(),
      image: employee.image ? `${req.protocol}://${req.get('host')}/uploads/${employee.image}` : null,
    }));
    res.status(200).json(employeesWithFullImagePath);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new employee  working fine...
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to store images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  },
});

const upload = multer({ storage });
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course } = req.body;
    const image = req.file ? req.file.filename : null; // File name for the uploaded image

    const newEmployee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course: Array.isArray(course) ? course : [course], // Ensure 'course' is an array
      image,
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee', error });
  }
});


// PUT /api/employees/:id
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, designation, gender, course } = req.body;

    // Find the employee by ID
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Update employee fields
    employee.name = name;
    employee.email = email;
    employee.mobile = mobile;
    employee.designation = designation;
    employee.gender = gender;
    employee.course = typeof course === 'string' ? course.split(',') : course; // handle course as array or string

    // If a new image file is uploaded
    if (req.file) {
      // Delete the old image if it exists
      if (employee.image) {
        const oldImagePath = path.join(__dirname, '../uploads', employee.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error('Error deleting old image:', err);
        });
      }

      // Update the employee's image with the new file's name
      employee.image = req.file.filename;
    }

    // Save the updated employee record
    await employee.save();
    res.json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Delete employee and image working fine...
router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    // Check if there is an image and if the image exists in the uploads folder
    if (employee.image) {
      const imagePath = path.join(__dirname, '../uploads', employee.image); // Assuming the image path is relative to the 'uploads' folder
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image:", err);
        } else {
          console.log("Image deleted successfully");
        }
      });
    }

    // Delete the employee record
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ msg: "Employee and image deleted" });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(400).json({ msg: "Error deleting employee" });
  }
});

//Fetching the data for editing  working fine.....
router.get('/:id',async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id); // Fetch employee by ID
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
 

module.exports = router;
