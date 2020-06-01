import express from 'express';

const app = express();

app.get('/users', (req, res) => {
    res.send(['Maykon', 'Joao', 'Maria']);
});

app.listen(8081);
