var _express = require('express');
var _app = _express();
_app.use('/',_express.static('./public'));
_app.listen(8080);