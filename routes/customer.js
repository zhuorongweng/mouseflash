var express = require('express');  var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records
// URL:http://localhost:4039/customer/
// ==================================================

router.get('/', function(req, res, next) {
    let query = "SELECT customer_id, firstname, lastname, email, phone, address, city, state, username, password FROM customer";

    // execute query
    db.query(query, (err, result) => {
    if (err) {
        console.log(err);
        res.render('error');
    }
        res.render('customer/allrecords', {allrecs: result });
    });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:4039/customer/99/show
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT customer_id, firstname, lastname, email,phone, address, city, state, username, password FROM customer WHERE customer_id = " + req.params.recordid;
    
    // execute query
    db.query(query, (err, result) => {  
        if (err) {
            console.log(err);  
            res.render('error');
        } else {
            res.render('customer/onerec', {onerec: result[0] });
        }
    });
});
    
// ==================================================
// Route to show empty form to obtain input form end-user.
// URL: http://localhost:4039/customer/addrecord
// ==================================================
router.get('/addrecord', function(req, res, next) {  
    res.render('customer/addrec');
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {

    let insertquery = "INSERT INTO customer (firstname, lastname, email, phone, address, city, state, username, password) VALUES (?, ?, ?, ?, ?,?, ?,?,?)";
    
    db.query(insertquery,[req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.address, req.body.city, req.body.state,req.body.username,req.body.password],(err, result) => {
        if (err) {
            console.log(err);  
            res.render('error');
        } else {
            res.redirect('/customer');
        }
    });
});
    
    
    

// ==================================================
// Route to edit one specific record.
//URL: http://localhost:4039/customer/99/edit
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT customer_id , firstname , lastname,email, phone, address, city, state, username, password FROM customer WHERE customer_id = " + req.params.recordid;
    
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);  
            res.render('error');
        } else {
            res.render('customer/editrec', {onerec: result[0] });
        }
    });
});

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
    let updatequery = "UPDATE customer SET firstname = ?, lastname = ?, email = ?, phone = ?, address = ?, city = ?, state = ?,username = ?,password = ? WHERE customer_id = " + req.body.customer_id;
    
    db.query(updatequery,[req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.address, req.body.city, req.body.state,req.body.username,req.body.password],(err, result) => {
        if (err) {
            console.log(err);  res.render('error');
        } else {
            res.redirect('/customer');
        }
    });
});
    

// ==================================================
// Route to delete one specific record.
//URL: http://localhost:4039/customer/99/delete
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM customer WHERE customer_id = " + req.params.recordid;
    
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/customer');
        }
    });
});
    


module.exports = router;