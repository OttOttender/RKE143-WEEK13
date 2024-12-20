const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const todos = await db.query('SELECT * FROM todo;');
        res.json(todos.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
});

router.post('/', async (req, res) => {
    const { task } = req.body;
    
    try {
        const existingTask = await db.query('SELECT * FROM todo WHERE task = $1;', [task]);
        
        if (existingTask.rows.length !== 0) {
            return res.json({ message: 'Task already exists' });
        }

        const result = await db.query('INSERT INTO todo (task) VALUES ($1) RETURNING *;', [task]);
        res.status(200).json({ message: `${result.rowCount} row inserted.` });
    } catch (error) {
        res.status(500).json({ message: 'Error inserting task' });
    }
});

router.delete('/', async (req, res) => {
    const { id } = req.body;

    try {
        const existingTask = await db.query('SELECT * FROM todo WHERE id = $1;', [id]);
        
        if (existingTask.rows.length === 0) {
            return res.json({ message: 'No task found with that ID' });
        }

        const result = await db.query('DELETE FROM todo WHERE id = $1 RETURNING *;', [id]);
        res.status(200).json({ message: `${result.rowCount} row was deleted.` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task' });
    }
});

module.exports = router;
