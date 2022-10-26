
/// This file is just to demonstrate how we use middleware and add it to our routes etc.



function logging1 (req, res, next) {
    
    console.log('logging 1 middleware called');
    next();
   
};

function logging2 (req, res, next) {
    
    console.log('logging 2 middleware');
    next();
   
};

module.exports = {logging1, logging2 }