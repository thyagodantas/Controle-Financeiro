"use strict";
const express = require("express");
const cors = require('cors');
const sqlite3 = require('sqlite3');
const bodyParser = require("body-parser");
const app = express();
let port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const db = new sqlite3.Database('./db/database.sqlite');
app.post('/api/adicionar', (req, res) => {
    const { description, value, type } = req.body;
    db.run('INSERT INTO transactions (description, value, type) VALUES (?, ?, ?)', [description, value, type], function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao adicionar usuário.' });
        }
        else {
            res.status(200).json({ message: 'Adicionado com sucesso' });
        }
    });
});
app.delete("/api/deletar/:id", (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM transactions WHERE idtransactions = ?`;
    db.run(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: "Failed to delete transaction" });
        }
        else {
            res.status(200).json({ message: "Transaction deleted successfully" });
        }
    });
});
app.get('/api/listar', (req, res) => {
    db.all('SELECT * FROM transactions', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao recuperar usuários.' });
        }
        else {
            res.json(rows);
        }
    });
});
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
