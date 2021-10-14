function auth(req, res, next) {
    console.log('Autenticando...');
    next();
}

// Exportamos la función.
module.exports = auth; 