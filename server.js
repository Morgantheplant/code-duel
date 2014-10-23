var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var db = require('./db')
var fs = require('fs');

//add promisify
// var Promise = require('bluebird');
// var getPrompt = Promise.promisify(db.getPrompt);
// var saveScore = Promise.promisify(db.saveScore);
// var findScore = Promise.promisify(db.findScore);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/client'));

//****** database responses**********************************/

//on get requests for the prompt
app.get('/prompt', function(req, res){
   
//get prompt by ID#? we can count prompts in DB and gen a random number 
  //util.randomPromptByIndex()
//or we can speficify prompt name in request

   db.getPrompt(req.promptname, function(err, results){
     
     //factor to own file
     var util = {};
     //lookup filepath stored in db
     util.loadfile = function(path){
       fs.readFile(path, function(err, data){
        if (error) throw err;
        return data
       })
     }

     //grab prompt and test
     util.loadFile(results.promptpath)
     util.loadFile(results.testpath)
   
   });


});

app.post('/score', function(req, res){
  db.saveScore(req)

});

app.get('/highscores', function(req, res){
  db.findScores();
});

//********** database actions above *********************************/

io.on('connection', function(socket){
  console.log('a user connected');


  socket.on('addToRoom', function(room){
    socket.join(room)
    console.log("JOINED ROOM:", room)
  });

  //helper fuction checks if room is full
  socket.on('checkroom', function(room){

    var roomLen = io.sockets.adapter.rooms[room];
    var isFull;

    if(!roomLen){
      isFull = false;
    } else {
      isFull = Object.keys(roomLen).length >=2 ? true : false;
    }

  io.emit('roomStatus', isFull);

 });

  socket.on('disconnect', function(){
    delete io.sockets.adapter.rooms[socket.id]
    console.log('user disconnected');
  });

});



http.listen(port, function(){
  console.log('listening on port:', port);
});
