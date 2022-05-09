var mysql = require('mysql');
var connection = mysql.createConnection({
  host:'ls-37ba12df0510c1526e11936bda65a7480302d93d.ccugfmlgtnrm.eu-central-1.rds.amazonaws.com',
	user:'dbmasteruser',
	password:'lWoxg8QRn~%Y,akF2`K&q}UKsCSk}V^9',
	database:'nfts'
});
connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Database Connected Successfully..!!');
	}
});

module.exports = connection;
