var express = require('express');
var  app = express();
var todo = require('./controllers/todo.js');

//setting up template engine:
app.set('view engine','ejs');

//setting static files(CSS):
app.use(express.static('./public'));

//firing the controller :
todo(app);

//listening to localhost:3000
app.listen(process.env.port || 3000);
console.log('...starting application....');