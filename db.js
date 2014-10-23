var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "scoreboard"
});

dbConnection.connect();

exports.findScores = function(callback){

  var query = 'SELECT Scores.id, Scores.winner, Scores.opponent, Scores.score, Prompts.prompt, Prompts.promptpath\n' +
              'FROM Prompts LEFT OUTER JOIN Scores ON Prompts.id = Scores.promptid\n' +
              'ORDER BY Scores.score DESC;';
  dbConnection.query(query, function(err, results){
    callback(err, results);
  });
};

exports.findPromt = function(promptname, callback){
  var query = 'SELECT * FROM Prompts WHERE prompt = ? LIMIT 1;';
  dbConnection.query(query, promptname, function(err, results){
    calback(err, results);
  });
};

exports.findPromtById = function(promptId, callback){
  var query = 'SELECT * FROM Prompts WHERE prompt.id = ? LIMIT 1;';
  dbConnection.query(query, promptId, function(err, results){
    calback(err, results);
  })

exports.savePrompt = function(promptname, promptpath, testpath, callback){
  var query = 'INSERT INTO Prompts(prompt, promptpath, testpath) VALUES (?, ?);';
  dbConnection.query(query, [promptname, promptpath, testpath], function(err, results){
    calback(err, results);
  });
};

exports.saveScore = function(results, callback){
  var query = 'INSERT INTO Scores(winner, opponent, score, promptid, submittedcode) VALUES (?, ?, ?, ?, ?)';
  dbConnection.query(query, [results.winner, results.opponent, results.score, results.promptid, results.submittedcode], function(err, results){
    calback(err, results);
  });
};