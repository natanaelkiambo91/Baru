const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "perpustakaandb",
    multipleStatements: true
});

app.get("/", (req, res) => {
    const sql = "SELECT * FROM databasess";
    db.query(sql, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

app.post('/Daftar', (req, res) => {
    const sql = "INSERT INTO databasess (NIM, Nama, Fakultas) VALUES (?, ?, ?)";
    const values = [
        req.body.NIM,
        req.body.Nama,
        req.body.Fakultas
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

app.put('/Updatesiswa/:NIM', (req, res) => {
    const sql = "update databasess set Nama = ?, Fakultas = ? where NIM = ?";
    const values = [
        req.body.Nama,
        req.body.Fakultas
    ]
    const NIM= req.params.NIM;

    db.query(sql, [...values, NIM], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

app.delete('/Admin/:NIM', (req, res) => {
    const sql = "DELETE FROM databasess WHERE NIM = ?";
    const NIM = req.params.NIM;

    db.query(sql, [NIM], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});



app.listen(8081, () => {
    console.log("Listening on port 8081");
});
