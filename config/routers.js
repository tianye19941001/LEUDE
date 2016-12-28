var User = require("../app/controllers/user");
var Index = require("../app/controllers/index");
module.exports = function(app) {
	app.get("/",Index.index);
	app.get("user/signin",User.signin);
	app.get("user/signup",User.signup);
}
