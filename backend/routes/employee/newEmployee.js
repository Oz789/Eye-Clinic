const express = require('express');
const router = express.Router();
const db = require('../../db');



router.post('/add-employee', (req, res) => {
  const { isAdmin, firstName, lastName, role, phone, email, password } = req.body;

  if (!firstName || !lastName || !role || !phone || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const sql = `
    INSERT INTO Employee (isAdmin, firstName, lastName, role, phone, email, password)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [isAdmin || 0, firstName, lastName, role, phone, email, password], (err, result) => {
    if (err) {
      console.error('Error inserting employee:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    res.status(201).json({ message: 'Employee added successfully', employeeID: result.insertId });
  });
});

module.exports = router;