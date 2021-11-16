require('dotenv').config();
const express = require('express');

const app = express();
const router = express.Router();

const port = process.env.PORT || 5000;

const getBalance = require('./routes/getBalance');
const executeTransaction = require('./routes/executeTransaction');
const estimateFee = require('./routes/estimateFee');
const getTransaction = require('./routes/getTransaction');
const sendToAddress = require('./routes/sendToAddress');

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
// app.use(cors());

app.use('/', router);
app.use('/getBalance', getBalance);
app.use('/executeTransaction', executeTransaction);
app.use('/estimateFee', estimateFee);
app.use('/getTransaction', getTransaction);
app.use('/sendToAddress', sendToAddress);

app.get('/', (req, res) => {
	res.send('Bitcoin Node');
});

app.listen(port, () => {
	console.log(`Bitcoin Node is listening at http://localhost:${port}`);
});
