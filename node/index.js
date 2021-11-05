require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

const port = process.env.PORT || 5000;

const getBalance = require('./routes/getBalance');

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
// app.use(cors());

app.use('/', router);
app.use('/getBalance', getBalance);

app.get('/', (req, res) => {
	res.send('Bitcoin Node');
});

app.listen(port, () => {
	console.log(`Bitcoin Node is listening at http://localhost:${port}`);
});
