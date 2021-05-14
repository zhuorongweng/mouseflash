var express = require('express');  var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records
// URL:http://localhost:4039/product/
// ==================================================

router.get('/', function(req, res, next) {
    let query = "SELECT product_id, productname, supplier_id, category_id,subcategory, prodprice, status, homepage FROM product";

    // execute query
    db.query(query, (err, result) => {
    if (err) {
        console.log(err);
        res.render('error');
    }
        res.render('product/allrecords', {allrecs: result });
    });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:4039/product/99/show
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT product_id, productname, prodimage, supplier_id, category_id, subcategory, prodprice, status,homepage FROM product WHERE product_id = " + req.params.recordid;
    
    // execute query
    db.query(query, (err, result) => {  
        if (err) {
            console.log(err);  
            res.render('error');
        } else {
            res.render('product/onerec', {onerec: result[0] });
        }
    });
});
    
// ==================================================
// Route to show empty form to obtain input form end-user.
// URL: http://localhost:4039/product/addrecord
// ==================================================
router.get('/addrecord', function(req, res, next) {

    let query = "SELECT category_id, categoryname FROM category";
    // execute query
    db.query(query, (err, result) => {  
        if (err) {
            console.log(err);  
            res.render('error');
        }
            res.render('product/addrec', {category: result});});

});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {

    var homepagevalue = 0;

    if(req.body.homepage)
        {homepagevalue = 1;}

    let insertquery = "INSERT INTO product (productname, prodimage, supplier_id,  category_id, subcategory,prodprice, status,homepage) VALUES (?, ?, ?, ?, ?,?, ?,?)";
    
    db.query(insertquery,[req.body.productname, req.body.prodimage, req.body.supplier_id, req.body.category_id, req.body.subcategory, req.body.prodprice, req.body.status, homepagevalue],(err, result) => {
        if (err) {
            console.log(err);  
            res.render('error');
        } else {
            res.redirect('/product');
        }
    });
});
    
    
    

// ==================================================
// Route to edit one specific record.
//URL: http://localhost:4039/product/99/edit
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT product_id, productname, prodimage, supplier_id, category_id, subcategory, prodprice, status,homepage FROM product WHERE product_id = " + req.params.recordid;
    
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);  
            res.render('error');
        } else {
            let query = "SELECT category_id, categoryname FROM category";
            // execute query  
            db.query(query, (err, catss) => {
                if (err) {
                    console.log(err);  
                    res.render('error');
                }
                res.render('product/editrec', {onerec: result[0], category: catss});
            });
        }
    });
});

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {

    var homepagevalue = 0;

    if(req.body.homepage)
        {homepagevalue = 1;}


    let updatequery = "UPDATE product SET productname = ?, prodimage = ?, supplier_id = ?, category_id = ?, subcategory = ?, prodprice = ?, status = ?,homepage=? WHERE product_id = " + req.body.product_id;
    
    db.query(updatequery,[req.body.productname, req.body.prodimage, req.body.supplier_id, req.body.category_id, req.body.subcategory, req.body.prodprice, req.body.status, homepagevalue],(err, result) => {
        if (err) {
            console.log(err);  res.render('error');
        } else {
            res.redirect('/product');
        }
    });
});
    

// ==================================================
// Route to delete one specific record.
//URL: http://localhost:4039/product/99/delete
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM product WHERE product_id = " + req.params.recordid;
    
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/product');
        }
    });
});
    


module.exports = router;