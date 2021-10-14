function log(req, res, next) {
    console.log('Logging...');
    next();
}

// Exportamos la función.
module.exports = log; 