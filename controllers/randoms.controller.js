const { request }  = require('express');
const { response } = require('express');
const { fork } = require('child_process');


const randoms = ( req = request, res = response ) => {
    //Cantidad de iteraciones
    const cantidadIteraciones = req.query.cant || 100000000;

    const randomFork = fork('./utils/random.js')
    
    randomFork.on('message', (result) => {
        //Aca se obtiene la respuesta del proceso secundario
        return res.status(200).send(result);
    });
    
    //Aca se envia el pedido al proceso secundario
    randomFork.send(cantidadIteraciones);
}

module.exports = {
    randoms
}
