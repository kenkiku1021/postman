var m = require("mithril");
var User = require("./models/user");
var AdminMenu = require("./admin-menu");

var root = document.getElementById("root");
m.route(root, "/admin-menu", {
    "/admin-menu": AdminMenu,
});
