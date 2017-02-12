var m = require("mithril");
var User = require("./models/user");

var u = User.load();
console.log(u);
u.then(function(data) {
    console.log(data.username());
});

