require('dotenv').config();
const MongoStore = require('connect-mongo');
const session    = require('express-session');

// Session con Mongo Atlas
let sessionMongoDB = session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_CNN + "/" + process.env.MONGO_DATABASE, 
        mongoOptions: {
            useNewUrlParser:    true, // <-- no longer necessary.
            useUnifiedTopology: true, // <-- no longer necessary.
            // useCreateIndex:     true,
            // useFindAndModify:   false
        }
    }),
    cookie:{maxAge: 600000},            // 10 minutos
    key: process.env.SESSION_KEY,       // nombre de la cookie
    resave: false,                      // No guardar la sesión si no se ha modificado
    rolling: true,                      // cada vez que se abre la sesión se actualiza el tiempo de expiración
    saveUninitialized: false,           // No guardar la sesión si no se ha iniciado
    secret: process.env.SESSION_SECRET  // Secreto para encriptar la sesión
});

module.exports = {
    sessionMongoDB
}