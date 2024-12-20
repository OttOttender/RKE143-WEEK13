
const express = require('express');
const db = require('./db'); 

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM todo;');
        res.status(200).json({ todo: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.post('/', async (req, res) => {
    const { task } = req.body;

    try {
        const result = await db.query('INSERT INTO todo (task) VALUES ($1) RETURNING id;', [task]);
        res.status(201).json({ message: `1 row inserted with ID ${result.rows[0].id}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.delete('/', async (req, res) => {
    const { id } = req.body; 

    try {
        const result = await db.query('DELETE FROM todo WHERE id = $1 RETURNING id;', [id]);
        if (result.rowCount > 0) {
            res.status(200).json({ message: `${result.rowCount} row(s) deleted.` });
        } else {
            res.status(404).json({ message: "No task found with that ID." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
