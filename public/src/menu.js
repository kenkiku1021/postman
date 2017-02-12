var m = require("mithril");
var stream = require("mithril/stream");
var User = require("./models/user");

function validationClass(states) {
    var result = "";
    switch(states) {
    case "valid":
	result = "has-success";
	break;
    case "invalid":
	result = "has-error";
	break;
    }
    return result;
}

var Menu = {
    oninit: function(vnode) {
	User.load();
    },
    
    view: function(vnode) {
	return m("form", [
	    m(".row", [
		m(".col-xs-12.col-sm-6", [
		    m(".form-group", [
			m("label", {for: "username"}, "ユーザ名"),
			m("input.form-control[type=text]",
			  {readonly: true,
			   value: User.username()})
		    ]),
		]),
		m(".col-xs-12.col-sm-6", [
		    m(".form-group", [
			m("label", {for: "my_address"}, "メールアドレス"),
			m("input.form-control[type=text]",
			  {readonly: true,
			   value: User.my_address()})
		    ]),
		]),
	    ]),
	    m(".row", [
		m(".col-xs-12.col-sm-6", [
		    m(".panel.panel-default", [
			m(".panel-heading", 
			  m("h3.panel-title", "パスワード変更")),
			m(".panel-body", [
			    m(".form-group",
			      {class: validationClass(User.currentPasswordStates())},
			      [m("label", {for: "current-password"},
				 "現在のパスワード"),
			       m("input#current-password.form-control[type=password]",
				 {onchange: m.withAttr("value",
						       User.setCurrentPassword)}),
			      ]),
			    m(".form-group",
			      [m("label", {for: "new-password"},
				 "新しいパスワード"),
			       m("input#new-password.form-control[type=password]",
				 {onchange: m.withAttr("value",
						       User.setNewPassword)}),
			      ]),
			    m(".form-group",
			      {class: validationClass(User.newPasswordStates())},
			      [m("label", {for: "confirmation-password"},
				 "パスワードの確認"),
			       m("input#confirmation-password.form-control[type=password]",
				 {onchange: m.withAttr("value",
						       User.setConfirmationPassword)}),
			      ]),
			]),
			m(".panel-footer", [
			    m(".text-right", [
				m("button.btn.btn-primary[type=button]",
				  {disabled: !User.validatePassword(),
				   onclick: User.updatePassword},
				  "更新"),
			    ])
			])
		    ]),
		]),
		m(".col-xs-12.col-sm-6", [
		    m(".panel.panel-default", [
			m(".panel-heading",
			  m("h3.panel-title", "転送設定")),
			m(".panel-body", [
			    m(".checkbox", [
				m("label", [
				    m("input[type=checkbox]",
				      {onchange: m.withAttr("checked",
							    User.forwarded),
				       checked: User.forwarded(),
				       value: 1}),
				    "転送する",
				]),
			    ]),
			    m(".form-group", [
				m("label", {for: "forward_address"}, "転送先"),
				m("input[type=email].form-control",
				  {onkeyup: m.withAttr("value",
						       User.forward_address),
				   value: User.forward_address(),
				   disabled: User.forwarded(),
				   readonly: !User.forwarded()}),
			    ]),
			]),
			m(".panel-footer", [
			    m(".text-right", [
				m("button.btn.btn-primary[type=button]",
				  {disabled: !User.validateForward(),
				   onclick: User.updateForward},
				  "更新"),
			    ]),
			]),
		    ]),
		]),
	    ]),
	]);
    },
};

module.exports = Menu;
