const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 3030;
const app = express();

require('./connection');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userCtrl = require('./controllers/user');
const docCtrl = require('./controllers/document');

app.use('/api/user', userCtrl);
app.use('/api/document', docCtrl);

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));