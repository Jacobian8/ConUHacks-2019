let mysql = require('mysql');
var con = mysql.createConnection({
    host: "192.168.137.169",
    user: "jacobguirguis",
    password: "AssasinMax8!"
})

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

const request = require('request');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const apiID = 'b535c32e';
const apiKEY = '18bbb1d1d4d94b1f53dad01ca771b366';

//Returning all foods currently in fridge
app.get('/getFood', function (req, res) {
    console.log("Sending available food!");

    var sql = "SELECT * FROM ConUHacks2019.MY_FOOD";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });

})

//Returning Recipe containing foods with soonest expiration date
app.get('/getRecipe', function (req, res) {
    request('https://api.edamam.com/search?q=chicken&app_id='+apiID+'&app_key='+apiKEY, { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        res.send(response);
      });
})

//Receicing all foods being recognized by the camera (python code)
app.post('/addedFood', function (req, res) {
    console.log("Inserting food into database");

    console.log(req.body.foods);
    var food = req.body.foods;
    for (var i = 0; i < req.body.foods.length; i++) {
        var sql = "INSERT INTO ConUHacks2019.MY_FOOD (FOOD_ITEM, EXP_DATE)"
            + "VALUES ('" + food[i] + "', DATE_ADD(NOW(), INTERVAL (SELECT AVG_DAYS"
            + "FROM ConUHacks2019.EXP_DATES"
            + "WHERE FOOD_TYPE ='" + food[i] + "') DAY))";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(foods[i] + "record inserted");
        });
    }

    res.send("Post request complete!");

})

app.listen(8000, () => console.log("running on port 8000"));


