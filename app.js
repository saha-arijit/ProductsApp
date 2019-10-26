

const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js')
const mongoose = require('mongoose')

//require('./routes/note.routes.js')(app); // need to understand this line

//const product = require('./routes/product.route');

// create express app
const app = express();

mongoose.Promise = global.Promise; // need to understand this line

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"status":200,
    	"message": "Welcome to EasyNotes application."});
});

//app.use('/products', product);

require('./routes/note.routes.js')(app); // need to understand this line

let port = 8090;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});


// need to understand the syntax and meaning
mongoose.connect(dbConfig.url, {
	useNewUrlParser : true
}).then(() => {
	console.log("Successfully connected to the database.")
}).catch(err => {
	console.log("Could not connect to the database, thus exiting.")
	process.exit();
});
