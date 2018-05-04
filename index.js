var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const fs = require("fs");

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/Lokacija', function(req, res){
  fs.readFile("lokacija.txt",'utf8', function(err, text){
    if (err){
      throw err;
    }
    res.write(text);
    res.end();
  });
});



io.on('connection', function(socket){

  fs.watch("lokacija.txt", 'utf8', (eventType, fileName)=>{
  	if(eventType == 'change'){
      fs.readFile("lokacija.txt",'utf8', function(err, text){
        if (err){
          throw err;
        }

        socket.emit('news',text);
      });

  	}
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
