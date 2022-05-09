var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
const multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/uploads/');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

var fs = require('fs');

// display user page
router.post('/fetch',upload.single('fileUploaded'), function(req, res, next) {    
console.log('get function hit');  

 let currentAccount = req.body.currentAccount;
 console.log(currentAccount);
 console.log('currentAccount');
    dbConn.query('SELECT * FROM users WHERE account = "'+currentAccount+'"',function(err,rows)     {
        if(err) {
            // req.flash('error', err);
            // render to views/users/index.ejs
            // res.send(JSON.stringify(err));
            var jscontent={"status":"400","message":"Fetch error","Data":{}};
                      res.send(JSON.stringify(jscontent));
            // res.render('users',{data:''});   
        } else {
            console.log(rows);
            var jscontent={"status":"200","message":"successfully","Data":rows};
                      res.send(JSON.stringify(jscontent));
     
            // render to views/users/index.ejs
            // res.render('users',{data:rows});
        }
    });
});



router.post('/fetchAll',upload.single('fileUploaded'), function(req, res, next) {    
console.log('get fetchAll hit');  
    dbConn.query('SELECT * FROM users WHERE status = 1',function(err,rows)     {
        if(err) {
            // req.flash('error', err);
            // render to views/users/index.ejs
            // res.send(JSON.stringify(err));
            var jscontent={"status":"400","message":"Fetch error","Data":{}};
                      res.send(JSON.stringify(jscontent));
            // res.render('users',{data:''});   
        } else {
            console.log(rows);
            var jscontent={"status":"200","message":"successfully","Data":rows};
                      res.send(JSON.stringify(jscontent));
     
            // render to views/users/index.ejs
            // res.render('users',{data:rows});
        }
    });
});
// display add user page
// add a new user
router.post('/add', upload.single('fileUploaded'), function(req, res, next) {  
console.log('add function hit')  
    console.log(req.file);

    let name = req.body.applicantName;
    let email = req.body.email;
    let country = req.body.country;
    let amount = req.body.amount;
    let city = req.body.city;
    let industry = req.body.industry;
    let currentAccount = req.body.currentAccount;
    
    console.log(name);

    let errors = false;

    // if(name.length === 0 || email.length === 0 || country.length === 0 || amount.length === 0 || city.length === 0 || industry.length === 0) {
    //     console.log('qwe---------=');
    //          errors = true;
    //          var jscontent={"status":"400","message":"Validation errors","Data":{}};
    //                   res.send(JSON.stringify(jscontent));
    // }
    if(!errors) {
        if(req.file){
            let image = req.file.originalname;
            var form_data = {
            name: name,
            email: email,
            country:country,
            amount:amount,
            city:city,
            industry:industry,
            account:currentAccount,
            image: image
        }
        
        }else{
        var form_data = {
            name: name,
            email: email,
            country:country,
            amount:amount,
            city:city,
            industry:industry,
            account:currentAccount
        }    
        }
         dbConn.query('SELECT * FROM users WHERE account = "'+currentAccount+'"', function(err, row) {

            console.log(form_data);
            if(row.length<1){
        dbConn.query('INSERT INTO users SET ?', form_data, function(err, result) {
            if (err) {
                var jscontent={"status":"400","message":"Insertion error","Data":{}};
                      res.send(JSON.stringify(jscontent));
            } else {    
                var jscontent={"status":"200","message":"Record added successfully","Data":result};
                      res.send(JSON.stringify(jscontent));
            }
        });
    }else{

        if(req.file)
            {
                var filePath = './public/uploads/'+row[0]['image']; 
                fs.unlinkSync(filePath);
            }
        dbConn.query('UPDATE users SET ?  WHERE account = "'+currentAccount+'" ', form_data, function(err, result) {
            if (err) {
                var jscontent={"status":"400","message":"Insertion error","Data":{}};
                      res.send(JSON.stringify(jscontent));
            } else {    
                var jscontent={"status":"200","message":"Record added successfully","Data":result};
                      res.send(JSON.stringify(jscontent));
            }
        });
    }
    });
    }
});



router.post('/delete',upload.single('fileUploaded'), function(req, res, next) {    
console.log('Delete uSer function hit');  

 let currentAccount = req.body.currentAccount;
 console.log(currentAccount);
 console.log('currentAccount');
    dbConn.query('DELETE FROM users WHERE account = "'+currentAccount+'"',function(err,rows)     {
        if(err) {
            var jscontent={"status":"400","message":"Fetch error","Data":{}};
                      res.send(JSON.stringify(jscontent));
        } else {
            dbConn.query('SELECT * FROM users',function(err,rows)     {
                 var jscontent={"status":"200","message":"successfully","Data":rows};
                      res.send(JSON.stringify(jscontent));
            });
           
        }
    });
});

   
// delete user
router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;
     
    dbConn.query('DELETE FROM users WHERE id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to user page
            res.redirect('/users')
        } else {
            // set flash message
            req.flash('success', 'User successfully deleted! ID = ' + id)
            // redirect to user page
            res.redirect('/users')
        }
    })
})

module.exports = router;