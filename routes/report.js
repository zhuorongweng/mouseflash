var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
    res.render('report/reportmenu');
});

/*
<a href = "/report/custlist">Customer Listing</a> <br/>
<a href = "/report/prodlist">Product Listing</a> <br/>
<a href = "/report/salelist">Sales Listing</a> <br/>
*/

router.get('/custlist', function(req, res, next){

    let query = "SELECT customer_id, firstname, lastname, email, phone, address, city, state, username, password FROM customer";

    // execute query
    db.query(query, (err, result) => {
    if (err) {
        console.log(err);
        res.render('error');
    }
        res.render('report/custlist', {allrecs: result });
    });
});

router.get('/prodlist', function(req, res, next){

    let query = "SELECT product_id, productname, supplier_id, category_id,subcategory, prodprice, status, homepage FROM product";

    // execute query
    db.query(query, (err, result) => {
    if (err) {
        console.log(err);
        res.render('error');
    }
        res.render('report/prodlist', {allrecs: result });
    });
});

router.get('/salelist', function(req, res, next){
    let query = "SELECT order_id , customer_id , saledate, paymentstatus ,authorizationnum FROM saleorder";

    // execute query
    db.query(query, (err, result) => {
    if (err) {
        console.log(err);
        res.render('error');
    }
        res.render('report/salelist', {allrecs: result });
    });
});

module.exports = router;