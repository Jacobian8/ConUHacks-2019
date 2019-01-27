let mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
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
    var sql = "SELECT * FROM ConUHacks2019.MY_FOOD order by EXP_DATE DESC LIMIT 3";
    con.query(sql, function (err, result) {
        if (err) throw err;
        var topThree = result;
        var selection = '';
        console.log(topThree);
        for (var foodItem in topThree) {
            selection += topThree[foodItem].FOOD_ITEM + ',';
        }
        console.log(selection);
        request('https://api.edamam.com/search?q=' + selection + '&app_id=' + apiID + '&app_key=' + apiKEY + '&from=0&to=5', { json: true }, (err, response, body) => {
            if (err) { return console.log(err); }
            var recipes = {};
            recipes['recipes'] = [];
            for (let index in response.body.hits) {
                var recipe = response.body.hits[index].recipe;
                var data = {
                    label: recipe.label,
                    image: recipe.image,
                    url: recipe.url,
                    ingredientLines: recipe.ingredientLines
                }
                recipes['recipes'].push(data);
            }
            res.json(recipes);
        });
    });
})

//Receicing all foods being recognized by the camera (python code)
app.post('/addedFood', function (req, res) {
    console.log("Inserting food into database");
    console.log(req.body.foods);
    var food = req.body.foods;
    var elements = ['apple', 'orange', 'banana', 'bread'];
    for (var i = 0; i < req.body.foods.length; i++) {
        if (elements.includes(food[i])) {
            var currentFood = food[i];
            var total = "select count(FOOD_ITEM) from ConUHacks2019.MY_FOOD where FOOD_ITEM = '" + food[i] + "'";

            con.query(total, [currentFood], function (err, number) {
                if (err) throw err; 
                console.log(currentFood);
                console.log(number[0]['count(FOOD_ITEM)']);

                if (number[0]['count(FOOD_ITEM)'] < 1) {
                    var sql = "INSERT INTO ConUHacks2019.MY_FOOD (FOOD_ITEM, EXP_DATE)"
                        + "VALUES ('" + currentFood + "', DATE_ADD(NOW(), INTERVAL (SELECT AVG_DAYS"
                        + " FROM ConUHacks2019.EXP_DATES"
                        + " WHERE FOOD_TYPE ='" + currentFood + "') DAY))";
                    con.query(sql, function (err, result) {
                        if (err) throw err;
                    });
                }
            });

        }
    }

    res.send("Post request complete!");

})

app.listen(8000, () => console.log("running on port 8000"));


