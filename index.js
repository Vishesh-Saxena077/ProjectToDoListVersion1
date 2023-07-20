const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3002;

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var todayArray = [];
var workArray = [];

let today = new Date();
let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
};
let day = today.toLocaleDateString("en-US", options);

app.get('/', (req, res) => {
    res.render("list", { Title: "Today Tasks", todaysDate: day, newListItems: todayArray });
});


app.post('/', (req, res) => {
    var buttonValue = req.body.listbtn;
    if (buttonValue === "Work") {
        var ele = req.body.newtask;
        workArray.push(ele);
        res.redirect('/work');
    } else {
        var ele = req.body.newtask;
        todayArray.push(ele);
        res.redirect('/');
    }
});

app.get('/work', (req, res) => {
    res.render("list", { Title: "Work", todaysDate: day, newListItems: workArray });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});