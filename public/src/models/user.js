var m = require("mithril");
var stream = require("mithril/stream");

function to_s(v) {
    if(v) {
	return String(v);
    }
    else {
	return "";
    }
}

var User = {
    id: stream(""),
    username: stream(""),
    my_address: stream(""),
    forwarded: stream(""),
    forward_address: stream(""),
    currentPassword: stream(""),
    currentPasswordStates: stream("none"),
    newPassword: stream(""),
    confirmationPassword: stream(""),
    newPasswordStates: stream("none"),

    checkPassword: function(pw) {
	var data = new FormData();
	data.append("password", pw);
	m.request({method: "POST",
		   url: "passwd/check",
		   serialize: function(data) {return data},
		   data: data})
	    .then(function(data) {
		if(data.result) {
		    User.currentPasswordStates("valid");
		}
		else {
		    User.currentPasswordStates("invalid");
		}
	    });
    },
    
    setCurrentPassword: function(value) {
	if(value.length > 0) {
	    User.checkPassword(value);
	}
	else {
	    User.currentPasswordStates("none");
	}
    },

    setNewPassword: function(value) {
	User.newPassword(value);
	User.checkNewPassword();
    },

    setConfirmationPassword: function(value) {
	User.confirmationPassword(value);
	User.checkNewPassword();
    },

    validatePassword: function() {
	return (User.currentPasswordStates() == "valid"
		&& User.newPasswordStates() == "valid");
    },

    validateForward: function() {
	var result = true;
	if(User.forwarded()) {
	    if(!User.forward_address().match(/^[A-Za-z0-9+_\-.]+@[A-Za-z0-9+_\-.]+$/)) {
		result = false;
	    }
	}
	return result;
    },

    checkNewPassword: function() {
	if(User.newPassword() != "") {
	    if(User.newPassword() == User.confirmationPassword()) {
		User.newPasswordStates("valid");
	    }
	    else {
		User.newPasswordStates("invalid");
	    }
	}
	else {
	    User.newPasswordStates("none");
	}
    },

    load: function() {
	m.request({method: "GET",
		   url: "info",
		   withCredentials: true})
	    .then(function(result) {
		User.id(result.id);
		User.username(result.username);
		User.my_address(result.my_address);
		User.forwarded(result.forwarded);
		User.forward_address(to_s(result.forward_address));
	    });
    },
    
    updatePassword: function(e) {
	var data = new FormData();
	data.append("new_password", User.newPassword());
	m.request({method: "POST",
		   url: "passwd",
		   serialize: function(data) {return data},
		   data: data})
	    .then(function(data) {
		if(data.result) {
		    alert("設定を更新しました。");
		}
		else {
		    alert("設定の更新に失敗しました。");
		}
	    })
	    .catch(function(e) {
		alert("設定の更新に失敗しました。\n" + e)
	    });
    },

    updateForward: function() {
	if(User.forwarded()) { // 転送設定
	    var data = new FormData();
	    data.append("forward_address", User.forward_address());
	    m.request({method: "POST",
		       url: "forward",
		       serialize: function(data) {return data},
		       data: data})
		.then(function(data) {
		    alert("設定を更新しました。");
		})
		.catch(function(e) {
		    alert("設定の更新に失敗しました。\n" + e);
		});
	}
	else { // 転送解除
	    m.request({method: "POST",
		       url: "forward/disable",
		       withCredentials: true})
		.then(function(data) {
		    alert("設定を更新しました。");
		})
		.catch(function(e) {
		    alert("設定の更新に失敗しました。\n" + e);
		});
	}
    }
};

module.exports = User;
