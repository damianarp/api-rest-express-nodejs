// Importaciones necesarias.
const debug = require('debug')('app:inicio'); // Requiere un parámetro (entorno de depuración para la app). En consola definimos la variable de entorno export DEBUG=app:inicio
//const dbDebug = require('debug')('app:db'); // En consola definimos la variable de entorno export DEBUG=app:db
const usuarios = require('./routes/usuarios');
const express = require('express');
const config = require('config');
const morgan = require('morgan');
//const logger = require('./logger');
//const auth = require('./auth');

// Creamos una instancia de express (nuestra app).
const app = express();

// Para enviar por POST al servidor (en formato JSON) debemos trabajar con Middlewares para que parseen este tipo de datos cuando el servidor los reciba.
// Uso de middleware express.json() en la app con el método use(), el cual permite recibir como requerimiento formato del tipo JSON.
app.use(express.json());

// Uso de middleware express.urlencoded() con la propiedad extended = true, que permite trabajar con querystrings (cadena de consulta que contiene datos con nombre y valor, concatenados con el símbolo &).
app.use(express.urlencoded({extended:true}));

// Uso de middleware express.static() para poder publicar recursos estáticos dentro de un servidor estático, como imágenes, archivos, etc.
// Le enviamos como parámetro una carpeta que se llame public.
app.use(express.static('public'));

// Cada vez que recibamos la ruta /api/usuarios usaremos el middleware usuarios.
app.use('/api/usuarios', usuarios);


// ********** Configuración de entornos **********//

console.log('Aplicación: ' + config.get('nombre'));
console.log('BD Server: ' + config.get('configDB.host'));
// Para cambiar del entorno de producción al de desarrollo o viceversa, hacer:
// export NODE_ENV=production ó export NODE_ENV=development en consola.

// ******************************************* //

// Uso de middleware de terceros 'Morgan' que nos permite realizar un registro de todas las peticiones HTTP. Debemos especificarle un formato. Solo funcionará en entorno de desarrollo.
if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    //console.log('Morgan habilitado!');
    debug('Morgan está habilitado.');
}

// Para trabajos con la BD.
debug('Conectando con la BD...');

////////////////////////////////////////////

// Ejemplos del uso de middlewares personalizados.
// Cargamos el middleware logger.
//app.use(logger);

// Cargamos el middleware auth.
//app.use(auth);

////////////////////////////////////////////

// Solicitamos información al servidor.
app.get('/',(req, res) => {
    res.send('Hola Mundo desde Express');
});

// Creamos una variable de entorno a través del método process, para definir el puerto.
const port = process.env.PORT || 3000;   

// Indicamos el puerto en el que va a estar escuchando el servidor web.
app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}...`);
});







