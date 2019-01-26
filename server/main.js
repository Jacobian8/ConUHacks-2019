let mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "jacobguirguis",
    password: "AssasinMax8!"
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});