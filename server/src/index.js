const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const cors = require('cors');

app.use(cors());

require('./database');

app.use('/api', require('./routes/index'));

app.listen(5000, () => {
    console.log('Server on port', 5000);
});