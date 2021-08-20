const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3050;
const app = express();
const path = require('path');
const router = express.Router();
app.use(bodyParser.json());

// inicio mysql
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'nodeuser',
	password: '123456',
	database: 'node_api'
});
connection.connect(error => {
	if (error) throw error;
	console.log('DB mysql ok!');
});
// fin mysql

app.listen(PORT, () => console.log(`Server corriendo en puerto: ${PORT}`));

// rutas
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});
app.post('/search', (req, res) => {
	const {num_poliza} = req.body;
	const sql = `call sp_leer_poliza(${num_poliza})`;
	connection.query(sql, (error, result) => {
		if (error) throw error;
		res.json(result[0][0]);
	});
});