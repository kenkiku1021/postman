var m = require("mithril");
var User = require("./models/user");
var Menu = require("./menu");

var root = document.getElementById("root");
m.route(root, "/menu", {
    "/menu": Menu,
});
