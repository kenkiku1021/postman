var m = require("mithril");
var stream = require("mithril/stream");
var User = require("./models/user");

var AdminAppendUser = {
    oninit: function(vnode) {
	vnode.state.username = stream("");
	vnode.state.password = stream("");
    },
    view: function(vnode) {
	return m(".panel.panel-default", [
	    m(".panel-heading", 
	      m("h3.panel-title", "ユーザの追加")),
	    m(".panel-body", [
		m("form", [
		    m(".row", [
			m(".col-sm-6", [
			    m(".form-group", [
				m("label", {for: "new-username"}, "ユーザ名"),
				m("input.form-control#new-username[type=text]",
				  {value: vnode.state.username(),
				   onkeyup: m.withAttr("value",
						       vnode.state.username)})
			    ]), // form-group
			]),
			m(".col-sm-6", [
			    m(".form-group", [
				m("label", {for: "new-password"}, "パスワード"),
				m("input.form-control#new-password[type=password]",
				  {value: vnode.state.password(),
				   onkeyup: m.withAttr("value",
						       vnode.state.password)})
			    ]), // form-group
			]),
		    ]), // row
		]), // form
	    ]), // panel-body
	    m(".panel-footer", [
		m(".text-right", [
		  m("button.btn.btn-primary[type=button]",
		    {onclick: function() {
			User.create(vnode.state.username(),
				    vnode.state.password());
		    }},
		    "追加"),
		]), // text-right
	    ]), // panel-footer
	]); // panel
    },
};

module.exports = AdminAppendUser;
