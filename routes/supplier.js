var express = require('express');  var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records
// URL:http://localhost:4039/supplier/
// ==================================================

router.get('/', function(req, res, next) {
    let query = "SELECT supplier_id, suppliername, Pointofcontact, weburl,suppliernotes FROM supplier";

    // execute query
    db.query(query, (err, result) => {
    if (err) {
        console.log(err);
        res.render('error');
    }
        res.render('supplier/allrecords', {allrecs: result });
    });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:4039/supplier/99/show
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT supplier_id, suppliername, Pointofcontact, weburl,suppliernotes FROM supplier WHERE supplier_id = " + req.params.recordid;
    
    // execute query
    db.query(query, (err, result) => {  
        if (err) {
            console.log(err);  
            res.render('error');
        } else {
            res.render('supplier/onerec', {onerec: result[0] });
        }
    });
});
    
// ==================================================
// Route to show empty form to obtain input form end-user.
// URL: http://localhost:4039/supplier/addrecord
// ==================================================
router.get('/addrecord', function(req, res, next) {  
    res.render('supplier/addrec');
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {

    let insertquery = "INSERT INTO supplier (suppliername , Pointofcontact , weburl , suppliernotes) VALUES (?, ?, ?, ?)";
    
    db.query(insertquery,[req.body.suppliername, req.body.Pointofcontact, req.body.weburl, req.body.suppliernotes],(err, result) => {
        if (err) {
            console.log(err);  
            res.render('error');
        } else {
            res.redirect('/supplier');
        }
    });
});
    
    
    

// ==================================================
// Route to edit one specific record.
//URL: http://localhost:4039/supplier/99/edit
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT supplier_id, suppliername, Pointofcontact, weburl,suppliernotes FROM supplier WHERE supplier_id = " + req.params.recordid;
    
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);  
            res.render('error');
        } else {
            res.render('supplier/editrec', {onerec: result[0] });
        }
    });
});

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
    let updatequery = "UPDATE supplier SET suppliername = ?, Pointofcontact = ?, weburl  = ?, suppliernotes = ? WHERE supplier_id = " + req.body.supplier_id;
    
    db.query(updatequery,[req.body.suppliername, req.body.Pointofcontact, req.body.weburl, req.body.suppliernotes],(err, result) => {
        if (err) {
            console.log(err);  
            res.render('error');
        } else {
            res.redirect('/supplier');
        }
    });
});
    

// ==================================================
// Route to delete one specific record.
//URL: http://localhost:4039/supplier/99/delete
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM supplier WHERE supplier_id = " + req.params.recordid;
    
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/supplier');
        }
    });
});
    


module.exports = router;