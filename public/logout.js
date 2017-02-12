$(function() {
    $("#logout-menu").click(function(e) {
	e.preventDefault();
	if(confirm("ログアウトしてもよろしいですか？")) {
	    $("#logout-form").submit();
	}
    });
});
