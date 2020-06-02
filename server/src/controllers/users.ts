import express from "express";

const UserController = express.Router();

const users = ['Maykon', 'Joao', 'Maria'];

UserController.get('', (req, res) => {
    res.json(users);
});

UserController.get('/:id', (req, res) => {
    const index = Number(req.params.id)
    res.json(users[index]);
});

UserController.post('', (req, res) => {
    const index = req.body
    res.json({});
});

export default UserController;