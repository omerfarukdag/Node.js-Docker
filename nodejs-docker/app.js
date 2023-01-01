const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

const url = 'mongodb://root:root@database:27017';
const database = 'docker';
const client = new MongoClient(url);

client.connect(function(err) {
    if (err) throw err;
    console.log('Successfully connected to the database');
});
const collection = client.db(database).collection('data');

app.get('/', (req, res) => {
    collection.insertOne(req.headers, (err) => {
        if (err) throw err;
        res.send('Record inserted successfully');
    });
});

app.get('/data', (req, res) => {
    collection.find({}).toArray((err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.listen(8000, () => {
    console.log('Server started on http://localhost:8000');
});