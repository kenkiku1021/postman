var m = require("mithril");
var stream = require("mithril/stream");
var User = require("./models/user");
var AdminAppendUser = require("./admin-append-user");

var AdminMenu = {
    view: function(vnode) {
	return m("div", [
	    m(AdminAppendUser),
	]);
    },
};

module.exports = AdminMenu;
