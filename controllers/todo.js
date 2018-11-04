var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
var mongoose = require('mongoose');

//establishing DB connection :
mongoose.connect('mongodb://test:test1234@ds133920.mlab.com:33920/todoapp-testing');

//creating a schema:
var todoSchema = new mongoose.Schema({
    item: String
});

//creating a DB model(ananlogous to classes in OOP) :
var TodoList = mongoose.model('TodoList',todoSchema);

//var data = [{item:'get meat'},{item:'check water level'},{item:'watch node videos'}];

module.exports = function(app){

    app.get('/todo',function(req,res){
        //getting data from mongoDB and feeding it to the view:
        TodoList.find({}, function(err,data){
            if(err) throw err;
        res.render('todo',{todos: data});
     });
});

    app.post('/todo',urlencodedParser,function(req,res){
        //getting data from the view and putting it in mongoDB:
        var newtodo = TodoList(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item',function(req,res){
        //deleting data from mongoDB:
        TodoList.find({item : req.params.item.replace(/\-/g,' ')}).remove(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });

};