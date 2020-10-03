const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

app.get('/', (req, resp) => {
    axios.get('https://fetch-hiring.s3.amazonaws.com/hiring.json')
    .then(res => resp.status(200).send(res.data))
    .catch(err => resp.status(500));
});

app.listen(5000, () => console.log('Listening on port 5000'));