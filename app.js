const express = require("express");
const app = express();
const path = require('path');

// Port configuration
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    res.send("Hello, this is first page!");
});

// Running the server
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
